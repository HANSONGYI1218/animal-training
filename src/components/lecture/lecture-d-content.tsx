"use client";

import YoutubePlayableCard from "../common/player-card";
import { Button } from "../ui/button";
import { ChevronRight, ZoomIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { occupationTypeSwap, priceTypeSwap } from "@/constants/constants.all";
import { useState } from "react";
import { GetTutorDto } from "@/dtos/tutor.dto";
import Link from "next/link";
import { GetLectureDto } from "@/dtos/lecture.dto";

export default function LectureContent({
  lecture,
}: {
  lecture: GetLectureDto;
}) {
  const [isClicked, setIsClicked] = useState(false);
  const [tutor, setTutor] = useState<GetTutorDto | null>(null);

  const handleGetData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor?id=${lecture?.tutor?.id}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    if (!response.ok) {
      return null;
    }

    const tutor: GetTutorDto = await response.json();
    setTutor(tutor);
  };

  return (
    <section className="container relative mx-auto mt-12 flex w-full max-w-[1150px] justify-between">
      <div className="flex w-2/3">
        <YoutubePlayableCard videoId={"Ave10taSLpc"} start={0} duration={5} />
      </div>
      <div className="sticky top-0 h-fit w-72 rounded-xl border">
        {priceTypeSwap[lecture?.price_type] === "유료" ? (
          <>
            <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
              특가 할인중!
            </div>
            <div className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">24,000원</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-red-500">20%</span>
                  <span className="font-semibold text-gray-500 line-through">
                    30,000원
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant={"destructive"}>수강신청 하기</Button>
                <Button variant={"outline"}>찜하기</Button>
              </div>
              <div className="">공유하기 자리</div>
            </div>
          </>
        ) : (
          <>
            <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
              더 많은 혜택이 있어요!
            </div>
            <div className="flex flex-col gap-6 p-6">
              <div className="flex flex-col gap-1">
                <span className="mb-2 text-xl font-bold">
                  회원제로 모든 강의를 한번에!
                </span>
                <span className="text-2xl font-bold">24,000</span>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-red-500">20%</span>
                  <span className="font-semibold text-gray-500 line-through">
                    30,000원
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant={"destructive"}>수강신청 하기</Button>
                <Button variant={"outline"}>회원제 바로가기</Button>
              </div>
              <div className="">공유하기 자리</div>
            </div>
          </>
        )}
        <div className="flex rounded-b-xl bg-slate-100 px-6 py-3">
          <Dialog>
            <DialogTrigger
              onClick={handleGetData}
              className="flex cursor-pointer items-center gap-2 text-sm underline decoration-gray-400 underline-offset-4"
            >
              {lecture?.tutor?.name}{" "}
              {lecture?.tutor?.occupation &&
                occupationTypeSwap[lecture?.tutor.occupation]}
              님 더 알아보기
              <ChevronRight width={16} height={16} className="opacity-80" />
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-8 p-8">
              <DialogHeader className="relative flex flex-col gap-3">
                <DialogTitle className="flex items-center gap-6">
                  <Image
                    src={tutor?.profile_img ?? ""}
                    width={64}
                    height={64}
                    className={`cursor-pointer rounded-full transition-transform duration-500 ease-in-out ${isClicked ? "absolute left-0 top-0 z-20 h-full w-full rounded-full object-cover" : ""}`}
                    alt="face"
                    onClick={() => setIsClicked(!isClicked)}
                  />
                  <div className="flex flex-col gap-2">
                    {tutor?.name}님
                    <span className="text-sm text-gray-700">
                      {tutor?.occupation &&
                        occupationTypeSwap[tutor.occupation]}
                    </span>
                  </div>
                </DialogTitle>
                <hr className="w-full" />
                <DialogDescription className="whitespace-pre-line py-3 leading-5">
                  {tutor?.introduction}
                </DialogDescription>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold text-green-100">
                      경력사항
                    </span>
                    <hr className="w-full" />
                    <span className="flex gap-3 text-sm font-semibold text-gray-700">
                      경력
                      <span className="font-medium">{`${tutor?.career}`}</span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold text-green-100">
                      소속정보
                    </span>
                    <hr className="w-full" />
                    <span className="flex gap-3 text-sm font-semibold text-gray-700">
                      소속
                      <span className="font-medium">
                        {tutor?.corporation?.corporation_name}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold text-green-100">
                      훈련소 정보
                    </span>
                    <hr className="w-full" />
                    <div className="flex flex-col gap-1">
                      <span className="flex gap-3 text-sm font-semibold text-gray-700">
                        이름
                        <span className="font-medium">
                          {tutor?.trainingCenter?.name}
                        </span>
                      </span>
                      <span className="flex gap-3 text-sm font-semibold text-gray-700">
                        위치
                        <span className="font-medium">
                          {tutor?.trainingCenter?.address}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-bold text-green-100">
                      강사인증
                    </span>
                    <hr className="w-full" />
                    <div className="flex flex-col gap-1">
                      <span className="flex gap-3 text-sm font-semibold text-gray-700">
                        인증서
                        <span className="flex cursor-pointer items-center gap-2 font-medium underline decoration-gray-500 underline-offset-4">
                          확인하기 <ZoomIn width={14} height={14} />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </DialogHeader>
              <DialogFooter>
                <Link href={`/tutor/${tutor?.id}`}>
                  <Button
                    type="button"
                    className="flex items-center gap-2 text-sm"
                    variant={"destructive"}
                  >
                    강의 보러가기
                    <ChevronRight width={17} height={17} strokeWidth={2.5} />
                  </Button>
                </Link>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
