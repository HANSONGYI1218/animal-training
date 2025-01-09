"use client";

import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { CorporationContext } from "@/providers/corporation-provider";
import { Edit, Loader2, Pencil, Plus } from "lucide-react";
import Link from "next/link";
import AnimalCard from "./animal-card";
import { GetAnimalDto } from "@/dtos/animal.dto";
import SelectBox from "@/components/common/select-box";
import {
  animalAgeSwap,
  animalSizeSwap,
  animalTypeSwap,
  genderAmianlTypeSwap,
  SortType,
} from "@/constants/constants.all";
import { AnimalAge, AnimalSize, AnimalType, GenderType } from "@prisma/client";
import SearchBox from "@/components/common/search-box";
import CheckboxDemo from "@/components/common/check-box";

export default function AnimalContainer() {
  const corporation = useContext(CorporationContext);
  const [animals, setAnimals] = useState<GetAnimalDto[] | null>(null);
  const [allAnimals, setAllAnimals] = useState<GetAnimalDto[] | null>(null);
  const [animalType, setAnimalType] = useState("전체");
  const [animalSize, setAnimalSize] = useState("전체");
  const [animalAge, setAnimalAge] = useState("전체");
  const [animalGender, setAnimalGender] = useState("전체");
  const [adoptionStatus, setAdoptionStatus] = useState("전체");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("최신순");
  const [isLoading, setIsLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (animals && animals?.length > 0) {
      const filteredAdoptions = animals.filter((animal: GetAnimalDto) => {
        const matchesAnimalGender =
          !animalGender ||
          animalGender === "전체" ||
          genderAmianlTypeSwap[animal.gender] === animalGender;

        const matchesAdoptionStatus =
          !adoptionStatus || adoptionStatus === "전체"
            ? true
            : adoptionStatus === "입양서 등록"
              ? !!animal?.adoption?.id
              : adoptionStatus === "입양서 미등록"
                ? !animal?.adoption?.id
                : false;

        const matchesAnimalType =
          !animalType ||
          animalType === "전체" ||
          animalTypeSwap[animal.animal_type] === animalType;

        const matchesAnimalSize =
          !animalSize ||
          animalSize === "전체" ||
          animalSizeSwap[animal.animal_size] === animalSize;

        const matchesAnimalAge =
          !animalAge ||
          animalAge === "전체" ||
          animalAgeSwap[animal.animal_age] === animalAge;

        const matchesSearch =
          search.length === 0 ||
          animal?.name.includes(search) ||
          animal?.breed.includes(search);

        return (
          matchesAnimalGender &&
          matchesAdoptionStatus &&
          matchesAnimalType &&
          matchesAnimalSize &&
          matchesAnimalAge &&
          matchesSearch
        );
      });
      const sortedAdoptions = filteredAdoptions.sort((a, b) => {
        if (sort === "오래된순") {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        }
        if (sort === "최신순") {
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        }

        return 0;
      });

      setAllAnimals(sortedAdoptions);
    }
  }, [
    animalGender,
    animalType,
    animalSize,
    animalAge,
    adoptionStatus,
    sort,
    search,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
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
      setAllAnimals(getAnimals);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
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
      <div className="flex flex-col gap-2 rounded-xl border p-8 shadow-md">
        <div className="flex gap-6">
          <span className="w-20 font-semibold">종류</span>
          <div className="flex">
            {[
              {
                key: "전체",
                value: "all",
              },
              {
                key: animalTypeSwap[AnimalType.DOG],
                value: "dog",
              },
              {
                key: animalTypeSwap[AnimalType.CAT],
                value: "cat",
              },
            ].map(({ key, value }) => (
              <CheckboxDemo
                key={value} // 각 항목의 고유한 key를 제공
                value={animalType}
                useStateF={setAnimalType}
                label={key}
                id={value}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <span className="w-20 font-semibold">성별</span>
          <div className="flex">
            {[
              {
                key: "전체",
                value: "all",
              },
              {
                key: genderAmianlTypeSwap[GenderType.MALE],
                value: "male",
              },
              {
                key: genderAmianlTypeSwap[GenderType.FEMALE],
                value: "female",
              },
            ].map(({ key, value }) => (
              <CheckboxDemo
                key={value} // 각 항목의 고유한 key를 제공
                value={animalGender}
                useStateF={setAnimalGender}
                label={key}
                id={value}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <span className="w-20 font-semibold">사이즈</span>
          <div className="flex">
            {[
              {
                key: "전체",
                value: "all",
              },
              {
                key: animalSizeSwap[AnimalSize.SMALL],
                value: "small",
              },
              {
                key: animalSizeSwap[AnimalSize.NORMAL],
                value: "normal",
              },
              {
                key: animalSizeSwap[AnimalSize.LARGE],
                value: "large",
              },
            ].map(({ key, value }) => (
              <CheckboxDemo
                key={value} // 각 항목의 고유한 key를 제공
                value={animalSize}
                useStateF={setAnimalSize}
                label={key}
                id={value}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <span className="w-20 font-semibold">나이</span>
          <div className="flex">
            {[
              {
                key: "전체",
                value: "all",
              },
              {
                key: animalAgeSwap[AnimalAge.YOUNG],
                value: "young",
              },
              {
                key: animalAgeSwap[AnimalAge.NORMAL],
                value: "normal",
              },
            ].map(({ key, value }) => (
              <CheckboxDemo
                key={value} // 각 항목의 고유한 key를 제공
                value={animalAge}
                useStateF={setAnimalAge}
                label={key}
                id={value}
              />
            ))}
          </div>
        </div>
        <div className="flex gap-6">
          <span className="w-20 font-semibold">입양서 등록</span>
          <div className="flex">
            {[
              {
                key: "전체",
                value: "all",
              },
              {
                key: "입양서 등록",
                value: "registration",
              },
              {
                key: "입양서 미등록",
                value: "not_registration",
              },
            ].map(({ key, value }) => (
              <CheckboxDemo
                key={value} // 각 항목의 고유한 key를 제공
                value={adoptionStatus}
                useStateF={setAdoptionStatus}
                label={key}
                id={value}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="container mx-auto flex h-10 items-center justify-between gap-2">
        <SelectBox
          lists={[SortType.ASC, SortType.DESC]}
          useStateF={setSort}
          placeholder={SortType.ASC}
          className="w-28"
        />
        <SearchBox
          useStateF={setSearch}
          placeholder="분양동물 이름, 품종 검색"
          className="w-52"
        />
      </div>
      {isLoading ? (
        <div className="flex min-h-40 w-full flex-col items-center justify-center py-6 text-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div className="grid w-full grid-cols-3 gap-6">
          {allAnimals?.map((animal: GetAnimalDto) => {
            return (
              <AnimalCard animal={animal} key={animal?.id} isEdit={isEdit} />
            );
          })}
        </div>
      )}
    </>
  );
}
