"use client";

import { useState } from "react";
import CurriculumNav from "./curriculum-nav";
import dummydata from "@/utils/dummydata";
import { CurriculumCategory } from "@prisma/client";
import TraningFiltering from "./training-center-filtering";
import TraningCenterPromotion from "./training-center-promotion";
import { GetCurriculumLectureDto } from "@/dtos/curriculum-lecture.dtos";
import CurriculumLectureCard from "./curriculum-lecture-card";
import { GetUserCurriculumDto } from "@/dtos/user-curriculum.dtos";

export default function CurriculumContainer({
  curriculumLectures,
  userCurriculum,
}: {
  curriculumLectures: GetCurriculumLectureDto[];
  userCurriculum: GetUserCurriculumDto;
}) {
  const [tab, setTab] = useState("lecture");

  const categorizedCurriculumLectures = Object.values(CurriculumCategory).map(
    (category) => {
      return curriculumLectures.filter((item) => item.category === category);
    },
  );

  const trainingCenters = dummydata.traningCenterData;

  return (
    <div className="container mx-auto flex max-w-[1150px] flex-col gap-12">
      <CurriculumNav tab={tab} setTab={setTab} />
      {tab === "lecture" ? (
        <div className="flex flex-col gap-6">
          {categorizedCurriculumLectures.map(
            (lectures: GetCurriculumLectureDto[], index: number) => {
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
          <TraningFiltering trainingCenters={trainingCenters} />
          <TraningCenterPromotion />
        </div>
      )}
    </div>
  );
}
