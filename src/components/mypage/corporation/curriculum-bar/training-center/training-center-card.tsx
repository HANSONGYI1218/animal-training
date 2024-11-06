"use client";

import { Button } from "../../../../ui/button";
import { Pencil, SquareUser, ThumbsUp, Triangle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";

export default function TrainingCenterCard({
  trainingCenter,
  isEdit,
}: {
  trainingCenter: GetTrainingCenterDetailDto;
  isEdit: boolean;
}) {
  return (
    <div className="relative flex h-full w-full gap-4 rounded-lg">
      <img
        src={trainingCenter?.profile}
        alt="trainingCenter-thumbnail"
        className="h-56 w-full rounded-lg object-cover"
      />
      <div className="flex w-full flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <span className="text-neutral-600">소개</span>
            <span className="line-clamp-3 whitespace-pre">
              {trainingCenter?.introduction}
            </span>
          </div>
          <div className="flex gap-3">
            <span className="text-neutral-600">주소</span>
            <span> {trainingCenter?.address}</span>
          </div>
          <div className="flex gap-3">
            <span className="text-neutral-600">환불정책</span>
            <div className="flex flex-col gap-1">
              {trainingCenter?.refundPolicys.map((refundPolicy) => {
                return <span>{refundPolicy}</span>;
              })}
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-1">
            <SquareUser width={17} height={17} stroke="#000000" />
            <span className="text-[0.93rem]">
              {trainingCenter.tutorTrainingCenters.length}명
            </span>
          </div>
          {isEdit ? (
            <Link
              href={{
                pathname: `/mypage/corporation/curriculum/${trainingCenter?.id}/training-center`,
                query: {
                  tutorId: trainingCenter?.tutorTrainingCenters[0]?.tutor?.id,
                },
              }}
              className="group relative flex w-32 self-end"
            >
              <div className="absolute bottom-0 left-0 h-full w-4 rounded-full bg-black opacity-0 transition-all duration-300 group-hover:w-32 group-hover:opacity-100" />
              <Button
                className="relative z-10 flex gap-3 bg-transparent transition-all duration-300 hover:text-white"
                variant={"secondary"}
              >
                <Pencil className="ml-0.5" width={18} height={18} />
                편집하기
              </Button>
            </Link>
          ) : (
            <Link
              href={{
                pathname: `/curriculum/training/${trainingCenter?.id}`,
                query: {
                  tutorId: trainingCenter?.tutorTrainingCenters[0]?.tutor?.id,
                },
              }}
              className="group relative flex w-32 self-end"
            >
              <div className="absolute bottom-0 left-0 h-full w-4 rounded-full bg-black opacity-0 transition-all duration-300 group-hover:w-32 group-hover:opacity-100" />
              <Button
                className="relative z-10 flex gap-2 bg-transparent transition-all duration-300 hover:text-white"
                variant={"secondary"}
              >
                <Image
                  src="/icons/play.svg"
                  width={24}
                  height={24}
                  alt="play"
                  className="group-hover:hidden"
                />
                <Triangle
                  className="ml-2.5 hidden rotate-90 group-hover:flex"
                  fill="#ffffff"
                  stroke="#ffffff"
                  width={14}
                  height={14}
                />
                보러가기
              </Button>
            </Link>
          )}{" "}
        </div>
      </div>
    </div>
  );
}
