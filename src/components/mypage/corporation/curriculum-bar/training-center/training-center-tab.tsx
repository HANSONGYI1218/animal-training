"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";
import TrainingCenterCard from "./training-center-card";
import { useContext, useState } from "react";
import { CorporationContext } from "../../../../../providers/corporation-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import TutorCard from "../lecture/tutor-card";
import TutorTrainingForm from "./tutor-training-form";

export default function TrainingCenterTab() {
  const corporation = useContext(CorporationContext);
  const [isEdit, setIsEdit] = useState(false);

  const trainingCenters: GetTrainingCenterDetailDto[] =
    corporation?.trainingCenters ?? [];

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-end gap-3">
        <Link href="/mypage/corporation/curriculum/new/training-center">
          <Button variant="destructive" className="flex h-9 gap-1 px-2">
            <Plus className="h-5 w-5" />
            훈련소 생성
          </Button>
        </Link>
        <Button
          variant="destructive"
          className="flex h-9 gap-1 px-2"
          onClick={() => {
            setIsEdit(!isEdit);
          }}
        >
          <Pencil className="h-4 w-4" />
          {isEdit ? " 완료" : "편집"}
        </Button>
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold">기업 훈련소</span>
        <div className="flex flex-col gap-6 p-6">
          {trainingCenters &&
            trainingCenters.map((trainingCenter, index) => {
              const filteredTutors = corporation?.tutors?.filter((tutor) => {
                return !trainingCenter?.tutorTrainingCenters.some(
                  (training) => training.tutor.id === tutor.id,
                );
              });

              return (
                <div className="flex w-full flex-col gap-6 rounded-xl bg-slate-100 p-6">
                  <span className="font-[540]">{trainingCenter?.name}</span>
                  <TrainingCenterCard
                    key={index}
                    trainingCenter={trainingCenter}
                    isEdit={isEdit}
                  />
                  <div className="flex w-full flex-col">
                    <hr className="my-3 w-full" />
                    <div className="grid w-full grid-cols-4 rounded-xl">
                      <Dialog>
                        <DialogTrigger type="button" asChild disabled={!isEdit}>
                          <div className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border py-6 text-center text-sm">
                            <Plus
                              className="h-6 w-6 group-hover:stroke-[#ffffff]"
                              strokeWidth={2.1}
                              stroke="#000000"
                            />
                            훈련사를 추가해보세요!
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <TutorTrainingForm
                            trainingCenterId={trainingCenter?.id}
                            tutors={filteredTutors}
                          />
                        </DialogContent>
                      </Dialog>
                      {trainingCenter?.tutorTrainingCenters.map(
                        (tutorCenter) => {
                          return (
                            <TutorCard
                              key={index}
                              trainingCenterId={trainingCenter?.id}
                              tutor={tutorCenter.tutor}
                              isEdit={isEdit}
                              isTrainingCenterTab
                            />
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
