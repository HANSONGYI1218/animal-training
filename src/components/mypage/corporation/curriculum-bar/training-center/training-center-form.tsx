"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, Loader2, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { MCCPageNavigate } from "@/action/navigate";
import { sortUrlsByFilenameOrder } from "@/utils/utils";

const TrainingCenterSchema = z.object({
  name: z.string().min(1, { message: "훈련소 명을 적어주세요." }),
  introduction: z.string().min(1, { message: "훈련소 소개를 적어주세요." }),
  profile_images: z.array(z.string()).refine((value) => value[0] !== "", {
    message: "프로필 이미지를 선택해 주세요.",
  }),
  phoneNumber: z
    .string()
    .min(1, { message: "전화번호를 작성해 주세요." })
    .refine(
      (val) => /^[0-9-]*$/.test(val) && (val.match(/-/g) || []).length === 2,
      {
        message: "전화번호 형식을 지켜주세요.",
      },
    ),
  zipCode: z.string().min(1, { message: "우편번호를 작성해 주세요." }),
  address: z.string().min(1, { message: "기본주소를 작성해 주세요." }),
  detailAddress: z.string().min(1, { message: "상세주소를 작성해 주세요." }),
  refundPolicys: z
    .array(z.string())
    .min(1, { message: "환불정책을 적어주세요." }),
});

export default function TrainingCenterForm({
  trainingCenter,
}: {
  trainingCenter?: GetTrainingCenterDetailDto;
}) {
  const { data: session, status } = useSession();
  const form = useForm<z.infer<typeof TrainingCenterSchema>>({
    resolver: zodResolver(TrainingCenterSchema),
    defaultValues: {
      name: trainingCenter?.name ?? "",
      introduction: trainingCenter?.introduction ?? "",
      profile_images: trainingCenter?.profile_images
        ? sortUrlsByFilenameOrder(trainingCenter?.profile_images)
        : [],
      phoneNumber: trainingCenter?.phoneNumber ?? "",
      zipCode: trainingCenter?.zipCode ?? "",
      address: trainingCenter?.address ?? "",
      detailAddress: trainingCenter?.detailAddress ?? "",
      refundPolicys: trainingCenter?.refundPolicys ?? [],
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [deleteInput, setDeleteInput] = useState("");
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [deletelFiles, setDeletelFiles] = useState<string[]>([]);

  const openAddressPopup = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const addr =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        form.setValue("zipCode", data.zonecode);
        form.setValue("address", addr);
      },
    }).open();
  };

  const deleteTutor = async () => {
    setIsLoading(true);
    try {
      if (trainingCenter) {
        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/training-center?id=${trainingCenter?.id}`,
          {
            method: "DELETE",
          },
        );
      }
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  };

  async function onSubmit(data: z.infer<typeof TrainingCenterSchema>) {
    setIsLoading(true);

    let trainingCenterId = trainingCenter?.id;
    let publicUrls: string[] = trainingCenter?.profile_images ?? [];
    try {
      if (!trainingCenter) {
        //POST 요청, trainingCenterId 생성
        const responseTrainingCenter = await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/training-center`,
          {
            method: "POST",
            body: JSON.stringify({
              ...data,
              corporationId: session?.user?.id,
            }),
          },
        );

        if (!responseTrainingCenter.ok) {
          throw new Error(
            `Failed to fetch trainingCenter data. Status: ${responseTrainingCenter.status}`,
          );
        }

        trainingCenterId = await responseTrainingCenter.json();
      }

      await Promise.all(
        Array.from(additionalFiles).map(async (file, index) => {
          if (!file) {
            return;
          }

          let responsePublicUrl;
          const formData = new FormData();
          formData.append("file", file as Blob); // 추가 이미지 파일 추가
          formData.append("path", `training-center/${trainingCenterId}`);

          if (index === 0 && trainingCenter) {
            const url =
              trainingCenter?.profile_images.find((url) =>
                url.includes("0_thumbnail_"),
              ) ?? "";

            formData.append("prevFile", url);
            responsePublicUrl = await fetch(
              `${process.env.NEXT_PUBLIC_WEB_URL}/api/blob`,
              {
                method: "PUT",
                body: formData,
              },
            );

            publicUrls = publicUrls.filter((item) => item !== url);
          } else {
            responsePublicUrl = await fetch(
              `${process.env.NEXT_PUBLIC_WEB_URL}/api/blob`,
              {
                method: "POST",
                body: formData,
              },
            );
          }

          if (!responsePublicUrl.ok) {
            throw new Error("url is not found");
          }

          const publicUrl = await responsePublicUrl.json();
          publicUrls.push(publicUrl);
        }),
      );

      if (trainingCenter) {
        await Promise.all(
          Array.from(deletelFiles).map(async (url, index) => {
            if (!url) {
              return;
            }

            await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/blob`, {
              method: "DELETE",
              body: JSON.stringify({
                prevFile: url,
                type: "image",
                path: `training-center/${trainingCenter?.id}`,
              }),
              headers: {
                "Content-Type": "application/json",
              },
            });

            publicUrls = publicUrls.filter((item) => item !== url);
          }),
        );
      }

      const requestData = {
        ...(trainingCenter
          ? { id: trainingCenter.id, ...data }
          : { id: trainingCenterId }),
        profile_images: publicUrls,
      };

      await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/training-center`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });
      await MCCPageNavigate();
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <Link href={"/mypage/corporation/curriculum"}>
            <Button variant={"link"} className="flex gap-1 p-0 text-sm">
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              훈련소 목록가기
            </Button>
          </Link>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">훈련소 이름</span>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="훈련소 이름을 적어주세요."
                      className="disabled:cursor-default disabled:border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">훈련소 소개</span>
            <FormField
              control={form.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="훈련소를 소개를 작성해주세요."
                      className="min-h-32 resize-none whitespace-pre-line disabled:cursor-default disabled:border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">훈련소 전화번호</span>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="훈련소 전화번호를 적어주세요."
                      className="disabled:cursor-default disabled:border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-semibold">훈련소 주소</span>
            <div className="flex items-center gap-2">
              <FormField
                control={form.control}
                name="zipCode"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        disabled
                        className="disabled:cursor-default disabled:bg-background"
                        placeholder="우편번호"
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant={"destructive"}
                className="flex h-10 gap-2"
                onClick={() => openAddressPopup()}
              >
                <Search className="h-5 w-5" />
                주소 찾기
              </Button>
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled
                      className="disabled:cursor-default disabled:bg-background"
                      placeholder="기본주소를 입력해주세요."
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="상세주소를 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <span className="text-lg font-semibold">훈련소 환불정책</span>
            <FormField
              control={form.control}
              name="refundPolicys"
              render={({ field }) => {
                const handleAddTag = () => {
                  const isExist = field?.value.some(
                    (v: string) => v === newTag,
                  );
                  const isMax = field?.value.length === 5;

                  if (newTag && !isExist && !isMax) {
                    field?.onChange([...field?.value, newTag]);
                    setNewTag("");
                  }
                };

                return (
                  <FormItem className="flex flex-col space-y-3">
                    <div className="flex gap-3">
                      <FormControl>
                        <Input
                          placeholder="한불정책을 작성해주세요.(최대 5개)"
                          className="disabled:cursor-default disabled:border-none"
                          value={newTag}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleAddTag();
                            }
                          }}
                          onChange={(e) => setNewTag(e.target.value)}
                        />
                      </FormControl>
                      <Button
                        type="button"
                        variant={"destructive"}
                        onClick={(e) => {
                          e.preventDefault();
                          handleAddTag();
                        }}
                      >
                        추가
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2">
                      {field?.value.map((tag: string, index: number) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-2 rounded-lg bg-slate-100 px-5 py-3"
                          >
                            <span className="flex-1">{tag}</span>
                            <Plus
                              className="h-4 w-4 rotate-45 cursor-pointer"
                              onClick={() => {
                                const deleteTag = field?.value.filter(
                                  (v) => v !== tag,
                                );
                                field?.onChange(deleteTag);
                              }}
                            />
                          </div>
                        );
                      })}
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="flex w-full flex-col gap-3">
            <span className="text-lg font-semibold">훈련소 썸네일</span>
            <FormField
              control={form.control}
              name="profile_images"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Input
                      disabled
                      placeholder="훈련소 썸네일을 선택해주세요."
                      className="disabled:cursor-default"
                      value={field?.value[0] ?? ""}
                    />
                    <Button
                      type="button"
                      className="flex w-fit"
                      variant={"destructive"}
                    >
                      <label htmlFor="file" className="cursor-pointer">
                        업로드
                      </label>
                      <input
                        type="file"
                        id="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const renamedFile = new File(
                              [file],
                              `0_thumbnail_${file.name}`,
                              { type: file.type },
                            );

                            const videoPath = URL.createObjectURL(renamedFile);

                            setAdditionalFiles((prevFiles) => [
                              renamedFile,
                              ...prevFiles.slice(1),
                            ]);

                            const updatedFiles = [
                              videoPath, // 첫 번째 인덱스를 videoPath로 설정
                              ...(field?.value?.slice(1) ?? []), // 나머지 파일들은 그대로 추가
                            ];

                            field.onChange(updatedFiles); // 배열을 바로 전달
                          }
                        }}
                        className="hidden"
                      />
                    </Button>
                  </div>
                  <img
                    src={field?.value[0]}
                    alt="preview"
                    className={`max-h-[300px] w-1/2 ${!trainingCenter?.profile_images[0] && !field?.value[0] && "hidden"}`}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <span className="flex items-center gap-1.5 text-lg font-semibold">
              훈련소 추가 사진
              <span className="text-xs font-normal text-red-500">
                *최대 3개까지 업로드 가능합니다
              </span>
            </span>
            <FormField
              control={form.control}
              name="profile_images"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Input
                      disabled
                      placeholder="훈련소 영상을 선택해주세요."
                      className="disabled:cursor-default"
                      value={field?.value.slice(1).pop() ?? ""}
                    />
                    <Button
                      type="button"
                      className="flex w-fit"
                      variant={"destructive"}
                    >
                      <label htmlFor="addImages" className="cursor-pointer">
                        업로드
                      </label>
                      <input
                        type="file"
                        id="addImages"
                        multiple
                        disabled={field.value.length === 4}
                        onChange={(e) => {
                          const files = e.target.files;
                          if (files) {
                            // 선택된 파일들을 Array로 변환하고 URL을 생성
                            const videoPaths = Array.from(files).map((file) =>
                              URL.createObjectURL(file),
                            );

                            const renamedFiles = Array.from(files).map(
                              (file) =>
                                new File([file], `1_addImages_${file.name}`, {
                                  type: file.type,
                                }),
                            );

                            // field.value와 videoPaths를 합친 배열을 직접 전달
                            const updatedFiles = [
                              ...(field?.value ?? undefined),
                              ...videoPaths,
                            ];

                            setAdditionalFiles((prevFiles: any) => [
                              ...(prevFiles ? [prevFiles[0]] : [null]), // 기존 파일들을 그대로 넣음
                              ...prevFiles.slice(1),
                              ...renamedFiles, // 새로운 파일들을 추가
                            ]);

                            field.onChange(updatedFiles); // 배열을 바로 전달
                          }
                        }}
                        className="hidden"
                      />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {field?.value
                      .slice(1)
                      .map((image: string, deleteIndex: number) => {
                        return (
                          <div
                            key={deleteIndex}
                            className="flex items-center gap-2 rounded-lg bg-slate-100 px-5 py-3"
                          >
                            <span className="flex-1">{image}</span>
                            <Plus
                              className="h-4 w-4 rotate-45 cursor-pointer"
                              onClick={() => {
                                const deleteImage = field?.value?.filter(
                                  (v) => v !== image,
                                );

                                if (
                                  trainingCenter?.profile_images.includes(image)
                                ) {
                                  setDeletelFiles((prevFiles) => {
                                    return [
                                      ...prevFiles,
                                      trainingCenter?.profile_images[
                                        deleteIndex + 1
                                      ],
                                    ];
                                  });
                                } else {
                                  setAdditionalFiles((prevFiles) => {
                                    const updatedFiles = [
                                      prevFiles?.[0] ?? null, // 첫 번째 요소 그대로 유지
                                      ...(prevFiles
                                        ?.slice(1)
                                        .filter(
                                          (_, index) => index !== deleteIndex,
                                        ) ?? []),
                                    ];

                                    return updatedFiles; // 수정된 배열을 반환
                                  });
                                }

                                field?.onChange(deleteImage);
                              }}
                            />
                          </div>
                        );
                      })}
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {field?.value
                      .slice(1)
                      .map((image: string, index: number) => {
                        return (
                          <img
                            key={index}
                            src={image}
                            alt="preview"
                            className={`max-h-[300px] w-full`}
                          />
                        );
                      })}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            variant={"destructive"}
            className="mt-16 w-24 self-end"
          >
            {isLoading ? <Loader2 /> : "완료하기"}
          </Button>
        </form>
      </Form>
      <hr className={`my-10 w-full ${trainingCenter ? "flex" : "hidden"}`} />
      <div
        className={`w-full flex-col gap-3 ${trainingCenter ? "flex" : "hidden"}`}
      >
        <div className="flex flex-col">
          <span className="text-lg font-semibold">훈련소 삭제</span>
          <span className="text-sm text-neutral-600">
            * 훈련소를 삭제하면 해당 훈련소를와 관련된 강사의 정보가 사라집니다.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder={`'${trainingCenter?.name} 훈련소 삭제' 를 입력해주세요.`}
            className="border-2 border-red-500 disabled:cursor-default disabled:border-none"
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <Button
            onClick={() => {
              if (deleteInput === `${trainingCenter?.name} 훈련소 삭제`) {
                deleteTutor();
              }
            }}
            type={"button"}
            variant={"delete"}
          >
            훈련소 삭제
          </Button>
        </div>
      </div>
    </>
  );
}
