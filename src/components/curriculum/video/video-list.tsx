"use client";

import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import {
  BadgeCheck,
  CirclePlay,
  LaptopMinimalIcon,
  ScreenShare,
} from "lucide-react";
import Link from "next/link";

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
      className={`group flex w-full items-center justify-between gap-6 px-3 py-4 ${isCurrentLecture ? "scale(1.03) border-b" : ""}`}
    >
      <div className="relative flex h-full flex-1 items-center gap-2">
        {userCurriculum && lastVideoIndex > lecture?.index ? (
          <BadgeCheck stroke="rgb(5 150 105)" fill="rgb(239 246 255)" />
        ) : (
          <CirclePlay
            width={20}
            height={20}
            stroke={"rgb(203 213 225)"}
            strokeWidth={isCurrentLecture ? 2.4 : 1.4}
          />
        )}

        <span
          className={`w-fit flex-1 text-base text-slate-300 ${isCurrentLecture ? "font-semibold" : ""} `}
        >
          {lecture?.title}
        </span>

        <div className="absolute left-0 top-0 hidden h-full w-full group-hover:flex group-hover:blur-sm" />
      </div>
      <div className="flex min-w-[48px] items-center justify-center gap-1">
        {isCurrentLecture ? (
          <LaptopMinimalIcon stroke={"#ffffff"} className="h-5 w-5" />
        ) : (
          <ScreenShare
            stroke={"#ffffff"}
            className="hidden h-5 w-5 group-hover:flex"
          />
        )}

        <span
          className={`flex group-hover:hidden ${isCurrentLecture ? "hidden" : "text-slate-300"}`}
        >
          {lecture?.videoTime}
        </span>
      </div>
    </Link>
  );
}
