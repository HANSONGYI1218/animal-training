import CurriculumLectureForm from "@/components/curriculum/learning/curriculum-lecture-form";
import { Tutor } from "@prisma/client";

export default async function CurriculumLectureNewPage() {
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

  return (
    <main className="container mx-auto my-24 flex min-h-screen w-full max-w-[1150px] flex-col gap-12">
      <CurriculumLectureForm tutors={tutors} />
    </main>
  );
}
