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
import { CalendarIcon, ChevronLeft, Loader2, Search } from "lucide-react";
import { AnimalType, GenderType } from "@prisma/client";
import Link from "next/link";
import { CorporationContext } from "@/providers/corporation-provider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ko } from "date-fns/locale";
import { cn } from "@/utils/utils";
import { toast } from "sonner";
import { GetAdoptionDto } from "@/dtos/adoption.dto";
import { GetUserSearchDto } from "@/dtos/user.dto";
import { GetAnimalDto } from "@/dtos/animal.dto";

const AdoptionSchema = z.object({
  invite_email: z
    .string()
    .min(1, { message: "초대할 입양자의 이메일을 적어주세요." }),
  user_email: z.string().min(1, { message: "사용자의 이메일을 적어주세요." }),
  user_name: z.string().min(1, { message: "사용자의 이름을 적어주세요." }),
  user_phoneNumber: z.string().min(1, { message: "핸드폰 번호를 적어주세요." }),
  user_birthday: z.date({
    required_error: 'message: "핸드폰 번호를 적어주세요.',
  }),
  user_gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
  zipCode: z.string().min(1, { message: "우편번호를 작성해 주세요." }),
  address: z.string().min(1, { message: "기본주소를 작성해 주세요." }),
  detailAddress: z.string().min(1, { message: "상세주소를 작성해 주세요." }),
  animal_type: z.enum(["DOG", "CAT"]).default("DOG"),
  animal_name: z.string().min(1, { message: "강아지의 이름을 적어주세요." }),
  animal_age: z.number().min(0, { message: "강아지 나이를 입력해주세요." }),
  animal_gender: z.enum(["MALE", "FEMALE"]).default("MALE"),
  animal_breed: z.string().min(0, { message: "강아지 품종을 작성해 주세요." }),
});

export default function AdoptionForm({
  adoption,
  animal,
}: {
  adoption?: GetAdoptionDto;
  animal?: GetAnimalDto;
}) {
  const corporation = useContext(CorporationContext);
  const [isLoading, setIsLoading] = useState(false);
  const [searchUser, setSearchUser] = useState<GetUserSearchDto | null>(null);

  const form = useForm<z.infer<typeof AdoptionSchema>>({
    resolver: zodResolver(AdoptionSchema),
    defaultValues: {
      invite_email: adoption?.invite_email ?? "",
      user_name: adoption?.adopter?.name ?? "",
      user_phoneNumber: adoption?.adopter?.phoneNumber ?? "",
      user_birthday: adoption?.adopter?.birthday ?? undefined,
      user_gender: adoption?.adopter?.gender ?? GenderType?.MALE,
      zipCode: adoption?.adopter?.zipCode ?? "",
      address: adoption?.adopter?.address ?? "",
      detailAddress: adoption?.adopter?.detailAddress ?? "",
      animal_type: adoption?.animal_type ?? AnimalType.DOG,
      animal_name: animal?.name ?? "",
      animal_age: animal?.age ?? 0,
      animal_gender: animal?.gender ?? GenderType?.MALE,
      animal_breed: animal?.breed ?? "",
    },
  });

  const deleteAdoption = async () => {
    setIsLoading(true);
    try {
      if (adoption) {
        await fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption?id=${adoption?.id}`,
          {
            method: "DELETE",
          },
        );
      }
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  };

  const getSearchUser = async () => {
    setIsLoading(true);
    try {
      const responseUser = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/user?email=${form.watch("user_email")}`,
        {
          method: "GET",
        },
      );

      const getUser: GetUserSearchDto = await responseUser.json();
      setSearchUser(getUser);

      form.setValue("user_name", getUser?.name);
      form.setValue("user_birthday", getUser?.birthday);
      form.setValue("user_gender", getUser?.gender);
      form.setValue("user_phoneNumber", getUser?.phoneNumber);
      form.setValue("zipCode", getUser?.zipCode);
      form.setValue("address", getUser?.address);
      form.setValue("detailAddress", getUser?.detailAddress);

      setIsLoading(false);
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  };

  const getSearchAniaml = async () => {
    setIsLoading(true);
    try {
      const responseUser = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/animal?name=${form.watch("animal_name")}`,
        {
          method: "GET",
        },
      );

      const getUser: GetUserSearchDto = await responseUser.json();
      setSearchUser(getUser);

      form.setValue("user_name", getUser?.name);
      form.setValue("user_birthday", getUser?.birthday);
      form.setValue("user_gender", getUser?.gender);
      form.setValue("user_phoneNumber", getUser?.phoneNumber);
      form.setValue("zipCode", getUser?.zipCode);
      form.setValue("address", getUser?.address);
      form.setValue("detailAddress", getUser?.detailAddress);

      setIsLoading(false);
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  };

  async function onSubmit(data: z.infer<typeof AdoptionSchema>) {
    setIsLoading(true);
    try {
      if (adoption) {
        await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption`, {
          method: "PUT",
          body: JSON.stringify({
            invite_email: data?.invite_email,
            breederCorporationId: corporation?.id,
          }),
        });
      } else {
        await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/animal`, {
          method: "POST",
          body: JSON.stringify({
            animal_name: data?.animal_name,
            animal_age: data?.animal_age,
            animal_gender: data?.animal_gender,
            animal_breed: data?.animal_breed,
          }),
        });

        await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption`, {
          method: "POST",
          body: JSON.stringify({
            invite_email: data?.invite_email,
            adopterId: searchUser?.id,
            breederCorporationId: corporation?.id,
          }),
        });
      }
      setIsLoading(false);
      window.location.href = "/mypage/corporation/adoption";
    } catch (error: any) {
      const errorMessage = error?.message || "Failed to create Lecture";
      toast(errorMessage, {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-12"
      >
        <Link href={"/mypage/corporation/curriculum"}>
          <Button variant={"link"} className="flex gap-1 p-0 text-sm">
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            강의 목록가기
          </Button>
        </Link>
        <span className="text-xl font-bold">입양기록 작성</span>
        <div className="flex flex-col gap-5">
          <span className="text-lg font-semibold">STEP 01: 입양자 정보</span>
          <FormField
            control={form.control}
            name="user_email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col">
                <span className="font-semibold">입양자 검색</span>
                <div className="flex gap-2">
                  <div className="group flex flex-1 items-center rounded-lg border px-3 hover:bg-slate-100">
                    <Search className="h-4 w-4" stroke="rgb(156 163 175)" />
                    <Input
                      placeholder="입양자의 이메일을 검색해보세요."
                      className="border-none group-hover:bg-slate-100"
                      {...field}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={() => {
                      if (!isLoading) {
                        getSearchUser();
                      }
                    }}
                    className="jusity-center flex items-center rounded-full bg-black p-3 hover:scale-105"
                  >
                    {isLoading ? (
                      <Loader2
                        className="h-4 w-4 animate-spin"
                        stroke="#ffffff"
                      />
                    ) : (
                      <Search
                        className="h-4 w-4"
                        stroke="#ffffff"
                        strokeWidth={2.8}
                      />
                    )}
                  </Button>
                </div>
              </FormItem>
            )}
          />
          {form.watch("user_email") && (
            <div className="flex gap-5">
              <div className="h-full w-[6px] bg-black" />
              <div className="flex flex-1 flex-col gap-6">
                <FormField
                  control={form.control}
                  name="user_name"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <span className="font-semibold">이름</span>
                      <FormControl>
                        <Input
                          disabled
                          placeholder="입양자의 이름을 작성해주세요."
                          className="disabled:hover:white disabled:cursor-default"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user_birthday"
                  render={({ field }) => (
                    <FormItem className="flex w-full flex-col">
                      <span className="font-semibold">생년월일</span>
                      <Popover>
                        <PopoverTrigger
                          asChild
                          disabled
                          className="disabled:opacity-90"
                        >
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
                                  입양자의 생년월일을 선택해주세요.
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
                  name="user_gender"
                  render={({ field }) => (
                    <FormItem>
                      <span className="font-semibold">성별</span>
                      <FormControl>
                        <div className="flex h-10 rounded-xl border">
                          <div
                            className={`flex w-full items-center justify-center rounded-l-xl ${field?.value === GenderType.MALE ? "bg-black font-semibold text-white" : ""}`}
                          >
                            남자
                          </div>
                          <div className="flex h-full w-[1px] border" />
                          <div
                            className={`flex w-full items-center justify-center rounded-r-xl ${field?.value === GenderType.FEMALE ? "bg-black font-semibold text-white" : ""}`}
                          >
                            여자
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user_phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <span className="font-semibold">전화번호</span>
                      <FormControl>
                        <Input
                          disabled
                          className="disabled:cursor-default"
                          placeholder="입양자의 전화번호를 작성해주세요."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col gap-2">
                  <span className="font-semibold">주소</span>
                  <div className="flex gap-2">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="w-40">
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
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="flex-1">
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
                  </div>
                  <FormField
                    control={form.control}
                    name="detailAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            disabled
                            className="disabled:cursor-default"
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
          )}
        </div>
        <div className="flex flex-col gap-5">
          <span className="text-lg font-semibold">STEP 02: 반려동물 정보</span>
          <div className="flex gap-5">
            <div className="h-full w-[6px] bg-black" />
            <div className="flex flex-1 flex-col gap-6">
              <FormField
                control={form.control}
                name="animal_name"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <span className="font-semibold">이름</span>
                    <FormControl>
                      <Input
                        disabled
                        className="disabled:cursor-default disabled:bg-background"
                        placeholder="반려동물의 이름을 작성해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="animal_age"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <span className="font-semibold">나이</span>
                    <FormControl>
                      <Input
                        disabled
                        className="disabled:cursor-default disabled:bg-background"
                        placeholder="반려동물의 나이를 작성해주세요."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="animal_gender"
                render={({ field }) => (
                  <FormItem>
                    <span className="font-semibold">성별</span>
                    <FormControl>
                      <div className="flex h-10 rounded-xl border">
                        <div
                          className={`flex w-full items-center justify-center rounded-l-xl ${field?.value === GenderType.MALE ? "bg-black font-semibold text-white" : ""}`}
                        >
                          남자
                        </div>
                        <div className="flex h-full w-[1px] border" />
                        <div
                          className={`flex w-full items-center justify-center rounded-r-xl ${field?.value === GenderType.FEMALE ? "bg-black font-semibold text-white" : ""}`}
                        >
                          여자
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="animal_breed"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <span className="font-semibold">품종</span>
                    <FormControl>
                      <Input
                        disabled
                        className="disabled:cursor-default disabled:bg-background"
                        placeholder="반려동물의 품종을 작성해주세요."
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
        <Button
          type="submit"
          variant={"destructive"}
          className="mt-12 w-24 self-end"
        >
          {isLoading ? <Loader2 /> : "작성 완료"}
        </Button>
      </form>
    </Form>
  );
}
