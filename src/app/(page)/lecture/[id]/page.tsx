import LectureBanner from "@/components/lecture/lecture-d-banner";
import LectureContent from "@/components/lecture/lecture-d-content";
import LectureCard from "@/components/lecture/lecture-card";
import { ChevronRight } from "lucide-react";
import LectureTagSelect from "@/components/lecture/lecture-d-tag-select";
import Link from "next/link";
import { GetLectureDto, GetLectureWithTutorDto } from "@/dtos/lecture.dto";
import { occupationTypeSwap } from "@/constants/constants.all";

export default async function LectureDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const responseLecture = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture?id=${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseLecture.ok) {
    return null;
  }

  const lecture: GetLectureDto = await responseLecture.json();

  const responseTutorLectures = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture?tutorId=${lecture?.tutor?.id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseTutorLectures.ok) {
    return null;
  }

  const tutorLectures: GetLectureWithTutorDto[] =
    await responseTutorLectures.json();

  return (
    <main className="mb-24 flex w-full flex-col">
      <LectureBanner lecture={lecture} />
      <LectureContent lecture={lecture} />
      <section className="container mx-auto mt-32 flex max-w-[1150px] flex-col gap-6">
        <span className="flex h-8 items-center justify-between gap-2 text-xl font-semibold text-gray-700">
          {lecture?.tutor?.name}{" "}
          {occupationTypeSwap[lecture?.tutor?.occupation]}님의 강의 더보기
          <Link
            href={`/tutor/${lecture?.tutor?.id}`}
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
          {tutorLectures.map(
            (lecture: GetLectureWithTutorDto, index: number) => {
              return <LectureCard key={index} lecture={lecture} />;
            },
          )}
        </div>
      </section>
      <section className="container mx-auto mt-24 flex max-w-[1150px] flex-col gap-6">
        <span className="text-xl font-semibold text-gray-700">
          비슷한 강의 더보기
        </span>
        <LectureTagSelect tags={lecture?.tags} />
      </section>
    </main>
  );
}
