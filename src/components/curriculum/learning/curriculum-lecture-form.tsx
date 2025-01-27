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
import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, Loader2 } from "lucide-react";
import {
  AnimalType,
  Category,
  Tutor,
  CurriculumLecture,
  AnimalSize,
  AnimalAge,
  CurriculumCategory,
} from "@prisma/client";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getVideoDuration } from "@/utils/utils";
import { curriculumPageNavigate } from "@/action/navigate";

const CurriculumLectureSchema = z.object({
  index: z
    .string()
    .regex(/^0$|^[1-9]\d*$/)
    .default("0"),
  title: z.string().min(1, { message: "제목을 적어주세요." }),
  content: z.string().min(1, { message: "내용를 적어주세요." }),
  animal_type: z.enum(["DOG", "CAT"]).default("DOG"),
  category: z.enum(["BEAUTY", "TRAINING", "COMMUNICATION"]).default("TRAINING"),
  videoUrl: z.string().min(1, { message: "영상을 적어주세요." }),
  tutorId: z.string().min(1, { message: "강사를 적어주세요." }),
});

export default function CurriculumLectureForm({
  curriculumLecture,
  tutors,
}: {
  curriculumLecture?: CurriculumLecture;
  tutors?: Tutor[];
}) {
  const form = useForm<z.infer<typeof CurriculumLectureSchema>>({
    resolver: zodResolver(CurriculumLectureSchema),
    defaultValues: {
      index: curriculumLecture?.index?.toString() ?? "0",
      title: curriculumLecture?.title ?? "",
      content: curriculumLecture?.content ?? "",
      animal_type: curriculumLecture?.animal_type ?? AnimalType.DOG,
      category: curriculumLecture?.category ?? CurriculumCategory.TRAINING,
      videoUrl: curriculumLecture?.videoUrl ?? "",
      tutorId: curriculumLecture?.tutorId ?? "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [deleteInput, setDeleteInput] = useState("");
  const inputFileRef = useRef<HTMLInputElement>(null);

  const deleteLecture = async () => {
    setIsLoading(true);
    try {
      if (curriculumLecture) {
        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture?id=${curriculumLecture?.id}`,
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

  async function onSubmit(data: z.infer<typeof CurriculumLectureSchema>) {
    setIsLoading(true);

    try {
      if (!inputFileRef.current?.files) {
        throw new Error("No file selected");
      }

      const file = inputFileRef?.current?.files[0];
      const formData = new FormData();
      formData.append("file", file as Blob);
      formData.append("path", `curriculum/${data?.animal_type.toLowerCase()}`);

      if (curriculumLecture) {
        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture`,
          {
            method: "PUT",
            body: JSON.stringify({
              ...data,
              index: parseInt(data?.index),
              thumbnailPath: "dgdg",
              animal_sizes: [AnimalSize?.NORMAL],
              animal_ages: [AnimalAge?.NORMAL],
              videoTime: await getVideoDuration(file),
              id: curriculumLecture?.id,
            }),
          },
        );

        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/blob?filename=${file.name}`,
          {
            method: "PUT",
            body: formData,
          },
        );
      } else {
        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture`,
          {
            method: "POST",
            body: JSON.stringify({
              ...data,
              index: parseInt(data?.index),
              thumbnailPath: "dgdg",
              animal_sizes: [AnimalSize?.NORMAL],
              animal_ages: [AnimalAge?.NORMAL],
              videoTime: await getVideoDuration(file),
            }),
          },
        );

        await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/blob`, {
          method: "POST",
          body: formData,
        });
      }

      setIsLoading(false);
      await curriculumPageNavigate();
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
          <Link href={"/curriculum"}>
            <Button variant={"link"} className="flex gap-1 p-0 text-sm">
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              커리큘럼 이동
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
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">강의 순번</span>
            <FormField
              control={form.control}
              name="index"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="강의 순번을 작성해주세요."
                      className="disabled:cursor-default disabled:border-none"
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
                        {Object.entries(CurriculumCategory).map(
                          ([key, value]) => {
                            return (
                              <SelectItem key={value} value={key}>
                                {value}
                              </SelectItem>
                            );
                          },
                        )}
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
                        ref={inputFileRef}
                        id="video"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            field.onChange(file.name);
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
      <hr className={`my-10 w-full ${curriculumLecture ? "flex" : "hidden"}`} />
      <div
        className={`w-full flex-col gap-3 ${curriculumLecture ? "flex" : "hidden"}`}
      >
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
