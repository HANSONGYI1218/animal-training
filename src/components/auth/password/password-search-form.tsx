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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { generateSixDigitCode } from "@/utils/utils";
import { GetUserSearchDto } from "@/dtos/user.dto";

const PasswordSearchSchema = z.object({
  userType: z.enum(["USER", "CORPORATION"]).default("USER"),
  email: z.string().min(1, { message: "이메일을 적어주세요." }),
  email_check: z.string().min(1, { message: "이메일 코드를 적어주세요." }),
  password: z.string().min(1, { message: "비밀번호를 적어주세요." }),
});

export default function PasswordSearchForm() {
  const form = useForm<z.infer<typeof PasswordSearchSchema>>({
    resolver: zodResolver(PasswordSearchSchema),
    defaultValues: {
      userType: "USER",
      email: "",
      email_check: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [randomMailNumber, setRandomMailNumber] = useState<number | null>(null);
  const [user, setUser] = useState<GetUserSearchDto | null>(null);
  const router = useRouter();

  const emailSend = async (v: string) => {
    setIsSending(true);
    try {
      const responseUser = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/${form.watch("userType").toLowerCase()}?email=${v}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const result = await responseUser.json();
      if (!result) {
        return toast("일치하는 이메일 없습니다.", {
          description: "이메일을 정확히 확인해주세요.",
        });
      }
      setUser(result);

      const randomCode = generateSixDigitCode();

      setRandomMailNumber(randomCode);
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
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setIsSending(false);
    }
  };

  async function onSubmit(data: z.infer<typeof PasswordSearchSchema>) {
    try {
      setIsLoading(true);
      await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/${form.watch("userType").toLowerCase()}`,
        {
          method: "PUT",
          body: JSON.stringify({
            id: user?.id,
            password: data.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      setIsLoading(false);
      router.push("/login");
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
        className="flex w-full flex-col items-center justify-center"
      >
        <div className="flex min-w-[400px] flex-col gap-6 rounded-xl border p-6">
          <span className="mb-6 text-xl font-semibold">비밀번호 찾기</span>
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
                        randomMailNumber?.toString() ===
                        form.watch("email_check")
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
                    variant={"destructive"}
                    className={`${
                      randomMailNumber?.toString() ===
                        form.watch("email_check") &&
                      "rounded-full bg-green-100 p-3 disabled:opacity-100"
                    }`}
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
                  randomMailNumber?.toString() !==
                    form.watch("email_check") && (
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
                    <div className="flex gap-3">
                      <FormControl>
                        <Input
                          placeholder="이메일 코드를 작성해주세요."
                          className="disabled:cursor-default"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            )}
          {randomMailNumber?.toString() === form.watch("email_check") && (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <span className="font-semibold">새로운 비밀번호</span>
                  <div className="flex items-center gap-3">
                    <Input
                      autoComplete="new-password"
                      type={isPasswordShow ? "text" : "password"}
                      placeholder="새로운 비밀번호를 작성해주세요."
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
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          <Button
            type="submit"
            variant={"destructive"}
            className="mt-12 w-24 self-end"
          >
            {isLoading ? <Loader2 /> : "저장"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
