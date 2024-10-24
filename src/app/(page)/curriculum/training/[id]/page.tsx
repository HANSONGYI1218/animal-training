import CenterDetailBanner from "@/components/curriculum/training/center-banner";
import CenterContainer from "@/components/curriculum/training/center-container";
import { GetCurriculumTrainingDto } from "@/dtos/curriculum-training.dtos";
import { GetTrainingCenterDetailDto } from "@/dtos/training-center.dtos";

export default async function TrainingDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const responseTrainingCenters = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/training-center`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseTrainingCenters.ok) {
    return null;
  }
  const trainingCenters: GetTrainingCenterDetailDto[] =
    await responseTrainingCenters.json();

  const currentCenter: GetTrainingCenterDetailDto | undefined =
    trainingCenters.find((center) => center.id === id);

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
      <CenterDetailBanner center={currentCenter} />
      <section className="container mx-auto mt-12 flex max-w-[1150px] flex-col gap-6">
        <CenterContainer
          center={currentCenter}
          curriculumTrainings={curriculumTrainings}
        />
      </section>
    </main>
  );
}
