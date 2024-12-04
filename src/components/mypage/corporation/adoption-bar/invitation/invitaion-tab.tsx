"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import ListTable from "../management/list-table";
import { generateSixDigitCode } from "@/utils/utils";
import { CorporationContext } from "@/providers/corporation-provider";
import { Plus } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function InvitaionTab() {
  const corporation = useContext(CorporationContext);
  const [selectCategory, setSelectCategory] = useState("invite");
  const [randomMailNumber, setRandomMailNumber] = useState<number | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [email, setEmail] = useState("");

  const emailSend = async (v: string) => {
    try {
      const randomCode = generateSixDigitCode();

      setRandomMailNumber(randomCode);
      await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/contact`, {
        method: "POST",
        body: JSON.stringify({
          randomMailNumber: randomCode,
          to: v,
          subject: "이메일 도착",
          message: "이메일 도착",
          isinvitation: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      await fetch(`${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption`, {
        method: "POST",
        body: JSON.stringify({
          invite_email: v,
          breederCorporationId: corporation?.id,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      setIsSending(true);
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
    }
  };

  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-6">
        <Badge
          onClick={() => {
            setSelectCategory("invite");
          }}
          variant={"tag"}
          className={`cursor-pointer ${selectCategory === "invite" && "bg-black text-white"}`}
        >
          입양서 작성
        </Badge>
        <Badge
          onClick={() => {
            setSelectCategory("list");
          }}
          variant={"tag"}
          className={`cursor-pointer ${selectCategory === "list" && "bg-black text-white"}`}
        >
          입양자 리스트
        </Badge>
      </section>
      {selectCategory === "invite" ? (
        <div className="flex flex-col gap-3">
          <span className="text-lg font-semibold">입양자 초대</span>
          <div className="flex gap-3">
            <Input
              placeholder="입양자의 이메일을 적어주세요."
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Button
              variant={"destructive"}
              onClick={() => {
                emailSend(email);
              }}
            >
              이메일 초대
            </Button>
          </div>
          {isSending && (
            <span className="text-sm text-green-100">
              이메일을 전송했습니다.
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <span className="text-lg font-semibold">입양자 리스트</span>
          <ListTable />
        </div>
      )}
    </div>
  );
}
