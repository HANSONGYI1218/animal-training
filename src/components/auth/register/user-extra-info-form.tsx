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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { GenderType } from "@prisma/client";
import { cn } from "@/utils/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const UserExtraInfSchema = z.object({
  name: z.string().min(1, { message: "이름을 적어주세요." }),
  phoneNumber: z.string().min(1, { message: "전화번호를 적어주세요." }),
  birthday: z.date().default(new Date()),
  gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
});

export default function UserExtraInfForm() {
  const form = useForm<z.infer<typeof UserExtraInfSchema>>({
    resolver: zodResolver(UserExtraInfSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      birthday: undefined,
      gender: GenderType.MALE,
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof UserExtraInfSchema>) {
    try {
      setIsLoading(true);

      await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/user`, {
        method: "PUT",
        body: JSON.stringify({
          data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
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
        className="flex w-full flex-col gap-6 rounded-xl border p-6"
      >
        <span className="mb-6 text-xl font-semibold">추가 정보</span>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">이름</span>
              <FormControl>
                <Input
                  placeholder="이름을 다시 한 번 작성해주세요."
                  className="disabled:cursor-default disabled:border-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <span className="font-semibold">생년월일</span>
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
                          생년월일을 선택해주세요.
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
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
                    className={`flex w-full cursor-pointer items-center justify-center rounded-l-xl ${field?.value === GenderType.MALE ? "bg-black font-semibold text-white hover:bg-black" : "hover:bg-slate-100"}`}
                  >
                    남자
                  </div>
                  <div className="flex h-full w-[1px] border" />
                  <div
                    onClick={() => {
                      field.onChange(GenderType.FEMALE);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-center rounded-r-xl ${field?.value === GenderType.FEMALE ? "bg-black font-semibold text-white hover:bg-black" : "hover:bg-slate-100"}`}
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">전화번호 인증</span>
              <FormControl>
                <div className="flex gap-3">
                  <Input
                    placeholder="전화번호를 다시 한 번 작성해주세요."
                    className="disabled:cursor-default disabled:border-none"
                    {...field}
                  />
                  <Button type="button" variant={"destructive"}>
                    인증하기
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"destructive"}
          className="mt-16 w-24 self-end"
        >
          {isLoading ? <Loader2 /> : "회원가입"}
        </Button>
      </form>
    </Form>
  );
}
