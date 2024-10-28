import { Notice } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { Paperclip } from "lucide-react";

export default function NoticeCard({
  notice,
  index,
}: {
  notice: Notice;
  index: number;
}) {
  return (
    <Link href={`/notice/${notice?.id}`}>
      <div
        className={`flex w-full cursor-pointer justify-between gap-6 border-b p-6 ${notice?.isFixed ? "bg-slate-100" : "bg-white"}`}
      >
        <div className="flex gap-6">
          {notice?.isFixed ? <span>📌</span> : <span>{notice?.index + 1}</span>}

          <span className={` ${notice?.isFixed && "font-semibold"}`}>
            {notice?.title}
          </span>
        </div>
        <div className="flex items-center gap-6">
          {notice?.attachments && notice?.attachments.length > 0 && (
            <Paperclip width={15} height={15} stroke="#a3a3a3" />
          )}
          <span className="text-neutral-600">
            {format(notice?.createdAt, "yyyy.MM.dd")}
          </span>
        </div>
      </div>
    </Link>
  );
}
