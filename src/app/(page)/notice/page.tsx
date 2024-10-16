import { PaginationNotice } from "@/components/notice/pagination-notice";
import dummydata from "@/utils/dummydata";
import type { Notice } from "@prisma/client";

export default async function NoticePage() {
  const notices: Notice[] = dummydata.noticeData as Notice[];
  return (
    <main className="container mx-auto flex w-full max-w-[1150px] flex-col items-center gap-12 py-6">
      <span className="text-2xl font-bold">공지사항</span>
      <PaginationNotice items={notices} />
    </main>
  );
}
