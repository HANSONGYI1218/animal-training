"use client";

import LectureCard from "./lecture-card";
import { useContext, useEffect, useState } from "react";
import { Lecture, Tutor } from "@prisma/client";
import { Badge } from "../../../ui/badge";
import { UserContext } from "../../../../providers/user-provider";
import TutorCard from "./tutor-card";

export type BookmarkProps = {
  id: string;
  lecture: Lecture;
};

export type BookmarkTutorProps = {
  id: string;
  tutor: Tutor;
};

export default function LectureTab() {
  const user = useContext(UserContext);

  const bookmarkLectures: BookmarkProps[] = (user?.lectureBookmarks || []).map(
    (bookmark) => ({
      id: bookmark.id, // 북마크 ID
      lecture: bookmark.lecture, // 관련 강의 정보
    }),
  );

  const bookmarkTutors: BookmarkTutorProps[] = (user?.tutorBookmarks || []).map(
    (bookmark) => ({
      id: bookmark.id, // 북마크 ID
      tutor: bookmark.tutor, // 관련 강사 정보
    }),
  );

  const [selectCategory, setSelectCategory] = useState("lecture");

  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-6">
        <Badge
          onClick={() => {
            setSelectCategory("lecture");
          }}
          variant={"tag"}
          className={`cursor-pointer ${selectCategory === "lecture" && "bg-black text-white"}`}
        >
          강의
        </Badge>
        <Badge
          onClick={() => {
            setSelectCategory("tutor");
          }}
          variant={"tag"}
          className={`cursor-pointer ${selectCategory === "tutor" && "bg-black text-white"}`}
        >
          강사
        </Badge>
      </section>

      <section className="flex flex-col">
        {selectCategory === "lecture" ? (
          <>
            <span className="text-lg font-semibold">북마크한 강의</span>
            <div className="flex flex-col gap-6 p-6">
              <div className="grid w-full grid-cols-2 gap-6">
                {bookmarkLectures &&
                  bookmarkLectures.map((bookmarkLecture, index) => (
                    <LectureCard key={index} bookmark={bookmarkLecture} />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="text-lg font-semibold">북마크한 강사</span>
            <div className="flex flex-col gap-6 p-6">
              <div className="grid w-full grid-cols-4 gap-6">
                {bookmarkTutors &&
                  bookmarkTutors.map((bookmarkTutor, index) => (
                    <TutorCard key={index} bookmark={bookmarkTutor} />
                  ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
