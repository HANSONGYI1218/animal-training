import dummydate from "@/utils/dummydata";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import CurriculumBanner from "@/components/curriculum/curriculum-banner";
import { categorySwap } from "@/constants/constants.all";
import { Button } from "@/components/ui/button";
import { GanttChart } from "lucide-react";
import CurriculumLecturePromotion from "@/components/curriculum/learning/lecture-promotion";
import LectureSection from "@/components/curriculum/learning/lecture-section";

export default function CurriculumDetailPage({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;

  const lectures = dummydate.curriculumLectureData.filter(
    (lecture) => lecture.category === category.toUpperCase(),
  );
  const currentCurriculum = dummydate.userCurriculumData[0];

  return (
    <main className="mb-24 flex w-full flex-col">
      <CurriculumBanner currentCurriculum={currentCurriculum} />
      <section className="container mx-auto mt-12 flex max-w-[1150px] flex-col gap-6">
        <Link href={"/curriculum"}>
          <Button variant={"link"} className="flex gap-1 p-0 text-sm">
            <GanttChart className="h-4 w-4" strokeWidth={2} />
            강의 목록가기
          </Button>
        </Link>
        <span className="text-xl font-bold">
          {categorySwap[category.toUpperCase()]}
        </span>
        <div className="relative flex w-full gap-6">
          <Accordion
            type="multiple"
            defaultValue={["item-1", "item-2", "item-3"]}
            className="flex flex-1 flex-col gap-6"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">
                섹션 1. 강의소개
              </AccordionTrigger>
              <AccordionContent className="flex gap-2 py-4">
                <div className="flex w-2 bg-green-60"></div>
                <div className="mx-4 flex flex-1 flex-col">
                  {lectures.slice(0, 3).map((lecture) => {
                    return (
                      <LectureSection key={lecture?.id} lecture={lecture} />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">
                섹션 2. 준비물
              </AccordionTrigger>
              <AccordionContent className="flex gap-2 py-4">
                <div className="flex w-2 bg-green-60"></div>
                <div className="mx-4 flex flex-1 flex-col">
                  {lectures.slice(3, 6).map((lecture) => {
                    return (
                      <LectureSection key={lecture?.id} lecture={lecture} />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">
                섹션 3. 훈련
              </AccordionTrigger>
              <AccordionContent className="flex gap-2 py-4">
                <div className="flex w-2 bg-green-60"></div>
                <div className="mx-4 flex flex-1 flex-col">
                  {lectures.slice(6, 9).map((lecture) => {
                    return (
                      <LectureSection key={lecture?.id} lecture={lecture} />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* <Accordion
            type="single"
            collapsible
            className="flex flex-1 flex-col"
            defaultValue={`item-${currentCurriculum?.currentIndex}`}
          >
            {lectures.map((lecture, index: number) => {
              return (
                <AccordionItem
                  key={index}
                  value={`item-${index + 1}`}
                  className="flex flex-col gap-4 py-8"
                >
                  <AccordionTrigger>
                    <div className="flex items-center gap-3">
                      <span>
                        {index + 1}강 | {lecture?.title}
                      </span>
                      <Badge
                        variant={
                          currentCurriculum?.currentIndex > index + 1
                            ? "done"
                            : "default"
                        }
                        className={`${currentCurriculum?.currentIndex <= index && "hidden"}`}
                      >
                        {currentCurriculum?.currentIndex > index + 1
                          ? "학습완료"
                          : currentCurriculum?.currentIndex === index + 1
                            ? "학습중"
                            : null}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="flex flex-col gap-4">
                    {lecture?.content}
                    <Image
                      src={lecture?.thumbnailPath}
                      width={400}
                      height={200}
                      alt="thumbnail"
                    />
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion> */}
          <CurriculumLecturePromotion currentCurriculum={currentCurriculum} />
        </div>
      </section>
    </main>
  );
}
