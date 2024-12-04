import { currentAccount } from "@/action/user-action";
import CurriculumBanner from "@/components/curriculum/curriculum-banner";
import CurriculumContainer from "@/components/curriculum/curriculum-contrainer";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserByCurriculumDto } from "@/dtos/user.dto";

export default async function CurriculumPage() {
  const session = await currentAccount();

  const userId = session?.user?.id;

  const [responseCurriculums, responseUser] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture`, {
      method: "GET",
      cache: "no-store",
    }),
    fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/user?curriculum_userId=${userId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    ),
  ]);

  if (!responseCurriculums.ok || !responseUser.ok) {
    return null;
  }

  const [curriculumLectures, user] = await Promise.all([
    responseCurriculums.json() as Promise<CurriculumLectureDto[]>,
    responseUser.json() as Promise<GetUserByCurriculumDto>,
  ]);

  return (
    <main className="mb-24 flex w-full flex-col gap-12">
      <CurriculumBanner curriculumStep={"END"} />
      <CurriculumContainer
        curriculumLectures={curriculumLectures ?? []}
        user={user}
      />
    </main>
  );
}
