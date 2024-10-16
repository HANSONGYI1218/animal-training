"use client";

import { Abandon, Adoption } from "@prisma/client";
import dummydata from "@/utils/dummydata";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import {
  adoptionStatusTypeSwap,
  genderAmianlTypeSwap,
} from "@/constants/constants.all";

export default function RecordContent({
  content,
}: {
  content: Adoption | Abandon;
}) {
  const [animal, setAnimal] = useState<any>(null);
  const [adopter, setAdopter] = useState<any>(null);

  useEffect(() => {
    const fetchAnimal = async () => {
      const getAnimal = dummydata.AnimalData.find(
        (item) => item.id === content.animalId,
      );

      let getAdopter = null;

      if (content?.userId) {
        getAdopter = dummydata.UserData.find(
          (item) => item.id === content.userId,
        );
      } else {
        getAdopter = dummydata.CorporationData.find(
          (item) => item.id === content.corporationId,
        );
      }

      setAnimal(getAnimal);
      setAdopter(getAdopter);
    };

    fetchAnimal();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-10 items-center gap-4">
        <Image
          src={animal?.profile ?? "/images/record/profile.png"}
          width={40}
          height={40}
          alt="dog"
          className="h-full rounded-full"
        />
        <span className="font-semibold">{animal?.name}</span>
        <div className="flex gap-0.5">
          {animal?.gender && (
            <span className="flex items-center">
              <Image
                src={`/images/record/${animal?.gender.toLowerCase()}.png`}
                width={14}
                height={14}
                alt="gender"
              />
              {genderAmianlTypeSwap[animal?.gender]}
            </span>
          )}
          <span>/</span>
          <span>{animal?.age}세</span>
        </div>
        <span>{animal?.breed}</span>
        {content && "status" in content && (
          <Badge
            variant={content.status === "ADOPTION" ? "default" : "destructive"}
          >
            {adoptionStatusTypeSwap[content.status]}
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-4">
        <span className="w-20 text-gray-500">입양 날짜</span>
        <span>
          {content?.adoption_date &&
            format(content.adoption_date, "yyyy.MM.dd")}{" "}
          {content?.abandon_date &&
            `~ ${format(content?.abandon_date, "yyyy.MM.dd")}`}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-gray-500">분양자</span>
        <span>
          {adopter && "name" in adopter
            ? adopter?.name
            : adopter?.corporation_name}
        </span>
      </div>
      <div
        className={`flex items-center gap-4 ${(content as Abandon)?.abandon_reason ? "flex" : "hidden"}`}
      >
        <span className="w-20 text-gray-500">파양 사유</span>
        <span>{(content as Abandon)?.abandon_reason}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-gray-500">
          {content && "status" in content ? "입양" : "파양"} 서류
        </span>
        <span className="cursor-pointer text-sm underline decoration-gray-600 underline-offset-4">
          미리보기
        </span>
      </div>
    </div>
  );
}
