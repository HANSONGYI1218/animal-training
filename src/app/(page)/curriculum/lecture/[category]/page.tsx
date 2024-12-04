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
import { CurriculumLectureDto } from "@/dtos/curriculum.lecture.dto";
import { currentAccount } from "@/action/user-action";
import { GetUserByCurriculumDto } from "@/dtos/user.dto";
import { AnimalType } from "@prisma/client";
import SectionCard from "@/components/curriculum/learning/lecture-section";

export default async function CurriculumDetailPage({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams: {
    animalType: AnimalType;
  };
}) {
  const { category } = params;
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

  // 2. index로 정렬
  const sortedLectures = curriculumLectures.sort((a, b) => a.index - b.index);

  return (
    <main className="mb-24 flex w-full flex-col">
      <CurriculumBanner curriculumStep={"END"} />
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
                  {sortedLectures
                    .slice(0, 1)
                    .map((lecture: CurriculumLectureDto) => {
                      return (
                        <SectionCard
                          key={lecture?.id}
                          lecture={lecture}
                          user={user}
                        />
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
                  {sortedLectures
                    .slice(1, 3)
                    .map((lecture: CurriculumLectureDto) => {
                      return (
                        <SectionCard
                          key={lecture?.id}
                          lecture={lecture}
                          user={user}
                        />
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
                  {sortedLectures
                    .slice(3)
                    .map((lecture: CurriculumLectureDto) => {
                      return (
                        <SectionCard
                          key={lecture?.id}
                          lecture={lecture}
                          user={user}
                        />
                      );
                    })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <CurriculumLecturePromotion
            curriculumIndex={user?.lastVideoIndexs[0]}
          />
        </div>
      </section>
    </main>
  );
}
