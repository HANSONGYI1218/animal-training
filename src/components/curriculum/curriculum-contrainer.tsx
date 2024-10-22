"use client";

import { CurriculumLecture, UserCurriculum } from "@/types/tyeps.all";
import { useState } from "react";
import CurriculumNav from "./curriculum-nav";
import CurriculumCard from "./curriculum-card";
import dummydata from "@/utils/dummydata";
import TraningFiltering from "./training-center-filtering";
import TraningCenterPromotion from "./training-center-promotion";
import { lectureCategorySwap } from "@/constants/constants.all";

export default function CurriculumContainer({
  curriculums,
  currentCurriculum,
}: {
  curriculums: CurriculumLecture[];
  currentCurriculum: UserCurriculum;
}) {
  const [tab, setTab] = useState("lecture");

  const categorizedCurriculums = Object.values(lectureCategorySwap).map(
    (category) =>
      curriculums
        .filter((item) => item.category === category)
        .map((item) => item.title),
  );

  const trainingCenters = dummydata.traningCenterData;

  return (
    <div className="container mx-auto flex max-w-[1150px] flex-col gap-12">
      <CurriculumNav tab={tab} setTab={setTab} />
      {tab === "lecture" ? (
        <div className="flex flex-col gap-6">
          {categorizedCurriculums.map((item: string[], index: number) => {
            return (
              <CurriculumCard
                key={index}
                curriculumTitles={item}
                currentCurriculum={currentCurriculum}
                category={Object.values(lectureCategorySwap)[index]}
                index={index}
              />
            );
          })}
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
