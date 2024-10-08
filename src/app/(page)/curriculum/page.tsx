import CurriculumBanner from "@/components/curriculum/curriculum-banner";
import CurriculumContainer from "@/components/curriculum/curriculum-contrainer";
import dummydata from "@/utils/dummydata";

export default function CurriculumPage() {
  const curriculums = dummydata.curriculumLectureData;
  const currentCurriculum = dummydata.userCurriculumData[0];

  return (
    <main className="mb-24 flex w-full flex-col gap-12">
      <CurriculumBanner currentCurriculum={currentCurriculum} />
      <CurriculumContainer
        curriculums={curriculums}
        currentCurriculum={currentCurriculum}
      />
    </main>
  );
}
