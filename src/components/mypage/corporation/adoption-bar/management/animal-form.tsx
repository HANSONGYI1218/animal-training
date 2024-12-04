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
import { ChevronLeft, Loader2, Plus, CalendarIcon } from "lucide-react";
import { GenderType } from "@prisma/client";
import Link from "next/link";
import { CorporationContext } from "@/providers/corporation-provider";
import { toast } from "sonner";
import { GetAnimalDto } from "@/dtos/animal.dto";
import { cn } from "@/utils/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

const AnimalSchema = z.object({
  name: z.string().min(1, { message: "분양동물의 이름을 적어주세요." }),
  age: z
    .string()
    .regex(/^\d+$/, { message: "숫자만 입력할 수 있습니다." })
    .min(0, { message: "분양동물의 나이를 적어주세요." }),
  gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
  breed: z.string().min(1, { message: "분양동물의 품좀을 적어주세요." }),
  profile: z.string().min(1, { message: "분양동물의 사진을 선택해주세요." }),
  additionalImgs: z.array(z.string()).default([]).optional(),
  intakeDate: z.date({ required_error: "분양동물의 나이를 적어주세요." }),
  remarks: z.array(z.string()).default([]).optional(),
});

export default function AnimalForm({ animal }: { animal?: GetAnimalDto }) {
  const corporation = useContext(CorporationContext);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof AnimalSchema>>({
    resolver: zodResolver(AnimalSchema),
    defaultValues: {
      name: animal?.name ?? "",
      age: animal?.age.toString() ?? "0",
      gender: animal?.gender ?? GenderType?.MALE,
      breed: animal?.breed ?? "",
      profile: animal?.profile ?? "",
      additionalImgs: animal?.additionalImgs ?? [],
      intakeDate: animal?.intakeDate ?? undefined,
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
    try {
      if (animal) {
        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/animal?id=${animal?.id}`,
          {
            method: "PUT",
            body: JSON.stringify({
              ...data,
              age: parseInt(data?.age),
            }),
          },
        );
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/animal`, {
          method: "POST",
          body: JSON.stringify({
            ...data,
            age: parseInt(data?.age),
            corporationId: corporation?.id,
          }),
        });
      }
      setIsLoading(false);
      // window.location.href = "/mypage/corporation/adoption/registration";
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to create Lecture";
      toast(errorMessage, {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-12"
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
                  placeholder="분양동물의 나이를 작성해주세요."
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
                  <Button onClick={handleAddRemark} variant={"destructive"}>
                    추가
                  </Button>
                </div>
                {field?.value?.map((remark: string, index: number) => {
                  return (
                    <div
                      className="flex h-11 items-center rounded-xl border px-3"
                      key={index}
                    >
                      {remark}
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
          name="profile"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">프로필</span>
              <div className="flex items-center gap-2">
                <Input
                  disabled
                  placeholder="분양동물의 프로필을 선택해주세요."
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
        <FormField
          control={form.control}
          name="additionalImgs"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">추가 이미지</span>
              <div className="flex items-center gap-2">
                <Input
                  disabled
                  placeholder="분양동물의 추가 이미지를 선택해주세요."
                  className="disabled:cursor-default"
                  value={field?.value ?? ""}
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
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const videoPath = URL.createObjectURL(file);
                        const updatedValue = Array.isArray(field.value)
                          ? [...field.value, videoPath]
                          : [videoPath];

                        field.onChange(updatedValue);
                      }
                    }}
                    className="hidden"
                  />
                </Button>
              </div>
              {field?.value?.map((v, index) => {
                return (
                  <div
                    key={index}
                    className="flex h-10 items-center gap-2 rounded-lg border px-3"
                  >
                    <Plus
                      className="h-4 w-4 rotate-45 cursor-pointer"
                      onClick={() => {
                        const updatedValue = field?.value?.filter(
                          (item) => item !== v,
                        );
                        field.onChange(updatedValue);
                      }}
                    />
                    {v}
                  </div>
                );
              })}
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
  );
}
