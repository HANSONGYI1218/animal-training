import { currentAccount } from "@/action/user-action";
import CurriculumBanner from "@/components/curriculum/curriculum-banner";
import CurriculumContainer from "@/components/curriculum/curriculum-contrainer";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserByCurriculumDto } from "@/dtos/user.dto";
import Image from "next/image";

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

  const isAccess = user?.adopterAdoptions?.find(
    (adoption) => adoption?.step === "INVITATION",
  );

  return (
    <main className="mb-24 flex min-h-screen w-full flex-col gap-12">
      <CurriculumBanner />
      {isAccess ? (
        <CurriculumContainer
          curriculumLectures={curriculumLectures ?? []}
          user={user}
        />
      ) : (
        <div className="container mx-auto flex max-w-[1150px] flex-col items-center">
          <div className="flex min-h-64 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border py-6 text-center text-sm">
            <Image
              src="/icons/general-face.svg"
              height={30}
              width={30}
              alt="face"
            />
            분양 동물 입양을 시작해 보세요!
          </div>
        </div>
      )}
    </main>
  );
}
