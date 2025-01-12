"use client";

import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import { CirclePlay, ScreenShare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export default function VideoList({
  lecture,
  userCurriculum,
  lastVideoIndex,
  currentLecture,
}: {
  lecture: CurriculumLectureDto;
  userCurriculum: GetUserCurriculumDto;
  lastVideoIndex: number;
  currentLecture: CurriculumLectureDto;
}) {
  const isCurrentLecture = lecture?.id === currentLecture?.id;

  return (
    <Link
      href={{
        pathname: `/curriculum/lecture/${lecture?.id}`,
      }}
      onClick={(e) => {
        if (isCurrentLecture) {
          e.preventDefault(); // 조건에 맞지 않으면 이동을 막음
          toast("현재 선택한 강의를 수강중입니다..", {
            description: "다른 강의를 선택해주세요!",
          });
        }
        if (userCurriculum && lastVideoIndex < lecture?.index) {
          e.preventDefault(); // 조건에 맞지 않으면 이동을 막음
          toast("현재 강의를 모두 수강해야 다음 회차로 넘어갑니다.", {
            description: "강의를 모두 수강해주세요!",
          });
        }
      }}
      className={`group flex w-full items-center justify-between gap-6 rounded-xl p-3 text-base ${isCurrentLecture ? "bg-green-50" : "bg-transparent text-gray-600"}`}
    >
      <div className="relative flex h-full flex-1 items-center gap-2">
        <CirclePlay
          width={20}
          height={20}
          stroke={isCurrentLecture ? "#000000" : "rgb(203 213 225)"}
          strokeWidth={isCurrentLecture ? 2.4 : 1.4}
        />
        <span
          className={`w-fit flex-1 ${isCurrentLecture ? "font-semibold text-black" : "text-slate-300"} `}
        >
          {lecture?.title}
        </span>

        <div className="absolute left-0 top-0 hidden h-full w-full group-hover:flex group-hover:blur-sm" />
      </div>
      <div className="flex min-w-[48px] items-center justify-center gap-1">
        <ScreenShare
          stroke={isCurrentLecture ? "#000000" : "#ffffff"}
          className={`h-5 w-5 ${isCurrentLecture ? "flex" : "hidden group-hover:flex"}`}
        />

        <span
          className={`flex group-hover:hidden ${isCurrentLecture ? "hidden" : "text-slate-300"}`}
        >
          {lecture?.videoTime}
        </span>
      </div>
    </Link>
  );
}
