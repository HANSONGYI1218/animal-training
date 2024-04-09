import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { cn } from "@/utils/utils";
import "./globals.css";

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
    <html lang="en">
      <body className={cn("h-full", font.className)}>
        <section className="">{children}</section>
      </body>
    </html>
  );
}
