"use client";

import { Lecture } from "@/types/tyeps.all";
import YoutubePlayableCard from "../common/youtube-player-card";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";

interface LectureContentProps {
  lecture: Lecture;
}

export default function LectureContent({ lecture }: LectureContentProps) {
  return (
    <section className="container relative mx-auto mt-12 flex w-full max-w-[1150px] justify-between">
      <div className="flex w-2/3">
        <YoutubePlayableCard videoId={"Ave10taSLpc"} start={0} duration={5} />
      </div>
      {lecture?.price_type === "유료" ? (
        <div className="sticky top-0 h-fit w-72 rounded-xl border">
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
          <div className="flex cursor-pointer items-center gap-2 rounded-b-xl bg-gray-100 px-6 py-3 text-sm underline decoration-gray-400 underline-offset-4">
            {lecture?.trainer_name} 훈련사님 더 알아보기
            <ChevronRight width={16} height={16} className="opacity-80" />
          </div>
        </div>
      ) : (
        <div className="sticky top-0 h-fit w-72 rounded-xl border">
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
          <div className="flex cursor-pointer items-center gap-2 rounded-b-xl bg-gray-100 px-6 py-3 text-sm underline decoration-gray-400 underline-offset-4">
            강형욱 훈련사님 더 알아보기
            <ChevronRight width={16} height={16} className="opacity-80" />
          </div>
        </div>
      )}
    </section>
  );
}
