"use client";

import { motion } from "framer-motion";
import { occupationTypeSwap } from "@/constants/constants.all";
import { Badge } from "../ui/badge";
import { Building2, Grip } from "lucide-react";
import { OccupationType, TutorBookmark } from "@prisma/client";

interface TutorBannerProps {
  tutor: {
    name: string;
    introduction: string;
    career: string;
    profile_img: string;
    occupation: OccupationType;
    corporation: {
      corporation_name: string;
    };
    trainingCenter: {
      name: string;
    };
    bookmarks: TutorBookmark[];
  };
  count: number;
}

export default function TutorBanner({ tutor, count }: TutorBannerProps) {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-[#EDEDE9]/20">
      <div className="container relative z-10 mx-auto flex w-full max-w-[1150px]">
        <div className="flex w-full flex-col gap-4 py-12">
          <span className="text-3xl font-bold">{tutor?.name}</span>
          <div className="flex gap-2">
            <Badge className="opacity-100">
              {occupationTypeSwap[tutor?.occupation]}
            </Badge>
            <Badge className="opacity-100" variant={"secondary"}>
              {tutor?.trainingCenter?.name}
            </Badge>
          </div>
          <span className="whitespace-pre-line font-[440] leading-6 text-neutral-600">
            {tutor?.career}
          </span>
          <span className="min-h-28 whitespace-pre-line font-[440] leading-6 text-neutral-600">
            {tutor?.introduction}
          </span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <Grip width={16} height={16} stroke="rgb(82 82 82)" />
              <span className="text-[0.93rem] text-neutral-600">
                영상 {count}개
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Building2 width={16} height={16} stroke="rgb(82 82 82)" />
              <span className="text-[0.93rem] text-neutral-600">
                {tutor?.corporation?.corporation_name}
              </span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          <img
            src={tutor?.profile_img}
            alt="lecture-thumbnail"
            className="h-64 rounded-lg object-cover"
          />
        </div>
      </div>
      <motion.img
        src="/icons/tutor-circle2.svg"
        alt="tutor-circle"
        className="absolute -left-24 -top-24 z-0"
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        animate={{ x: -50, y: -30 }}
      />
      <motion.img
        src="/icons/tutor-circle.svg"
        alt="tutor-circle"
        className="absolute -right-12 top-24 z-0"
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        animate={{ x: 50, y: -30 }}
      />
    </section>
  );
}
