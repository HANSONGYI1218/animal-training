import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import VideoSheet from "./video-sheet";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import { lectureCategorySwap } from "@/constants/constants.all";

export default function VideoHeader({
  lectures,
  userCurriculum,
  lastVideoIndex,
  currentLecture,
}: {
  lectures: CurriculumLectureDto[];
  userCurriculum: GetUserCurriculumDto;
  lastVideoIndex: number;
  currentLecture: CurriculumLectureDto;
}) {
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-neutral-800 py-4 pl-4 pr-8">
      <div className="flex items-center gap-6">
        <Button className="flex gap-1 bg-neutral-800 text-sm text-white opacity-0 hover:bg-black hover:text-white">
          <ChevronLeft width={18} height={18} strokeWidth={2} />
          저장하기
        </Button>
        <span className="font-semibold text-white">
          {currentLecture?.index + 1}.{" "}
          {lectureCategorySwap[lectures[0]?.category]} _ {currentLecture?.title}
        </span>
      </div>
      <VideoSheet
        lectures={lectures}
        userCurriculum={userCurriculum}
        lastVideoIndex={lastVideoIndex}
        currentLecture={currentLecture}
      />
    </header>
  );
}
