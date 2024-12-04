"use client";

import { AnimalType } from "@/types/tyeps.all";
import LectureCard from "./lecture-card";
import { useEffect, useState } from "react";
import SearchBox from "../common/search-box";
import SelectBox from "../common/select-box";
import { PriceType } from "@/types/tyeps.all";
import {
  animalTypeSwap,
  getAnimalTypeByValue,
  getPriceTypeByValue,
  priceTypeSwap,
  SortType,
} from "@/constants/constants.all";
import LecturePromotion from "./lecture-promotion";
import { GetLectureWithTutorDto } from "@/dtos/lecture.dto";
import { GetTutorDto } from "@/dtos/tutor.dto";

interface LectureContainerProps {
  lectures: GetLectureWithTutorDto[];
  isPromotion?: boolean;
  tutors?: GetTutorDto[];
}

export default function LectureContainer({
  lectures,
  isPromotion,
  tutors,
}: LectureContainerProps) {
  const [lecturesData, setLecturesData] = useState(lectures);
  const [animalType, setAnimalType] = useState("전체");
  const [priceState, setPriceState] = useState("전체");
  const [sort, setSort] = useState("최신순");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const filteredLectures = lectures.filter(
      (lecture: GetLectureWithTutorDto) => {
        const matchesPrice =
          !priceState ||
          priceState === "전체" ||
          lecture.price_type === getPriceTypeByValue(priceState);

        const matchesType =
          !animalType ||
          animalType === "전체" ||
          lecture.animal_type === getAnimalTypeByValue(animalType);

        const matchesSearch =
          search.length === 0 ||
          lecture.content.includes(search) ||
          lecture.title.includes(search);

        return matchesPrice && matchesSearch && matchesType;
      },
    );

    const sortedLectures = filteredLectures.sort((a, b) => {
      if (sort === "오래된순") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      if (sort === "최신순") {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
      if (sort === "인기순") {
        return b.like - a.like;
      }
      return 0;
    });

    setLecturesData(sortedLectures);
  }, [priceState, animalType, sort, search, lectures]);

  return (
    <section className="flex w-full flex-col">
      <div className="container mx-auto my-12 flex h-10 items-center justify-between gap-2 px-5">
        <div className="flex gap-2">
          <SelectBox
            lists={[
              "전체",
              animalTypeSwap[AnimalType.DOG],
              animalTypeSwap[AnimalType.CAT],
            ]}
            useStateF={setAnimalType}
            placeholder="분류"
            className="w-24"
          />
          <SelectBox
            lists={[
              "전체",
              priceTypeSwap[PriceType.FREE],
              priceTypeSwap[PriceType.PAID],
            ]}
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
      <div className="container mx-auto grid w-full grid-cols-4 gap-6 px-5">
        {lecturesData &&
          lecturesData
            .slice(0, 20)
            .map((lecture: GetLectureWithTutorDto, index: number) => {
              return <LectureCard key={index} lecture={lecture} />;
            })}
      </div>
      {isPromotion && tutors && <LecturePromotion tutors={tutors} />}
      <div className="container mx-auto grid w-full grid-cols-4 gap-6 px-5">
        {lecturesData &&
          lecturesData
            .slice(20)
            .map((lecture: GetLectureWithTutorDto, index: number) => {
              return <LectureCard key={index} lecture={lecture} />;
            })}
      </div>
    </section>
  );
}
