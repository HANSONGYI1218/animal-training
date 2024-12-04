"use client";

import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { CorporationContext } from "@/providers/corporation-provider";
import { Edit, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import AnimalCard from "./animal-card";
import { GetAnimalDto } from "@/dtos/animal.dto";
import { Badge } from "@/components/ui/badge";
import ListTable from "./list-table";

export default function ManagementTab() {
  const corporation = useContext(CorporationContext);
  const [animals, setAnimals] = useState<GetAnimalDto[] | null>(null);
  const [selectCategory, setSelectCategory] = useState("registration");
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/animal?corporationId=${corporation?.id}`,
        {
          method: "GET",
        },
      );
      if (!response.ok) {
        setAnimals(null);
      }

      const getAnimals: GetAnimalDto[] = await response.json();
      setAnimals(getAnimals);
    };

    if (selectCategory === "registration") {
      fetchData();
    }
  }, []);

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
          입양자 리스트
        </Badge>
      </section>
      {selectCategory === "registration" ? (
        <>
          <div className="flex items-center gap-2 self-end">
            <Button
              onClick={() => {
                setIsEdit(!isEdit);
              }}
              variant="default"
              className={`flex h-9 gap-1 border-2 border-green-100 px-2 ${isEdit && "bg-green-100 text-white hover:bg-green-100/90 hover:text-white"}`}
            >
              <Pencil className="h-5 w-5" />
              분양동물 {isEdit ? "저장" : "수정"}
            </Button>
            <Link
              href={"/mypage/corporation/adoption/management/new/animal"}
              className="flex"
            >
              <Button variant="destructive" className="flex h-9 gap-1 px-2">
                <Plus className="h-5 w-5" />
                분양동물 등록
              </Button>
            </Link>
          </div>
          <div className="grid w-full grid-cols-3 gap-6">
            {animals?.map((animal: GetAnimalDto) => {
              return (
                <AnimalCard animal={animal} key={animal?.id} isEdit={isEdit} />
              );
            })}
          </div>
        </>
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
