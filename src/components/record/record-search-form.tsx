"use client";

import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "../ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { GetUserAdoptionRecordDto } from "@/dtos/user.dtos";

const RecordSearchSchema = z.object({
  name: z.string({
    required_error: "입양자 이름을 적어주세요.",
  }),
  registrationNumber: z.string({
    required_error: "입양자 주민등록번호를 입력해주세요.",
  }),
});

export default function RecordSearchForm({
  setSearchUser,
}: {
  setSearchUser: (value: GetUserAdoptionRecordDto) => void;
}) {
  const form = useForm<z.infer<typeof RecordSearchSchema>>({
    resolver: zodResolver(RecordSearchSchema),
    defaultValues: {
      name: "",
      registrationNumber: "",
    },
  });

  async function onSubmit(data: z.infer<typeof RecordSearchSchema>) {
    try {
      const responseUser = await fetch(
        `/api/user?name=${data.name}&registrationNumber=${data.registrationNumber}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );
      if (!responseUser.ok) {
        return null;
      }

      const user: GetUserAdoptionRecordDto = await responseUser.json();

      if (user) {
        setSearchUser(user);
      }
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
        className="flex w-1/2 flex-col justify-center gap-8"
      >
        <div className="flex flex-col gap-3">
          <span className="ml-2 text-sm font-semibold">
            STEP 01. 입양자의 이름을 적어주세요.
          </span>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-11 w-full flex-1 rounded-full border px-4 hover:bg-accent"
                    placeholder="쓰스"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="ml-2 text-sm font-semibold">
            STEP 02. 입양자의 주민등록번호를 적어주세요.
          </span>
          <div className="flex h-11 gap-3">
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem className="flex h-full w-full flex-col space-y-0">
                  <InputOTP {...field} maxLength={13}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                      <InputOTPSlot index={8} />
                      <InputOTPSlot index={9} />
                      <InputOTPSlot index={10} />
                      <InputOTPSlot index={11} />
                      <InputOTPSlot index={12} />
                    </InputOTPGroup>
                  </InputOTP>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="jusity-center flex h-11 w-11 items-center rounded-full bg-black p-3 hover:scale-105"
            >
              <Search className="h-7 w-7" stroke="#ffffff" strokeWidth={2.8} />
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
