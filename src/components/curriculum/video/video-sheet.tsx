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

export default function VideoSheet({
  lectures,
}: {
  lectures: CurriculumLectureDto[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu stroke="#ffffff" cursor={"pointer"} />
      </SheetTrigger>
      <SheetContent className="flex w-fit flex-col gap-6 border-black bg-black">
        <SheetHeader>
          <SheetTitle className="text-white">강의 목록</SheetTitle>
          <SheetDescription className="text-white">
            다음 차례 학습할 강의를 확인해보세요!
          </SheetDescription>
        </SheetHeader>
        <Accordion
          type="multiple"
          defaultValue={["item-1", "item-2", "item-3"]}
          className="flex flex-1 flex-col gap-6"
        >
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="rounded-xl bg-green-60 px-4 text-lg font-semibold text-white">
              섹션 1. 강의소개
            </AccordionTrigger>
            <AccordionContent className="w-full py-6">
              <div className="flex flex-1 flex-col">
                {lectures.slice(0, 3).map((lecture) => {
                  return <VideoList key={lecture?.id} lecture={lecture} />;
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-none">
            <AccordionTrigger className="rounded-xl bg-green-60 px-4 text-lg font-semibold text-white">
              섹션 2. 준비물
            </AccordionTrigger>
            <AccordionContent className="py-6">
              <div className="flex flex-1 flex-col">
                {lectures.slice(3, 6).map((lecture) => {
                  return <VideoList key={lecture?.id} lecture={lecture} />;
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-none">
            <AccordionTrigger className="rounded-xl bg-green-60 px-4 text-lg font-semibold text-white">
              섹션 3. 훈련
            </AccordionTrigger>
            <AccordionContent className="py-6">
              <div className="flex flex-1 flex-col">
                {lectures.slice(6, 9).map((lecture) => {
                  return <VideoList key={lecture?.id} lecture={lecture} />;
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
