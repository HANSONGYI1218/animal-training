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
import { Badge } from "@/components/ui/badge";
import UserTrainingCenter from "./user-training-center";
import { AttendanceRecord } from "@/types/tyeps.all";
import Image from "next/image";
import { UserCurriculumWithTutorTrainingCenterDto } from "@/dtos/user.curriculum.dto";

export type PickerType = "date" | "month" | "year" | "";

export const CalendarContext = createContext<AttendanceRecord[] | null>(null);

export interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  setPickerType: Dispatch<SetStateAction<PickerType>>;
}

export default function TraningCenterTab() {
  const user = useContext(UserContext);
  const [userCurriculum, setUserCurriculum] =
    useState<UserCurriculumWithTutorTrainingCenterDto | null>(null);
  const [selectIndex, setSelectIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCurriculum = async () => {
      const responseUserTutorTrainingCenter = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/user-curriculum?userId=${user?.id}&isTutorTrainingCenter=true`,
        {
          method: "GET",
          cache: "no-store",
        },
      );

      if (!responseUserTutorTrainingCenter.ok) {
        return null;
      }

      const userTutorTrainingCenter: UserCurriculumWithTutorTrainingCenterDto =
        await responseUserTutorTrainingCenter.json();
      setUserCurriculum(userTutorTrainingCenter);
    };

    fetchCurriculum();
  }, []);

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">선택한 훈련소</span>
        {userCurriculum ? (
          <UserTrainingCenter userCurriculum={userCurriculum} />
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
