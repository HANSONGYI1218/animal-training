"use client";

import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { GetUserAdoptionRecordDto } from "@/dtos/user.dto";
import { toast } from "sonner";
import { useState } from "react";

const RecordSearchSchema = z.object({
  name: z.string().min(1, { message: "입양자의 이름을 적어주세요." }),
  email: z.string().min(1, { message: "입양자의 이메일을 적어주세요." }),
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
      email: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(data: z.infer<typeof RecordSearchSchema>) {
    setIsLoading(true);
    try {
      const responseUser = await fetch(
        `/api/user?name=${data.name}&email=${data.email}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );
      if (!responseUser.ok) {
        const errorResponse = await responseUser.json();
        throw new Error(errorResponse?.error);
      }

      const user: GetUserAdoptionRecordDto = await responseUser.json();

      if (user) {
        setSearchUser(user);
      }
    } catch (error: any) {
      if (error?.message === "user is not found") {
        toast("입양자를 찾을 수 없습니다.", {
          description: "입양자의 이름과 이메일을 정확히 적어주세요.",
        });
      } else {
        toast("user adoption is not found", {
          description: "잠시 후 다시 시도해 주세요.",
        });
      }
    } finally {
      setIsLoading(false);
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
                    placeholder="입양자의 이름을 입력해주세요."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="px-4" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-3">
          <span className="ml-2 text-sm font-semibold">
            STEP 02. 입양자의 이메일을 적어주세요.
          </span>
          <div className="flex h-11 gap-3">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex h-full w-full flex-col">
                  <FormControl>
                    <Input
                      className="h-11 w-full flex-1 rounded-full border px-4 hover:bg-accent"
                      placeholder="입양자의 이메일을 입력해주세요."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="px-4" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={!form.watch("email") || !form.watch("name")}
              className="jusity-center flex h-11 w-11 items-center rounded-full bg-black p-3 hover:scale-105"
            >
              {isLoading ? (
                <Loader2
                  className="h-7 w-7 animate-spin"
                  stroke="#ffffff"
                  strokeWidth={2.8}
                />
              ) : (
                <Search
                  className="h-7 w-7"
                  stroke="#ffffff"
                  strokeWidth={2.8}
                />
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
