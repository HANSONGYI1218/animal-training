"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MypageSidebar() {
  const [currentBar, setCurrentBar] = useState("");
  const path = usePathname();

  useEffect(() => {
    const pathSplit = path.split("/");
    const router = pathSplit[pathSplit.length - 1];

    setCurrentBar(router);
  }, [path]);

  return (
    <aside className="flex h-full w-64 flex-col gap-3 py-10">
      <hr className="w-full" />
      <Link href="/mypage/corporation/profile">
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("profile");
          }}
          className={`w-full text-base ${currentBar === "profile" && "bg-slate-100 font-semibold"}`}
        >
          프로필 설정
        </Button>
      </Link>
      <Link href="/mypage/corporation/curriculum">
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("curriculum");
          }}
          className={`w-full text-base ${currentBar === "curriculum" && "bg-slate-100 font-semibold"}`}
        >
          커리큘럼 관리
        </Button>
      </Link>
      <Link href={"/mypage/corporation/adoption"}>
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("adoption");
          }}
          className={`w-full text-base ${currentBar === "adoption" && "bg-slate-100 font-semibold"}`}
        >
          입양 관리
        </Button>
      </Link>
      <Link href={"/mypage/corporation/password"}>
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("password");
          }}
          className={`w-full text-base ${currentBar === "password" && "bg-slate-100 font-semibold"}`}
        >
          비밀번호 변경
        </Button>
      </Link>
      <Link href={"/mypage/corporation/alarm"}>
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("alarm");
          }}
          className={`w-full text-base ${currentBar === "alarm" && "bg-slate-100 font-semibold"}`}
        >
          알림 설정
        </Button>
      </Link>
    </aside>
  );
}
