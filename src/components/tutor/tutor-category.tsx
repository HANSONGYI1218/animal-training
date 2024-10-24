"use client";

import { Category } from "@/types/tyeps.all";
import { categorySwap } from "@/constants/constants.all";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import LectureContainer from "../lecture/lecture-container";
import { GetLectureDto } from "@/dtos/lecture.dtos";
import { GetTutorDto } from "@/dtos/tutor.dtos";

export default function TutorCategory({
  lectures,
}: {
  lectures: GetLectureDto[];
}) {
  const [filterLectures, setFilterLectures] =
    useState<GetLectureDto[]>(lectures);
  const [selectCategory, setSelectCategory] = useState<string>("ALL");

  useEffect(() => {
    const getLectures = lectures.filter((lecture) => {
      const matchesCategory =
        selectCategory === "ALL" || lecture.category === selectCategory;

      return matchesCategory;
    });

    setFilterLectures(getLectures);
  }, [selectCategory, lectures]);

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full justify-center gap-6">
        <Badge
          onClick={() => {
            setSelectCategory("ALL");
          }}
          variant={"tag"}
          className={`cursor-pointer ${selectCategory === "ALL" && "bg-black text-white"}`}
        >
          전체
        </Badge>
        {Object.values(Category).map((value, index: number) => {
          console.log("value, ", value);
          return (
            <Badge
              onClick={() => {
                setSelectCategory(value);
              }}
              key={index}
              variant={"tag"}
              className={`cursor-pointer ${selectCategory === value && "bg-black text-white"}`}
            >
              {categorySwap[value]}
            </Badge>
          );
        })}
      </div>
      <LectureContainer lectures={filterLectures} />
    </div>
  );
}
