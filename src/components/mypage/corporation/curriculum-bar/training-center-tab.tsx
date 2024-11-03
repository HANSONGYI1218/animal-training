"use client";

import { CorporationDetailDto } from "@/dtos/corporation.dto";
import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";
import TrainingCenterCard from "./training-center-card";

export default function TrainingCenterTab({
  corporation,
}: {
  corporation: CorporationDetailDto;
}) {
  const trainingCenters: GetTrainingCenterDetailDto[] =
    corporation?.trainingCenter ?? [];

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">기업 훈련소</span>

        <span className="text-lg font-semibold">기업 훈련소</span>
        <div className="flex flex-col gap-6 p-6">
          <div className="grid w-full grid-cols-4 gap-6">
            {trainingCenters &&
              trainingCenters.map((trainingCenter, index) => (
                <TrainingCenterCard
                  key={index}
                  trainingCenter={trainingCenter}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
