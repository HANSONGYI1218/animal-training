import { formatPrice } from "@/utils/utils";
import {
  BadgeCheck,
  ChevronRight,
  MessageCircleMore,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { TrainingCenter } from "@prisma/client";

export default function TrainingCenterCard({
  trainingCenter,
}: {
  trainingCenter: TrainingCenter;
}) {
  return (
    <div className="flex gap-3 border-b px-6 py-12">
      <div className="flex flex-1 flex-col">
        <span className="flex items-center gap-3 text-xl font-semibold">
          {trainingCenter?.name}
          <BadgeCheck
            className="h-6 w-6"
            fill="rgb(21 128 61)"
            stroke="#ffffff"
          />
        </span>
        <div className="mt-2 flex gap-3">
          <span>강형욱</span>
          <span>훈련사 8년</span>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex gap-3">
            <span className="w-20 text-neutral-500">훈련사 소개</span>
            <span className="whitespace-pre-line">
              {trainingCenter?.introduction}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="w-20 text-neutral-500">위치</span>
            <span>{trainingCenter?.address}</span>
          </div>
          <div className="flex gap-3">
            <span className="w-20 text-neutral-500">가격</span>
            <span>{formatPrice(trainingCenter?.price)}원</span>
          </div>
          <div className="mt-6 flex items-center gap-6">
            <div className="flex items-center gap-1">
              <MessageCircleMore className="h-4 w-4" />
              <span>12개</span>
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4" />
              <span>{trainingCenter?.like}개</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-40 flex-col items-center justify-between">
        <Image
          src="/Test-face.png"
          width={150}
          height={150}
          alt="profile"
          className="rounded-full"
        />
        <Link href={`/curriculum/traning/${trainingCenter?.id}`}>
          <Button variant={"destructive"} className="flex gap-1">
            자세히 보기
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </Button>
        </Link>
      </div>
    </div>
  );
}
