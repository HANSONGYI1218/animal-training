"use client";

import { motion } from "framer-motion";
import { SquareUser, ThumbsUp } from "lucide-react";
import type { Tutor } from "@/types/tyeps.all";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import { TrainingCenter } from "@prisma/client";

interface CenterDetailProps {
  center: TrainingCenter | undefined;
  tutor: Tutor | undefined;
}

export default function CenterDetailBanner({
  center,
  tutor,
}: CenterDetailProps) {
  const plugin: any = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  );
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      plugin.current.reset();
    });
  }, [api]);

  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-[#EDEDE9]/5 py-12">
      <div className="container relative z-10 mx-auto flex w-full max-w-[1150px]">
        <div className="flex w-full flex-col gap-4">
          <span className="text-3xl font-bold">{center?.name}</span>
          <span className="mt-5 h-20 whitespace-pre-line text-sm leading-6">
            {center?.introduction}
          </span>
          <span className="whitespace-pre-line text-sm leading-6">
            {center?.address}
          </span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <SquareUser width={17} height={17} stroke="#000000" />
              <span className="text-[0.93rem]">{tutor?.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <ThumbsUp width={16} height={16} stroke="#000000" />
              <span className="text-[0.93rem]">{center?.like}개</span>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="relative w-full max-w-[400px]"
          >
            <CarouselContent>
              {center?.additionalImgs.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image}
                    width={400}
                    height={240}
                    style={{ width: "400px", height: "240px" }}
                    alt="lecture-thumbnail"
                    className="rounded-lg object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="relative top-3 flex items-center justify-center">
              <div className="relative flex">
                <CarouselPrevious />
              </div>
              <div className="py-2 text-center text-sm">
                {current} / {count}
              </div>
              <div className="relative flex">
                <CarouselNext />
              </div>
            </div>
          </Carousel>
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
