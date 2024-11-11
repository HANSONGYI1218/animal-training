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
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { CorporationContext } from "../../mypage/corporation/corporation-provider";

const LoginSchema = z.object({
  email: z.string().min(1, { message: "이메일을 적어주세요." }),
  password: z.string().min(1, { message: "비밀번호를 적어주세요." }),
  password_check: z.string().min(1, { message: "비밀번호를 적어주세요." }),
  name: z.string().min(1, { message: "이름을 적어주세요." }),
  phoneNumber: z.string().min(1, { message: "전화번호를 적어주세요." }),
  birthday: z.string().min(1, { message: "생년월일을 적어주세요." }),
});

export default function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      password_check: "",
      name: "",
      phoneNumber: "",
      birthday: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    try {
      setIsLoading(true);
      // signIn 함수를 사용하여 자체 로그인 요청을 보냅니다.
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
        callbackUrl: "/lecture",
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
        className="flex h-screen w-full flex-col items-center justify-center"
      >
        <div className="flex w-1/4 flex-col gap-6 rounded-xl border p-6">
          <span className="mb-6 text-xl font-semibold">회원가입</span>
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
          <div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <span className="font-semibold">비밀번호</span>
                  <FormControl>
                    <Input
                      placeholder="비밀번호를 작성해주세요."
                      className="disabled:cursor-default disabled:border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="password_check"
              render={({ field }) => (
                <FormItem>
                  <span className="font-semibold">비밀번호 확인</span>
                  <FormControl>
                    <Input
                      placeholder="비밀번호를 다시 한 번 작성해주세요."
                      className="disabled:cursor-default disabled:border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
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
          </div>
          <div>
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <span className="font-semibold">전화번호</span>
                  <FormControl>
                    <Input
                      placeholder="전화번호를 다시 한 번 작성해주세요."
                      className="disabled:cursor-default disabled:border-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormField
              control={form.control}
              name="birthday"
              render={({ field }) => (
                <FormItem>
                  <span className="font-semibold">생년월일</span>
                  <FormControl>
                    <Input
                      placeholder="생년월일을 다시 한 번 작성해주세요."
                      className="disabled:cursor-default disabled:border-none"
                      {...field}
                    />
                  </FormControl>
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
            {isLoading ? <Loader2 /> : "회원가입"}
          </Button>{" "}
        </div>
      </form>
    </Form>
  );
}
