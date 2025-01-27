import CurriculumLectureForm from "@/components/curriculum/learning/curriculum-lecture-form";
import { Tutor } from "@prisma/client";

export default async function CurriculumLectureUpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const responseCurriculumLecture = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture?id=${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseCurriculumLecture.ok) {
    return null;
  }

  const lecture = await responseCurriculumLecture.json();

  const responseTutors = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor`,
    {
      method: "GET",
    },
  );

  if (!responseTutors.ok) {
    return null;
  }
  const tutors: Tutor[] = await responseTutors.json();

  return <CurriculumLectureForm tutors={tutors} curriculumLecture={lecture} />;
}
