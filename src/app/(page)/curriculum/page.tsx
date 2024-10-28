import CurriculumBanner from "@/components/curriculum/curriculum-banner";
import CurriculumContainer from "@/components/curriculum/curriculum-contrainer";
import { GetCurriculumLectureDto } from "@/dtos/curriculum-lecture.dtos";
import { GetUserCurriculumDto } from "@/dtos/user-curriculum.dtos";

export default async function CurriculumPage() {
  const responseCurriculums = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture`,
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
    <main className="mb-24 flex w-full flex-col gap-12">
      <CurriculumBanner curriculumStep={userCurriculum?.curriculumStep} />
      <CurriculumContainer
        curriculumLectures={curriculumLectures}
        userCurriculum={{
          curriculumCategory: userCurriculum?.curriculumCategory,
          curriculumIndex: userCurriculum?.curriculumIndex,
        }}
      />
    </main>
  );
}
