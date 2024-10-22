"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Category } from "@/types/tyeps.all";
import { categorySwap } from "@/constants/constants.all";
import { useRouter, usePathname } from "next/navigation";

export default function LectureCategory() {
  const [category, setCategory] = useState<string>("all");
  const router = useRouter();
  const path = usePathname();

  const handlePushRouter = () => {
    router.push(path + `?category=${category}`);
  };

  useEffect(() => {
    handlePushRouter();
  }, [category]);

  return (
    <section className="border-b pt-2">
      <div className="container mx-auto flex w-full justify-between">
        <Button
          onClick={() => setCategory("all")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "all" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/all.png"
            width={40}
            height={40}
            alt="all"
          />
          전체
        </Button>
        <Button
          onClick={() => setCategory("food")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "food" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/food.png"
            width={40}
            height={40}
            alt="food"
          />
          {categorySwap[Category.FOOD]}
        </Button>
        <Button
          onClick={() => setCategory("beauty")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "beauty" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/beauty.png"
            width={40}
            height={40}
            alt="beauty"
          />
          {categorySwap[Category.BEAUTY]}
        </Button>
        <Button
          onClick={() => setCategory("health")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "health" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/health.png"
            width={40}
            height={40}
            alt="health"
          />
          {categorySwap[Category.HEALTH]}
        </Button>
        <Button
          onClick={() => setCategory("walk")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "walk" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/walk.png"
            width={40}
            height={40}
            alt="walk"
          />
          {categorySwap[Category.WALK]}{" "}
        </Button>
        <Button
          onClick={() => setCategory("training")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "training" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/training.png"
            width={40}
            height={40}
            alt="training"
          />{" "}
          {categorySwap[Category.TRAINING]}
        </Button>
        <Button
          onClick={() => setCategory("adopt")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "adopt" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/adopt.png"
            width={40}
            height={40}
            alt="adopt"
          />
          {categorySwap[Category.ADOPT]}
        </Button>
        <Button
          onClick={() => setCategory("play")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "play" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/play.png"
            width={40}
            height={40}
            alt="play"
          />
          {categorySwap[Category.PLAY]}
        </Button>
        <Button
          onClick={() => setCategory("communication")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "communication" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/communication.png"
            width={40}
            height={40}
            alt="communication"
          />
          {categorySwap[Category.COMMUNICATION]}
        </Button>
      </div>
    </section>
  );
}
