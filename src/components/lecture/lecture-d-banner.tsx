"use client";

import { motion } from "framer-motion";

import { Badge } from "../ui/badge";
import { SquareUser, ThumbsUp } from "lucide-react";
import type { Lecture } from "@/types/tyeps.all";
import { categorySwap, priceTypeSwap } from "@/constants/constants.all";

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
            <Badge className="opacity-100">
              {categorySwap[lecture?.category]}
            </Badge>
            <Badge className="opacity-100" variant={"secondary"}>
              {priceTypeSwap[lecture?.price_type]}
            </Badge>
          </div>
          <span className="mt-5 h-20 whitespace-pre-line text-sm leading-6 text-white">
            {lecture?.content}
          </span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <SquareUser width={17} height={17} stroke="#ffffff" />
              <span className="text-[0.93rem] text-white">
                {lecture?.tutor_name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp width={16} height={16} stroke="#ffffff" />
              <span className="text-[0.93rem] text-white">{lecture?.like}</span>
            </div>
          </div>
          <div className="flex gap-3">
            {lecture?.tag.map((t: string, index: number) => {
              return (
                <span className="text-sm text-slate-400" key={index}>
                  #{t}
                </span>
              );
            })}
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
