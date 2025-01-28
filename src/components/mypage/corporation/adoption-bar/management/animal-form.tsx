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
import { useState, useContext } from "react";
import { ChevronLeft, Loader2, Plus, CalendarIcon, Delete } from "lucide-react";
import { AnimalAge, AnimalSize, AnimalType, GenderType } from "@prisma/client";
import Link from "next/link";
import { CorporationContext } from "@/providers/corporation-provider";
import { toast } from "sonner";
import { GetAnimalDto } from "@/dtos/animal.dto";
import { cn, enterKeyDown, sortUrlsByFilenameOrder } from "@/utils/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MCAPageNavigate } from "@/action/navigate";
import { Calendar } from "@/components/ui/calendar";

const AnimalSchema = z.object({
  name: z.string().min(1, { message: "분양동물의 이름을 적어주세요." }),
  age: z
    .string()
    .refine((value) => !isNaN(parseFloat(value)), {
      message: "올바른 숫자를 입력하세요.",
    })
    .refine(
      (value) => {
        const parsedValue = parseFloat(value);
        return (
          parsedValue >= 0 &&
          (parsedValue % 1 === 0 || parsedValue.toFixed(1) === value)
        );
      },
      {
        message: "소수점 이하 한 자릿수만 입력 가능합니다.",
      },
    ),
  gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
  animal_type: z.enum(["DOG", "CAT"]).default("DOG"),
  animal_size: z.enum(["SMALL", "NORMAL", "LARGE"]).default("NORMAL"),
  animal_age: z.enum(["YOUNG", "NORMAL"]).default("NORMAL"),
  breed: z.string().min(1, { message: "분양동물의 품좀을 적어주세요." }),
  profile_images: z.array(z.string()).refine((value) => value[0] !== "", {
    message: "분양동물 이미지를 선택해 주세요.",
  }),
  intakeDate: z.date({ required_error: "분양동물의 나이를 적어주세요." }),
  remarks: z.array(z.string()).default([]).optional(),
});

export default function AnimalForm({ animal }: { animal?: GetAnimalDto }) {
  const corporation = useContext(CorporationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [deletelFiles, setDeletelFiles] = useState<string[]>([]);

  const form = useForm<z.infer<typeof AnimalSchema>>({
    resolver: zodResolver(AnimalSchema),
    defaultValues: {
      name: animal?.name ?? "",
      age: animal?.age.toString() ?? "0",
      gender: animal?.gender ?? GenderType?.MALE,
      animal_type: animal?.animal_type ?? AnimalType?.DOG,
      animal_size: animal?.animal_size ?? AnimalSize?.NORMAL,
      animal_age: animal?.animal_age ?? AnimalAge?.NORMAL,
      breed: animal?.breed ?? "",
      profile_images: animal?.profile_images
        ? sortUrlsByFilenameOrder(animal?.profile_images)
        : [],
      intakeDate: animal?.intakeDate ? new Date(animal?.intakeDate) : undefined,
      remarks: animal?.remarks ?? [],
    },
  });

  const deleteAnimal = async () => {
    setIsLoading(true);
    try {
      if (animal) {
        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/animal?id=${animal?.id}`,
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

  async function onSubmit(data: z.infer<typeof AnimalSchema>) {
    setIsLoading(true);

    const animal_age_enum =
      animal?.age && animal.age < 1 ? AnimalAge.YOUNG : AnimalAge.NORMAL;

    let animalId = animal?.id;
    let publicUrls: string[] = animal?.profile_images ?? [];

    try {
      if (!animal) {
        const responseAnimal = await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/animal`,
          {
            method: "POST",
            body: JSON.stringify({
              ...data,
              animal_age: animal_age_enum,
              age: parseFloat(data?.age),
              corporationId: corporation?.id,
            }),
          },
        );

        if (!responseAnimal.ok) {
          throw new Error(
            `Failed to fetch animal data. Status: ${responseAnimal.status}`,
          );
        }

        animalId = await responseAnimal.json();
      }

      await Promise.all(
        Array.from(additionalFiles).map(async (file, index) => {
          if (!file) {
            return;
          }

          let responsePublicUrl;
          const formData = new FormData();
          formData.append("file", file as Blob); // 추가 이미지 파일 추가
          formData.append("path", `animal/${animalId}`);

          if (index === 0 && animal) {
            const url =
              animal?.profile_images.find((url) =>
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

      if (animal) {
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
                path: `animal/${animalId}`,
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
        ...(animal
          ? {
              ...data,
              animal_age: animal_age_enum,
              id: animal?.id,
              age: parseFloat(data?.age),
            }
          : { id: animalId }),
        profile_images: publicUrls,
      };

      await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/animal`, {
        method: "PUT",
        body: JSON.stringify(requestData),
      });

      await MCAPageNavigate();
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to create Lecture";
      toast(errorMessage, {
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
          onKeyDown={enterKeyDown}
          className="flex flex-col gap-6"
        >
          <Link href={"/mypage/corporation/adoption"}>
            <Button variant={"link"} className="flex gap-1 p-0 text-sm">
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              분양동물 목록가기
            </Button>
          </Link>
          <span className="text-xl font-semibold">분양동물 등록</span>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <span className="text-lg font-semibold">이름</span>
                <FormControl>
                  <Input
                    placeholder="분양동물의 이름을 작성해주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="age"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <span className="font-semibold">나이</span>
                <FormControl>
                  <Input
                    placeholder="생후 6개월 -> 0.6  1년 3개월-> 1.3  2년 -> 2 단위로 분양동물의 나이를 적어주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <span className="font-semibold">성별</span>
                <FormControl>
                  <div className="flex h-10 rounded-xl border">
                    <div
                      onClick={() => {
                        field.onChange(GenderType.MALE);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-center rounded-l-xl ${field?.value === GenderType.MALE ? "bg-black font-semibold text-white hover:bg-black/80" : "hover:bg-slate-100"}`}
                    >
                      남자
                    </div>
                    <div className="flex h-full w-[1px] border" />
                    <div
                      onClick={() => {
                        field.onChange(GenderType.FEMALE);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-center rounded-r-xl ${field?.value === GenderType.FEMALE ? "bg-black font-semibold text-white hover:bg-black/80" : "hover:bg-slate-100"}`}
                    >
                      여자
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="animal_type"
            render={({ field }) => (
              <FormItem>
                <span className="font-semibold">종류</span>
                <FormControl>
                  <div className="flex h-10 rounded-xl border">
                    <div
                      onClick={() => {
                        field.onChange(AnimalType?.DOG);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-center rounded-l-xl ${field?.value === AnimalType?.DOG ? "bg-black font-semibold text-white hover:bg-black/80" : "hover:bg-slate-100"}`}
                    >
                      강아지
                    </div>
                    <div className="flex h-full w-[1px] border" />
                    <div
                      onClick={() => {
                        field.onChange(AnimalType?.CAT);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-center rounded-r-xl ${field?.value === AnimalType?.CAT ? "bg-black font-semibold text-white hover:bg-black/80" : "hover:bg-slate-100"}`}
                    >
                      고양이
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="animal_size"
            render={({ field }) => (
              <FormItem>
                <span className="font-semibold">크기</span>
                <FormControl>
                  <div className="flex h-10 rounded-xl border">
                    <div
                      onClick={() => {
                        field.onChange(AnimalSize?.SMALL);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-center rounded-l-xl ${field?.value === AnimalSize?.SMALL ? "bg-black font-semibold text-white hover:bg-black/80" : "hover:bg-slate-100"}`}
                    >
                      소형견
                    </div>
                    <div
                      onClick={() => {
                        field.onChange(AnimalSize?.NORMAL);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-center ${field?.value === AnimalSize?.NORMAL ? "bg-black font-semibold text-white hover:bg-black/80" : "hover:bg-slate-100"}`}
                    >
                      중형견
                    </div>
                    <div className="flex h-full w-[1px] border" />
                    <div
                      onClick={() => {
                        field.onChange(AnimalSize?.LARGE);
                      }}
                      className={`flex w-full cursor-pointer items-center justify-center rounded-r-xl ${field?.value === AnimalSize?.LARGE ? "bg-black font-semibold text-white hover:bg-black/80" : "hover:bg-slate-100"}`}
                    >
                      대형견
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="breed"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <span className="font-semibold">품종</span>
                <FormControl>
                  <Input
                    placeholder="분양동물의 품종을 작성해주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="intakeDate"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <span className="font-semibold">보호 시작일</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ko })
                        ) : (
                          <span className="text-sm">
                            분양동물 보호 시작일 선택해주세요.
                          </span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => {
              const handleAddRemark = () => {
                if (field.value) {
                  field.onChange([...field.value, currentInput]); // 새 값 추가
                  setCurrentInput(""); // 입력 필드 초기화
                }
              };

              const handleDeleteRemark = (indexToDelete: number) => {
                if (field.value) {
                  const updatedValue = field.value.filter(
                    (_, index) => index !== indexToDelete,
                  ); // 해당 인덱스를 제외
                  field.onChange(updatedValue); // 업데이트된 배열로 변경
                }
              };

              const [currentInput, setCurrentInput] = useState(""); // 입력 필드 상태

              return (
                <FormItem className="flex w-full flex-col">
                  <span className="font-semibold">기타사항</span>
                  <div className="flex w-full items-center gap-2">
                    <Input
                      placeholder="분양동물의 기타사항을 작성해주세요."
                      value={currentInput} // 입력 필드 값
                      onChange={(e) => setCurrentInput(e.target.value)} // 입력 값 변경 핸들러
                    />
                    <Button
                      type="button"
                      onClick={handleAddRemark}
                      variant={"destructive"}
                    >
                      추가
                    </Button>
                  </div>
                  {field?.value?.map((remark: string, index: number) => {
                    return (
                      <div
                        className="flex h-11 items-center justify-between rounded-lg border bg-slate-100 px-5 py-3"
                        key={index}
                      >
                        {remark}
                        <Plus
                          cursor="pointer"
                          className="h-4 w-4 rotate-45"
                          onClick={() => {
                            handleDeleteRemark(index);
                          }}
                        />
                      </div>
                    );
                  })}
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="profile_images"
            render={({ field }) => (
              <FormItem>
                <span className="font-semibold">프로필</span>
                <div className="flex items-center gap-2">
                  <Input
                    disabled
                    placeholder="분양동물의 프로필을 선택해주세요."
                    className="disabled:cursor-default"
                    value={field?.value[0] ?? ""}
                  />
                  <Button
                    type="button"
                    className="flex w-fit"
                    variant={"destructive"}
                  >
                    <label htmlFor="profile" className="cursor-pointer">
                      업로드
                    </label>
                    <input
                      type="file"
                      id="profile"
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
                  className={`max-h-[300px] w-1/2 ${!animal?.profile_images[0] && !field?.value[0] && "hidden"}`}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="profile_images"
            render={({ field }) => (
              <FormItem>
                <span className="flex items-center gap-1.5 font-semibold">
                  추가 이미지
                  <span className="text-xs font-normal text-red-500">
                    *최대 3개까지 업로드 가능합니다
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  <Input
                    disabled
                    placeholder="분양동물의 추가 이미지를 선택해주세요."
                    className="disabled:cursor-default"
                    value={field?.value.slice(1).pop() ?? ""}
                  />
                  <Button
                    type="button"
                    className="flex w-fit"
                    variant={"destructive"}
                  >
                    <label htmlFor="additionalImgs" className="cursor-pointer">
                      업로드
                    </label>
                    <input
                      type="file"
                      id="additionalImgs"
                      accept="image/*"
                      multiple
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
                {field?.value?.slice(1).map((image, deleteIndex) => {
                  return (
                    <div
                      key={deleteIndex}
                      className="flex items-center gap-2 rounded-lg border bg-slate-100 px-5 py-3"
                    >
                      <span className="flex-1">{image}</span>
                      <Plus
                        className="h-4 w-4 rotate-45 cursor-pointer"
                        onClick={() => {
                          const deleteImage = field?.value?.filter(
                            (v) => v !== image,
                          );

                          if (animal?.profile_images.includes(image)) {
                            setDeletelFiles((prevFiles) => {
                              return [
                                ...prevFiles,
                                animal?.profile_images[deleteIndex + 1],
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
                <div className="grid grid-cols-3 gap-2">
                  {field?.value.slice(1).map((image: string, index: number) => {
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
          <Button
            type="submit"
            variant={"destructive"}
            className="mt-12 w-24 self-end"
          >
            {isLoading ? <Loader2 /> : "작성 완료"}
          </Button>
        </form>
      </Form>
      <hr className={`my-10 w-full ${animal ? "flex" : "hidden"}`} />
      <div className={`w-full flex-col gap-3 ${animal ? "flex" : "hidden"}`}>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">분양동물 삭제</span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder={`'분양동물 삭제' 를 입력해주세요.`}
            className="border-2 border-red-500 disabled:cursor-default disabled:border-none"
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <Button
            onClick={() => {
              if (deleteInput === `분양동물 삭제`) {
                deleteAnimal();
              }
            }}
            type={"button"}
            variant={"delete"}
          >
            분양동물 삭제
          </Button>
        </div>
      </div>
    </>
  );
}
