import LectureContainer from '@/components/lecture/lecture-container';
import type { Lecture } from '@/types/tyeps.all';
import dummyDate from '@/utils/dummydata';

type SearchParams = {
  category: string;
};

export default function Lecture({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category } = searchParams;

  const filteredLectures = dummyDate.lectureData.filter((lecture: Lecture) => {
    if (category === 'all') {
      return true;
    } else {
      return lecture.category.toUpperCase() === category.toUpperCase();
    }
  });

  return (
    <main className="flex w-full flex-col gap-12 py-6">
      <LectureContainer lectures={filteredLectures} isPromotion />
    </main>
  );
}
