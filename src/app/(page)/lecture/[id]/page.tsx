import LectureContainer from "@/components/lecture/lecture-container";
import { SwapAnimalType, SwapCategory } from "@/constants/constants.all";
import type { Lecture } from "@/types/tyeps.all";
import dummyDate from "@/utils/dummydata";

type SearchParams = {
  types?: string;
  categorys?: string;
};

export default function LectureDetailPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { types, categorys } = searchParams;

  return (
    <main className="container mx-auto flex w-full flex-col gap-12 py-6">
      dd
    </main>
  );
}
