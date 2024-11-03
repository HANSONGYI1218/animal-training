import TutorForm from "@/components/mypage/corporation/curriculum-bar/tutor-form";

export default async function TutorUpdatePage({
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

  const tutor = await responseTutor.json();

  return <TutorForm tutor={tutor} />;
}
