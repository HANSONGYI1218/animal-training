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

import { Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { generateSixDigitCode } from "@/utils/utils";
import { toast } from "sonner";

const LoginInfoSchema = z
  .object({
    userType: z.enum(["USER", "CORPORATION"]).default("USER"),
    email: z.string().min(1, { message: "이메일을 적어주세요." }),
    email_check: z.string().min(1, { message: "이메일 코드를 적어주세요." }),
    password: z.string().min(1, { message: "비밀번호를 적어주세요." }),
    password_check: z.string().min(1, { message: "비밀번호를 적어주세요." }),
  })
  .refine((data) => data.password === data.password_check, {
    path: ["password_check"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export default function LoginInfoForm({
  setCurrentIndex,
  setUser,
}: {
  setCurrentIndex: (v: number) => void;
  setUser: (v: any) => void;
}) {
  const form = useForm<z.infer<typeof LoginInfoSchema>>({
    resolver: zodResolver(LoginInfoSchema),
    defaultValues: {
      userType: "USER",
      email: "",
      email_check: "",
      password: "",
      password_check: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [randomMailNumber, setRandomMailNumber] = useState<number | null>(null);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isPasswordCheckShow, setIsPasswordCheckShow] = useState(false);

  const fetchData = async (endpoint: string, query: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/${endpoint}?email=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response.json();
  };

  const emailSend = async (v: string) => {
    try {
      setIsSending(true);

      const [isUser, isCorporation] = await Promise.all([
        fetchData("user", v),
        fetchData("corporation", v),
      ]);

      if (isUser || isCorporation) {
        toast("이미 존재하는 회원 이메일입니다.", {
          description: "다른 이메일을 사용해주세요.",
        });
      } else {
        const randomCode = generateSixDigitCode();

        await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/contact`, {
          method: "POST",
          body: JSON.stringify({
            randomMailNumber: randomCode,
            to: v,
            subject: "이메일 도착",
            message: "이메일 도착",
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        setRandomMailNumber(randomCode);
      }
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setIsSending(false);
    }
  };

  async function onSubmit(data: z.infer<typeof LoginInfoSchema>) {
    try {
      setIsLoading(true);
      const responseUser = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/${data.userType.toLowerCase()}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const user = await responseUser.json();

      setIsLoading(false);
      setUser(user);
      setCurrentIndex(1);
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
        className="flex w-full flex-col gap-6 rounded-xl border p-6"
      >
        <span className="mb-6 text-xl font-semibold">회원가입</span>
        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">구분</span>
              <FormControl>
                <div className="flex h-10 rounded-xl border">
                  <div
                    onClick={() => {
                      field.onChange("USER");
                    }}
                    className={`flex w-full cursor-pointer items-center justify-center rounded-l-xl ${field?.value === "USER" ? "bg-black font-semibold text-white hover:bg-black" : "hover:bg-slate-100"}`}
                  >
                    개인
                  </div>
                  <div className="flex h-full w-[1px] border" />
                  <div
                    onClick={() => {
                      field.onChange("CORPORATION");
                    }}
                    className={`flex w-full cursor-pointer items-center justify-center rounded-r-xl ${field?.value === "CORPORATION" ? "bg-black font-semibold text-white hover:bg-black" : "hover:bg-slate-100"}`}
                  >
                    기업
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">이메일</span>
              <div className="flex gap-3">
                <FormControl>
                  <Input
                    placeholder="이메일을 작성해주세요."
                    className="disabled:cursor-default"
                    value={field.value ?? ""}
                    disabled={
                      randomMailNumber?.toString() === form.watch("email_check")
                    }
                    onChange={(e) => {
                      if (isSending) {
                        setIsSending(false);
                      }
                      field.onChange(e.target.value);
                    }}
                  />
                </FormControl>
                <Button
                  type="button"
                  disabled={
                    randomMailNumber?.toString() === form.watch("email_check")
                  }
                  className={`${
                    randomMailNumber?.toString() ===
                      form.watch("email_check") &&
                    "rounded-full bg-green-100 p-3 disabled:opacity-100"
                  }`}
                  variant={"destructive"}
                  onClick={() => {
                    if (field.value.length > 0) {
                      emailSend(field.value);
                    }
                  }}
                >
                  {isSending ? (
                    <Loader2 className="w-[55px] animate-spin" />
                  ) : randomMailNumber?.toString() ===
                    form.watch("email_check") ? (
                    <Check
                      className="h-4 w-4"
                      stroke="#ffffff"
                      strokeWidth={2.8}
                    />
                  ) : (
                    "인증하기"
                  )}
                </Button>
              </div>
              {randomMailNumber &&
                randomMailNumber?.toString() !== form.watch("email_check") && (
                  <span className="text-sm text-green-100">
                    이메일을 전송했습니다.
                  </span>
                )}
            </FormItem>
          )}
        />
        {randomMailNumber &&
          randomMailNumber?.toString() !== form.watch("email_check") && (
            <FormField
              control={form.control}
              name="email_check"
              render={({ field }) => (
                <FormItem>
                  <span className="font-semibold">이메일 확인</span>

                  <FormControl>
                    <Input
                      placeholder="이메일 코드를 작성해주세요."
                      className="disabled:cursor-default"
                      {...field}
                    />
                  </FormControl>

                  {randomMailNumber &&
                    randomMailNumber?.toString() !==
                      form.watch("email_check") &&
                    field.value.length > 0 && (
                      <span className="text-sm text-red-500">
                        인증코드가 맞지 않습니다.
                      </span>
                    )}
                </FormItem>
              )}
            />
          )}

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">비밀번호</span>
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input
                    type={isPasswordShow ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="비밀번호를 작성해주세요."
                    className="disabled:cursor-default disabled:border-none"
                    {...field}
                  />
                  {isPasswordShow ? (
                    <Eye
                      cursor="pointer"
                      className="h-5 w-5"
                      onClick={() => {
                        setIsPasswordShow(false);
                      }}
                    />
                  ) : (
                    <EyeOff
                      cursor="pointer"
                      className="h-5 w-5"
                      onClick={() => {
                        setIsPasswordShow(true);
                      }}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_check"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">비밀번호 확인</span>
              <FormControl>
                <div className="flex items-center gap-3">
                  <Input
                    autoComplete="new-password"
                    type={isPasswordCheckShow ? "text" : "password"}
                    placeholder="비밀번호를 다시 한 번 작성해주세요."
                    className="disabled:cursor-default disabled:border-none"
                    {...field}
                  />
                  {isPasswordCheckShow ? (
                    <Eye
                      cursor="pointer"
                      className="h-5 w-5"
                      onClick={() => {
                        setIsPasswordCheckShow(false);
                      }}
                    />
                  ) : (
                    <EyeOff
                      cursor="pointer"
                      className="h-5 w-5"
                      onClick={() => {
                        setIsPasswordCheckShow(true);
                      }}
                    />
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={randomMailNumber?.toString() !== form.watch("email_check")}
          type="submit"
          variant={"destructive"}
          className="mt-16 w-24 self-end"
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "다음으로"}
        </Button>
      </form>
    </Form>
  );
}
