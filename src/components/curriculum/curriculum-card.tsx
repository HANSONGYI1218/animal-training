import { categorySwap } from "@/constants/constants.all";
import { ChevronDown, ChevronRight, Dot } from "lucide-react";
import Link from "next/link";
import { Progress } from "../ui/progress";
import React from "react";
import { UserCurriculum } from "@/types/tyeps.all";

const bgColor = [
  "bg-gradient-to-r from-orange-500 to-pink-500",
  "bg-gradient-to-r from-yellow-300 to-emerald-500",
  "bg-gradient-to-r from-cyan-500 to-blue-500",
];

export default function CurriculumCard({
  curriculumTitles,
  currentCurriculum,
  category,
  index,
}: {
  curriculumTitles: string[];
  currentCurriculum: UserCurriculum;
  category: string;
  index: number;
}) {
  const [progress, setProgress] = React.useState(13);

  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex gap-6">
      <div
        className={`relative flex h-full w-64 flex-col items-center justify-center gap-2 rounded-xl border p-6 ${bgColor[index]}`}
      >
        <div className="absolute left-1/2 top-1/2 z-10 h-48 w-48 -translate-x-1/2 -translate-y-1/2 bg-white blur-2xl" />
        <div className="relative z-20 flex flex-col items-center gap-2">
          <span className="text-lg font-semibold">{category}</span>
          <span className="text-lg font-semibold">
            {categorySwap[category]}
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-semibold">{`STEP 0${index + 1}`}</span>
            <Dot />
            <span className="font-semibold">{`${categorySwap[category]}`}</span>
          </div>
          <Link
            href={`/curriculum/lecture/${category.toLowerCase()}`}
            className="group relative flex h-8 w-20"
          >
            <div className="relative z-10 flex w-full items-center justify-center gap-1">
              <span className="pl-1 text-sm font-semibold text-white">
                학습하기
              </span>
              <ChevronRight
                width={16}
                height={16}
                strokeWidth={2.8}
                className="cursor-pointer"
                stroke="#ffffff"
                fill="#000000"
              />
            </div>
            <div className="absolute right-0 top-1 z-0 h-6 w-6 rounded-full bg-black transition-all duration-300 group-hover:top-0 group-hover:h-full group-hover:w-full" />
          </Link>
        </div>
        <span>{curriculumTitles.length}개 강의</span>
        <div className="flex items-center gap-6">
          <span>진도율</span>
          <Progress value={progress} className="w-[60%]" />
          <span className="text-lg font-semibold text-neutral-700">
            {progress}%
          </span>
        </div>
        <div className="flex gap-6">
          <span>책갈피</span>
          <span>
            {currentCurriculum?.currentIndex}강 |{" "}
            {curriculumTitles[currentCurriculum?.currentIndex - 1]}
          </span>

          {/* <div className="scroll_color flex h-28 flex-col overflow-y-auto pr-2">
            {curriculumTitles.map((title: string, index: number) => {
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 border-b px-3 py-4"
                >
                  <span>{index + 1}강</span>
                  <span>|</span>
                  <span>{title}</span>
                </div>
              );
            })}
          </div> */}
        </div>
      </div>
    </div>
  );
}
