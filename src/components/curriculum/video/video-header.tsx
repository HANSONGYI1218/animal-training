import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import VideoSheet from "./video-sheet";
import { UserCurriculumDto } from "@/dtos/user.curriculum.dto";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";

export default function VideoHeader({
  lecture,
  category,
  lectures,
  userCurriculum,
}: {
  lecture: CurriculumLectureDto;
  category: string;
  lectures: CurriculumLectureDto[];
  userCurriculum: UserCurriculumDto;
}) {
  return (
    <header className="sticky top-0 z-30 flex w-full items-center justify-between bg-neutral-800 p-4">
      <div className="flex items-center gap-6">
        <Link href={`/curriculum/lecture/${category}`}>
          <Button className="flex gap-1 bg-neutral-800 text-sm text-white hover:bg-black hover:text-white">
            <ChevronLeft width={18} height={18} strokeWidth={2} />
            뒤로가기
          </Button>
        </Link>
        <span className="font-semibold text-white">{lecture?.title}</span>
      </div>
      <VideoSheet lectures={lectures} userCurriculum={userCurriculum} />
    </header>
  );
}
