import { startOfMonth, startOfWeek, addMonths, subMonths } from "date-fns";
import { useState } from "react";
import CalendarHeader from "./calendar-header";
import CalendarTable from "./calendar-table";

export interface CalendarProps {
  currentMonth: Date;
  selectedDate: Date;
}

const CustomCalendar = () => {
  //현재 보고 있는 달
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  //이전 달로 이동(currentMonth가 이전 달로 바뀜)
  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  //다음 달로 이동(currentMonth가 다음 달로 바뀜)
  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };
  const onDateClick = (day: React.SetStateAction<Date>) => {
    setSelectedDate(day);
  };
  const monthStart = startOfMonth(currentMonth);
  const startDate = startOfWeek(monthStart);

  return (
    <div className="flex w-full flex-col justify-center gap-6">
      <CalendarHeader
        currentMonth={currentMonth}
        prevMonth={prevMonth}
        nextMonth={nextMonth}
      />
      <CalendarTable currentMonth={currentMonth} selectedDate={selectedDate} />
    </div>
  );
};

export default CustomCalendar;
