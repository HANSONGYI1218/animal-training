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
  }, []);

  return (
    <aside className="flex h-full w-64 flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Link href="/mypage/user/profile">
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
        <Link href="/mypage/user/curriculum">
          <Button
            variant={"ghost"}
            onClick={() => {
              setCurrentBar("curriculum");
            }}
            className={`w-full text-base ${currentBar === "curriculum" && "bg-slate-100 font-semibold"}`}
          >
            커리큘럼
          </Button>
        </Link>
        <Link href={"/mypage/user/adoption"}>
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
        <Link href={"/mypage/user/payment"}>
          <Button
            variant={"ghost"}
            onClick={() => {
              setCurrentBar("payment");
            }}
            className={`w-full text-base ${currentBar === "payment" && "bg-slate-100 font-semibold"}`}
          >
            결제 관리
          </Button>
        </Link>
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("order");
          }}
          className={`w-full text-base ${currentBar === "order" && "bg-slate-100 font-semibold"}`}
        >
          주문 목록
        </Button>
        <Link href={"/mypage/user/password"}>
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
        <Link href={"/mypage/user/alarm"}>
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
      </div>
    </aside>
  );
}
