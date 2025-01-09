import type { Metadata } from "next";
import { Pretendard } from "@/app/font";
import "./globals.css";
import TopBar from "@/components/common/top-bar";
import BottomBar from "@/components/common/bottom-bar";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import AuthSession from "@/providers/auth-session";
import UrlTracker from "@/components/common/url-storage";

declare global {
  interface Window {
    daum: any;
  }
}

export const metadata: Metadata = {
  title: "animal-training",
  description: "동물 훈련 의무 시스템",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <Script src="https://cdn.iamport.kr/v1/iamport.js" />
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
      <UrlTracker /> {/* 클라이언트 컴포넌트 삽입 */}
      <body className={`${Pretendard.className}`}>
        <AuthSession>
          <TopBar />
          {children}
        </AuthSession>
        <BottomBar />
        <Toaster />
      </body>
    </html>
  );
}
