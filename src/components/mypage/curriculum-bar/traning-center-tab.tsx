import Link from "next/link";
import { Building2, ChevronRight, Dot, SquareUser } from "lucide-react";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import dummydata from "@/utils/dummydata";
import Image from "next/image";
import CustomCalendar from "../custom-calendar/custom-calendar";
import { AttendanceRecord } from "@/types/tyeps.all";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { attandanceStatusSwap } from "@/constants/constants.all";

export type PickerType = "date" | "month" | "year" | "";

export interface DatePickerProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  setPickerType: Dispatch<SetStateAction<PickerType>>;
}

export default function TraningCenterTab() {
  const [traningCenter, setTraningCenter] = useState<any>(null);
  const [tutor, setTutor] = useState<any>(null);
  const [currentCurriculum, setCurrentCurriculum] = useState<any>(null);

  const scheduledAttendance = () => {
    return (
      currentCurriculum?.attendances?.find(
        (attendance: AttendanceRecord) => attendance.training_date > new Date(),
      ) ?? undefined
    );
  };

  const attendanceCounts = (index: number) => {
    if (index === 0) {
      return currentCurriculum?.attendances?.filter(
        (attendance: AttendanceRecord) =>
          attendance.attendance_status === "ATTENDANCE",
      ).length;
    } else if (index === 1) {
      return currentCurriculum?.attendances?.filter(
        (attendance: AttendanceRecord) =>
          attendance.attendance_status === "TARDY",
      ).length;
    } else if (index === 2) {
      return currentCurriculum?.attendances?.filter(
        (attendance: AttendanceRecord) =>
          attendance.attendance_status === "ABSENT",
      ).length;
    } else {
      return currentCurriculum?.attendances?.filter(
        (attendance: AttendanceRecord) =>
          attendance.attendance_status === "SCHEDULED",
      ).length;
    }
  };

  useEffect(() => {
    const fetchCurriculum = async () => {
      const getCurrentCurriculum = dummydata.userCurriculumData[2];
      const getTraningCenter = dummydata.traningCenterData[2];
      const getTutor = dummydata.TutorData.find(
        (tutor) => tutor.id === getTraningCenter?.tutorId,
      );

      setCurrentCurriculum(getCurrentCurriculum);
      setTraningCenter(getTraningCenter);
      setTutor(getTutor);
    };

    fetchCurriculum();
  }, []);

  return (
    <section className="flex flex-col gap-12">
      <div className="flex flex-col">
        <span className="text-lg font-semibold">선택한 훈련소</span>
        <div className="flex gap-6 p-6">
          <Image
            src={traningCenter?.profile}
            width={300}
            height={200}
            alt="profile"
            className="rounded-xl"
          />
          <div className="flex flex-1 flex-col justify-between">
            <span className="font-semibold">{traningCenter?.name}</span>
            <span className="text-neutral-600">
              {traningCenter?.introduction}
            </span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <SquareUser width={16} height={16} stroke="#000000" />
                  <span className="text-[0.93rem]">{tutor?.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 width={16} height={16} stroke="#000000" />
                  <span className="text-[0.93rem]">
                    {tutor?.corporation_name}
                  </span>
                </div>
              </div>
              <Link
                href={`/curriculum/traning/${traningCenter?.id}`}
                className="group relative flex h-8 w-20 self-end"
              >
                <div className="relative z-10 flex w-full items-center justify-center gap-1">
                  <span className="pl-1 text-sm font-semibold text-white">
                    바로가기
                  </span>
                  <ChevronRight
                    width={16}
                    height={16}
                    strokeWidth={2.8}
                    className="cursor-pointer"
                    stroke="#ffffff"
                    fill="#000000"
                  />
                </div>
                <div className="absolute right-0 top-1 z-0 h-6 w-6 rounded-full bg-black transition-all duration-300 group-hover:top-0 group-hover:h-full group-hover:w-full" />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <span className="text-lg font-semibold">출석표</span>
        <div className="flex gap-6 rounded-xl border p-6">
          {Object.entries(attandanceStatusSwap).map(
            ([status, label], index) => {
              const count = attendanceCounts(index);
              return (
                <span key={status}>
                  {label}: {count}
                </span>
              );
            },
          )}
          <span>총: {currentCurriculum?.attendances?.length}</span>
        </div>
        <div className="flex justify-end gap-4">
          <div className="flex items-center gap-1">
            <Dot
              className="h-3 w-3 rounded-full bg-[#00592D]"
              stroke="#00592D"
              fill="#00592D"
            />
            출석
          </div>
          <div className="flex items-center gap-1">
            <Dot
              className="h-3 w-3 rounded-full bg-[#FFE700]"
              stroke="#FFE700"
              fill="#FFE700"
            />
            지각
          </div>
          <div className="flex items-center gap-1">
            <Dot
              className="h-3 w-3 rounded-full bg-[#FF0000]"
              stroke="#FF0000"
              fill="#FF0000"
            />
            결석
          </div>
          <div className="flex items-center gap-1">
            <Dot
              className="h-3 w-3 rounded-full bg-[#DBD8BC]"
              stroke="#DBD8BC"
              fill="#DBD8BC"
            />
            예정
          </div>
        </div>
        <div className="flex w-full gap-6 p-6">
          <CustomCalendar attendances={currentCurriculum?.attendances} />
        </div>
        <div className="flex flex-col gap-6 rounded-xl border p-6">
          <span className="font-semibold">다음 예정일을 확인해보세요📆</span>
          <div className="flex flex-col gap-3">
            {scheduledAttendance() ? (
              <span>
                다음 예정일은{" "}
                {format(
                  scheduledAttendance().training_date,
                  "yyyy년 MM월 dd일 eeee",
                  {
                    locale: ko,
                  },
                )
                  .split("")
                  .map((letter, index) => {
                    const hasNumbers = /\d/.test(letter);
                    const hasDays =
                      index === 14 || index === 15 || index === 16;

                    if (hasNumbers || hasDays) {
                      return <span className="font-semibold">{letter}</span>;
                    }
                    return letter;
                  })}
              </span>
            ) : (
              <span className="font-semibold">모든 일정을 마쳤습니다!</span>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
