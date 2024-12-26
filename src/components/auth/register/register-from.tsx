"use client";

import { Dot } from "lucide-react";
import CorporationExtraInfForm from "./corporation-extra-info-form";
import LoginInfoForm from "./login-info-form";
import UserExtraInfoForm from "./user-extra-info-form";
import { useState } from "react";

export default function RegisterForm() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [user, setUser] = useState<any | null>(null);

  return (
    <div className="flex min-w-[400px] flex-col gap-8">
      <div className="flex w-full">
        <div className="relative flex w-full items-center">
          <Dot
            className={`h-9 w-9 rounded-full bg-green-100/30 ${currentIndex === 0 ? "animate-pulse" : ""}`}
            stroke="bg-green-100/30"
          />
          <Dot
            className={`absolute left-[6.4px] h-6 w-6 rounded-full bg-green-100/70 ${currentIndex === 0 ? "animate-pulse" : ""}`}
            stroke="bg-green-100/70"
          />
          <span className="absolute left-[14.5px] text-white">1</span>
          <div
            className={`h-2 w-full flex-1 ${currentIndex >= 1 ? "bg-green-100/30" : "bg-neutral-200"}`}
          />
        </div>
        <div className="relative flex w-full items-center">
          <Dot
            className={`h-9 w-9 rounded-full ${currentIndex >= 1 ? "bg-green-100/30" : "bg-neutral-200"} ${currentIndex === 1 && "animate-pulse"}`}
            stroke="bg-green-100/30"
          />
          <Dot
            className={`absolute left-[6px] h-6 w-6 rounded-full ${currentIndex > 1 ? "bg-green-100/70" : "bg-neutral-500/70"} ${currentIndex === 1 && "animate-pulse"}`}
            stroke="bg-green-100/70"
          />
          <span
            className={`absolute left-[14px] ${currentIndex >= 1 ? "text-white" : "text-neutral-300"} `}
          >
            2
          </span>
          <div
            className={`h-2 w-full flex-1 ${currentIndex >= 2 ? "bg-green-100/30" : "bg-neutral-200"}`}
          />
        </div>
        <div className="relative flex w-fit items-center">
          <Dot
            className={`h-9 w-9 rounded-full ${currentIndex >= 2 ? "animate-pulse bg-green-100/30" : "bg-neutral-200"}`}
            stroke="bg-green-100/30"
          />
          <Dot
            className={`absolute left-[6.5px] h-6 w-6 rounded-full ${currentIndex >= 2 ? "animate-pulse bg-green-100/70" : "bg-neutral-500/70"}`}
            stroke="bg-green-100/70"
          />
          <span
            className={`absolute left-[14px] ${currentIndex >= 2 ? "text-white" : "text-neutral-300"}`}
          >
            3
          </span>
        </div>
      </div>
      {currentIndex === 0 && (
        <LoginInfoForm setCurrentIndex={setCurrentIndex} setUser={setUser} />
      )}
      {currentIndex === 1 &&
        (user?.business_number ? (
          <CorporationExtraInfForm
            setCurrentIndex={setCurrentIndex}
            corporation={user}
          />
        ) : (
          <UserExtraInfoForm setCurrentIndex={setCurrentIndex} user={user} />
        ))}
      {currentIndex === 2 && (
        <div className="flex w-full flex-col gap-6 rounded-xl border p-6">
          <span className="mb-6 text-xl font-semibold">회원가입 완료</span>
        </div>
      )}
    </div>
  );
}
