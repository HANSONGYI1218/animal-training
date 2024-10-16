"use client";

import LectureCard from "./lecture-card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../../ui/button";
import { SquareUser } from "lucide-react";
import { useEffect, useState } from "react";
import dummyDate from "@/utils/dummydata";
import { Lecture } from "@prisma/client";
import { Badge } from "../../ui/badge";

export default function LectureTab() {
  const [lectures, setLectures] = useState<Lecture[] | undefined>(undefined);
  const [selectCategory, setSelectCategory] = useState("lecture");

  useEffect(() => {
    const getLectures = dummyDate.lectureData.slice(0, 6);
    setLectures(getLectures);
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

      <section className="flex flex-col">
        {selectCategory === "lecture" ? (
          <>
            <span className="text-lg font-semibold">북마크한 강의</span>
            <div className="flex flex-col gap-6 p-6">
              <div className="grid w-full grid-cols-2 gap-6">
                {lectures &&
                  lectures.map((lecture, index) => (
                    <LectureCard lecture={lecture} key={index} />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="text-lg font-semibold">북마크한 강사</span>
            <div className="flex flex-col gap-6 p-6">
              <div className="grid w-full grid-cols-4 gap-6">
                {lectures &&
                  lectures.map((lecture, index) => (
                    <div
                      key={index}
                      className="group relative flex cursor-pointer flex-col items-center gap-4 p-6"
                    >
                      <div className="absolute left-1/2 top-5 z-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full font-semibold text-white opacity-0 transition-all duration-300 group-hover:bg-black group-hover:bg-opacity-75 group-hover:opacity-100">
                        훈련사
                      </div>

                      <Image
                        src="/Test-tutor.png"
                        width={64}
                        height={64}
                        alt="tutor"
                        className="rounded-full"
                      />
                      <Link href={`/lecture/${lecture?.id}`}>
                        <Button
                          className="flex hidden gap-2 rounded-full group-hover:flex"
                          variant={"destructive"}
                        >
                          <SquareUser className="h-4 w-4" /> 보러가기
                        </Button>
                      </Link>
                      <span className="flex group-hover:hidden">강형욱</span>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
