"use client";

import { Button } from "../ui/button";
import Image from "next/image";
import DivisionIcon from "@/public/icons/division-d.svg?component";
import DivisionWhiteIcon from "@/public/icons/division-d-white.svg?component";
import { useEffect, useState } from "react";
import { AnimalType, Category } from "@/types/tyeps.all";
import { useRouter, usePathname } from "next/navigation";

export default function LectureCategory() {
  const [category, setCategory] = useState<string>("all");
  const [animalType, setAnimalType] = useState<string>("dog");
  const router = useRouter();
  const path = usePathname();

  const handlePushRouter = () => {
    router.push(
      process.env.NEXT_PUBLIC_WEB_URL +
        `/lecture?types=${animalType}&categorys=${category}`,
    );
  };

  useEffect(() => {
    handlePushRouter();
  }, [animalType, category]);

  return (
    <section className="container relative mx-auto flex w-full flex-col bg-white pt-4 shadow-[0_12px_10px_-15px_rgba(0,0,0,0.9)]">
      <div className="relative flex h-8 w-fit items-end justify-center overflow-hidden shadow-[0_16px_10px_-15px_rgba(0,0,0,0.9)]">
        <div
          onClick={() => {
            setAnimalType("dog");
          }}
          className="relative flex h-full w-fit translate-y-1 cursor-pointer items-end hover:border-b"
        >
          {animalType === "dog" ? <DivisionIcon /> : <DivisionWhiteIcon />}
          <span
            className={`absolute left-1/2 top-1.5 -translate-x-1/2 transform text-sm font-semibold ${animalType === "dog" ? "text-white" : "text-black"}`}
          >
            {AnimalType.DOG}
          </span>
        </div>
        <div
          onClick={() => {
            setAnimalType("cat");
          }}
          className="relative flex h-full w-fit translate-y-1 cursor-pointer items-end hover:border-b"
        >
          {animalType === "cat" ? <DivisionIcon /> : <DivisionWhiteIcon />}
          <span
            className={`absolute left-1/2 top-1.5 -translate-x-1/2 transform text-sm font-semibold ${animalType === "cat" ? "text-white" : "text-black"}`}
          >
            {AnimalType.CAT}
          </span>
        </div>
      </div>
      <div className="flex w-full justify-between pt-2">
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
          {Category.FOOD}
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
          {Category.BEAUTY}
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
          {Category.HEALTH}
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
          {Category.WALK}
        </Button>
        <Button
          onClick={() => setCategory("traning")}
          variant={"lectureCategory"}
          className={`flex h-fit flex-col gap-2 ${category === "traning" ? "border-green-100" : "border-white"}`}
        >
          <Image
            src="/images/lecture-category/traning.png"
            width={40}
            height={40}
            alt="traning"
          />{" "}
          {Category.TRANING}
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
          {Category.ADOPT}
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
          {Category.PLAY}
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
          {Category.COMMUNICATION}
        </Button>
      </div>
    </section>
  );
}
