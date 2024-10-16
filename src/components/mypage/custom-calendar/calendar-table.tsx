import { ReactNode } from "react";
import Tr from "./tr";
import { CalendarProps } from "./custom-calendar";

interface TbodyProps {
  children: ReactNode;
}

const Tbody = ({ children }: TbodyProps) => {
  return <tbody className="flex w-full flex-col">{children}</tbody>;
};

const DayoftheWeek = () => {
  const date = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <thead className="my-[10px] flex w-full justify-center">
      <tr className="grid w-full grid-cols-7">
        {date.map((p) => {
          return (
            <th className="w-full text-center font-medium" key={p}>
              {p}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

const CalendarTable = ({
  currentMonth,
  selectedDate,
  attendances,
}: CalendarProps) => {
  return (
    <table className="flex flex-col gap-10 text-[16px]">
      <DayoftheWeek />
      <Tbody>
        <Tr
          currentMonth={currentMonth}
          selectedDate={selectedDate}
          attendances={attendances}
        />
      </Tbody>
    </table>
  );
};

export default CalendarTable;
