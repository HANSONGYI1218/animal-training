import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { CirclePlay } from "lucide-react";
import Link from "next/link";

export default function LectureSection({
  lecture,
}: {
  lecture: CurriculumLectureDto;
}) {
  return (
    <div
      className="my-2 flex h-8 cursor-pointer items-center justify-between text-base text-gray-600"
      key={lecture?.id}
    >
      <Link
        href={`/curriculum/lecture/${lecture?.category.toLowerCase()}/${lecture?.id}`}
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
      <span className="self-end">{lecture?.videoTime}</span>
    </div>
  );
}
