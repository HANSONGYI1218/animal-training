import type { Metadata } from "next";
import { Pretendard } from "@/app/font";
import "./globals.css";
import TopBar from "@/components/common/top-bar";
import BottomBar from "@/components/common/bottom-bar";
import { Toaster } from "@/components/ui/sonner";
import Script from "next/script";
import AuthSession from "@/providers/auth-session";
import { cookies } from "next/headers";

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
  const userType = cookies().get("userType");

  return (
    <html lang="ko">
      <Script src="https://cdn.iamport.kr/v1/iamport.js" />
      <Script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" />
      <body className={`${Pretendard.className}`}>
        <TopBar userType={userType?.value ?? "login"} />
        <AuthSession children={children} />
        <BottomBar />
        <Toaster />
      </body>
    </html>
  );
}
