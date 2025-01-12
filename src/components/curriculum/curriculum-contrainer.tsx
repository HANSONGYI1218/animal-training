"use client";

import { useState } from "react";
import CurriculumNav from "./curriculum-nav";
import TraningFiltering from "./training-center-filtering";
import TraningCenterPromotion from "./training-center-promotion";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import Image from "next/image";
import LectureList from "./lecture-list";
import CurriculumLecturePromotion from "./learning/lecture-promotion";
import LectureChart from "./lecture-chart";

export default function CurriculumContainer({
  curriculumLectures,
  userCurriculum,
}: {
  curriculumLectures: CurriculumLectureDto[];
  userCurriculum: GetUserCurriculumDto | null;
}) {
  const [tab, setTab] = useState("lecture");
  const [selectIndex, setSelectIndex] = useState<number>(0);

  const lastVideoIndex = curriculumLectures.findIndex(
    (lecture) => lecture.id === userCurriculum?.lastVideoId,
  );

  const groupByCategory = (lectures: CurriculumLectureDto[]) => {
    return lectures.reduce((groups: any, lecture: CurriculumLectureDto) => {
      const { category } = lecture;

      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(lecture);

      return groups;
    }, {});
  };

  const groupLectures = groupByCategory(curriculumLectures);

  return (
    <div className="container mx-auto flex w-full max-w-[1150px] flex-col gap-12">
      <CurriculumNav tab={tab} setTab={setTab} />

      {userCurriculum ? (
        <div className="relative flex w-full gap-6">
          {tab === "lecture" ? (
            <>
              <div className="relative flex w-full flex-col gap-12">
                <LectureChart
                  lectures={curriculumLectures}
                  lastVideoIndex={lastVideoIndex}
                  curriculumStatus={userCurriculum?.curriculumStep}
                />
                <LectureList
                  groupLectures={groupLectures}
                  lastVideoIndex={lastVideoIndex}
                  lastVideoTime={userCurriculum?.lastVideoTime}
                />
              </div>
              <CurriculumLecturePromotion
                lastVideoId={userCurriculum?.lastVideoId}
                lastVideoIndex={lastVideoIndex}
              />
            </>
          ) : (
            <>
              <TraningFiltering />
              <TraningCenterPromotion />
            </>
          )}
        </div>
      ) : (
        <div className="flex min-h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border py-6 text-center text-sm">
          <Image
            src="/icons/general-face.svg"
            height={30}
            width={30}
            alt="face"
          />
          진행중인 커리큘럼 없어요!
          <br />
          반려동물을 입양해보세요!
        </div>
      )}
    </div>
  );
}
