import LectureContainer from "@/components/lecture/lecture-container";
import { SwapAnimalType, SwapCategory } from "@/constants/constants.all";
import type { Lecture } from "@/types/tyeps.all";
import dummyDate from "@/utils/dummydata";

type SearchParams = {
  types?: string;
  categorys?: string;
};

export default function Lecture({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { types, categorys } = searchParams;

  const filteredLectures = dummyDate.lectureData.filter((lecture: Lecture) => {
    if (categorys === "all") {
      return SwapAnimalType[lecture.animal_type] === types;
    } else {
      return (
        SwapAnimalType[lecture.animal_type] === types &&
        SwapCategory[lecture.category] === categorys
      );
    }
  });

  return (
    <main className="container mx-auto flex w-full flex-col gap-12 py-6">
      <LectureContainer lectures={filteredLectures} />
    </main>
  );
}
