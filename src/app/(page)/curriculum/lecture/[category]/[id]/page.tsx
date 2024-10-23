import VideoHeader from "@/components/curriculum/video/video-header";
import { GetCurriculumLectureDto } from "@/dtos/curriculum-lecture.dtos";
import { GetUserCurriculumDto } from "@/dtos/user-curriculum.dtos";
import { CurriculumLecture } from "@/types/tyeps.all";
import dummydata from "@/utils/dummydata";

export default async function LectureVideoPage({
  params,
}: {
  params: { category: string; id: string };
}) {
  const { category, id } = params;

  const responseCurriculums = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture?category=${category.toUpperCase()}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseCurriculums.ok) {
    return null;
  }
  const curriculumLectures: GetCurriculumLectureDto[] =
    await responseCurriculums.json();

  const responseLecture = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture?id=${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseLecture.ok) {
    return null;
  }
  const currentLecture: GetCurriculumLectureDto = await responseLecture.json();

  const responseUserCurriculum = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/user-curriculum?userId=${"1"}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseUserCurriculum.ok) {
    return null;
  }

  const userCurriculum: GetUserCurriculumDto =
    await responseUserCurriculum.json();

  return (
    <main className="flex w-full flex-col bg-black">
      <VideoHeader
        lecture={currentLecture}
        category={category}
        lectures={curriculumLectures}
        userCurriculum={userCurriculum}
      />
      <section className="container mx-auto h-full bg-white text-white">
        콘텐츠 영역
      </section>
    </main>
  );
}
