"use client";

import {
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { UserContext } from "@/providers/user-provider";
import { UserTutorTrainingCenterByUserIdDto } from "@/dtos/user.tutorTrainingCenter.dto";
import { Badge } from "@/components/ui/badge";
import UserTrainingCenter from "./user-training-center";
import { AttendanceRecord } from "@/types/tyeps.all";
import Image from "next/image";

export type PickerType = "date" | "month" | "year" | "";

export const CalendarContext = createContext<AttendanceRecord[] | null>(null);

export interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  setPickerType: Dispatch<SetStateAction<PickerType>>;
}

export default function TraningCenterTab() {
  const user = useContext(UserContext);
  const [tutorTraningCenters, setTutorTraningCenters] = useState<any[]>([]);
  const [userCurriculum, setUserCurriculum] = useState<any>(null);
  const [selectIndex, setSelectIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCurriculum = async () => {
      const responseUserTutorTrainingCenters = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/user-tutorTrainingCenter?userId=${user?.id}`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      if (!responseUserTutorTrainingCenters.ok) {
        return null;
      }

      const userTutorTrainingCenters: UserTutorTrainingCenterByUserIdDto[] =
        await responseUserTutorTrainingCenters.json();
      setUserCurriculum(userCurriculum);
      setTutorTraningCenters(
        userTutorTrainingCenters.map(
          (userTutorTrainingCenter) =>
            userTutorTrainingCenter?.tutorTrainingCenter,
        ),
      );
    };

    fetchCurriculum();
  }, []);

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">선택한 훈련소</span>
        {tutorTraningCenters &&
        tutorTraningCenters?.length > 0 &&
        userCurriculum ? (
          <>
            <div className="flex gap-6">
              {tutorTraningCenters.map((tutorTraningCenter, index) => {
                return (
                  <Badge
                    key={index}
                    onClick={() => {
                      setSelectIndex(index);
                    }}
                    variant={"tag"}
                    className={`cursor-pointer ${selectIndex === index && "bg-black text-white"}`}
                  >
                    {tutorTraningCenter?.trainingCenter?.name}
                  </Badge>
                );
              })}
            </div>
            {selectIndex && (
              <UserTrainingCenter
                trainingCenter={
                  tutorTraningCenters[selectIndex]?.trainingCenter
                }
                tutor={tutorTraningCenters[selectIndex]?.tutor}
                attendances={userCurriculum?.attendances ?? []}
              />
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center border-b p-6">
            <Image
              src="/images/lecture-category/dog-face.png"
              width={100}
              height={100}
              alt="traning"
              className="mb-6"
            />
            <span>신청한 훈련소가 없어요.</span>
            <span>훈련소 선택 후 다시 만나요!</span>
          </div>
        )}
      </div>
    </section>
  );
}
