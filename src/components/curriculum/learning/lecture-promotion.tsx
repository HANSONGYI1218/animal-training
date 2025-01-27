import { Button } from "@/components/ui/button";
import { CurriculumStep } from "@prisma/client";
import Link from "next/link";

export default function CurriculumLecturePromotion({
  lastVideoId,
  curriculumStatus,
  lastVideoIndex,
  setTab,
}: {
  lastVideoId: string;
  curriculumStatus: CurriculumStep;
  lastVideoIndex: number;
  setTab: any;
}) {
  return (
    <div className="sticky top-24 h-fit w-80 rounded-xl border">
      <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
        현재 학습할 단계는?
      </div>
      <div className="flex flex-col gap-6 p-6">
        {curriculumStatus === CurriculumStep.LECTURE ? (
          <>
            <div className="flex flex-col gap-4">
              <span className="text-xl font-semibold">
                지금{" "}
                <span className="text-red-500">{lastVideoIndex + 1}강</span>을
                학습할
                <br /> 차례예요!
              </span>
              <span className="text-2xl font-bold">
                아래를 눌러 이어서 학습해주세요✏️
              </span>
            </div>
            <Link
              href={`/curriculum/lecture/${lastVideoId}`}
              className="flex w-full"
            >
              <Button variant={"destructive"} className="w-full">
                학습하러 가기
              </Button>
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              <span className="text-xl font-semibold">
                지금 <span className="text-red-500">훈련소 매칭</span>을
                <br /> 진행할 차례예요!
              </span>
              <span className="text-2xl font-bold">
                학습탭으로 이동해주세요🎯
              </span>
            </div>

            <Button
              variant={"destructive"}
              className="w-full"
              onClick={() => {
                setTab("traningCenter");
              }}
            >
              학습탭 가기
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
