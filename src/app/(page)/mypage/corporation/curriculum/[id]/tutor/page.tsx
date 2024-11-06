import TutorForm from "@/components/mypage/corporation/curriculum-bar/lecture/tutor-form";
import { GetTutorDto } from "@/dtos/tutor.dto";

export default async function TutorUpdatePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { trainingCenterId: string };
}) {
  const { id } = params;
  const { trainingCenterId } = searchParams;
  let tutorTrainingCenter = null;

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

  if (trainingCenterId !== "none") {
    const responseTutorTrainingCenter = await fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor-trainingCenter?tutorId=${id}&trainingCenterId=${trainingCenterId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    );
    if (responseTutorTrainingCenter.ok) {
      tutorTrainingCenter = await responseTutorTrainingCenter.json();
    }
  }

  return <TutorForm tutor={tutor} tutorTrainingCenter={tutorTrainingCenter} />;
}
