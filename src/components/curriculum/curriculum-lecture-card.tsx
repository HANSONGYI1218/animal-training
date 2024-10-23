"use client";

import { ChevronRight, Dot } from "lucide-react";
import Link from "next/link";
import { Progress } from "../ui/progress";
import React from "react";
import { CurriculumCategory } from "@prisma/client";
import { GetUserCurriculumDto } from "@/dtos/user-curriculum.dtos";
import { GetCurriculumLectureDto } from "@/dtos/curriculum-lecture.dtos";
import { lectureCategorySwap } from "@/constants/constants.all";

const bgColor = [
  "bg-communication-pattern",
  "bg-training-pattern",
  "bg-beauty-pattern",
];

export default function CurriculumLectureCard({
  curriculumLectures,
  userCurriculum,
  index,
}: {
  curriculumLectures: GetCurriculumLectureDto[];
  userCurriculum: GetUserCurriculumDto;
  index: number;
}) {
  const [progress, setProgress] = React.useState(0);
  const [progressColor, setProgressColor] = React.useState<string>("");

  const handleProgress = async () => {
    if (
      Object.values(CurriculumCategory).indexOf(
        userCurriculum?.curriculumCategory,
      ) ===
      Object.values(CurriculumCategory).indexOf(curriculumLectures[0].category)
    ) {
      return setProgress(
        (userCurriculum?.curriculumIndex / curriculumLectures.length) * 100,
      );
    } else if (
      Object.values(CurriculumCategory).indexOf(
        userCurriculum?.curriculumCategory,
      ) <
      Object.values(CurriculumCategory).indexOf(curriculumLectures[0].category)
    ) {
      setProgress(0);
    } else {
      setProgress(100);
    }
  };

  const handleProgressColor = () => {
    if (progress <= 25) {
      setProgressColor("red-500");
    } else if (progress <= 70) {
      setProgressColor("yellow-500");
    } else {
      setProgressColor("green-100");
    }
  };

  React.useEffect(() => {
    const handleBoth = async () => {
      await handleProgress(); // handleProgress가 끝난 후
      handleProgressColor(); // handleProgressColor 실행
    };

    handleBoth();
  }, []);

  return (
    <Link
      href={`/curriculum/lecture/${curriculumLectures[0]?.category.toLowerCase()}`}
      className="flex gap-6"
    >
      <div
        className={`flex h-full w-64 rounded-xl bg-cover p-6 shadow-lg transition-all duration-300 hover:scale-105 ${bgColor[index]}`}
      ></div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-semibold">{`STEP 0${index + 1}`}</span>
            <Dot />
            <span className="font-semibold">
              {curriculumLectures[0] &&
                lectureCategorySwap[curriculumLectures[0].category]}
            </span>
          </div>
          <div className="group relative flex h-8 w-20">
            <div className="relative z-10 flex w-full items-center justify-center gap-1">
              <span className="pl-1 text-sm font-semibold text-white">
                학습하기
              </span>
              <ChevronRight
                width={16}
                height={16}
                strokeWidth={2.8}
                className="cursor-pointer"
                stroke="#ffffff"
                fill="#000000"
              />
            </div>
            <div className="absolute right-0 top-1 z-0 h-6 w-6 rounded-full bg-black transition-all duration-300 group-hover:top-0 group-hover:h-full group-hover:w-full" />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-600">강의 수</span>
          <span className="font-semibold">{curriculumLectures.length}개</span>
        </div>
        <div className="flex gap-6">
          <span className="text-neutral-600">책갈피</span>
          <span className="font-semibold">
            {progress === 100
              ? "수강 완료"
              : progress === 0
                ? "수강 전"
                : `${userCurriculum?.curriculumIndex + 1}강`}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-600">진도율</span>
          <Progress
            value={progress}
            className={`w-[60%] ${
              progressColor === "[&>*]:bg-red-500"
                ? "[&>*]:bg-red-500"
                : progressColor === "[&>*]:bg-yellow-500"
                  ? "[&>*]:bg-yellow-500"
                  : "[&>*]:bg-green-100"
            } `}
          />
          <span className="text-lg font-semibold text-neutral-700">
            {progress}%
          </span>
        </div>
      </div>
    </Link>
  );
}
