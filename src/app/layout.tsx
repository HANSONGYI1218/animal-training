import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { cn } from "@/utils/utils";
import "./globals.css";
import TopBar from "@/components/common/top-bar";
import BottomBar from "@/components/common/bottom-bar";
import { Toaster } from "@/components/ui/toaster";

const font = Noto_Sans_KR({ subsets: ["latin"], weight: ["400", "700"] });

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
      <body className={cn("h-full", font.className)}>
        <TopBar />
        <section className="px-6 sm:px-20 screen:container py-24">
          {children}
        </section>
        <BottomBar />
        <Toaster />
      </body>
    </html>
  );
}
