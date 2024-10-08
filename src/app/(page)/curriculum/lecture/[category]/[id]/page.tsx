import VideoHeader from "@/components/curriculum/video/video-header";
import { CurriculumLecture } from "@/types/tyeps.all";
import dummydata from "@/utils/dummydata";
import { Provider } from "@radix-ui/react-toast";

export default function LectureVideoPage({
  params,
}: {
  params: { category: string; id: string };
}) {
  const { category, id } = params;

  const lectures: CurriculumLecture[] = dummydata.curriculumLectureData;

  const lecture: CurriculumLecture | undefined =
    dummydata.curriculumLectureData.find((lecture) => lecture.id === id);

  if (!lecture) {
    return null;
  }
  const currentCurriculum = dummydata.userCurriculumData[0];

  return (
    <main className="flex w-full flex-col bg-black">
      <VideoHeader
        lecture={lecture}
        category={category}
        lectures={lectures}
        currentCurriculum={currentCurriculum}
      />
      <section className="container mx-auto h-full bg-white text-white">
        콘텐츠 영역
      </section>
    </main>
  );
}
