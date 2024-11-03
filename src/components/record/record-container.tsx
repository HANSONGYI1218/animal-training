"use client";

import { useEffect, useState } from "react";
import RecordSearchForm from "./record-search-form";
import { Adoption } from "@prisma/client";
import RecordLayout from "./record-layout";
import { ChevronDown } from "lucide-react";
import RecordStep from "./record-step";
import RecordContent from "./record-content";
import { format } from "date-fns";
import { GetUserAdoptionRecordDto } from "@/dtos/user.dto";
import { GetAdoptionWithAnimalDto } from "@/dtos/adoption.dto";

export default function RecordContainer() {
  const [searchUser, setSearchUser] = useState<GetUserAdoptionRecordDto | null>(
    null,
  );
  const [tab, setTab] = useState<string>("adoption");
  const [adoptionDatas, setAdoptionDatas] = useState<
    GetAdoptionWithAnimalDto[]
  >([]);
  const [abandonDatas, setAbandonDatas] = useState<GetAdoptionWithAnimalDto[]>(
    [],
  );

  const getFilteredData = (data: any[]) => {
    return data.sort(
      (a, b) =>
        new Date(a.adoption_date).getTime() -
        new Date(b.adoption_date).getTime(),
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const abandons = searchUser!.adopterAdoptions!.filter(
          (abandon: Adoption) => abandon.abandon_date,
        );

        setAdoptionDatas(getFilteredData(searchUser!.adopterAdoptions!));
        setAbandonDatas(getFilteredData(abandons));
      } catch {}
    };

    if (
      searchUser &&
      searchUser?.adopterAdoptions &&
      searchUser?.adopterAdoptions.length > 0
    ) {
      fetchData();
    }
  }, [searchUser]);

  return (
    <div className="flex w-full flex-col items-center gap-16">
      <RecordSearchForm setSearchUser={setSearchUser} />
      <div className="flex w-full flex-col">
        <div className="flex w-full flex-col gap-3 border-y py-6">
          <span className="flex w-full items-center justify-between">
            개인정보에 주의하세요!
            <ChevronDown cursor={"pointer"} />
          </span>
          <span>dkdk dkdkd dkdk</span>
        </div>
        <RecordLayout tab={tab} setTab={setTab} user={searchUser}>
          {adoptionDatas &&
            (tab === "adoption" ? adoptionDatas : abandonDatas).map(
              (data: GetAdoptionWithAnimalDto, index: number) => {
                const previousData =
                  index > 0
                    ? (tab === "adoption" ? adoptionDatas : abandonDatas)[
                        index - 1
                      ]
                    : null;

                // 현재와 이전 데이터의 날짜를 가져오는 함수
                const getDate = (item: GetAdoptionWithAnimalDto) => {
                  const date =
                    tab === "adoption" ? item.adoption_date : item.abandon_date;
                  return typeof date === "string" ? new Date(date) : date;
                };

                const showYear =
                  !previousData ||
                  format(getDate(data)!, "yyyy") !==
                    format(getDate(previousData)!, "yyyy");

                return (
                  <div className="flex flex-col" key={index}>
                    <span
                      className={`my-5 text-lg font-semibold ${showYear || index === 0 ? "flex" : "hidden"}`}
                    >
                      {format(getDate(data)!, "yyyy")}
                    </span>
                    <RecordStep record_date={getDate(data)!}>
                      <RecordContent adoption={data} />
                    </RecordStep>
                  </div>
                );
              },
            )}
        </RecordLayout>
      </div>
    </div>
  );
}
