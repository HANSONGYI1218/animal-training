"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";
import TrainingCenterCard from "./training-center-card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader2, Pencil, Plus } from "lucide-react";
import TutorCard from "../tutor/tutor-card";
import TutorTrainingForm from "./tutor-training-form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Tutor } from "@prisma/client";

export default function TrainingCenterTab() {
  const { data: session, status } = useSession();
  const [isEdit, setIsEdit] = useState(false);
  const [tutors, setTutors] = useState<Tutor[] | null>(null);
  const [trainingCenters, setTrainingCenters] = useState<
    GetTrainingCenterDetailDto[] | null
  >(null);
  const [isAddTrainer, setIsAddTrainer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const [trainingCentersResponse, tutorsResponse] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/training-center?corporationId=${session?.user?.id}`,
          {
            method: "GET",
          },
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_WEB_URL}/api/tutor?corporationId=${session?.user?.id}`,
          {
            method: "GET",
          },
        ),
      ]);

      if (!trainingCentersResponse.ok || !tutorsResponse.ok) {
        throw new Error("Failed to fetch data from one or both endpoints.");
      }

      const [trainingCenters, tutors] = await Promise.all([
        trainingCentersResponse.json(),
        tutorsResponse.json(),
      ]);
      setTutors(tutors);
      setTrainingCenters(trainingCenters);
      setIsLoading(false);
    };

    getData();
  }, [isAddTrainer]);

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
          {isLoading ? (
            <div className="flex min-h-40 w-full flex-col items-center justify-center py-6 text-center">
              <Loader2 className="animate-spin" />
            </div>
          ) : trainingCenters && trainingCenters?.length > 0 ? (
            trainingCenters.map((trainingCenter, index) => {
              const filteredTutors = tutors?.filter((tutor) => {
                return !trainingCenter?.tutorTrainingCenters.some(
                  (training) => training.tutor.id === tutor.id,
                );
              });

              return (
                <div
                  key={index}
                  className="flex w-full flex-col rounded-xl bg-slate-100 p-6"
                >
                  <span className="mb-6 font-[540]">
                    {trainingCenter?.name}
                  </span>
                  <TrainingCenterCard
                    trainingCenter={trainingCenter}
                    isEdit={isEdit}
                  />
                  <div className="flex w-full flex-col">
                    <hr className="my-3 w-full" />
                    <div className="grid w-full grid-cols-4 rounded-xl">
                      <Dialog>
                        <DialogTrigger type="button" asChild disabled={!isEdit}>
                          <div className="group flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border py-6 text-center text-sm">
                            <Plus
                              className="h-6 w-6 group-hover:scale-110"
                              strokeWidth={2.1}
                              stroke="#000000"
                            />
                            훈련사를 추가해보세요!
                          </div>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <TutorTrainingForm
                            setIsAddTrainer={setIsAddTrainer}
                            trainingCenterId={trainingCenter?.id}
                            tutors={filteredTutors}
                          />
                        </DialogContent>
                      </Dialog>

                      {trainingCenter?.tutorTrainingCenters.map(
                        (tutorCenter, indx) => {
                          return (
                            <TutorCard
                              key={indx}
                              trainingCenterId={trainingCenter?.id}
                              tutor={tutorCenter.tutor}
                              isEdit={isEdit}
                            />
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border py-6 text-center text-sm">
              <Image
                src="/icons/general-face.svg"
                height={30}
                width={30}
                alt="face"
              />
              훈련소를 생성해보세요!
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
