import MypageSidebar from "@/components/mypage/mypage-sidebar";

export default function MypageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto flex max-w-[1150px] gap-6 py-12">
      <MypageSidebar />
      <div className="flex h-full w-full flex-1 flex-col p-10">{children}</div>
    </div>
  );
}
