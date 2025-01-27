import TrainingCenterForm from "@/components/mypage/corporation/curriculum-bar/training-center/training-center-form";
import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";

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

  const trainingCenter: GetTrainingCenterDetailDto =
    await responseTrainingCenter.json();

  return <TrainingCenterForm trainingCenter={trainingCenter} />;
}
