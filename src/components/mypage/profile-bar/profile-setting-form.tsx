"use client";

import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const ProfileSettingSchema = z.object({
  nickname: z.string({
    required_error: "이름을 적어주세요.",
  }),
  address: z.string({
    required_error: "주소를 적어주세요.",
  }),
  email: z.string({
    required_error: "이메일을 적어주세요.",
  }),
  phoneNumber: z.string({
    required_error: "휴대폰 번호를 적어주세요.",
  }),
});

export default function ProfileSettingForm({ item }: { item?: any }) {
  const form = useForm<z.infer<typeof ProfileSettingSchema>>({
    resolver: zodResolver(ProfileSettingSchema),
    defaultValues: {
      nickname: item?.nickname ?? "한송이",
      address: item?.address ?? "한송이",
      email: item?.email ?? "한송이",
      phoneNumber: item?.phoneNumber ?? "한송이",
    },
  });
  const [isEdit, setIsEdit] = useState(false);

  async function onSubmit(data: z.infer<typeof ProfileSettingSchema>) {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/mypage/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
        cache: "no-cache",
      });
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
        <section className="flex flex-col">
          <span className="text-lg font-semibold">내 프로필</span>
          <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center gap-6">
              <span className="w-20 font-semibold text-neutral-600">
                이미지
              </span>
              <Image
                src="/images/record/profile.png"
                width={72}
                height={72}
                alt="profile"
              />
            </div>
            <div className="flex items-center gap-6">
              <span className="w-20 font-semibold text-neutral-600">
                닉네임
              </span>
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem className="flex flex-1">
                    <FormControl>
                      <Input
                        disabled={!isEdit}
                        placeholder="닉네임을 정해주세요."
                        className="disabled:cursor-default disabled:border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-6">
              <span className="w-20 font-semibold text-neutral-600">주소</span>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex flex-1">
                    <FormControl>
                      <Input
                        disabled={!isEdit}
                        placeholder="주소를 정해주세요."
                        className="disabled:cursor-default disabled:border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </section>
        <section className="flex flex-col">
          <span className="text-lg font-semibold">기본 정보</span>
          <div className="flex flex-col gap-6 p-6">
            <div className="flex items-center gap-6">
              <span className="w-20 font-semibold text-neutral-600">
                이메일
              </span>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-1 items-center gap-6 space-y-0">
                    <FormControl>
                      <Input
                        disabled={!isEdit}
                        placeholder="이메일을 정해주세요."
                        className="disabled:cursor-default disabled:border-none"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      variant="login"
                      className={`${isEdit ? "flex" : "hidden"}`}
                    >
                      인증하기
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center gap-6">
              <span className="w-20 font-semibold text-neutral-600">
                휴대폰 번호
              </span>
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="flex flex-1 items-center gap-6 space-y-0">
                    <FormControl>
                      <Input
                        disabled={!isEdit}
                        placeholder="휴대폰 번호를 정해주세요."
                        className="disabled:cursor-default disabled:border-none"
                        {...field}
                      />
                    </FormControl>
                    <Button
                      variant="login"
                      className={`${isEdit ? "flex" : "hidden"}`}
                    >
                      인증하기
                    </Button>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </section>
        <Button
          type={isEdit ? "submit" : "button"}
          variant={"destructive"}
          onClick={() => {
            setIsEdit((prev) => !prev);
          }}
          className="w-fit self-end"
        >
          {isEdit ? "완료하기" : "수정하기"}
        </Button>
      </form>
    </Form>
  );
}
