"use client";
import { motion, useAnimate, useInView } from "framer-motion";

import { Lecture } from "@/types/tyeps.all";
import { Badge } from "../ui/badge";
import { SquareUser, ThumbsUp } from "lucide-react";
import { useRef } from "react";

interface LectureBannerProps {
  lecture: Lecture;
}

export default function LectureBanner({ lecture }: LectureBannerProps) {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-black/95 py-12">
      <div className="container relative z-10 mx-auto flex w-full max-w-[1150px]">
        <div className="flex w-full flex-col gap-4">
          <span className="text-3xl font-bold text-white">
            {lecture?.title}
          </span>
          <div className="flex gap-2">
            <Badge>{lecture?.category}</Badge>
            <Badge variant={"secondary"}>{lecture?.price_type}</Badge>
          </div>
          <span className="mt-5 h-20 whitespace-pre-line text-sm leading-6 text-white">
            {lecture?.content}
          </span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <SquareUser width={16} height={16} stroke="#ffffff" />
              <span className="text-[0.93rem] text-white">
                {lecture?.trainer_name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp width={16} height={16} stroke="#ffffff" />
              <span className="text-[0.93rem] text-white">{lecture?.like}</span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <img
            src={lecture?.thumbnailPath}
            alt="lecture-thumbnail"
            className="w-96 rounded-lg object-cover"
          />
        </div>
      </div>
      <motion.img
        src="/icons/lecture-circle2.svg"
        alt="lecture-circle"
        className="absolute -left-24 -top-24 z-0"
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror" }}
        animate={{ x: -50, y: -30 }}
      />
      <motion.img
        src="/icons/lecture-circle.svg"
        alt="lecture-circle"
        className="absolute right-0 top-12 z-0"
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror" }}
        animate={{ x: 50, y: -30 }}
      />
    </section>
  );
}
