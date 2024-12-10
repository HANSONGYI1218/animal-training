import { format } from "date-fns";
import { Dot } from "lucide-react";

export default function RecordStep({
  className,
  record_date,
  children,
}: {
  className?: string;
  record_date: Date | null;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full justify-between">
      <div className="flex h-full w-10 flex-col items-center">
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-5">
          <Dot className="h-2 w-2 rounded-full bg-green-60 stroke-green-60" />
        </div>
        <div className="my-2 w-[3px] flex-1 bg-green-5" />
      </div>
      <span className="text-gray-600">
        {record_date ? format(record_date, "yyyy.MM.dd") : "입양전"}
      </span>
      <div className="w-2/3 flex-col rounded-xl bg-green-5 p-6">{children}</div>
    </div>
  );
}
