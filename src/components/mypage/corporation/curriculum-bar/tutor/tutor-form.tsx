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
import { useState } from "react";
import { ChevronLeft, Loader2, Plus } from "lucide-react";
import { OccupationType } from "@prisma/client";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { occupationTypeSwap } from "@/constants/constants.all";
import { GetTutorDto } from "@/dtos/tutor.dto";
import { TutorTrainingCenterDto } from "@/dtos/tutor.trainingCenter.dto";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const TutorSchema = z.object({
  name: z.string().min(1, { message: "이름을 적어주세요." }),
  introduction: z.string().min(1, { message: "소개를 적어주세요." }),
  career: z.string().min(1, { message: "경력을 적어주세요." }),
  profile_img: z.string().min(1, { message: "프로필을 선택해주세요." }),
  occupation: z
    .enum(["TRAINER", "VETERINARIAN", "GROOMER", "PROFESSOR"])
    .default("TRAINER"),
});

const TutorTrainingCenterSchema = z.object({
  price: z
    .string()
    .regex(/^\d+$/, { message: "가격은 숫자만 입력할 수 있습니다." }),
  holidays: z.array(z.string()),
});

export default function TutorForm({
  tutor,
  tutorTrainingCenter,
}: {
  tutor?: GetTutorDto;
  tutorTrainingCenter?: TutorTrainingCenterDto | null;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const formTutor = useForm<z.infer<typeof TutorSchema>>({
    resolver: zodResolver(TutorSchema),
    defaultValues: {
      name: tutor?.name ?? "",
      introduction: tutor?.introduction ?? "",
      career: tutor?.career ?? "",
      profile_img: tutor?.profile_img ?? "",
      occupation: tutor?.occupation ?? "TRAINER",
    },
  });

  const formTutorTrainingCenter = useForm<
    z.infer<typeof TutorTrainingCenterSchema>
  >({
    resolver: zodResolver(TutorTrainingCenterSchema),
    defaultValues: {
      price: tutorTrainingCenter?.price ?? "",
      holidays: tutorTrainingCenter?.holidays ?? [],
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");

  const deleteTutor = async () => {
    setIsLoading(true);
    try {
      if (tutor) {
        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor?id=${tutor?.id}`,
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

  async function handleSubmitAllForms() {
    setIsLoading(true);

    const tutorData = {
      name: formTutor.watch("name"),
      introduction: formTutor.watch("introduction"),
      career: formTutor.watch("career"),
      profile_img: formTutor.watch("profile_img"),
      occupation: formTutor.watch("occupation"),
      ...(tutor ? { id: tutor?.id } : { corporationId: session?.user?.id }),
    };

    const tutorTrainingCenterData = tutorTrainingCenter
      ? {
          price: formTutorTrainingCenter.watch("price"),
          holidays: formTutorTrainingCenter.watch("holidays"),
          id: tutorTrainingCenter?.id ?? "",
        }
      : null;

    try {
      const tutorUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor`;
      await fetch(tutorUrl, {
        method: tutor ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tutorData),
      });

      if (tutorTrainingCenterData) {
        const tutorTrainingCenterUrl = `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor-trainingCenter`;
        await fetch(tutorTrainingCenterUrl, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(tutorTrainingCenterData),
        });
      }

      setIsLoading(false);
      router.push("/mypage/corporation/curriculum");
    } catch (error) {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  }
  return (
    <div className="flex flex-col gap-6">
      <Form {...formTutor}>
        <form className="flex flex-col gap-6">
          <Link href={"/mypage/corporation/curriculum"}>
            <Button variant={"link"} className="flex gap-1 p-0 text-sm">
              <ChevronLeft className="h-4 w-4" strokeWidth={2} />
              강사 목록가기
            </Button>
          </Link>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">강사 이름</span>
            <FormField
              control={formTutor.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="강사 이름을 작성해주세요."
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
            <span className="text-lg font-semibold">강사 소개</span>
            <FormField
              control={formTutor.control}
              name="introduction"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="강사를 소개를 작성해주세요."
                      className="min-h-32 resize-none whitespace-pre-line disabled:cursor-default disabled:border-none"
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
              <span className="text-lg font-semibold">강사 경력</span>
              <FormField
                control={formTutor.control}
                name="career"
                render={({ field }) => (
                  <FormItem>
                    <Input
                      placeholder="강사 경력을 작성해주세요.(20자 이내)"
                      className="disabled:cursor-default disabled:border-none"
                      maxLength={20}
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-3">
              <span className="text-lg font-semibold">강사 직종</span>
              <FormField
                control={formTutor.control}
                name="occupation"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ?? OccupationType.TRAINER}
                    >
                      <FormControl>
                        <SelectTrigger className="disabled:cursor-default disabled:border-none">
                          <SelectValue placeholder="강사 직종을 선택해주세요." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.entries(occupationTypeSwap).map(
                          ([key, value]) => {
                            return (
                              <SelectItem key={key} value={key}>
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
          </div>
          <div className="flex w-full flex-col gap-3">
            <span className="text-lg font-semibold">강사 프로필</span>
            <FormField
              control={formTutor.control}
              name="profile_img"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <Input
                      disabled
                      placeholder="강사 프로필을 선택해주세요."
                      className="disabled:cursor-default"
                      value={field?.value ?? ""}
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
        </form>
      </Form>
      <Form {...formTutorTrainingCenter}>
        <form className="flex flex-col gap-6">
          {tutorTrainingCenter && (
            <>
              <div className="flex w-full flex-col gap-2">
                <span className="text-lg font-semibold">강사 훈련 비용</span>
                <FormField
                  control={formTutorTrainingCenter.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-3 rounded-lg border px-3">
                        <Input
                          placeholder="회당 강사 훈련 비을 작성해주세요.(ex 50000)"
                          className="border-none p-0 disabled:cursor-default"
                          onChange={field.onChange}
                          defaultValue={field.value ?? ""}
                        />
                        <span className="font-semibold">원</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-lg font-semibold">훈련사 휴일</span>
                <FormField
                  control={formTutorTrainingCenter.control}
                  name="holidays"
                  render={({ field }) => {
                    return (
                      <FormItem className="flex flex-col space-y-3">
                        <div className="flex gap-2">
                          {field?.value &&
                            field?.value?.map((tag) => {
                              return (
                                <Badge
                                  key={tag}
                                  variant={"tag"}
                                  className="flex justify-between gap-1 px-3 hover:scale-100"
                                >
                                  <Plus
                                    onClick={() => {
                                      const deleteTag = field?.value?.filter(
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
                        <Select
                          onValueChange={(v) => {
                            if (!field?.value?.includes(v)) {
                              field.onChange([...(field?.value ?? []), v]);
                            }
                          }}
                          defaultValue={""}
                        >
                          <FormControl>
                            <SelectTrigger className="disabled:cursor-default disabled:border-none">
                              <SelectValue placeholder="강사를 선택해주세요." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {["월", "화", "수", "목", "금", "토", "일"].map(
                              (day) => {
                                return (
                                  <SelectItem key={day} value={day}>
                                    {day}
                                  </SelectItem>
                                );
                              },
                            )}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </>
          )}

          <Button
            type="submit"
            variant={"destructive"}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              handleSubmitAllForms();
              e.preventDefault();
            }}
            className="mt-16 w-24 self-end"
          >
            {isLoading ? <Loader2 /> : "완료하기"}
          </Button>
        </form>
      </Form>
      <hr className={`my-10 w-full ${tutor ? "flex" : "hidden"}`} />
      <div className={`w-full flex-col gap-3 ${tutor ? "flex" : "hidden"}`}>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">강사 제외</span>
          <span className="text-sm text-neutral-600">
            * 강사를 훈련소에서 제외하면 해당 강사와 관련된 훈련소 정보가
            사라집니다.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder={`'${tutor?.name} 강사 제외' 를 입력해주세요.`}
            className="border-2 border-red-500 disabled:cursor-default disabled:border-none"
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <Button
            onClick={() => {
              if (deleteInput === `${tutor?.name} 강사 제외`) {
                deleteTutor();
              }
            }}
            type={"button"}
            variant={"delete"}
          >
            강사 제외
          </Button>
        </div>
      </div>
      <div className={`w-full flex-col gap-3 ${tutor ? "flex" : "hidden"}`}>
        <div className="flex flex-col">
          <span className="text-lg font-semibold">강사 삭제</span>
          <span className="text-sm text-neutral-600">
            * 강사를 삭제하면 해당 강사와 관련된 강의, 훈련소 정보가 사라집니다.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Input
            placeholder={`'${tutor?.name} 강사 삭제' 를 입력해주세요.`}
            className="border-2 border-red-500 disabled:cursor-default disabled:border-none"
            onChange={(e) => setDeleteInput(e.target.value)}
          />
          <Button
            onClick={() => {
              if (deleteInput === `${tutor?.name} 강사 삭제`) {
                deleteTutor();
              }
            }}
            type={"button"}
            variant={"delete"}
          >
            강사 삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
