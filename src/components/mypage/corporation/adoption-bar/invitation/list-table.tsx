"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useContext, useEffect, useState } from "react";
import { CorporationContext } from "../../../../../providers/corporation-provider";
import { AdoptionAgreementDto, AdoptionTableDto } from "@/dtos/adoption.dto";
import Image from "next/image";
import {
  adoptionStatusTypeSwap,
  adoptionStepTypeSwap,
  SortType,
} from "@/constants/constants.all";
import { Badge } from "@/components/ui/badge";
import SelectBox from "@/components/common/select-box";
import SearchBox from "@/components/common/search-box";
import { AdoptionStatus, AdoptionStep } from "@prisma/client";
import { ExternalLink } from "lucide-react";
import AgreementCarousel from "./agreement-carousel";
import { toast } from "@/components/ui/use-toast";

export default function ListTable() {
  const corporation = useContext(CorporationContext);
  const [allAdoptions, setAllAdoptions] = useState<AdoptionTableDto[]>([]);
  const [adoptions, setAdoptions] = useState<AdoptionTableDto[]>([]);
  const [adoptionStatus, setAdoptionStatus] = useState("전체");
  const [adoptionStep, setAdoptionStep] = useState("전체");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("최신순");
  const [agreement, setAgreement] = useState<AdoptionAgreementDto | null>(null);

  const getAgreementDatas = async (adoptionId: string) => {
    try {
      const responseAgreement = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption?id=${adoptionId}`,
        {
          method: "GET",
        },
      );

      if (!responseAgreement.ok) {
        return null;
      }

      const agreement: AdoptionAgreementDto = await responseAgreement.json();

      console.log("agreement:, ", agreement);
      setAgreement(agreement);
    } catch {
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(null, null, 2)}</code>
          </pre>
        ),
      });
    }
  };

  useEffect(() => {
    if (allAdoptions.length > 0) {
      const filteredAdoptions = allAdoptions.filter(
        (adoption: AdoptionTableDto) => {
          const matchesStatus =
            !adoptionStatus ||
            adoptionStatus === "전체" ||
            adoptionStatusTypeSwap[adoption.status] === adoptionStatus;

          const matchesStep =
            !adoptionStep ||
            adoptionStep === "전체" ||
            adoptionStepTypeSwap[adoption.step] === adoptionStep;

          const matchesSearch =
            search.length === 0 || adoption.adopter.name.includes(search);

          return matchesStatus && matchesSearch && matchesStep;
        },
      );
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

      setAdoptions(sortedAdoptions);
    }
  }, [allAdoptions, adoptionStatus, adoptionStep, sort, search]);

  useEffect(() => {
    const getData = async () => {
      const responseadoptions = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption?breederId=${corporation?.id}`,
        {
          method: "GET",
        },
      );

      if (!responseadoptions.ok) {
        return null;
      }

      const adoptions: AdoptionTableDto[] = await responseadoptions.json();
      setAllAdoptions(adoptions);
    };

    getData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <div className="container mx-auto my-12 flex h-10 items-center justify-between gap-2 px-5">
        <div className="flex gap-2">
          <SelectBox
            lists={[
              "전체",
              adoptionStatusTypeSwap[AdoptionStatus.NOT_ADOPTION],
              adoptionStatusTypeSwap[AdoptionStatus.ADOPTION],
              adoptionStatusTypeSwap[AdoptionStatus.ABANDON],
            ]}
            useStateF={setAdoptionStatus}
            placeholder="전체"
            className="w-32"
          />
          <SelectBox
            lists={[
              "전체",
              adoptionStepTypeSwap[AdoptionStep.NOT_INVITATION],
              adoptionStepTypeSwap[AdoptionStep.INVITATION],
              adoptionStepTypeSwap[AdoptionStep.CURRICULUM],
              adoptionStepTypeSwap[AdoptionStep.FINAL_CONSENTFORM],
              adoptionStepTypeSwap[AdoptionStep.ADOPTION],
            ]}
            useStateF={setAdoptionStep}
            placeholder="전체"
            className="w-32"
          />
          <SelectBox
            lists={[SortType.ASC, SortType.DESC]}
            useStateF={setSort}
            placeholder={SortType.ASC}
            className="w-28"
          />
        </div>
        <SearchBox
          useStateF={setSearch}
          placeholder="입양자 이름 검색"
          className="w-40"
        />
      </div>
      {adoptions.length > 0 ? (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-14"></TableHead>
              <TableHead>이름</TableHead>
              <TableHead>전화번호</TableHead>
              <TableHead>이메일</TableHead>
              <TableHead>입양 단계</TableHead>
              <TableHead>입양 상태</TableHead>
              <TableHead>자세히</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adoptions.map((adoption: AdoptionTableDto, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{adoption?.adopter?.name ?? ""}</TableCell>
                <TableCell>{adoption?.adopter?.phoneNumber ?? ""}</TableCell>
                <TableCell>{adoption?.adopter?.email ?? ""}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      adoptionStepTypeSwap[adoption.step] === "미초대"
                        ? "destructive"
                        : "default"
                    }
                  >
                    {adoptionStepTypeSwap[adoption.step]}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge>{adoptionStatusTypeSwap[adoption.status]}</Badge>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger
                      asChild
                      onClick={() => {
                        getAgreementDatas(adoption?.id);
                      }}
                      disabled={!agreement}
                    >
                      <div className="flex cursor-pointer items-center gap-1 text-sm underline">
                        자세히
                        <ExternalLink width={16} height={16} />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <AgreementCarousel agreement={agreement!} />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border py-6 text-center text-sm">
          <Image
            src="/icons/general-face.svg"
            height={30}
            width={30}
            alt="face"
          />
          입양자를 초대해보세요!
        </div>
      )}
    </div>
  );
}
