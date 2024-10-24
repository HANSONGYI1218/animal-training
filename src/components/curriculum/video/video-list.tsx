"use client";

import { GetCurriculumLectureDto } from "@/dtos/curriculum-lecture.dtos";
import { CirclePlay, ScreenShare } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VideoList({
  lecture,
}: {
  lecture: GetCurriculumLectureDto;
}) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href={`/curriculum/lecture/${lecture?.category.toLowerCase()}/${lecture?.id}`}
      onMouseOver={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      className="group my-2 flex h-8 cursor-pointer items-center justify-between gap-6 text-base text-gray-600"
      key={lecture?.id}
    >
      <div className="relative flex h-full flex-1 items-center gap-2">
        <CirclePlay
          width={20}
          height={20}
          stroke="rgb(203 213 225)"
          strokeWidth={1.4}
        />
        <span className="flex-1 text-slate-300"> {lecture?.title}</span>
        {isHovered && (
          <>
            <div className="absolute left-0 top-0 h-full w-full group-hover:blur-sm" />
          </>
        )}
      </div>
      {isHovered ? (
        <ScreenShare stroke="#ffffff" />
      ) : (
        <span className="self-end text-slate-300">03:56</span>
      )}
    </Link>
  );
}
