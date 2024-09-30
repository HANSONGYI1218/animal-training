"use client";

import { motion } from "framer-motion";
import type { Tutor } from "@/types/tyeps.all";
import { occupationTypeSwap } from "@/constants/constants.all";
import { Badge } from "../ui/badge";
import { Building2, Grip, ThumbsUp } from "lucide-react";

interface TutorBannerProps {
  tutor: Tutor;
}

export default function TutorBanner({ tutor }: TutorBannerProps) {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-[#EDEDE9]/50">
      <div className="container relative z-10 mx-auto flex w-full max-w-[1150px]">
        <div className="flex w-full flex-col gap-4 py-12">
          <span className="text-3xl font-bold">{tutor?.name}</span>
          <div className="flex gap-2">
            <Badge className="opacity-100">
              {occupationTypeSwap[tutor?.occupation]}
            </Badge>
            <Badge className="opacity-100" variant={"secondary"}>
              {tutor?.career}
            </Badge>
          </div>
          <span className="mt-5 min-h-32 whitespace-pre-line text-sm leading-6">
            {tutor?.introduction}
          </span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Grip width={16} height={16} stroke="#000000" />
              <span className="text-[0.93rem]">영상 12개</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 width={16} height={16} stroke="#000000" />
              <span className="text-[0.93rem]">{tutor?.corporation_name}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-end justify-end">
          <img
            src={"/Test-tutor.png"}
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
