import LectureContainer from '@/components/lecture/lecture-container';
import { SwapAnimalType, SwapCategory } from '@/constants/constants.all';
import { Lecture } from '@prisma/client';
import dummyDate from '@/utils/dummydata';

type SearchParams = {
  categorys?: string;
};

export default function Lecture({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { categorys } = searchParams;

  const filteredLectures = dummyDate.lectureData.filter((lecture: Lecture) => {
    if (categorys === 'all') {
      return true;
    } else {
      return SwapCategory[lecture.category] === categorys;
    }
  });

  return (
    <main className="flex w-full flex-col gap-12 py-6">
      <LectureContainer lectures={filteredLectures} isPromotion />
    </main>
  );
}
