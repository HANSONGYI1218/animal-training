"use client";

import { useEffect, useState } from "react";
import RecordSearchForm from "./record-search-form";
import { Abandon, Adoption, User } from "@prisma/client";
import RecordLayout from "./record-layout";
import { ChevronDown } from "lucide-react";
import RecordStep from "./record-step";
import dummydata from "@/utils/dummydata";
import RecordContent from "./record-content";
import { format } from "date-fns";

export default function RecordContainer() {
  const [searchUser, setSearchUser] = useState<User | null>(null);
  const [tab, setTab] = useState<string>("adoption");
  const [adoptionDatas, setAdoptionData] = useState<Adoption[] | null>(null);
  const [abandonDatas, setAbandonData] = useState<Abandon[] | null>(null);

  const getFilteredData = (data: any[], sortKey: string) => {
    return data
      .filter((item) => item.userId === searchUser?.id)
      .sort(
        (a, b) =>
          new Date(a[sortKey]).getTime() - new Date(b[sortKey]).getTime(),
      );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getAdoptionData = getFilteredData(
          dummydata.AdoptionData,
          "adoption_date",
        );
        setAdoptionData(getAdoptionData);

        const getAbandonData = getFilteredData(
          dummydata.AbandonData,
          "abandon_date",
        );
        setAbandonData(getAbandonData);
      } catch {}
    };

    fetchData();
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
          {(adoptionDatas || abandonDatas) &&
            (tab === "adoption"
              ? (adoptionDatas as Adoption[])
              : (abandonDatas as Abandon[])
            ).map((data: Adoption | Abandon, index: number) => {
              const previousData =
                index > 0
                  ? (tab === "adoption"
                      ? (adoptionDatas as Adoption[])
                      : (abandonDatas as Abandon[]))[index - 1]
                  : null;

              // 현재와 이전 데이터의 날짜를 가져오는 함수
              const getDate = (item: Adoption | Abandon) => {
                const date =
                  tab === "adoption"
                    ? (item as Adoption).adoption_date
                    : (item as Abandon).abandon_date;
                return date;
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
                  <RecordStep record_date={getDate(data) ?? ""}>
                    <RecordContent content={data} />
                  </RecordStep>
                </div>
              );
            })}
        </RecordLayout>
      </div>
    </div>
  );
}
