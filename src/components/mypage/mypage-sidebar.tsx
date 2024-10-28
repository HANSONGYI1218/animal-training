"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User } from "./user-provider";

export default function MypageSidebar({ user }: { user: User }) {
  const [currentBar, setCurrentBar] = useState("");
  const path = usePathname();

  useEffect(() => {
    const pathSplit = path.split("/");
    const router = pathSplit[pathSplit.length - 1];

    setCurrentBar(router);
  }, []);

  return (
    <aside className="flex h-full w-64 flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Image
          src="/images/record/profile.png"
          width={72}
          height={72}
          alt="profile"
        />
        <span className="text-xl font-semibold">{user?.name}</span>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-3">
        <Link href="/mypage/profile">
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
        <Link href="/mypage/curriculum">
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
        <Link href={"/mypage/payment"}>
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
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("password");
          }}
          className={`w-full text-base ${currentBar === "password" && "bg-slate-100 font-semibold"}`}
        >
          비밀번호 변경
        </Button>
        <Link href={"/mypage/alarm"}>
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
