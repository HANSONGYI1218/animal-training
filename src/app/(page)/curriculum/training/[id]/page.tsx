import CenterDetailBanner from "@/components/curriculum/training/center-banner";
import CenterContainer from "@/components/curriculum/training/center-container";
import { GetCurriculumTrainingDto } from "@/dtos/curriculum.training.dto";
import { TrainingCenterOnlyOneTutorDto } from "@/dtos/training.center.dto";

export default async function TrainingCenterDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tutorId: string };
}) {
  const { id } = params;
  const { tutorId } = searchParams;

  const responseTrainingCenter = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/training-center?id=${id}&tutorId=${tutorId}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseTrainingCenter.ok) {
    return null;
  }

  const trainingCenter: TrainingCenterOnlyOneTutorDto =
    await responseTrainingCenter.json();

  const responseTrainingCurriculums = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-training`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseTrainingCurriculums.ok) {
    return null;
  }
  const curriculumTrainings: GetCurriculumTrainingDto[] =
    await responseTrainingCurriculums.json();

  return (
    <main className="mb-24 flex w-full flex-col">
      <CenterDetailBanner center={trainingCenter} />
      <section className="container mx-auto mt-12 flex max-w-[1150px] flex-col gap-6">
        <CenterContainer
          center={trainingCenter}
          curriculumTrainings={curriculumTrainings}
        />
      </section>
    </main>
  );
}
