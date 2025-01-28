"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";
import TrainingCenterCard from "./training-center-card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, Loader2, Pencil, Plus } from "lucide-react";
import TutorCard from "../tutor/tutor-card";
import TutorTrainingForm from "./tutor-training-form";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { Tutor } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import AdopterListTable from "./adopter-list-table";
import { GetAllTutorDto } from "@/dtos/tutor.dto";

export default function TrainingCenterTab() {
  const { data: session, status } = useSession();
  const [isEdit, setIsEdit] = useState(false);
  const [tutors, setTutors] = useState<Tutor[] | null>(null);
  const [trainingCenters, setTrainingCenters] = useState<
    GetTrainingCenterDetailDto[] | null
  >(null);
  const [isAddTrainer, setIsAddTrainer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [selectTrainingCenter, setSelectTrainingCenter] =
    useState<GetTrainingCenterDetailDto | null>(null);
  const [filteredTutors, setFilteredTutors] = useState<GetAllTutorDto[] | null>(
    null,
  );
  const [isDialogOpened, setIsDialogOpended] = useState(false);

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
      setSelectTrainingCenter(trainingCenters[0]);
    };

    getData();
  }, [isAddTrainer, session?.user?.id]);

  useEffect(() => {
    const filteredDatas: GetAllTutorDto[] = (tutors || [])?.filter((tutor) => {
      return !selectTrainingCenter?.tutorTrainingCenters.some(
        (training) => training.tutor.id === tutor.id,
      );
    });

    setFilteredTutors(filteredDatas);
  }, [selectTrainingCenter]);

  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-end gap-3">
        <Link href="/mypage/corporation/curriculum/new/training-center">
          <Button
            disabled={!tutors || tutors.length === 0}
            variant="destructive"
            className="flex h-9 gap-1 px-2"
          >
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
            <>
              <div className="flex w-full gap-3">
                {trainingCenters.map((trainingCenter) => (
                  <Badge
                    key={trainingCenter.id}
                    onClick={() => setSelectTrainingCenter(trainingCenter)}
                    variant="tag"
                    className={`w-fit cursor-pointer ${
                      selectTrainingCenter?.id === trainingCenter.id &&
                      "bg-black text-white"
                    }`}
                  >
                    {trainingCenter.name}
                  </Badge>
                ))}
              </div>
              {/* 훈련소 정보 섹션 */}
              <TrainingCenterCard
                trainingCenter={selectTrainingCenter ?? trainingCenters[0]}
                isEdit={isEdit}
              />
              {/* 훈련사 추가 섹션 */}
              <div className="flex w-full flex-col">
                <hr className="my-3 w-full" />
                <div className="grid w-full grid-cols-4 gap-4">
                  <Dialog
                    open={isDialogOpened}
                    onOpenChange={setIsDialogOpended}
                  >
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
                        trainingCenterId={
                          selectTrainingCenter?.id ?? trainingCenters[0]?.id
                        }
                        tutors={filteredTutors ?? undefined}
                        setIsDialogOpended={setIsDialogOpended}
                      />
                    </DialogContent>
                  </Dialog>

                  {selectTrainingCenter?.tutorTrainingCenters
                    .slice(0, isOpened ? undefined : 7)
                    .map((tutorCenter) => (
                      <TutorCard
                        key={tutorCenter.tutor.id}
                        trainingCenterId={selectTrainingCenter.id}
                        tutor={tutorCenter.tutor}
                        isEdit={isEdit}
                      />
                    ))}
                </div>

                {selectTrainingCenter &&
                  selectTrainingCenter?.tutorTrainingCenters?.length > 7 && (
                    <div className="flex flex-col items-center">
                      <Button
                        className="h-fit w-fit rounded-full p-2"
                        variant="destructive"
                        onClick={() => setIsOpened(!isOpened)}
                      >
                        <ChevronDown
                          strokeWidth={3}
                          className={`h-7 w-7 duration-150 ${isOpened && "rotate-180"}`}
                        />
                      </Button>
                    </div>
                  )}
              </div>
              {/* 훈련소 입양자 리스트 섹션 */}
              <AdopterListTable />
            </>
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
