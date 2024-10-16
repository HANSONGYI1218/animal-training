import LectureBanner from "@/components/lecture/lecture-d-banner";
import dummyDate from "@/utils/dummydata";
import LectureContent from "@/components/lecture/lecture-d-content";
import LectureCard from "@/components/lecture/lecture-card";
import { ChevronRight } from "lucide-react";
import LectureTagSelect from "@/components/lecture/lecture-d-tag-select";
import Link from "next/link";
import prisma from "@/utils/db";
import { Lecture, Tutor } from "@prisma/client";

export default function LectureDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const lecture: Lecture = dummyDate.lectureData.find(
    (item) => item.id === id,
  ) as Lecture;

  if (!lecture) {
    return <span>!에러에러</span>;
  }

  const tutor: Tutor = dummyDate.TutorData.find(
    (item) => item.id === lecture?.tutorId,
  ) as Tutor;

  const trainerLectures: Lecture[] = dummyDate.lectureData
    .filter((item) => item.tutor_name === lecture?.tutor_name)
    .slice(0, 4);

  const tagLectures: Lecture[] = dummyDate.lectureData.filter((item) =>
    item.tags.some((tag) => lecture?.tags.includes(tag)),
  );

  return (
    <main className="mb-24 flex w-full flex-col">
      <LectureBanner lecture={lecture} />
      <LectureContent lecture={lecture} tutor={tutor} />
      <section className="container mx-auto mt-32 flex max-w-[1150px] flex-col gap-6">
        <span className="flex h-8 items-center justify-between gap-2 text-xl font-semibold text-gray-700">
          {lecture?.tutor_name} {lecture?.tutor_occupation}님의 강의 더보기
          <Link
            href={`/tutor/${lecture?.tutorId}`}
            className="group relative flex h-8 w-20"
          >
            <div className="relative z-10 flex w-full items-center justify-center gap-1">
              <span className="pl-1 text-sm font-semibold text-white">
                바로가기
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
        </span>
        <div className="grid w-full grid-cols-4 gap-6">
          {trainerLectures.map((lecture: Lecture, index: number) => {
            return <LectureCard key={index} lecture={lecture} />;
          })}
        </div>
      </section>
      <section className="container mx-auto mt-24 flex max-w-[1150px] flex-col gap-6">
        <span className="text-xl font-semibold text-gray-700">
          비슷한 강의 더보기
        </span>
        <LectureTagSelect
          tagLectures={tagLectures}
          tags={lecture?.tags ?? []}
        />
      </section>
    </main>
  );
}
