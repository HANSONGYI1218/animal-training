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

  const [responseLectures, responseTutors] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture?category=${category}`,
      {
        method: "GET",
        cache: "no-store",
      },
    ),
    fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor`, {
      method: "GET",
      cache: "no-store",
    }),
  ]);

  if (!responseLectures.ok || !responseTutors.ok) {
    return null;
  }

  const [getLectures, getTutors] = await Promise.all([
    responseLectures.json(),
    responseTutors.json(),
  ]);

  const filteredLectures = getLectures.filter(
    (lecture: GetLectureWithTutorDto) => {
      if (category === "all") {
        return true;
      } else {
        return lecture.category.toUpperCase() === category?.toUpperCase();
      }
    },
  );

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
