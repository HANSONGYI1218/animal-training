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
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";

const LoginSchema = z.object({
  userType: z.enum(["USER", "CORPORATION"]).default("USER"),
  email: z.string().min(1, { message: "이메일을 적어주세요." }),
  password: z.string().min(1, { message: "비밀번호를 적어주세요." }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { userType: "USER", email: "", password: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isUserExist, setIsUserExist] = useState(true);
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    try {
      setIsLoading(true);
      // signIn 함수를 사용하여 자체 로그인 요청을 보냅니다.
      const response = await signIn("credentials", {
        userType: data.userType,
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (response?.error === "CredentialsSignin") {
        setIsUserExist(false);
      } else {
        router.replace("/lecture");
      }

      setIsLoading(false);
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
          <span className="mb-6 text-xl font-semibold">로그인</span>
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
                <FormControl>
                  <Input
                    placeholder="이메일을 작성해주세요."
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <span className="font-semibold">비밀번호</span>
                <div className="flex items-center gap-3">
                  <Input
                    autoComplete="new-password"
                    type={isPasswordShow ? "text" : "password"}
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
                <FormMessage />
              </FormItem>
            )}
          />
          {!isUserExist && (
            <span className="text-sm text-red-500">
              등록된 회원이 아닙니다.
            </span>
          )}
          <Button
            type="submit"
            variant={"destructive"}
            className="mt-12 w-24 self-end"
          >
            {isLoading ? <Loader2 /> : "로그인"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
