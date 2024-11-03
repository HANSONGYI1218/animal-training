"use client";

import { useState } from "react";
import CurriculumNav from "./curriculum-nav";
import { CurriculumCategory } from "@prisma/client";
import TraningFiltering from "./training-center-filtering";
import TraningCenterPromotion from "./training-center-promotion";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import CurriculumLectureCard from "./curriculum-lecture-card";

export type userCurriculumProps = {
  curriculumCategory: CurriculumCategory;
  curriculumIndex: number;
};

export default function CurriculumContainer({
  curriculumLectures,
  userCurriculum,
}: {
  curriculumLectures: CurriculumLectureDto[];
  userCurriculum: userCurriculumProps;
}) {
  const [tab, setTab] = useState("lecture");

  const categorizedCurriculumLectures = Object.values(CurriculumCategory).map(
    (category) => {
      return curriculumLectures.filter((item) => item.category === category);
    },
  );

  return (
    <div className="container mx-auto flex max-w-[1150px] flex-col gap-12">
      <CurriculumNav tab={tab} setTab={setTab} />
      {tab === "lecture" ? (
        <div className="flex flex-col gap-6">
          {categorizedCurriculumLectures.map(
            (lectures: CurriculumLectureDto[], index: number) => {
              return (
                <CurriculumLectureCard
                  key={index}
                  curriculumLectures={lectures}
                  userCurriculum={userCurriculum}
                  index={index}
                />
              );
            },
          )}
        </div>
      ) : (
        <div className="relative flex w-full gap-6">
          <TraningFiltering />
          <TraningCenterPromotion />
        </div>
      )}
    </div>
  );
}
