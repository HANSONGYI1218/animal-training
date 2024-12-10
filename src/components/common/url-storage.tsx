"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const useUrlStorage = () => {
  const pathname = usePathname();
  const [prevPath, setPrevPath] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage) {
      if (pathname && prevPath !== null) {
        sessionStorage.setItem("lastVisitedURL", prevPath);
      }
      setPrevPath(pathname); // 현재 경로를 이전 경로로 업데이트
    }
  }, [pathname]);
};

export default function UrlTracker() {
  useUrlStorage();
  return null; // UI가 없는 컴포넌트
}
