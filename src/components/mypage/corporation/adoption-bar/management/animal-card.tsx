"use client";

import { Button } from "@/components/ui/button";
import {
  animalSizeSwap,
  animalTypeSwap,
  genderAmianlTypeSwap,
} from "@/constants/constants.all";
import { GetAnimalDto } from "@/dtos/animal.dto";
import { formatAnimalAge } from "@/utils/utils";
import { format } from "date-fns";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

export default function AnimalCard({
  animal,
  isEdit,
}: {
  animal: GetAnimalDto;
  isEdit: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      className="group flex h-[320px] flex-col items-center overflow-hidden rounded-xl px-1"
    >
      <Image
        src={
          animal?.profile_images?.find((url) => url.includes("0_thumbnail_")) ||
          ""
        }
        width={240}
        height={185}
        alt="img"
        className="max-h-[185px] min-h-[185px] w-full rounded-xl object-cover"
      />
      <div
        ref={cardRef}
        className="flex w-full flex-col gap-2 rounded-xl bg-white p-4 duration-700"
        style={{
          transform: isHover ? `translateY(-170px)` : "translateY(0)",
          boxShadow: isHover ? "0px 4px 10px rgba(0, 0, 0, 0.15)" : "none",
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <span className="text-sm text-neutral-600">이름:</span>
            <span className="text-sm font-semibold">{animal?.name}</span>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-sm text-neutral-600">
              나이
              <Dot className="h-1 w-1 rounded-full bg-neutral-500" />
              성별:
            </span>
            <span className="flex items-center gap-1 text-sm font-semibold">
              {formatAnimalAge(animal?.age)}생{" "}
              <Dot className="h-1 w-1 rounded-full bg-black" />{" "}
              {genderAmianlTypeSwap[animal?.gender]}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-sm text-neutral-600">종류</span>
            <span className="text-sm font-semibold">
              {animalTypeSwap[animal?.animal_type]}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-sm text-neutral-600">크기</span>
            <span className="text-sm font-semibold">
              {animalSizeSwap[animal?.animal_size]}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-sm text-neutral-600">품종:</span>
            <span className="text-sm font-semibold">{animal?.breed}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-sm text-neutral-600">보호시작일:</span>
            <span className="text-sm font-semibold">
              {format(animal?.intakeDate, "yyyy.MM.dd")}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-neutral-600">기타사항</span>
            <div className="scroll_black ml-2 flex h-[48px] flex-col gap-1 overflow-y-auto">
              {animal?.remarks?.map((remark: string, index: number) => (
                <div className="flex items-center gap-2" key={index}>
                  <span className="text-sm font-semibold">
                    <span className="text-neutral-500">*</span> {remark}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {isEdit ? (
          <Link
            href={{
              pathname: `/mypage/corporation/adoption/management/edit/animal/${animal?.id}`,
            }}
            className="flex w-full"
          >
            <Button variant={"destructive"} className="w-full">
              분양동물 수정
            </Button>
          </Link>
        ) : (
          <Link
            href={{
              pathname: `/mypage/corporation/adoption/management/${animal?.adoption?.id ? `edit/adoption/${animal?.adoption?.id}` : "new/adoption"}`,
              query: { animalId: animal?.id },
            }}
            className="flex w-full"
          >
            <Button variant={"destructive"} className="w-full">
              {animal?.adoption?.id ? "입양서 수정" : "입양서 작성"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
