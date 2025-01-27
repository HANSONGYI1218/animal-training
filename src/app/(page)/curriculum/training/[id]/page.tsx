import { currentAccount } from "@/action/user-action";
import CenterDetailBanner from "@/components/curriculum/training/center-d-banner";
import CenterContainer from "@/components/curriculum/training/center-d-container";
import { GetCurriculumTrainingDto } from "@/dtos/curriculum.training.dto";
import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import { AnimalType } from "@prisma/client";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function TrainingCenterDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { tutorId: string };
}) {
  const { id } = params;
  const { tutorId } = searchParams;

  const session = await currentAccount();
  const userType = cookies().get("userType")?.value;

  const userId = session?.user?.id;

  const [responseUserCurriculum, responseTrainingCenter] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/user-curriculum?userId=${userId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/training-center?id=${id}&tutorId=${tutorId}`,
      {
        method: "GET",
        cache: "no-store",
      },
    ),
  ]);

  let userCurriculum: GetUserCurriculumDto | null = null;
  if (responseUserCurriculum.ok) {
    userCurriculum = await responseUserCurriculum.json();
  }

  let trainingCenter: GetTrainingCenterDetailDto | null = null;
  if (responseTrainingCenter.ok) {
    trainingCenter = await responseTrainingCenter.json();
  }

  if (!responseTrainingCenter.ok) {
    return null;
  }

  const responseTrainingCurriculums = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-training`,
    {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({
        animal_type:
          userCurriculum?.adoption?.animal?.animal_type ?? AnimalType.DOG,
      }),
    },
  );
  if (!responseTrainingCurriculums.ok) {
    return null;
  }
  const curriculumTrainings: GetCurriculumTrainingDto[] =
    await responseTrainingCurriculums.json();

  return (
    <main className="mb-24 flex w-full flex-col">
      {(userCurriculum && trainingCenter) ||
      (trainingCenter && userType === "CORPORATION") ? (
        <>
          <CenterDetailBanner center={trainingCenter} />
          <section className="container mx-auto mt-12 flex max-w-[1150px] flex-col gap-6">
            <CenterContainer
              center={trainingCenter}
              curriculumTrainings={curriculumTrainings}
              userCurriculum={userCurriculum}
            />
          </section>
        </>
      ) : (
        <div className="flex min-h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border py-6 text-center text-sm">
          <Image
            src="/icons/general-face.svg"
            height={30}
            width={30}
            alt="face"
          />
          진행중인 커리큘럼 없어요!
          <br />
          반려동물을 입양해보세요!
        </div>
      )}
    </main>
  );
}
