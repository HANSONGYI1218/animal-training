"use client";

import TouchScroll from "@/components/common/touch-scroll";
import LectureCard from "./lecture-card";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { GetLectureWithTutorDto } from "@/dtos/lecture.dto";

export default function LectureTagSelect({ tags }: { tags: string[] }) {
  const [filterLectures, setFilterLectures] = useState<
    GetLectureWithTutorDto[]
  >([]);
  const [selectTag, setSelectTag] = useState<string>(tags[0]);

  useEffect(() => {
    const getData = async () => {
      const responseLectures = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture?tag=${selectTag}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );
      if (!responseLectures.ok) {
        return null;
      }
      const lectures: GetLectureWithTutorDto[] = await responseLectures.json();

      setFilterLectures(lectures);
    };

    getData();
  }, [selectTag]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        {tags.map((tag, index: number) => {
          return (
            <Badge
              key={index}
              onClick={() => {
                setSelectTag(tag);
              }}
              variant={"tag"}
              className={`cursor-pointer ${selectTag === tag && "bg-black text-white"}`}
            >
              #{tag}
            </Badge>
          );
        })}
      </div>
      <TouchScroll isStepbar>
        {filterLectures.map(
          (tagLecture: GetLectureWithTutorDto, index: number) => (
            <div
              key={index}
              className={`flex h-[371px] min-w-[269px] max-w-[269px]`}
            >
              <LectureCard lecture={tagLecture} />
            </div>
          ),
        )}
      </TouchScroll>
    </div>
  );
}
