"use client";

import LectureCard from "./lecture-card";
import { useContext, useEffect, useState } from "react";
import { Lecture, Tutor } from "@prisma/client";
import { Badge } from "../../../../ui/badge";
import TutorCard from "./tutor-card";
import { CorporationContext } from "../../../../../providers/corporation-provider";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export type BookmarkProps = {
  id: string;
  lecture: Lecture;
};

export type BookmarkTutorProps = {
  id: string;
  tutor: Tutor;
};

export default function LectureTab() {
  const corporation = useContext(CorporationContext);

  const lectures: Lecture[] = (corporation?.tutors ?? []).flatMap(
    (tutor) => tutor.lectures ?? [],
  );

  const tutors: Tutor[] = corporation?.tutors ?? [];

  const [selectCategory, setSelectCategory] = useState("");

  useEffect(() => {
    const referrer = document.referrer;
    if (
      referrer.includes("/curriculum/new/tutor") ||
      /\/curriculum\/[^/]+\/tutor/.test(referrer)
    ) {
      setSelectCategory("tutor");
    } else {
      setSelectCategory("lecture");
    }
  }, []);

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
      <section className="flex items-center justify-end">
        <Link
          href={
            selectCategory === "lecture"
              ? "/mypage/corporation/curriculum/new/lecture"
              : "/mypage/corporation/curriculum/new/tutor"
          }
        >
          <Button variant="destructive" className="flex h-9 gap-1 px-2">
            <Plus className="h-5 w-5" />
            {selectCategory === "lecture" ? "강의 생성" : "강사 생성"}
          </Button>
        </Link>
      </section>
      <section className="flex flex-col">
        {selectCategory === "lecture" ? (
          <>
            <span className="text-lg font-semibold">기업 강의</span>
            <div className="flex flex-col gap-6 p-6">
              <div className="grid w-full grid-cols-2 gap-6">
                {lectures &&
                  lectures.map((lecture, index) => (
                    <LectureCard key={index} lecture={lecture} />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="text-lg font-semibold">기업 강사</span>
            <div className="flex flex-col gap-6 p-6">
              <div className="grid w-full grid-cols-4 gap-6">
                {tutors &&
                  tutors.map((tutor, index) => (
                    <TutorCard key={index} tutor={tutor} />
                  ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
