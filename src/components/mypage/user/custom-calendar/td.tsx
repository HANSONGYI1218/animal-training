import { format } from "date-fns";
import { WholeDateArray } from "./tr";
import { Dot } from "lucide-react";
import { useContext, useState } from "react";
import { attandanceStatusSwap } from "@/constants/constants.all";
import { CalendarContext } from "../curriculum-bar/training-center-tab";
import { AttendanceRecord } from "@/types/tyeps.all";

interface TdProps {
  weekDate: WholeDateArray[];
  currentMonth: Date;
}

const Td = ({ weekDate, currentMonth }: TdProps) => {
  const attendances = useContext(CalendarContext);
  const [hoveredCells, setHoveredCells] = useState<any>({});

  const handleMouseOver = (date: string) => {
    setHoveredCells((prev: any) => ({
      ...prev,
      [date]: true,
    }));
  };

  const handleMouseLeave = (date: string) => {
    setHoveredCells((prev: any) => ({
      ...prev,
      [date]: false,
    }));
  };

  return (
    <>
      {attendances &&
        weekDate.map((p, index) => {
          const attendance = (attendances as AttendanceRecord[]).find(
            (attendance: AttendanceRecord) =>
              format(attendance.training_date, "yyyy-M-d") ===
              format(p.date, "yyyy-M-d"),
          );

          const isToday =
            format(new Date(), "yyyy-M-d") === format(p.date, "yyyy-M-d");

          const isThisMonth =
            format(currentMonth, "yyyy-M") === format(p.date, "yyyy-M");

          return (
            <div
              key={index}
              onMouseOver={() => handleMouseOver(p.formattedDate)}
              onMouseLeave={() => handleMouseLeave(p.formattedDate)}
              className="relative flex"
            >
              <div
                className={`relative flex h-[80px] w-full flex-col items-center gap-3 ${
                  !isThisMonth && "text-transparent"
                }`}
              >
                <span className={`${isToday && "text-[#663399]"}`}>
                  {p.formattedDate}
                </span>
                {attendance && isThisMonth && (
                  <Dot
                    stroke={
                      attendance.attendance_status === "ATTENDANCE"
                        ? "#00592D"
                        : attendance.attendance_status === "TARDY"
                          ? "#FFE700"
                          : attendance.attendance_status === "ABSENT"
                            ? "#FF0000"
                            : `#DBD8BC`
                    }
                    fill={
                      attendance.attendance_status === "ATTENDANCE"
                        ? "#00592D"
                        : attendance.attendance_status === "TARDY"
                          ? "#FFE700"
                          : attendance.attendance_status === "ABSENT"
                            ? "#FF0000"
                            : `#DBD8BC`
                    }
                    className={`h-3 w-3 rounded-full ${
                      attendance.attendance_status === "ATTENDANCE"
                        ? "bg-[#00592D]"
                        : attendance.attendance_status === "TARDY"
                          ? "bg-[#FFE700]"
                          : attendance.attendance_status === "ABSENT"
                            ? "bg-[#FF0000]"
                            : `bg-[#DBD8BC]`
                    }`}
                  />
                )}
              </div>
              <div
                className={`absolute bottom-12 left-20 z-10 w-fit flex-col gap-2 rounded-xl bg-white p-6 shadow-md ${attendance && hoveredCells[p.formattedDate] ? "flex" : "hidden"}`}
              >
                <span className="w-24 text-sm font-semibold">
                  {attendance &&
                    attandanceStatusSwap[attendance.attendance_status]}
                </span>
                {attendance && attendance.attendance_status === "SCHEDULED" && (
                  <div className="flex w-52 flex-col">
                    <span className="text-sm">
                      훈련사님과 만남이 예정돼 있어요.👋
                    </span>
                    <span className="text-sm">늦지 않게 와주세요.</span>
                  </div>
                )}
                {attendance && attendance.attendance_status !== "ABSENT" && (
                  <div className="flex flex-col">
                    <span className="text-sm">
                      {`훈련 시작: ${attendance?.class_start_time}`}
                    </span>
                    <span className="text-sm">
                      {`훈련 종료: ${attendance?.class_end_time}`}
                    </span>
                  </div>
                )}
                {attendance && attendance.attendance_status === "ABSENT" && (
                  <span className="w-48 text-sm">{`사유: ${attendance?.absent_reason}`}</span>
                )}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default Td;
