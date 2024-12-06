import { currentAccount } from "@/action/user-action";
import LectureForm from "@/components/mypage/corporation/curriculum-bar/lecture/lecture-form";
import { Tutor } from "@prisma/client";

export default async function LectureNewPage() {
  const session = await currentAccount();
  const responseTutors = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor?corporationId=${session?.user?.id}`,
    {
      method: "GET",
    },
  );

  if (!responseTutors.ok) {
    return null;
  }

  const tutors: Tutor[] = await responseTutors.json();
  return (
    <LectureForm tutors={tutors} corporationId={session?.user?.id ?? ""} />
  );
}
