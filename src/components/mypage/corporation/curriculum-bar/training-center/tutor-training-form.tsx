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
import { Loader2, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GetTutorWithLecture } from "@/dtos/tutor.dto";
import { toast } from "sonner";
import { useState } from "react";

const TutorTrainingCenterSchema = z.object({
  tutorId: z.string().min(1, { message: "훈련사를 선택해주세요." }),
  price: z
    .string()
    .min(1, { message: "회당 강사 훈련비를 적어주세요." })
    .regex(/^\d+$/, { message: "가격은 숫자만 입력할 수 있습니다." }),
  holidays: z.array(z.string()).default([]),
});

export default function TutorTrainingForm({
  trainingCenterId,
  tutors,
}: {
  trainingCenterId: string;
  tutors: GetTutorWithLecture[] | undefined;
}) {
  const form = useForm<z.infer<typeof TutorTrainingCenterSchema>>({
    resolver: zodResolver(TutorTrainingCenterSchema),
    defaultValues: {
      tutorId: "",
      price: "",
      holidays: [],
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof TutorTrainingCenterSchema>) {
    setIsLoading(true);
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor-trainingCenter`,
        {
          method: "POST",
          body: JSON.stringify({
            ...data,
            trainingCenterId: trainingCenterId,
          }),
        },
      );

      setIsLoading(false);
      window.location.href = "/mypage/corporation/curriculum";
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <div className="flex w-full flex-col gap-2">
          <span className="font-semibold">강사 선택</span>
          <FormField
            control={form.control}
            name="tutorId"
            render={({ field }) => (
              <FormItem>
                <Select onValueChange={field.onChange} defaultValue={""}>
                  <SelectTrigger>
                    <SelectValue placeholder="추가할 강사를 선택하세요." />
                  </SelectTrigger>
                  <SelectContent>
                    {tutors &&
                      tutors?.map((tutor) => {
                        return (
                          <SelectItem value={tutor?.id} key={tutor?.id}>
                            {tutor?.name}
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
        <div className="flex w-full flex-col gap-2">
          <span className="font-semibold">강사 훈련 비용</span>
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3 rounded-lg border px-3">
                  <Input
                    placeholder="회당 강사 훈련 비을 작성해주세요.(ex 50000)"
                    className="border-none p-0 disabled:cursor-default"
                    {...field}
                  />
                  <span className="font-semibold">원</span>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="font-semibold">훈련사 휴일</span>
          <FormField
            control={form.control}
            name="holidays"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col space-y-3">
                  <div className="flex gap-2">
                    {field?.value.map((tag: string, index: number) => {
                      return (
                        <Badge
                          key={index}
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
                  <Select
                    onValueChange={(v) => {
                      if (!field.value.includes(v)) {
                        field.onChange([...field.value, v]);
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
                      {["월", "화", "수", "목", "금", "토", "일"].map((day) => {
                        return (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>
        <Button
          type="submit"
          variant={"destructive"}
          className="mt-8 w-24 self-end"
        >
          {isLoading ? <Loader2 /> : "완료하기"}
        </Button>
      </form>
    </Form>
  );
}
