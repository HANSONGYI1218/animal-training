import { currentAccount } from "@/action/user-action";
import CurriculumLecutrePalyer from "@/components/curriculum/video/curriculum-lecture-player";
import VideoHeader from "@/components/curriculum/video/video-header";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import { AnimalAge, AnimalSize, AnimalType } from "@prisma/client";

export default async function LectureVideoPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const session = await currentAccount();

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

  const currentLecture = curriculumLectures.find(
    (lecture) => lecture?.id === id,
  );

  let lastVideoIndex: any = curriculumLectures?.length;
  if (userCurriculum?.curriculumStep === "LECTURE") {
    lastVideoIndex = curriculumLectures.findIndex(
      (lecture) => lecture.id === userCurriculum?.lastVideoId,
    );

    if (lastVideoIndex === -1) {
      lastVideoIndex = 0;
    }
  }
  const filteredLectureByCategory = curriculumLectures.filter(
    (lecture) => lecture.category === currentLecture?.category,
  );

  return (
    <main className="relative flex w-full flex-col bg-black">
      {currentLecture && userCurriculum ? (
        <>
          <VideoHeader
            lectures={filteredLectureByCategory}
            userCurriculum={userCurriculum}
            lastVideoIndex={lastVideoIndex}
            currentLecture={currentLecture}
          />

          <CurriculumLecutrePalyer
            currentLecture={currentLecture}
            userCurriculum={userCurriculum}
            nextVideoId={curriculumLectures[lastVideoIndex + 1]?.id}
          />
        </>
      ) : (
        <div>영상이 없습니다. 뒤로 돌아가주세요</div>
      )}
    </main>
  );
}
