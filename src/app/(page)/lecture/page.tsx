import LectureContainer from "@/components/lecture/lecture-container";
import { GetLectureWithTutorDto } from "@/dtos/lecture.dto";

type SearchParams = {
  category: string;
};

export default async function LecturePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category } = searchParams;

  const responseLectures = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture?category=${category}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseLectures.ok) {
    return null;
  }

  const responseTutors = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseTutors.ok) {
    return null;
  }

  const getLectures = await responseLectures.json();

  const filteredLectures = getLectures.filter(
    (lecture: GetLectureWithTutorDto) => {
      if (category === "all") {
        return true;
      } else {
        return lecture.category.toUpperCase() === category?.toUpperCase();
      }
    },
  );

  const getTutors = await responseTutors.json();

  return (
    <main className="flex w-full flex-col gap-12 py-6">
      <LectureContainer
        lectures={filteredLectures}
        isPromotion
        tutors={getTutors}
      />
    </main>
  );
}
