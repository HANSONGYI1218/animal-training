import TutorBanner from "@/components/tutor/tutor-banner";
import TutorCategory from "@/components/tutor/tutor-category";
import { GetTutorDto } from "@/dtos/tutor.dtos";
import { GetLectureDto } from "@/dtos/lecture.dtos";

export default async function TutorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const responseTutor = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor?id=${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseTutor.ok) {
    return null;
  }
  const tutor: GetTutorDto = await responseTutor.json();

  const responseTutorLectures = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture?tutorId=${tutor?.id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseTutorLectures.ok) {
    return null;
  }

  const tutorLectures: GetLectureDto[] = await responseTutorLectures.json();

  return (
    <main className="mb-24 flex w-full flex-col gap-12">
      <TutorBanner tutor={tutor} count={tutorLectures.length} />
      <section className="container mx-auto max-w-[1150px]">
        <TutorCategory lectures={tutorLectures} />
      </section>
    </main>
  );
}
