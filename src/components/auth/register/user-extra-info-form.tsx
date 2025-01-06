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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { GenderType } from "@prisma/client";
import { cn, generateId, generateRandomNickname } from "@/utils/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "sonner";
import { CalendarDropDown } from "@/components/common/calender-dropdown";

const UserExtraInfSchema = z.object({
  name: z.string().min(1, { message: "이름을 적어주세요." }),
  phoneNumber: z.string().min(1, { message: "전화번호를 적어주세요." }),
  birthday: z.date().default(new Date()),
  gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
  zipCode: z.string().min(1, { message: "우편번호를 작성해 주세요." }),
  address: z.string().min(1, { message: "기본주소를 작성해 주세요." }),
  detailAddress: z.string().min(1, { message: "상세주소를 작성해 주세요." }),
});

export default function UserExtraInfForm({
  setCurrentIndex,
  user,
}: {
  setCurrentIndex: (v: number) => void;
  user: any;
}) {
  const form = useForm<z.infer<typeof UserExtraInfSchema>>({
    resolver: zodResolver(UserExtraInfSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      birthday: undefined,
      gender: GenderType.MALE,
      zipCode: "",
      address: "",
      detailAddress: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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

  async function onSubmit(data: z.infer<typeof UserExtraInfSchema>) {
    try {
      setIsLoading(true);
      const fixedDate = new Date(
        Date.UTC(
          data?.birthday?.getFullYear(),
          data?.birthday?.getMonth(),
          data?.birthday?.getDate(),
        ),
      ).toISOString();

      await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/user`, {
        method: "PUT",
        body: JSON.stringify({
          ...data,
          nickname: generateRandomNickname(),
          birthday: new Date(fixedDate),
          id: user?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setCurrentIndex(2);
      setIsLoading(false);

      toast("회원가입을 완료했습니다.", {
        description: "로그인을 해주세요.",
      });
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
        className="flex w-full flex-col gap-6 rounded-xl border p-6"
      >
        <span className="mb-6 text-xl font-semibold">추가 정보</span>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">이름</span>
              <FormControl>
                <Input
                  placeholder="이름을 작성해주세요."
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
          name="birthday"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <span className="font-semibold">생년월일</span>
              <Popover onOpenChange={setIsOpen} open={isOpen}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ko })
                      ) : (
                        <span className="text-sm">
                          생년월일을 선택해주세요.
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent
                  onPointerDownOutside={(event) => {
                    event.preventDefault(); // Prevent outside clicks from closing the popover
                  }}
                  className="relative w-[350px] p-2"
                  align="start"
                >
                  <X
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-2 top-2 h-5 w-5 cursor-pointer"
                    strokeWidth={1}
                  />
                  <CalendarDropDown
                    mode="single"
                    captionLayout="dropdown-buttons"
                    selected={field?.value}
                    fromYear={1930}
                    toYear={new Date().getFullYear()}
                    onSelect={(v) => {
                      if (v) {
                        field.onChange(v);
                      }
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">성별</span>
              <FormControl>
                <div className="flex h-10 rounded-xl border">
                  <div
                    onClick={() => {
                      field.onChange(GenderType.MALE);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-center rounded-l-xl ${field?.value === GenderType.MALE ? "bg-black font-semibold text-white hover:bg-black/80" : "hover:bg-slate-100"}`}
                  >
                    남자
                  </div>
                  <div className="flex h-full w-[1px] border" />
                  <div
                    onClick={() => {
                      field.onChange(GenderType.FEMALE);
                    }}
                    className={`flex w-full cursor-pointer items-center justify-center rounded-r-xl ${field?.value === GenderType.FEMALE ? "bg-black font-semibold text-white hover:bg-black/80" : "hover:bg-slate-100"}`}
                  >
                    여자
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <span className="font-semibold">주소</span>
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
                  <Input placeholder="상세주소를 입력해주세요." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">전화번호 인증</span>
              <FormControl>
                <div className="flex gap-3">
                  <Input
                    placeholder="전화번호를 다시 한 번 작성해주세요."
                    className="disabled:cursor-default disabled:border-none"
                    {...field}
                  />
                  <Button type="button" variant={"destructive"}>
                    인증하기
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant={"destructive"}
          className="mt-16 w-24 self-end"
        >
          {isLoading ? <Loader2 /> : "회원가입"}
        </Button>
      </form>
    </Form>
  );
}
