"use client";

import LectureCard from "./lecture-card";
import { useEffect, useState } from "react";
import { Lecture, Tutor } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GetLectureDto } from "@/dtos/lecture.dto";
import { useSession } from "next-auth/react";
import { GetAllTutorDto } from "@/dtos/tutor.dto";

export type BookmarkProps = {
  id: string;
  lecture: Lecture;
};

export type BookmarkTutorProps = {
  id: string;
  tutor: Tutor;
};

export default function LectureTab() {
  const { data: session, status } = useSession();

  const [isLoading, setIsLoading] = useState(false);
  const [lectures, setLectures] = useState<GetLectureDto[] | null>(null);
  const [tutors, setTutors] = useState<GetAllTutorDto[] | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const [lecturesResponse, tutorsResponse] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture?corporationId=${session?.user?.id}`,
          {
            method: "GET",
          },
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor?corporationId=${session?.user?.id}`,
          {
            method: "GET",
          },
        ),
      ]);

      // Check if both responses are ok
      if (!lecturesResponse.ok || !tutorsResponse.ok) {
        return null;
      }

      // Parse JSON responses
      const [lectures, tutors] = await Promise.all([
        lecturesResponse.json(),
        tutorsResponse.json(),
      ]);

      setLectures(lectures);
      setTutors(tutors);
      setIsLoading(false);
    };

    getData();
  }, [session?.user?.id]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center justify-end gap-3">
        <Link
          href={"/mypage/corporation/curriculum/new/lecture"}
          onClick={(e) => {
            if (!tutors || tutors.length === 0) {
              e.preventDefault(); // 이동 차단
            }
          }}
        >
          <Button
            disabled={!tutors || tutors.length === 0}
            variant="destructive"
            className="flex h-9 gap-1 px-2"
          >
            <Plus className="h-5 w-5" />
            강의 생성
          </Button>
        </Link>
        <Button
          variant="destructive"
          className="flex h-9 gap-1 px-2"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          <Pencil className="h-4 w-4" />
          {isEdit ? " 완료" : "편집"}
        </Button>
      </div>
      <section className="flex flex-col">
        {isLoading ? (
          <div className="flex min-h-40 w-full flex-col items-center justify-center py-6 text-center">
            <Loader2 className="animate-spin" />
          </div>
        ) : lectures && lectures?.length > 0 ? (
          <>
            <span className="text-lg font-semibold">기업 강의</span>
            <div className="flex flex-col gap-6 p-6">
              <div className="grid w-full grid-cols-2 gap-6">
                {lectures &&
                  lectures.map((lecture, index) => (
                    <LectureCard
                      key={index}
                      lecture={lecture}
                      isEdit={isEdit}
                    />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border py-6 text-center text-sm">
            <Image
              src="/icons/general-face.svg"
              height={30}
              width={30}
              alt="face"
            />
            먼저 강사를 생성해보세요!
          </div>
        )}
      </section>
    </div>
  );
}
