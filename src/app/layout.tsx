import type { Metadata } from "next";
import { Pretendard } from "@/app/font";
import "./globals.css";
import TopBar from "@/components/common/top-bar";
import BottomBar from "@/components/common/bottom-bar";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "animal-training",
  description: "동물 훈련 의무 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${Pretendard.className}`}>
        <TopBar />
        <section className="flex min-h-screen">{children}</section>
        <BottomBar />
        <Toaster />
      </body>
    </html>
  );
}
