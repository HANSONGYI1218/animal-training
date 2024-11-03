"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import LectureCategory from "../lecture/lecture-category";
import { usePathname } from "next/navigation";

export default function TopBar() {
  const [scrollY, setScrollY] = useState(0);
  const path = usePathname();
  const [page, setPage] = useState<string>("lecture");
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollY) {
      setScrollDirection("down");
    } else if (currentScrollY < scrollY) {
      setScrollDirection("up");
    }

    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  return (
    <header
      className={`sticky top-0 z-30 flex w-full flex-col bg-white transition duration-700 ${
        path === "/lecture"
          ? scrollDirection === "up"
            ? "translate-y-0"
            : "-translate-y-20"
          : "translate-y-0"
      } ${
        path.startsWith("/curriculum/lecture") &&
        path.split("/").length === 5 &&
        "hidden"
      }`}
    >
      <div className="flex border-b py-4">
        <div className="container mx-auto flex items-center justify-between">
          <Image src="/next.svg" width={70} height={100} alt="main-logo" />
          <div className="flex items-center gap-4">
            <a href="/lecture?category=all">
              <Button
                onClick={() => {
                  setPage("lecture");
                }}
                variant="default"
                className={`w-20 ${page === "lecture" && "text-green-100"}`}
              >
                강의
              </Button>
            </a>
            <Link href="/curriculum">
              <Button
                onClick={() => {
                  setPage("curriculum");
                }}
                variant="default"
                className={`w-20 ${page === "curriculum" && "text-green-100"}`}
              >
                커리큘럼
              </Button>
            </Link>
            <a href="/record">
              <Button
                onClick={() => {
                  setPage("record");
                }}
                variant="default"
                className={`w-20 ${page === "record" && "text-green-100"}`}
              >
                입양기록
              </Button>
            </a>
            <a href="/mypage/profile">
              <Button
                onClick={() => {
                  setPage("mypage");
                }}
                variant="default"
                className={`w-20 ${page === "mypage" && "text-green-100"}`}
              >
                내 정보
              </Button>
            </a>
            <Link href="/store">
              <Button
                onClick={() => {
                  setPage("store");
                }}
                variant="default"
                className={`w-20 ${page === "store" && "text-green-100"}`}
              >
                스토어
              </Button>
            </Link>
            <Link href="/notice">
              <Button
                onClick={() => {
                  setPage("notice");
                }}
                variant="default"
                className={`w-20 ${page === "notice" && "text-green-100"}`}
              >
                공지사항
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="login" className="px-2 py-1">
                로그인
              </Button>
            </Link>
          </div>
        </div>
      </div>
      {path === "/lecture" && <LectureCategory />}
    </header>
  );
}
