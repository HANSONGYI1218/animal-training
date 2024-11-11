"use client";

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
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { useContext } from "react";
import { UserContext } from "../../../../providers/user-provider";

const AlarmSettingSchema = z.object({
  isNewNews_SMS: z.boolean(),
  isNotice_SMS: z.boolean(),
  isPromotion_SMS: z.boolean(),
  isNewNews_Email: z.boolean(),
  isNotice_Email: z.boolean(),
  isPromotion_Email: z.boolean(),
});

export default function AlarmSettingForm() {
  const user = useContext(UserContext);

  const form = useForm<z.infer<typeof AlarmSettingSchema>>({
    resolver: zodResolver(AlarmSettingSchema),
    defaultValues: {
      isNewNews_SMS: user?.isNewNews_SMS ?? true,
      isNotice_SMS: user?.isNotice_SMS ?? true,
      isPromotion_SMS: user?.isPromotion_SMS ?? true,
      isNewNews_Email: user?.isNewNews_Email ?? true,
      isNotice_Email: user?.isNotice_Email ?? true,
      isPromotion_Email: user?.isPromotion_Email ?? true,
    },
  });

  async function onSubmit(data: z.infer<typeof AlarmSettingSchema>) {
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/user?id=${user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...data,
          }),
          cache: "no-cache",
        },
      );
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
          <span className="text-lg font-semibold">알림 수신</span>
          <span className="text-sm text-neutral-500">
            문자, 이메일 수신 여부를 설정하세요. 회원약관 변경, 훈련과정,
            결제내역 등 필수적인 안내 사항은 수신여부와 무관하게 발송됩니다.
          </span>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">문자 수신</span>
          <div className="flex flex-col gap-10 p-6">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">강의 새소식</span>
              <FormField
                control={form.control}
                name="isNewNews_SMS"
                render={({ field }) => (
                  <FormItem className="flex justify-between space-y-0">
                    <span className="break-keep text-neutral-600">
                      중요한 공지사항, 기능 업데이트 등 새로운 인프런 소식을
                      받을 수 있어요.
                    </span>
                    <FormControl>
                      <Switch
                        role="button"
                        type="submit"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">공지사항</span>
              <FormField
                control={form.control}
                name="isNotice_SMS"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-3 space-y-0">
                    <span className="break-keep text-neutral-600">
                      중요한 공지사항, 기능 업데이트 등 새로운 인프런 소식을
                      받을 수 있어요.
                    </span>
                    <FormControl>
                      <Switch
                        role="button"
                        type="submit"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">인프런 소식 및 홍보</span>
              <FormField
                control={form.control}
                name="isPromotion_SMS"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-3 space-y-0">
                    <span className="break-keep text-neutral-600">
                      중요한 공지사항, 기능 업데이트 등 새로운 인프런 소식을
                      받을 수 있어요.
                    </span>
                    <FormControl>
                      <Switch
                        role="button"
                        type="submit"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="font-semibold">이메일 수신</span>
          <div className="flex flex-col gap-10 p-6">
            <div className="flex flex-col gap-1">
              <span className="font-semibold">강의 새소식</span>
              <FormField
                control={form.control}
                name="isNewNews_Email"
                render={({ field }) => (
                  <FormItem className="flex justify-between space-y-0">
                    <span className="break-keep text-neutral-600">
                      중요한 공지사항, 기능 업데이트 등 새로운 인프런 소식을
                      받을 수 있어요.
                    </span>
                    <FormControl>
                      <Switch
                        role="button"
                        type="submit"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">공지사항</span>
              <FormField
                control={form.control}
                name="isNotice_Email"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-3 space-y-0">
                    <span className="break-keep text-neutral-600">
                      중요한 공지사항, 기능 업데이트 등 새로운 인프런 소식을
                      받을 수 있어요.
                    </span>
                    <FormControl>
                      <Switch
                        role="button"
                        type="submit"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-semibold">인프런 소식 및 홍보</span>
              <FormField
                control={form.control}
                name="isPromotion_Email"
                render={({ field }) => (
                  <FormItem className="flex justify-between gap-3 space-y-0">
                    <span className="break-keep text-neutral-600">
                      중요한 공지사항, 기능 업데이트 등 새로운 인프런 소식을
                      받을 수 있어요.
                    </span>
                    <FormControl>
                      <Switch
                        role="button"
                        type="submit"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
