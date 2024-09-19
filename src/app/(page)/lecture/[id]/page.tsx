import LectureBanner from "@/components/lecture/lecture-d-banner";
import LectureContainer from "@/components/lecture/lecture-container";
import { SwapAnimalType, SwapCategory } from "@/constants/constants.all";
import type { Lecture } from "@/types/tyeps.all";
import dummyDate from "@/utils/dummydata";
import LectureContent from "@/components/lecture/lecture-d-content";
import LectureCard from "@/components/lecture/lecture-card";

type SearchParams = {
  types?: string;
  categorys?: string;
};

export default function LectureDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: SearchParams;
}) {
  const { id } = params;
  const { types, categorys } = searchParams;

  const lecture: Lecture = dummyDate.lectureData.find(
    (item) => item.id === id,
  ) as Lecture;

  const lectures: Lecture[] = dummyDate.lectureData.slice(0, 4);

  if (!lecture) {
    return <span>!에러에러</span>;
  }

  return (
    <main className="mb-24 flex w-full flex-col">
      <LectureBanner lecture={lecture} />
      <LectureContent lecture={lecture} />
      <section className="container mx-auto mt-24 flex max-w-[1150px] flex-col gap-6">
        <span className="text-xl font-semibold text-gray-700">
          강형욱 훈련사님의 강의 더보기
        </span>
        <div className="grid w-full grid-cols-4 gap-6">
          {lectures.map((lecture: Lecture, index: number) => {
            return <LectureCard key={index} lecture={lecture} />;
          })}
        </div>
      </section>
      <section className="container mx-auto mt-24 flex max-w-[1150px] flex-col gap-6">
        <span className="text-xl font-semibold text-gray-700">
          강형욱 훈련사님의 강의 더보기2
        </span>
        <div className="grid w-full grid-cols-4 gap-6">
          {lectures.map((lecture: Lecture, index: number) => {
            return <LectureCard key={index} lecture={lecture} />;
          })}
        </div>
      </section>
    </main>
  );
}
