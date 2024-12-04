"use client";

import { ChevronRight, Dot } from "lucide-react";
import Link from "next/link";
import { Progress } from "../ui/progress";
import React from "react";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { AnimalType } from "@prisma/client";

const dogBgColor = [
  "bg-dog-communication-pattern",
  "bg-dog-training-pattern",
  "bg-dog-beauty-pattern",
];

const catBgColor = [
  "bg-cat-communication-pattern",
  "bg-cat-training-pattern",
  "bg-cat-beauty-pattern",
];

export default function CurriculumLectureCard({
  totalLecturesCount,
  lectures,
  groupName,
  lastVideoIndex,
  index,
}: {
  totalLecturesCount: number;
  lectures: CurriculumLectureDto[];
  groupName: string;
  lastVideoIndex: number;
  index: number;
}) {
  const [progress, setProgress] = React.useState(0);
  const [progressColor, setProgressColor] = React.useState<string>("");

  const handleProgress = async () => {
    if (lastVideoIndex >= lectures[lectures.length - 1]?.index) {
      setProgress(100);
    } else if (lastVideoIndex < lectures[0]?.index) {
      setProgress(0);
    } else {
      setProgress((lastVideoIndex / totalLecturesCount) * 100);
    }
  };

  React.useEffect(() => {
    const handleBoth = async () => {
      await handleProgress(); // handleProgress가 끝난 후
    };

    handleBoth();
  }, []);

  return (
    <Link
      href={{
        pathname: `/curriculum/lecture/${lectures[0]?.category.toLowerCase()}`,
        query: {
          animalType: lectures[0].animal_type.toLowerCase(),
        },
      }}
      className="flex gap-6"
    >
      <div
        className={`flex h-60 w-64 rounded-xl bg-cover p-6 shadow-lg transition-all duration-300 hover:scale-105 ${lectures[0].animal_type === AnimalType.DOG ? dogBgColor[index] : catBgColor[index]}`}
      />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-semibold">{`STEP 0${index + 1}`}</span>
            <Dot />
            <span className="font-semibold">{groupName}</span>
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
          <span className="font-semibold">{lectures?.length}개</span>
        </div>
        <div className="flex gap-6">
          <span className="text-neutral-600">책갈피</span>
          <span className="font-semibold">
            {progress === 100
              ? "수강 완료"
              : progress === 0
                ? "수강 전"
                : `${lastVideoIndex + 1}강`}
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-neutral-600">진도율</span>
          <Progress
            value={Math.ceil(progress)}
            className={`w-[60%] ${
              progressColor === "[&>*]:bg-red-500"
                ? "[&>*]:bg-red-500"
                : progressColor === "[&>*]:bg-yellow-500"
                  ? "[&>*]:bg-yellow-500"
                  : "[&>*]:bg-green-100"
            } `}
          />
          <span className="text-lg font-semibold text-neutral-700">
            {Math.ceil(progress)}%
          </span>
        </div>
      </div>
    </Link>
  );
}
