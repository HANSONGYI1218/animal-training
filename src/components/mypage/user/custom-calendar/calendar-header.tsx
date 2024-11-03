import React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CalendarHeaderProps {
  currentMonth: Date;
  prevMonth?: () => void;
  nextMonth?: () => void;
}
const CalendarHeader = ({
  currentMonth,
  prevMonth,
  nextMonth,
}: CalendarHeaderProps) => {
  return (
    <div className="flex w-full justify-center">
      <button onClick={prevMonth}>
        <ChevronLeft width={24} height={24} />
      </button>
      <span className="m-[20px] w-28 text-[20px]">
        {format(currentMonth, "yyyy")}년{" "}
        <span>{format(currentMonth, "M")}월</span>
      </span>
      <button onClick={nextMonth}>
        <ChevronRight width={24} height={24} />
      </button>
    </div>
  );
};

export default CalendarHeader;
