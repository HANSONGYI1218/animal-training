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
import { CorporationContext } from "../../../../providers/corporation-provider";
import { Loader2 } from "lucide-react";

const PasswordSchema = z
  .object({
    password: z.string({
      required_error: "기존 비밀번호를 적어주세요.",
    }),
    newPassword: z.string({
      required_error: "새 비밀번호를 적어주세요.",
    }),
    newPassword_check: z.string({
      required_error: "새 비밀번호를 다시 한 번 적어주세요.",
    }),
  })
  .refine((data) => data.password !== data.newPassword, {
    path: ["newPassword_check"],
    message: "기존 비밀번호와 동일합니다.",
  })
  .refine((data) => data.newPassword === data.newPassword_check, {
    path: ["newPassword_check"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export default function PasswordForm() {
  const corporation = useContext(CorporationContext);

  const form = useForm<z.infer<typeof PasswordSchema>>({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      newPassword_check: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof PasswordSchema>) {
    try {
      if (data?.password !== corporation?.password) {
        throw new Error("NOT MATCH TO PASSWORD");
      }
      setIsLoading(true);
      await fetch(`/api/corporation`, {
        method: "PUT",
        body: JSON.stringify({
          id: corporation?.id,
          password: data?.newPassword,
        }),
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
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-3">
          <span className="text-lg font-semibold">비밀번호</span>
          <span className="text-sm text-neutral-500">
            * 비밀번호를 바꾸면 다시 로그인해야 해요.
          </span>
        </div>
        <div className="flex flex-col gap-8 p-6">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center gap-6">
                  <span className="w-32 font-semibold text-neutral-600">
                    기존 비밀번호
                  </span>
                  <Input
                    placeholder="기존 비밀번호를 적어주세요."
                    className="disabled:cursor-default disabled:border-none"
                    {...field}
                  />
                </div>
                <FormMessage className="ml-32" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center gap-6">
                  <span className="w-32 font-semibold text-neutral-600">
                    새 비밀번호
                  </span>
                  <Input
                    placeholder="새 비밀번호를 적어주세요."
                    className="disabled:cursor-default disabled:border-none"
                    {...field}
                  />
                </div>
                <FormMessage className="ml-32" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword_check"
            render={({ field }) => (
              <FormItem>
                <div className="flex w-full items-center gap-6">
                  <span className="w-32 font-semibold text-neutral-600">
                    새 비밀번호 확인
                  </span>
                  <Input
                    placeholder="새 비밀번호를 다시 한 번 적어주세요."
                    className="disabled:cursor-default disabled:border-none"
                    {...field}
                  />
                </div>
                <FormMessage className="ml-32" />
              </FormItem>
            )}
          />
        </div>
        <Button variant={"destructive"} className="w-24 self-end">
          {isLoading ? <Loader2 /> : "저장하기"}
        </Button>
      </form>
    </Form>
  );
}
