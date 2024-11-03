import LectureForm from "@/components/mypage/corporation/curriculum-bar/lecture-form";

export default async function LectureUpdatePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const responseLecture = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/lecture?id=${id}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseLecture.ok) {
    return null;
  }

  const lecture = await responseLecture.json();

  return <LectureForm lecture={lecture} />;
}
