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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState, useContext } from "react";
import Image from "next/image";
import { ChevronLeft, Loader2, Plus } from "lucide-react";
import { AnimalType, PriceType, Category, Lecture } from "@prisma/client";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { CorporationContext } from "../../../../../providers/corporation-provider";
import { toast } from "sonner";

const LectureSchema = z.object({
  title: z.string().min(1, { message: "제목을 적어주세요." }),
  content: z.string().min(1, { message: "내용를 적어주세요." }),
  animal_type: z.enum(["DOG", "CAT"]).default("DOG"),
  price_type: z.enum(["FREE", "PAID"]).default("FREE"),
  category: z
    .enum([
      "FOOD",
      "BEAUTY",
      "HEALTH",
      "WALK",
      "TRAINING",
      "ADOPT",
      "PLAY",
      "COMMUNICATION",
    ])
    .default("TRAINING"),
  thumbnailPath: z.string().min(1, { message: "썸네일을 적어주세요." }),
  videoUrl: z.string().min(1, { message: "영상을 적어주세요." }),
  tags: z.array(z.string()).min(1, { message: "내용를 적어주세요." }),
  tutorId: z.string().min(1, { message: "강사를 적어주세요." }),
});

export default function LectureForm({ lecture }: { lecture?: Lecture }) {
  const corporation = useContext(CorporationContext);
  const tutors = corporation?.tutors;

  const form = useForm<z.infer<typeof LectureSchema>>({
    resolver: zodResolver(LectureSchema),
    defaultValues: {
      title: lecture?.title ?? "",
      content: lecture?.content ?? "",
      animal_type: lecture?.animal_type ?? AnimalType.DOG,
      price_type: lecture?.price_type ?? PriceType.FREE,
      category: lecture?.category ?? Category.TRAINING,
      thumbnailPath: lecture?.thumbnailPath ?? "",
      videoUrl: lecture?.videoUrl ?? "",
      tags: lecture?.tags ?? [],
      tutorId: lecture?.tutorId ?? "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [deleteInput, setDeleteInput] = useState("");

  const deleteLecture = async () => {
    setIsLoading(true);
    try {
      if (lecture) {
        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture?id=${lecture?.id}`,
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

  async function onSubmit(data: z.infer<typeof LectureSchema>) {
    setIsLoading(true);
    try {
      if (lecture) {
        await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture`, {
          method: "PUT",
          body: JSON.stringify({
            id: lecture?.id,
            ...data,
          }),
        });
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture`, {
          method: "POST",
          body: JSON.stringify({
            ...data,
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
              강의 목록가기
            </Button>
          </Link>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">강의 제목</span>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="강의 제목을 작성해주세요."
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
            <span className="text-lg font-semibold">강의 설명</span>
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="강의를 설명을 작성해주세요."
                      className="resize-none disabled:cursor-default disabled:border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3">
            <div className="flex w-full flex-col gap-3">
              <span className="text-lg font-semibold">동물 종</span>
              <FormField
                control={form.control}
                name="animal_type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? AnimalType.DOG}
                    >
                      <FormControl>
                        <SelectTrigger className="disabled:cursor-default disabled:border-none">
                          <SelectValue placeholder="동몰종을 선택해주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(AnimalType).map(([key, value]) => {
                          return (
                            <SelectItem key={value} value={key}>
                              {value}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-3">
              <span className="text-lg font-semibold">가격</span>
              <FormField
                control={form.control}
                name="price_type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? PriceType.FREE}
                    >
                      <FormControl>
                        <SelectTrigger className="disabled:cursor-default disabled:border-none">
                          <SelectValue placeholder="가격을 선택해주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(PriceType).map(([key, value]) => {
                          return (
                            <SelectItem key={value} value={key}>
                              {value}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex w-full flex-col gap-3">
              <span className="text-lg font-semibold">카테고리</span>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? Category.TRAINING}
                    >
                      <FormControl>
                        <SelectTrigger className="disabled:cursor-default disabled:border-none">
                          <SelectValue placeholder="카테고리를 선택해주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(Category).map(([key, value]) => {
                          return (
                            <SelectItem key={value} value={key}>
                              {value}
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-3">
              <span className="text-lg font-semibold">강사</span>
              <FormField
                control={form.control}
                name="tutorId"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? Category.TRAINING}
                    >
                      <FormControl>
                        <SelectTrigger className="disabled:cursor-default disabled:border-none">
                          <SelectValue placeholder="강사를 선택해주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {tutors &&
                          tutors.map((tutor) => {
                            return (
                              <SelectItem key={tutor?.id} value={tutor?.id}>
                                <div className="flex items-center gap-5">
                                  <Image
                                    src={tutor?.profile_img}
                                    width={32}
                                    height={32}
                                    alt="profile"
                                    className="rounded-full"
                                  />
                                  <span className="text-base">
                                    {tutor?.name}
                                  </span>
                                </div>
                              </SelectItem>
                            );
                          })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3">
            <span className="text-lg font-semibold">태그</span>
            <FormField
              control={form.control}
              name="tags"
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
                    <div className="flex gap-2">
                      {field?.value.map((tag) => {
                        return (
                          <Badge
                            key={tag}
                            variant={"tag"}
                            className="flex justify-between gap-1 px-3 hover:scale-100"
                          >
                            <Plus
                              onClick={() => {
                                const deleteTag = field?.value.filter(
                                  (v) => v !== tag,
                                );
                                field?.onChange(deleteTag);
                              }}
                              className="h-4 w-4 rotate-45 cursor-pointer"
                            />
                            {tag}
                          </Badge>
                        );
                      })}
                    </div>
                    <div className="flex gap-3">
                      <FormControl>
                        <Input
                          placeholder="태그를 작성해주세요.(최대 5개 / 중복 불가)"
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <div className="flex w-full flex-col gap-3">
            <span className="text-lg font-semibold">강의 썸네일</span>
            <FormField
              control={form.control}
              name="thumbnailPath"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Input
                      disabled
                      placeholder="강의 썸네일을 선택해주세요."
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
            <span className="text-lg font-semibold">강의 영상</span>
            <FormField
              control={form.control}
              name="videoUrl"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Input
                      disabled
                      placeholder="강의 영상을 선택해주세요."
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
          <Button
            type="submit"
            variant={"destructive"}
            className="mt-16 w-24 self-end"
          >
            {isLoading ? <Loader2 /> : "완료하기"}
          </Button>
        </form>
      </Form>
      <hr className="my-10 w-full" />
      <div className={`w-full flex-col gap-3 ${lecture ? "flex" : "hidden"}`}>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">강의 삭제</span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder={`'강의 삭제' 를 입력해주세요.`}
            className="border-2 border-red-500 disabled:cursor-default disabled:border-none"
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <Button
            onClick={() => {
              if (deleteInput === `강의 삭제`) {
                deleteLecture();
              }
            }}
            type={"button"}
            variant={"delete"}
          >
            강의 삭제
          </Button>
        </div>
      </div>
    </>
  );
}
