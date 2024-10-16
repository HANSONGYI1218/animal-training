"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";

export default function MypageSidebar() {
  const [currentSide, setCurrentBar] = useState("setting");

  return (
    <aside className="flex h-full w-64 flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Image
          src="/images/record/profile.png"
          width={72}
          height={72}
          alt="profile"
        />
        <span className="text-xl font-semibold">한송이</span>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col gap-3">
        <Link href="/mypage/profile">
          <Button
            variant={"ghost"}
            onClick={() => {
              setCurrentBar("profile");
            }}
            className={`w-full text-base ${currentSide === "profile" && "bg-green-20 font-semibold"}`}
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
            className={`w-full text-base ${currentSide === "curriculum" && "bg-green-20 font-semibold"}`}
          >
            커리큘럼
          </Button>
        </Link>
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("payment");
          }}
          className={`w-full text-base ${currentSide === "payment" && "bg-green-20 font-semibold"}`}
        >
          결제 관리
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("order");
          }}
          className={`w-full text-base ${currentSide === "order" && "bg-green-20 font-semibold"}`}
        >
          주문 목록
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("password");
          }}
          className={`w-full text-base ${currentSide === "password" && "bg-green-20 font-semibold"}`}
        >
          비밀번호 변경
        </Button>
        <Button
          variant={"ghost"}
          onClick={() => {
            setCurrentBar("alarm");
          }}
          className={`w-full text-base ${currentSide === "alarm" && "bg-green-20 font-semibold"}`}
        >
          알림 설정
        </Button>
      </div>
    </aside>
  );
}
