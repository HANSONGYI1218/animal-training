import { PaginationNotice } from "@/components/notice/pagination-notice";

export default async function NoticePage() {
  const responseNotices = await fetch(
    `${process.env.NEXT_PUBLIC_WEB_URL}/api/notice`,
    {
      method: "GET",
      cache: "no-store",
    },
  );
  if (!responseNotices.ok) {
    return null;
  }

  const notices = await responseNotices.json();

  return (
    <main className="container mx-auto flex min-h-screen w-full max-w-[1150px] flex-col items-center gap-12 py-6">
      <span className="text-2xl font-bold">공지사항</span>
      <PaginationNotice items={notices} />
    </main>
  );
}
