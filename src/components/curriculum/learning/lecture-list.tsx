"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import React from "react";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import SectionCard from "@/components/curriculum/learning/lecture-section";
import { lectureCategorySwap } from "@/constants/constants.all";

type GroupedLectures = {
  [category: string]: CurriculumLectureDto[];
};

export default function LectureList({
  groupLectures,
  lastVideoIndex,
  learningAgreementUrl,
  adoptionId,
  lastVideoTime,
}: {
  groupLectures: GroupedLectures[];
  lastVideoIndex: number;
  learningAgreementUrl: string;
  adoptionId: string;
  lastVideoTime: string;
}) {
  const totalVideoTime = (lectureList: any) => {
    // 모든 강의의 시간 합산 (초 단위로 계산)
    const totalSeconds = lectureList.reduce((sum: number, lecture: any) => {
      if (lecture?.videoTime) {
        const [minutes, seconds] = lecture.videoTime.split(":").map(Number); // "분:초"를 [분, 초]로 분리
        sum += minutes * 60 + seconds; // 분을 초로 변환 후 더하기
      }
      return sum;
    }, 0);

    // 총 초를 시, 분으로 변환
    const hours = Math.floor(totalSeconds / 3600); // 총 초를 시로 변환
    const minutes = Math.floor((totalSeconds % 3600) / 60); // 나머지 초를 분으로 변환

    // 1시간 이상일 경우 "시:분" 형태로 반환, 아니면 "분"만 반환
    if (hours > 0) {
      return `${hours}시간 ${minutes}분`;
    } else {
      return `${minutes}분`;
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Accordion
        type="multiple"
        defaultValue={Object.keys(groupLectures).map(
          (category) => `item-${category}`,
        )}
        className="flex flex-1 flex-col gap-6"
      >
        {Object.entries(groupLectures).map(([category, lectureList], index) => {
          const totalLearningTime = totalVideoTime(lectureList);
          return (
            <AccordionItem value={`item-${category}`} key={index}>
              <AccordionTrigger className="flex items-center gap-4">
                <div className="flex flex-1 items-center justify-between">
                  <span className="text-lg font-semibold">
                    섹션 {index + 1}. {lectureCategorySwap[category]}
                  </span>
                  <span className="text-md font-semibold">{`${lectureList?.length}개 (${totalLearningTime})`}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="flex gap-2 py-4">
                <div className="flex w-2 bg-green-60"></div>
                <div className="mx-4 flex flex-1 flex-col">
                  {(lectureList as any).map((lecture: CurriculumLectureDto) => {
                    return (
                      <SectionCard
                        key={lecture?.id}
                        lecture={lecture}
                        learningAgreementUrl={learningAgreementUrl}
                        lastVideoIndex={lastVideoIndex}
                        adoptionId={adoptionId}
                        lastVideoTime={lastVideoTime}
                      />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
