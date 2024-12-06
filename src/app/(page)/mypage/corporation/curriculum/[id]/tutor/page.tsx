import TutorForm from "@/components/mypage/corporation/curriculum-bar/tutor/tutor-form";

export default async function TutorUpdatePage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { trainingCenterId: string };
}) {
  const { id } = params;
  const { trainingCenterId } = searchParams;

  const [tutor, tutorTrainingCenter] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor?id=${id}`, {
      method: "GET",
      cache: "no-store",
    }).then((response) => {
      if (!response.ok) {
        return Promise.reject("Failed to fetch tutor");
      }
      return response.json();
    }),

    trainingCenterId !== "none"
      ? fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor-trainingCenter?id=${trainingCenterId}`,
          {
            method: "GET",
            cache: "no-store",
          },
        ).then((response) => {
          if (response.ok) {
            return response.json();
          }
          return null; // 실패 시 null 반환
        })
      : Promise.resolve(null), // "none"일 경우 null 반환
  ]);

  return <TutorForm tutor={tutor} tutorTrainingCenter={tutorTrainingCenter} />;
}
