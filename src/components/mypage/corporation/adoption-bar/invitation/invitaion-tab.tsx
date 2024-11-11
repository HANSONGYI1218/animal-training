"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import ListTable from "./list-table";

export default function InvitaionTab() {
  const [selectCategory, setSelectCategory] = useState("invite");

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
          입양자 초대
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
            <Input placeholder="입양자의 이메일을 적어주세요." />
            <Button variant={"destructive"}>이메일 초대</Button>
          </div>
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
