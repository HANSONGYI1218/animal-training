"use client";

import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { BadgeCheck, CirclePlay } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useState } from "react";
import AgreementLecture from "./lecture-agreement";

export default function SectionCard({
  lecture,
  lastVideoIndex,
  adoptionId,
  learningAgreementUrl,
  lastVideoTime,
}: {
  lecture: CurriculumLectureDto;
  lastVideoIndex: number;
  adoptionId: string;
  learningAgreementUrl: string;
  lastVideoTime: string;
}) {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <>
      <AgreementLecture
        lectureId={lecture?.id}
        adoptionId={adoptionId}
        isOpened={isOpened}
        setIsOpened={setIsOpened}
      />

      <div
        className="my-2 flex h-8 cursor-pointer items-center justify-between text-base text-gray-600"
        key={lecture?.id}
      >
        <Link
          href={{
            pathname: `/curriculum/lecture/${lecture?.id}`,
          }}
          onClick={(e) => {
            if (lecture?.index === 0 && !learningAgreementUrl) {
              e.preventDefault(); // 처음 강의에서 동의서를 작성하지 않으면 이동을 막음
              setIsOpened(true);
            }
            if (lastVideoIndex < lecture?.index) {
              e.preventDefault(); // 조건에 맞지 않으면 이동을 막음
              toast(
                "현재 강의를 모두 수강해야지 다음 회차로 넘어갈 수 있습니다.",
                {
                  description: "현재 강의를 모두 수강해주세요!",
                },
              );
            }
          }}
          className="group relative flex h-full flex-1 items-center gap-2"
        >
          {lastVideoIndex === lecture?.index ? (
            <div className="relative z-10 flex h-8 w-24 items-center justify-between gap-2 rounded-full bg-black px-2">
              <CirclePlay
                width={20}
                height={20}
                stroke="#ffffff"
                strokeWidth={1.4}
              />
              <span className="group text-sm font-semibold text-white">
                <span className="absolute right-2 top-1.5 opacity-100 duration-500 group-hover:opacity-0">
                  수강중
                </span>
                <span className="absolute right-2 top-1.5 opacity-0 duration-500 group-hover:opacity-100">
                  바로가기
                </span>
              </span>
            </div>
          ) : lastVideoIndex > lecture?.index ? (
            <BadgeCheck stroke="rgb(132 204 22)" fill="rgb(239 246 255)" />
          ) : (
            <CirclePlay
              width={20}
              height={20}
              stroke="rgb(75 85 99)"
              strokeWidth={1.4}
            />
          )}
          <span className="flex-1 underline-offset-4 group-hover:underline">
            {lecture?.title}
          </span>
        </Link>
        <span className={`self-end`}>
          {lastVideoIndex === lecture?.index && lastVideoTime
            ? `${lastVideoTime} / ${lecture?.videoTime}`
            : `${lecture?.videoTime}`}
        </span>
      </div>
    </>
  );
}
