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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const IdSearchSchema = z.object({
  phoneNumber: z.string().optional(),
  email: z.string().optional(),
});

export default function IdSearchForm() {
  const form = useForm<z.infer<typeof IdSearchSchema>>({
    resolver: zodResolver(IdSearchSchema),
    defaultValues: { phoneNumber: "", email: "" },
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(data: z.infer<typeof IdSearchSchema>) {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/verify-pass`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Verification failed");
      }

      const result = await response.json();

      toast.success("인증 성공!", {
        description: result.message || "전화번호 인증이 완료되었습니다.",
      });
      router.push("/login");
    } catch (error) {
      toast.error("인증 실패", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center"
      >
        <input type="hidden" id="m" name="m" value="service" />
        <input
          type="hidden"
          id="token_version_id"
          name="token_version_id"
          value=""
        />
        <input type="hidden" id="enc_data" name="enc_data" />
        <input type="hidden" id="integrity_value" name="integrity_value" />
        <div className="flex min-h-[400px] w-1/4 flex-col gap-6 rounded-xl border p-6">
          <span className="mb-6 text-xl font-semibold">아이디 찾기</span>

          <Button type="submit" variant={"destructive"}>
            {isLoading ? <Loader2 className="animate-spin" /> : "인증하기"}
          </Button>

          {form.watch("email") && (
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <span className="font-semibold">아이디</span>
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
          )}
        </div>
      </form>
    </Form>
  );
}
