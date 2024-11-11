import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { AdoptionAgreementDto } from "@/dtos/adoption.dto";

export default function AgreementCarousel({
  agreement,
}: {
  agreement: AdoptionAgreementDto;
}) {
  const flatArray = agreement
    ? ["educationForm", "trainingForm", "adoptionForm"].flatMap(
        (key) => agreement[key as keyof typeof agreement] ?? [], // null일 경우 빈 배열로 처리
      )
    : []; // agreement가 null이거나 undefined일 경우 빈 배열 반환
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {flatArray.map((agreement, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Image
                src={agreement}
                width={400}
                height={700}
                alt="agreement"
                className="w-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
