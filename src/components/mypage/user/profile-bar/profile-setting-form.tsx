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
import { UserContext } from "../../../../providers/user-provider";
import { Loader2, Search } from "lucide-react";
import { toast } from "sonner";

const ProfileSettingSchema = z.object({
  name: z.string({
    required_error: "이름을 적어주세요.",
  }),
  nickname: z.string({
    required_error: "닉네임을 적어주세요.",
  }),
  email: z.string({
    required_error: "이메일을 적어주세요.",
  }),
  phoneNumber: z.string({
    required_error: "휴대폰 번호를 적어주세요.",
  }),
  zipCode: z.string().min(1, { message: "우편번호를 작성해 주세요." }),
  address: z.string().min(1, { message: "기본주소를 작성해 주세요." }),
  detailAddress: z.string().min(1, { message: "상세주소를 작성해 주세요." }),
});

export default function ProfileSettingForm() {
  const user = useContext(UserContext);

  const form = useForm<z.infer<typeof ProfileSettingSchema>>({
    resolver: zodResolver(ProfileSettingSchema),
    defaultValues: {
      name: user?.name ?? "",
      nickname: user?.nickname ?? "",
      email: user?.email ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      zipCode: user?.zipCode ?? "",
      address: user?.address ?? "",
      detailAddress: user?.detailAddress ?? "",
    },
  });
  const [isEdit, setIsEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const openAddressPopup = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        const addr =
          data.userSelectedType === "R" ? data.roadAddress : data.jibunAddress;

        form.setValue("zipCode", data.zonecode);
        form.setValue("address", addr);
      },
    }).open();
  };

  async function onSubmit(data: z.infer<typeof ProfileSettingSchema>) {
    setIsLoading(true);
    try {
      await fetch(`/api/user`, {
        method: "PUT",
        body: JSON.stringify({
          id: user?.id,
          ...data,
        }),
      });
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
        className="flex flex-col gap-10"
      >
        <section className="flex flex-col">
          <span className="text-lg font-semibold">기본 정보</span>
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
              <span className="w-20 font-semibold text-neutral-600">이름</span>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex flex-1">
                    <FormControl>
                      <Input
                        disabled={!isEdit}
                        placeholder="이름을 정해주세요."
                        className="disabled:cursor-default disabled:border-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="login"
                className={`${isEdit ? "flex" : "hidden"}`}
              >
                인증하기
              </Button>
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
          </div>
        </section>
        <section className="flex flex-col">
          <span className="text-lg font-semibold">추가 정보</span>
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
            <div className="flex w-full items-start gap-6">
              <span className="w-20 font-semibold text-neutral-600">주소</span>
              <div className="flex w-full flex-col gap-2">
                <div className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name="zipCode"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            disabled
                            className="disabled:cursor-default disabled:bg-background"
                            placeholder="우편번호"
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="button"
                    variant={"destructive"}
                    className="flex h-10 gap-2"
                    onClick={() => openAddressPopup()}
                  >
                    <Search className="h-5 w-5" />
                    주소 찾기
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          disabled
                          className="disabled:cursor-default disabled:bg-background"
                          placeholder="기본주소를 입력해주세요."
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="detailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="상세주소를 입력해주세요."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
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
