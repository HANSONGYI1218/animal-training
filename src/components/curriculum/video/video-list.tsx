"use client";

import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { UserCurriculumContext } from "@/providers/user-curriculum-provider";
import { AnimalType } from "@prisma/client";
import { CirclePlay, ScreenShare } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { toast } from "sonner";

export default function VideoList({
  lecture,
}: {
  lecture: CurriculumLectureDto;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const userCurriculum = useContext(UserCurriculumContext);
  const isCurrentLecture = lecture?.id === userCurriculum?.id;

  return (
    <Link
      href={{
        pathname: `/curriculum/lecture/${lecture?.category.toLowerCase()}/${lecture?.id}`,
        query: {
          animalType: lecture.animal_type.toLowerCase(),
        },
      }}
      onClick={(e) => {
        if (
          userCurriculum &&
          userCurriculum?.lastVideoIndexs[
            lecture.animal_type === AnimalType.DOG ? 0 : 1
          ] < lecture?.index
        ) {
          e.preventDefault(); // 조건에 맞지 않으면 이동을 막음
          toast("현재 강의를 모두 수강해야 다음 회차로 넘어갑니다.", {
            description: "강의를 모두 수강해주세요!",
          });
        }
      }}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className={`group flex w-full cursor-pointer items-center justify-between gap-6 rounded-xl p-3 text-base ${isCurrentLecture ? "bg-green-50" : "bg-transparent text-gray-600"}`}
      key={lecture?.id}
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
          {" "}
          {lecture?.title}
        </span>
        {isHovered && (
          <>
            <div className="absolute left-0 top-0 h-full w-full group-hover:blur-sm" />
          </>
        )}
      </div>
      <div className="flex min-w-[48px] items-center justify-center gap-1">
        {isHovered && !isCurrentLecture ? (
          <ScreenShare
            stroke={isCurrentLecture ? "#000000" : "#ffffff"}
            className="h-5 w-5"
          />
        ) : (
          <span
            className={`${isCurrentLecture ? "font-semibold text-black" : "text-slate-300"}`}
          >
            03:56
          </span>
        )}
      </div>
    </Link>
  );
}
