"use client";

import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserByCurriculumDto } from "@/dtos/user.dto";
import { formatTime } from "@/utils/utils";
import { AnimalType } from "@prisma/client";
import { CirclePlay } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function SectionCard({
  lecture,
  user,
}: {
  lecture: CurriculumLectureDto;
  user: GetUserByCurriculumDto;
}) {
  return (
    <div
      className="my-2 flex h-8 cursor-pointer items-center justify-between text-base text-gray-600"
      key={lecture?.id}
    >
      <Link
        href={{
          pathname: `/curriculum/lecture/${lecture?.category.toLowerCase()}/${lecture?.id}`,
          query: {
            animalType: lecture.animal_type.toLowerCase(),
          },
        }}
        onClick={(e) => {
          if (
            user?.lastVideoIndexs[
              lecture.animal_type === AnimalType.DOG ? 0 : 1
            ] < lecture?.index
          ) {
            e.preventDefault(); // 조건에 맞지 않으면 이동을 막음
            toast("현재 강의를 모두 수강해야 다음 회차로 넘어갑니다.", {
              description: "강의를 모두 수강해주세요!",
            });
          }
        }}
        className="group relative flex h-full flex-1 items-center gap-2"
      >
        <div className="absolute left-0 top-0 z-0 h-full w-6 rounded-full duration-500 group-hover:w-24 group-hover:bg-black" />
        <div className="relative z-10 flex w-fit items-center gap-2 px-2">
          <CirclePlay
            width={20}
            height={20}
            stroke="rgb(75 85 99)"
            strokeWidth={1.4}
            className="group-hover:stroke-white"
          />
          <span className="hidden text-sm font-semibold text-white group-hover:flex">
            바로가기
          </span>
        </div>
        <span className="flex-1"> {lecture?.title}</span>
      </Link>
      <span className={`self-end`}>
        {user?.lastVideoIndexs[
          lecture.animal_type === AnimalType.DOG ? 0 : 1
        ] === lecture?.index
          ? formatTime(
              user?.lastVideoTimes[
                lecture.animal_type === AnimalType.DOG ? 0 : 1
              ],
            )
          : user?.lastVideoIndexs[
                lecture.animal_type === AnimalType.DOG ? 0 : 1
              ] < lecture?.index
            ? "0%"
            : "100%"}
        {}
      </span>
    </div>
  );
}
