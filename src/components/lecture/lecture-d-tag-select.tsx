"use client";

import TouchScroll from "@/components/common/touch-scroll";
import { Lecture } from "@/types/tyeps.all";
import LectureCard from "./lecture-card";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";

export default function LectureTagSelect({
  tags,
  tagLectures,
}: {
  tags: string[];
  tagLectures: Lecture[];
}) {
  const [filterLectures, setFilterLectures] = useState<Lecture[]>(tagLectures);
  const [selectTag, setSelectTag] = useState<number>(0);

  useEffect(() => {
    if (selectTag === tags.length) {
      setFilterLectures(tagLectures);
    } else {
      const getLectures = tagLectures.filter((lecture) =>
        lecture.tag.includes(tags[selectTag]),
      );
      setFilterLectures(getLectures);
    }
  }, [selectTag]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        <Badge
          onClick={() => {
            setSelectTag(tags.length);
          }}
          variant={"tag"}
          className={`cursor-pointer ${selectTag === tags.length && "bg-black text-white"}`}
        >
          #전체
        </Badge>
        {tags.map((tag, index: number) => {
          return (
            <Badge
              onClick={() => {
                setSelectTag(index);
              }}
              variant={"tag"}
              className={`cursor-pointer ${selectTag === index && "bg-black text-white"}`}
            >
              #{tag}
            </Badge>
          );
        })}
      </div>
      <TouchScroll>
        {filterLectures.map((tagLecture: Lecture, index: number) => (
          <div
            className={`flex h-[311px] w-full min-w-[269px] max-w-[269px]`}
            key={index}
          >
            <LectureCard lecture={tagLecture} />
          </div>
        ))}
      </TouchScroll>
    </div>
  );
}
