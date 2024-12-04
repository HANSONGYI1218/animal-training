import { currentAccount } from "@/action/user-action";
import PlayableCard from "@/components/common/player-card";
import VideoHeader from "@/components/curriculum/video/video-header";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserByCurriculumDto } from "@/dtos/user.dto";
import UserCurriculumProvider from "@/providers/user-curriculum-provider";
import { AnimalType } from "@prisma/client";

export default async function LectureVideoPage({
  params,
  searchParams,
}: {
  params: { category: string; id: string };
  searchParams: {
    animalType: AnimalType;
  };
}) {
  const { category, id } = params;
  const { animalType } = searchParams;
  const session = await currentAccount();

  const userId = session?.user?.id;

  const [responseCurriculums, responseUser] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_WEB_URL}/api/curriculum-lecture?category=${category.toUpperCase()}&animalType=${animalType.toUpperCase()}`,
      {
        method: "GET",
        cache: "no-store",
      },
    ),
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

  const currentLecture = curriculumLectures.find(
    (lecture) => lecture?.id === id,
  ) as CurriculumLectureDto;

  const userWithId = { ...user, id };

  return (
    <main className="flex w-full flex-col bg-black">
      <UserCurriculumProvider user={userWithId}>
        <VideoHeader lecture={currentLecture} lectures={curriculumLectures} />
      </UserCurriculumProvider>
      <PlayableCard
        url={currentLecture?.videoUrl}
        userId={user?.id}
        animalType={animalType}
        lastPlayedTime={
          animalType === AnimalType.DOG
            ? user?.lastVideoTimes[0]
            : user?.lastVideoTimes[1]
        }
        lastVideoIndex={
          animalType === AnimalType.DOG
            ? user?.lastVideoIndexs[0]
            : user?.lastVideoIndexs[1]
        }
      />
    </main>
  );
}
