"use client";

import { User } from "@prisma/client";
import { Button } from "../ui/button";
import Image from "next/image";
import { calculateAge } from "@/lib/utils";
import { genderTypeSwap } from "@/constants/constants.all";
import { Mail, MapPin, PersonStanding, Phone } from "lucide-react";

export default function RecordLayout({
  user,
  tab,
  setTab,
  children,
}: Readonly<{
  user: User | null;
  tab: string;
  setTab: (v: string) => void;
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full rounded-2xl">
      <aside className="flex w-48 flex-col gap-6 border-r p-6">
        <Image
          src="/images/record/profile.png"
          width={64}
          height={64}
          alt="profile"
          className="mb-3 self-center"
        />
        <span className="text-lg text-gray-600">{user?.name}</span>
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Mail className="h-3 w-3" strokeWidth={2.5} />
            이메일
          </span>
          <span className="text-gray-800">{user?.email}</span>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Phone className="h-3 w-3" strokeWidth={2.5} />
            연락처
          </span>
          <span className="text-gray-800">{user?.phoneNumber}</span>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <PersonStanding className="h-3 w-3" strokeWidth={2.5} />
            나이
          </span>
          <span className="text-gray-800">
            {user?.birthday && calculateAge(user?.birthday)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <Image
              src="/images/record/gender.png"
              width={12}
              height={12}
              alt="image"
            />
            성별
          </span>
          <span className="text-gray-800">
            {user?.gender && genderTypeSwap[user.gender]}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="flex items-center gap-1 text-sm text-gray-500">
            <MapPin className="h-3 w-3" strokeWidth={2.5} />
            주소
          </span>
          <span className="text-gray-800">{user?.address}</span>
        </div>
      </aside>
      <div className="flex flex-1 flex-col">
        <section className="flex gap-2 border-b">
          <Button
            onClick={() => {
              setTab("adoption");
            }}
            variant={"default"}
            className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "adoption" && "border-green-100 text-green-100 hover:border-green-100"}`}
          >
            입양
          </Button>
          <Button
            onClick={() => {
              setTab("abandon");
            }}
            variant={"default"}
            className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "abandon" && "border-green-100 text-green-100 hover:border-green-100"}`}
          >
            파양
          </Button>
          <Button
            onClick={() => {
              setTab("abuse");
            }}
            variant={"default"}
            className={`w-24 rounded-none border-b-2 border-white bg-transparent py-6 hover:border-gray-300 ${tab === "abuse" && "border-green-100 text-green-100 hover:border-green-100"}`}
          >
            학대
          </Button>
        </section>
        <section className="flex w-full flex-col px-10 py-6">
          <div
            className={`flex h-full flex-col gap-4 rounded-md ${tab === "abuse" && "rounded-bl-none"}`}
          >
            {children}
          </div>
        </section>
      </div>
    </div>
  );
}
