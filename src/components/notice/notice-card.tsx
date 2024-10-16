import { Notice } from "@prisma/client";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

export default function NoticeCard({
  notice,
  index,
}: {
  notice: Notice;
  index: number;
}) {
  return (
    <div
      className={`flex w-full cursor-pointer justify-between gap-6 border-b p-6 ${notice?.isFixed ? "bg-slate-100" : "bg-white"}`}
    >
      <div className="flex gap-6">
        {notice?.isFixed ? <span>📌</span> : <span>{notice?.index + 1}</span>}

        <span className={` ${notice?.isFixed && "font-semibold"}`}>
          {notice?.title}
        </span>
      </div>
      <span>{format(notice?.createdAt, "yyyy.MM.dd")}</span>
    </div>
  );
}
