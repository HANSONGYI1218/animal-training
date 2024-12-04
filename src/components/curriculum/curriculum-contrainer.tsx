"use client";

import { useState } from "react";
import CurriculumNav from "./curriculum-nav";
import TraningFiltering from "./training-center-filtering";
import TraningCenterPromotion from "./training-center-promotion";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import CurriculumLectureCard from "./curriculum-lecture-card";
import { Badge } from "../ui/badge";
import { GetUserByCurriculumDto } from "@/dtos/user.dto";
import { AnimalType } from "@/types/tyeps.all";

export default function CurriculumContainer({
  curriculumLectures,
  user,
}: {
  curriculumLectures: CurriculumLectureDto[];
  user: GetUserByCurriculumDto;
}) {
  const [tab, setTab] = useState("lecture");
  const [selectIndex, setSelectIndex] = useState<number>(0);

  // 1. Dog와 Cat으로 분리
  const catLecturesArray = curriculumLectures.filter(
    (lecture) => lecture.animal_type === AnimalType.CAT,
  );
  const dogLecturesArray = curriculumLectures.filter(
    (lecture) => lecture.animal_type === AnimalType.DOG,
  );

  // 2. index로 정렬
  const sortedCatLectures = catLecturesArray.sort((a, b) => a.index - b.index);
  const sortedDogLectures = dogLecturesArray.sort((a, b) => a.index - b.index);

  // 3. category로 그룹화
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

  const catLectures = groupByCategory(sortedCatLectures);
  const dogLectures = groupByCategory(sortedDogLectures);

  return (
    <div className="container mx-auto flex max-w-[1150px] flex-col gap-12">
      <CurriculumNav tab={tab} setTab={setTab} />

      {tab === "lecture" ? (
        <>
          <div className="flex gap-6">
            {user?.lastVideoIndexs?.map(
              (index, i) =>
                index !== -2 && (
                  <Badge
                    key={i}
                    onClick={() => setSelectIndex(i)}
                    variant={"tag"}
                    className={`cursor-pointer ${selectIndex === i && "bg-black text-white"}`}
                  >
                    {i === 0 ? "강아지" : "고양이"}
                  </Badge>
                ),
            )}
          </div>
          <div className="flex flex-col gap-6">
            {Object.entries(selectIndex === 0 ? dogLectures : catLectures).map(
              ([key, values], index) => {
                return (
                  <CurriculumLectureCard
                    key={key}
                    totalLecturesCount={selectIndex === 0 ? 12 : 9}
                    groupName={key}
                    lectures={values as CurriculumLectureDto[]}
                    index={index}
                    lastVideoIndex={user?.lastVideoIndexs[selectIndex]}
                  />
                );
              },
            )}
          </div>
        </>
      ) : (
        <div className="relative flex w-full gap-6">
          <TraningFiltering />
          <TraningCenterPromotion />
        </div>
      )}
    </div>
  );
}
