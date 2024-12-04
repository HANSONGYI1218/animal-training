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
import { ChevronLeft, Loader2, Plus } from "lucide-react";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { CorporationContext } from "../../../../../providers/corporation-provider";
import { TrainingCenterOnlyOneTutorDto } from "@/dtos/training.center.dto";
import { toast } from "sonner";

const TrainingCenterSchema = z.object({
  name: z.string().min(1, { message: "훈련소 명을 적어주세요." }),
  introduction: z.string().min(1, { message: "훈련소 소개를 적어주세요." }),
  profile: z.string().min(1, { message: "훈련소 프로필을 선택해주세요." }),
  additionalImgs: z
    .array(z.string())
    .min(1, { message: "훈련소 추가 사진을 선택해주세요." }),
  address: z.string().min(1, { message: "훈련소 주소를 적어주세요." }),
  refundPolicys: z
    .array(z.string())
    .min(1, { message: "환불정책을 적어주세요." }),
});

export default function TrainingCenterForm({
  trainingCenter,
}: {
  trainingCenter?: TrainingCenterOnlyOneTutorDto;
}) {
  const corporation = useContext(CorporationContext);

  const form = useForm<z.infer<typeof TrainingCenterSchema>>({
    resolver: zodResolver(TrainingCenterSchema),
    defaultValues: {
      name: trainingCenter?.name ?? "",
      introduction: trainingCenter?.introduction ?? "",
      profile: trainingCenter?.profile ?? "",
      additionalImgs: trainingCenter?.additionalImgs ?? [],
      address: trainingCenter?.address ?? "",
      refundPolicys: trainingCenter?.refundPolicys ?? [],
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [deleteInput, setDeleteInput] = useState("");

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
    try {
      if (trainingCenter) {
        await fetch(`/api/training-center`, {
          method: "PUT",
          body: JSON.stringify({
            id: trainingCenter?.id,
            ...data,
          }),
        });
      } else {
        await fetch(`/api/training-center`, {
          method: "POST",
          body: JSON.stringify({
            ...data,
            corporationId: corporation?.id,
          }),
        });
      }
      setIsLoading(false);
      window.location.href = "/mypage/corporation/curriculum";
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
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
            <span className="text-lg font-semibold">훈련소 명</span>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="훈련소 명을 적어주세요."
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
                      className="resize-none disabled:cursor-default disabled:border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">훈련소 주소</span>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="훈련소 주소를 적어주세요."
                      className="disabled:cursor-default disabled:border-none"
                      {...field}
                    />
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
                          placeholder="한불정책을 작성해주세요."
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
                      {field?.value.map((tag) => {
                        return (
                          <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-2">
                            <Plus
                              className="h-4 w-4 rotate-45 cursor-pointer"
                              onClick={() => {
                                const deleteTag = field?.value.filter(
                                  (v) => v !== tag,
                                );
                                field?.onChange(deleteTag);
                              }}
                            />
                            {tag}
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
              name="profile"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Input
                      disabled
                      placeholder="훈련소 썸네일을 선택해주세요."
                      className="disabled:cursor-default"
                      value={field?.value ?? ""}
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
                            const videoPath = URL.createObjectURL(file);
                            field.onChange(videoPath); // Set the video path to field.value
                          }
                        }}
                        className="hidden"
                      />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <span className="text-lg font-semibold">훈련소 추가 사진</span>
            <FormField
              control={form.control}
              name="additionalImgs"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Input
                      disabled
                      placeholder="훈련소 영상을 선택해주세요."
                      className="disabled:cursor-default"
                      value={field?.value ?? ""}
                    />
                    <Button
                      type="button"
                      className="flex w-fit"
                      variant={"destructive"}
                    >
                      <label htmlFor="video" className="cursor-pointer">
                        업로드
                      </label>
                      <input
                        type="file"
                        id="video"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const videoPath = URL.createObjectURL(file);
                            field.onChange([
                              ...(field?.value ?? []),
                              videoPath,
                            ]);
                          }
                        }}
                        className="hidden"
                      />
                    </Button>
                  </div>
                  <div className="flex flex-col gap-2">
                    {field?.value.map((image) => {
                      return (
                        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-2">
                          <Plus
                            className="h-4 w-4 rotate-45 cursor-pointer"
                            onClick={() => {
                              const deleteImage = field?.value?.filter(
                                (v) => v !== image,
                              );
                              field?.onChange(deleteImage);
                            }}
                          />
                          {image}
                        </div>
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
      </Form>{" "}
      <hr className="my-10 w-full" />
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
