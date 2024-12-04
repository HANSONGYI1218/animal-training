"use client";

import { Button } from "@/components/ui/button";
import {
  animalTypeSwap,
  genderAmianlTypeSwap,
} from "@/constants/constants.all";
import { GetAnimalDto } from "@/dtos/animal.dto";
import { format } from "date-fns";
import { Dot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function AnimalCard({
  animal,
  isEdit,
}: {
  animal: GetAnimalDto;
  isEdit: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [height, setHeight] = useState<number | null>(null);

  useEffect(() => {
    if (cardRef.current) {
      setHeight(cardRef.current.offsetHeight);
    }
  }, [isHover]); // isHover가 변할 때마다 높이를 업데이트

  return (
    <div
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
      className="group flex h-[350px] flex-col items-center overflow-hidden rounded-xl px-1"
    >
      <Image
        src="/Test-face.png"
        width={200}
        height={100}
        alt="img"
        className="object-fit h-56 w-full flex-1 rounded-xl"
      />
      <div
        ref={cardRef}
        className="flex w-full flex-col gap-2 rounded-xl bg-white p-4 duration-700"
        style={{
          transform: isHover
            ? `translateY(-${(height ?? 0) - 120}px)`
            : "translateY(0)",
          boxShadow: isHover ? "0px 4px 10px rgba(0, 0, 0, 0.15)" : "none",
        }}
      >
        <div className="flex flex-col gap-1">
          <div className="flex gap-2">
            <span className="text-neutral-600">이름:</span>
            <span className="font-semibold">{animal?.name}</span>
          </div>
          <div className="flex gap-2">
            <span className="flex items-center gap-1 text-neutral-600">
              나이
              <Dot className="h-1 w-1 rounded-full bg-black" />
              성별:
            </span>
            <span className="flex items-center gap-1 font-semibold">
              {animal?.age}세 <Dot className="h-1 w-1 rounded-full bg-black" />{" "}
              {genderAmianlTypeSwap[animal?.gender]}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-neutral-600">종류</span>
            <span className="font-semibold">
              {animalTypeSwap[animal?.animalType]}
            </span>
          </div>
          <div className="flex gap-2">
            <span className="text-neutral-600">품종:</span>
            <span className="font-semibold">{animal?.breed}</span>
          </div>
          <div className="flex gap-2">
            <span className="text-neutral-600">보호시작일:</span>
            <span className="font-semibold">
              {format(animal?.intakeDate, "yyyy.MM.dd")}
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-neutral-600">기타사항</span>
            <div className="ml-2 flex flex-col gap-1">
              {animal?.remarks?.map((remark: string, index: number) => (
                <div className="flex items-center gap-2" key={index}>
                  <Dot className="h-1 w-1 rounded-full bg-black" />
                  <span className="font-semibold">{remark}</span>
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
