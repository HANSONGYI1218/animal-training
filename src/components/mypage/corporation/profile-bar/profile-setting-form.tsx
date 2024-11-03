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
import { useState, useContext } from "react";
import { toast } from "@/components/ui/use-toast";
import { CorporationContext } from "../../corporation/corporation-provider";
import { Loader2 } from "lucide-react";
import { CorporationAccessStatus } from "@prisma/client";

const ProfileSettingSchema = z.object({
  owner_name: z.string({
    required_error: "대표 이름을 적어주세요.",
  }),
  corporation_name: z.string({
    required_error: "기업명을 적어주세요.",
  }),
  address: z.string({
    required_error: "주소를 적어주세요.",
  }),
  phoneNumber: z.string({
    required_error: "휴대폰 번호를 적어주세요.",
  }),
  email: z.string({
    required_error: "이메일을 적어주세요.",
  }),
  business_number: z.string({
    required_error: "사업자 번호를 적어주세요.",
  }),
  accessStatus: z.enum(["OPERATION", "STANDARD"]).default("STANDARD"),
});

export default function ProfileSettingForm() {
  const corporation = useContext(CorporationContext);

  const form = useForm<z.infer<typeof ProfileSettingSchema>>({
    resolver: zodResolver(ProfileSettingSchema),
    defaultValues: {
      owner_name: corporation?.owner_name ?? "",
      corporation_name: corporation?.corporation_name ?? "",
      address: corporation?.address ?? "",
      phoneNumber: corporation?.phoneNumber ?? "",
      email: corporation?.email ?? "",
      business_number: corporation?.business_number ?? "",
      accessStatus:
        corporation?.accessStatus ?? CorporationAccessStatus.STANDARD,
    },
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof ProfileSettingSchema>) {
    setIsLoading(true);
    try {
      await fetch(`/api/corporation`, {
        method: "PUT",
        body: JSON.stringify({
          id: corporation?.id,
          ...data,
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
                대표자 이름
              </span>
              <FormField
                control={form.control}
                name="owner_name"
                render={({ field }) => (
                  <FormItem className="flex flex-1">
                    <FormControl>
                      <Input
                        disabled={!isEdit}
                        placeholder="대표자 이름을 정해주세요."
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
              <span className="w-20 font-semibold text-neutral-600">
                기업 이름
              </span>
              <FormField
                control={form.control}
                name="corporation_name"
                render={({ field }) => (
                  <FormItem className="flex flex-1">
                    <FormControl>
                      <Input
                        disabled={!isEdit}
                        placeholder="기업 이름을 정해주세요."
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
            <div className="flex items-center gap-6">
              <span className="w-20 font-semibold text-neutral-600">
                사업자 번호
              </span>
              <FormField
                control={form.control}
                name="business_number"
                render={({ field }) => (
                  <FormItem className="flex flex-1 items-center gap-6 space-y-0">
                    <FormControl>
                      <Input
                        disabled={!isEdit}
                        placeholder="사업자 번호를 정해주세요."
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
          type={isEdit ? "button" : "submit"}
          variant={"destructive"}
          onClick={() => {
            setIsEdit((prev) => {
              if (!isLoading) {
                return !prev;
              }
              return prev;
            });
          }}
          className="w-24 self-end"
        >
          {isLoading ? <Loader2 /> : isEdit ? "완료하기" : "수정하기"}
        </Button>
      </form>
    </Form>
  );
}
