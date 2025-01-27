import { currentAccount } from "@/action/user-action";
import CurriculumBanner from "@/components/curriculum/curriculum-banner";
import CurriculumContainer from "@/components/curriculum/curriculum-contrainer";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import { AnimalType, AnimalSize, AnimalAge } from "@prisma/client";
import { cookies } from "next/headers";

export default async function CurriculumPage() {
  const session = await currentAccount();
  const userType = cookies().get("userType")?.value;
  const userRole = cookies().get("role")?.value;
  const userId = session?.user?.id;

  const responseUserCurriculum = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/user-curriculum?userId=${userId}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  let userCurriculum = null;
  if (responseUserCurriculum.ok) {
    userCurriculum =
      (await responseUserCurriculum.json()) as GetUserCurriculumDto;
  }

  const responseCurriculums = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture`,
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        animal_type:
          userCurriculum?.adoption?.animal?.animal_type ?? AnimalType.DOG,
        animal_size:
          userCurriculum?.adoption?.animal?.animal_size ?? AnimalSize.NORMAL,
        animal_age:
          userCurriculum?.adoption?.animal?.animal_age ?? AnimalAge.NORMAL,
      }),
    },
  );

  if (!responseCurriculums.ok) {
    return null;
  }

  const curriculumLectures =
    (await responseCurriculums.json()) as CurriculumLectureDto[];

  return (
    <main className="mb-24 flex min-h-screen w-full flex-col gap-12">
      <CurriculumBanner currentStep={userCurriculum?.curriculumStep ?? null} />
      <CurriculumContainer
        userType={userType}
        userRole={userRole}
        curriculumLectures={curriculumLectures ?? []}
        userCurriculum={userCurriculum}
      />
    </main>
  );
}
