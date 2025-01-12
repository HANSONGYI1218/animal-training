import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CurriculumLecturePromotion({
  lastVideoId,
  lastVideoIndex,
}: {
  lastVideoId: string;
  lastVideoIndex: number;
}) {
  return (
    <div className="sticky top-24 h-fit w-80 rounded-xl border">
      <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
        현재 학습할 페이지는?
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">
            지금 <span className="text-red-500">{lastVideoIndex + 1}강</span>을
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
      </div>
    </div>
  );
}
