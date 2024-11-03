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
import { useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ChevronLeft, Loader2, Plus } from "lucide-react";
import { Tutor, OccupationType } from "@prisma/client";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { CorporationContext } from "../corporation-provider";
import { occupationTypeSwap } from "@/constants/constants.all";

const TutorSchema = z.object({
  name: z.string().min(1, { message: "이름을 적어주세요." }),
  introduction: z.string().min(1, { message: "소개를 적어주세요." }),
  career: z.string().min(1, { message: "경력을 적어주세요." }),
  profile_img: z.string().min(1, { message: "프로필을 선택해주세요." }),
  occupation: z
    .enum(["TRAINER", "VETERINARIAN", "GROOMER", "PROFESSOR"])
    .default("TRAINER"),
});

export default function TutorForm({ tutor }: { tutor?: Tutor }) {
  const corporation = useContext(CorporationContext);

  const form = useForm<z.infer<typeof TutorSchema>>({
    resolver: zodResolver(TutorSchema),
    defaultValues: {
      name: tutor?.name ?? "",
      introduction: tutor?.introduction ?? "",
      career: tutor?.career ?? "",
      profile_img: tutor?.profile_img ?? "",
      occupation: tutor?.occupation ?? OccupationType.TRAINER,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof TutorSchema>) {
    setIsLoading(true);
    try {
      if (tutor) {
        await fetch(`/api/tutor`, {
          method: "PUT",
          body: JSON.stringify({
            id: tutor?.id,
            ...data,
          }),
        });
      } else {
        await fetch(`/api/tutor`, {
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
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <Link href={"/mypage/corporation/curriculum"}>
          <Button variant={"link"} className="flex gap-1 p-0 text-sm">
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            강사 목록가기
          </Button>
        </Link>
        <div className="flex flex-col gap-3">
          <span className="text-lg font-semibold">강사 이름</span>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="강사 이름을 정해주세요."
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
            control={form.control}
            name="introduction"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="강사를 소개를 해주세요."
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
            <span className="text-lg font-semibold">강사 경력</span>
            <FormField
              control={form.control}
              name="career"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="강사 경력을 소개해주세요."
                    className="disabled:cursor-default disabled:border-none"
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
              control={form.control}
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
                          return <SelectItem value={key}>{value}</SelectItem>;
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
            control={form.control}
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
        <Button
          type="submit"
          variant={"destructive"}
          className="mt-16 w-24 self-end"
        >
          {isLoading ? <Loader2 /> : "완료하기"}
        </Button>
      </form>
    </Form>
  );
}
