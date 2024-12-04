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
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Loader2, Search } from "lucide-react";
import { cn } from "@/utils/utils";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { toast } from "sonner";

const CorporationExtraInfSchema = z.object({
  owner_name: z.string().min(1, { message: "대표자 이름을 적어주세요." }),
  corporation_name: z.string().min(1, { message: "기업 이름을 적어주세요." }),
  openDate: z
    .date({ required_error: "기업 이름을 적어주세요." })
    .default(new Date()),
  zipCode: z.string().min(1, { message: "우편번호를 작성해 주세요." }),
  address: z.string().min(1, { message: "기본주소를 작성해 주세요." }),
  detailAddress: z.string().min(1, { message: "상세주소를 작성해 주세요." }),
  phoneNumber: z.string().min(1, { message: "핸드폰 번호를 적어주세요." }),
  business_number: z
    .string()
    .length(10, { message: "사업자등록번호는 정확히 10자리여야 합니다." }),
});

export default function CorporationExtraInfForm() {
  const form = useForm<z.infer<typeof CorporationExtraInfSchema>>({
    resolver: zodResolver(CorporationExtraInfSchema),
    defaultValues: {
      owner_name: "",
      corporation_name: "",
      openDate: undefined,
      zipCode: "",
      address: "",
      detailAddress: "",
      business_number: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isCertificate, setIsCertificate] = useState(false);

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

  const getBusinessman = async () => {
    setIsCertificate(false);
    const response = await fetch(
      "https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=970kJORiAj7lh0W5MZwWHFqEs5tFJMbaKqIKTz4M2Hf%2Fbdqd5%2FuRpzhD4eKcmKkdPprax%2FqnAtk6WRcj6ZIPQg%3D%3D",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json",
        },
        body: JSON.stringify({
          businesses: [
            {
              b_no: form.watch("business_number"),
              start_dt: format(form.watch("openDate"), "yyyyMMdd"),
              p_nm: form.watch("owner_name"),
              p_nm2: "",
              b_nm: "",
              corp_no: "",
              b_sector: "",
              b_type: "",
              b_adr: "",
            },
          ],
        }),
      },
    );

    if (!response.ok) {
      throw new Error("response error");
    }

    const result = await response.json();

    if (result.data[0]?.valid === "02") {
      throw new Error("response error");
    }
    setIsCertificate(true);
  };

  async function onSubmit(data: z.infer<typeof CorporationExtraInfSchema>) {
    try {
      setIsLoading(true);
      await getBusinessman();

      await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/corporation`, {
        method: "PUT",
        body: JSON.stringify({
          data,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsLoading(false);
    } catch {
      setIsLoading(false);
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
          name="owner_name"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">대표자 이름</span>
              <FormControl>
                <Input
                  placeholder="대표자 이름을 다시 한 번 작성해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="corporation_name"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <span className="font-semibold">기업 이름</span>
              <FormControl>
                <Input
                  placeholder="기업 이름을 다시 한 번 작성해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="openDate"
          render={({ field }) => (
            <FormItem className="flex w-full flex-col">
              <span className="font-semibold">개업일자</span>
              <Popover>
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
                          개업일자를 선택해주세요.
                        </span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
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
          name="business_number"
          render={({ field }) => (
            <FormItem>
              <span className="font-semibold">사업자등록번호</span>
              <FormControl>
                <Input
                  maxLength={10}
                  placeholder="숫자만 10자리 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <span className="font-semibold">기업 주소</span>
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
