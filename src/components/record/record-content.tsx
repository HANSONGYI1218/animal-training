"use client";

import { format } from "date-fns";
import Image from "next/image";
import { Badge } from "../ui/badge";
import {
  adoptionStatusTypeSwap,
  genderAmianlTypeSwap,
} from "@/constants/constants.all";
import { AdoptionStatus, Animal } from "@prisma/client";

type RecordContentProps = {
  animal: Animal;
  status: AdoptionStatus;
  adoption_date: Date;
  abandon_date?: Date;
  abandon_reason?: string;
};

export default function RecordContent({
  adoption,
}: {
  adoption: RecordContentProps;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex h-10 items-center gap-4">
        <Image
          src={adoption?.animal?.profile ?? "/images/record/profile.png"}
          width={40}
          height={40}
          alt="dog"
          className="h-full rounded-full"
        />
        <span className="font-semibold">{adoption?.animal?.name}</span>
        <div className="flex gap-0.5">
          {adoption?.animal?.gender && (
            <span className="flex items-center">
              <Image
                src={`/images/record/${adoption?.animal?.gender.toLowerCase()}.png`}
                width={14}
                height={14}
                alt="gender"
              />
              {genderAmianlTypeSwap[adoption?.animal?.gender]}
            </span>
          )}
          <span>/</span>
          <span>{adoption?.animal?.age}세</span>
        </div>
        <span>{adoption?.animal?.breed}</span>
        <Badge
          variant={adoption.status === "ADOPTION" ? "default" : "destructive"}
        >
          {adoptionStatusTypeSwap[adoption.status]}
        </Badge>
      </div>

      <div className="flex items-center gap-4">
        <span className="w-20 text-gray-500">입양 날짜</span>
        <span>
          {adoption?.adoption_date &&
            format(adoption.adoption_date, "yyyy.MM.dd")}{" "}
          {adoption?.abandon_date &&
            `~ ${format(adoption?.abandon_date, "yyyy.MM.dd")}`}
        </span>
      </div>
      <div
        className={`flex items-center gap-4 ${adoption?.abandon_reason ? "flex" : "hidden"}`}
      >
        <span className="w-20 text-gray-500">파양 사유</span>
        <span>{adoption?.abandon_reason}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="w-20 text-gray-500">
          {adoption.abandon_date ? "파양" : "입양"} 서류
        </span>
        <span className="cursor-pointer text-sm underline decoration-gray-600 underline-offset-4">
          미리보기
        </span>
      </div>
    </div>
  );
}
