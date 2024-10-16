import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dummydata from "@/utils/dummydata";
import type { Notice } from "@prisma/client";
import { format } from "date-fns";
import { CalendarDays, Download } from "lucide-react";

export default async function NoticeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const notice: Notice = dummydata.noticeData.find(
    (notice) => notice.id === id,
  ) as Notice;

  return (
    <main className="container mx-auto flex w-full max-w-[1150px] flex-col items-center gap-12 py-6">
      <span className="text-2xl font-bold">공지사항</span>
      <div className="mb-24 flex w-full flex-col">
        <div className="flex w-full flex-col gap-2 border-b p-6">
          <Badge
            variant={notice?.isFixed ? "destructive" : "default"}
            className="w-fit"
          >
            {notice?.isFixed ? "고정" : "기본"}
          </Badge>
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">{notice?.title}</span>
            <span className="flex items-center gap-1 text-sm text-neutral-600">
              <CalendarDays stroke="#a3a3a3" width={15} height={15} />
              {format(notice?.createdAt, "yyyy.MM.dd")}
            </span>
          </div>
        </div>
        <div className="flex w-full flex-col items-end gap-2 border-b px-6 py-3">
          {notice?.attachments.map((attachment) => {
            return (
              <div
                key={attachment}
                className="flex cursor-pointer items-center gap-2"
              >
                <span className="text-sm">{attachment}</span>
                <Download width={15} height={15} />
                <Button className="ml-4 h-7 text-sm" variant={"destructive"}>
                  미리보기
                </Button>
              </div>
            );
          })}
        </div>
        <div className="w-full whitespace-pre-line px-6 py-10">
          {notice?.content}
        </div>
      </div>
      <Link href="/notice">
        <Button variant={"destructive"} className="w-24">
          목록
        </Button>
      </Link>
    </main>
  );
}
