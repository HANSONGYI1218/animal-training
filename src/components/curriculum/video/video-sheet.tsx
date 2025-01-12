import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Menu } from "lucide-react";
import VideoList from "./video-list";
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import { lectureCategorySwap } from "@/constants/constants.all";

export default function VideoSheet({
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
  const swapCategory = lectureCategorySwap[lectures[0]?.category];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu stroke="#ffffff" cursor={"pointer"} />
      </SheetTrigger>
      <SheetContent className="flex min-w-[500px] flex-col gap-6 border-black bg-black">
        <SheetHeader>
          <SheetTitle className="text-white">강의 목록</SheetTitle>
          <SheetDescription className="text-white">
            다음 차례 학습할 강의를 확인해보세요!
          </SheetDescription>
        </SheetHeader>
        <Accordion
          type="single"
          defaultValue={`item-${swapCategory}`}
          className="flex flex-1 flex-col gap-6"
        >
          <AccordionItem value={`item-${swapCategory}`} className="border-none">
            <AccordionTrigger className="rounded-xl bg-green-60 px-4 text-lg font-semibold text-white">
              섹션 1. {swapCategory}
            </AccordionTrigger>
            <AccordionContent className="flex w-full flex-col gap-3 py-6">
              {lectures.map((lecture) => {
                return (
                  <VideoList
                    userCurriculum={userCurriculum}
                    key={lecture?.id}
                    lecture={lecture}
                    currentLecture={currentLecture}
                    lastVideoIndex={lastVideoIndex}
                  />
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </SheetContent>
    </Sheet>
  );
}
