"use client";

import { Badge } from "@/components/ui/badge";
import ListTable from "./list-table";
import AnimalContainer from "./animal-container";
import { useState } from "react";

export default function ManagementTab() {
  const [selectCategory, setSelectCategory] = useState("registration");

  return (
    <div className="flex flex-col gap-10">
      <section className="flex gap-6">
        <Badge
          onClick={() => {
            setSelectCategory("registration");
          }}
          variant={"tag"}
          className={`cursor-pointer ${selectCategory === "registration" && "bg-black text-white"}`}
        >
          분양동물 등록
        </Badge>
        <Badge
          onClick={() => {
            setSelectCategory("list");
          }}
          variant={"tag"}
          className={`cursor-pointer ${selectCategory === "list" && "bg-black text-white"}`}
        >
          입양서 리스트
        </Badge>
      </section>
      {selectCategory === "registration" ? (
        <AnimalContainer />
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <span className="text-lg font-semibold">입양자 리스트</span>
            <ListTable />
          </div>
        </>
      )}
    </div>
  );
}
