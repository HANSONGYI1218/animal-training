import TrainingCenterForm from "@/components/mypage/corporation/curriculum-bar/training-center/training-center-form";
import { GetCurriculumTrainingDto } from "@/dtos/curriculum.training.dto";
import { TrainingCenterOnlyOneTutorDto } from "@/dtos/training.center.dto";
import { GetTutorDto } from "@/dtos/tutor.dto";

export default async function TrainingCenterUpdatePage({
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

  return <TrainingCenterForm trainingCenter={trainingCenter} />;
}
