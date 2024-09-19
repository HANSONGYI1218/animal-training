"use client";

import { Lecture } from "@/types/tyeps.all";
import LectureCard from "./lecture-card";
import { useEffect, useState } from "react";
import SearchBox from "../common/search-box";
import SelectBox from "../common/select-box";
import { PriceType } from "@/types/tyeps.all";
import { SortType } from "@/constants/constants.all";

interface LectureContainerProps {
  lectures: Lecture[];
}

export default function LectureContainer({ lectures }: LectureContainerProps) {
  const [lecturesData, setLecturesData] = useState(lectures);
  const [priceState, setPriceState] = useState("전체");
  const [sort, setSort] = useState("최신순");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filteredLectures = lectures.filter((lecture: Lecture) => {
      if (priceState && priceState !== "전체" && search) {
        return (
          lecture.price_type === priceState && lecture.title.includes(search)
        );
      }
      if (priceState && priceState !== "전체") {
        return lecture.price_type === priceState;
      }
      if (search) {
        return lecture.title.includes(search);
      }
      return true;
    });

    const sortedLectures = filteredLectures.sort((a, b) => {
      if (sort === "오래된순") {
        return b.createdAt.getTime() - a.createdAt.getTime();
      }
      if (sort === "최신순") {
        return a.createdAt.getTime() - b.createdAt.getTime();
      }
      if (sort === "인기순") {
        return b.like - a.like;
      }
      return 0;
    });

    setLecturesData(sortedLectures);
  }, [priceState, sort, search, lectures]);

  return (
    <section className="flex w-full flex-col px-5">
      <div className="my-12 flex h-10 items-center justify-between gap-2">
        <div className="flex gap-2">
          <SelectBox
            lists={["전체", PriceType.FREE, PriceType.PAID]}
            useStateF={setPriceState}
            placeholder="가격"
            className="w-24"
          />
          <SelectBox
            lists={[SortType.ASC, SortType.DESC, SortType.POPULARITY]}
            useStateF={setSort}
            placeholder={SortType.ASC}
            className="w-32"
          />
        </div>
        <SearchBox
          useStateF={setSearch}
          placeholder="보고 싶은 강의를 찾아보세요"
          className="w-96"
        />
      </div>

      <div className="grid w-full grid-cols-4 gap-6">
        {lecturesData.map((lecture: Lecture, index: number) => {
          return <LectureCard key={index} lecture={lecture} />;
        })}
      </div>
    </section>
  );
}
