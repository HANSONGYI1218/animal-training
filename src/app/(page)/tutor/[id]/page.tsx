import TutorBanner from '@/components/tutor/tutor-banner';
import TutorCategory from '@/components/tutor/tutor-category';
import type { Lecture, Tutor } from '@/types/tyeps.all';
import dummyDate from '@/utils/dummydata';

export default function TutorDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const tutor: Tutor = dummyDate.TutorData.find(
    (tutor) => tutor.id === id,
  ) as Tutor;

  const tutorLectures = dummyDate.lectureData.filter(
    (lecture: Lecture) => lecture.tutorId === id,
  );

  if (!tutor || !tutorLectures) {
    return <span>!에러에러</span>;
  }

  return (
    <main className="mb-24 flex w-full flex-col gap-12">
      <TutorBanner tutor={tutor} />
      <section className="container mx-auto max-w-[1150px]">
        <TutorCategory lectures={tutorLectures} />
      </section>
    </main>
  );
}
