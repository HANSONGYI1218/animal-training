"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useContext, useEffect, useState } from "react";
import { CorporationContext } from "../../../../../providers/corporation-provider";
import { AdoptionAgreementsDto, AdoptionTableDto } from "@/dtos/adoption.dto";
import Image from "next/image";
import {
  adoptionStatusTypeSwap,
  adoptionStepTypeSwap,
  SortType,
} from "@/constants/constants.all";
import SelectBox from "@/components/common/select-box";
import SearchBox from "@/components/common/search-box";
import { AdoptionStatus, AdoptionStep } from "@prisma/client";
import { ExternalLink, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function AdopterListTable() {
  const corporation = useContext(CorporationContext);
  const [allAdoptions, setAllAdoptions] = useState<AdoptionTableDto[]>([]);
  const [adoptions, setAdoptions] = useState<AdoptionTableDto[]>([]);
  const [adoptionStatus, setAdoptionStatus] = useState("전체");
  const [adoptionStep, setAdoptionStep] = useState("전체");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("최신순");
  const [agreements, setAgreements] = useState<AdoptionAgreementsDto | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingtoAgreements, setIsLoadingtoAgreements] = useState(false);

  const getAgreementDatas = async (adoptionId: string) => {
    try {
      setIsLoadingtoAgreements(true);
      const responseAgreement = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption?id=${adoptionId}`,
        {
          method: "GET",
        },
      );

      if (!responseAgreement.ok) {
        return null;
      }

      const agreements: AdoptionAgreementsDto = await responseAgreement.json();

      setAgreements(agreements);
      setIsLoadingtoAgreements(false);
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
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
            search.length === 0 ||
            adoption.adopter?.email.includes(search) ||
            (adoption?.animal?.name && adoption?.animal?.name.includes(search));

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
      setIsLoading(true);
      const responseadoptions = await fetch(
        `${process.env.NEXT_PUBLIC_WEB_URL}/api/adoption?breederId=${corporation?.id}&isRecord=true`,
        {
          method: "GET",
        },
      );

      if (!responseadoptions.ok) {
        return null;
      }

      const adoptions: AdoptionTableDto[] = await responseadoptions.json();
      setAllAdoptions(adoptions);
      setIsLoading(false);
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
              adoptionStepTypeSwap[AdoptionStep.INVITATION],
              adoptionStepTypeSwap[AdoptionStep.LECTURE],
              adoptionStepTypeSwap[AdoptionStep.TRAINING],
              adoptionStepTypeSwap[AdoptionStep.FINAL_CONSENTFORM],
              adoptionStepTypeSwap[AdoptionStep.END],
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
          placeholder="이메일, 분양동물 이름 검색"
          className="w-52"
        />
      </div>
      {isLoading ? (
        <div className="flex min-h-40 w-full flex-col items-center justify-center py-6 text-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : adoptions.length > 0 ? (
        <Table>
          <TableHeader className="bg-slate-100">
            <TableRow>
              <TableHead className="w-10 px-2 text-center"></TableHead>
              <TableHead className="px-2 text-center">이름</TableHead>
              <TableHead className="px-2 text-center">전화번호</TableHead>
              <TableHead className="px-2 text-center">이메일</TableHead>
              <TableHead className="px-2 text-center">분양동물</TableHead>
              <TableHead className="px-2 text-center">출석</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adoptions.map((adoption: AdoptionTableDto, index: number) => (
              <TableRow key={index}>
                <TableCell className="px-2 py-4 text-center text-xs font-medium">
                  {index + 1}
                </TableCell>
                <TableCell className="px-2 py-4 text-center text-xs">
                  {adoption?.adopter?.name ?? ""}
                </TableCell>
                <TableCell className="px-2 py-4 text-center text-xs">
                  {adoption?.adopter?.phoneNumber ?? ""}
                </TableCell>
                <TableCell className="px-2 py-4 text-center text-xs">
                  {adoption?.adopter?.email ?? ""}
                </TableCell>
                <TableCell className="px-2 py-4 text-center text-xs">
                  {adoption?.animal?.name ?? ""}
                </TableCell>
                <TableCell className="px-2 py-4 text-center">
                  <Dialog>
                    <DialogTrigger
                      asChild
                      onClick={() => {
                        getAgreementDatas(adoption?.id);
                      }}
                    >
                      <div
                        className={`flex items-center justify-center gap-1 text-xs underline ${adoption.step === AdoptionStep.INVITATION ? "cursor-default text-neutral-400" : "cursor-pointer text-black"}`}
                      >
                        자세히
                        <ExternalLink width={16} height={16} />
                      </div>
                    </DialogTrigger>
                    {adoption.step !== AdoptionStep.INVITATION && (
                      <DialogContent className="w-full">
                        {isLoadingtoAgreements ? (
                          <div className="flex min-h-40 flex-col items-center justify-center">
                            <Loader2 className="animate-spin" />
                          </div>
                        ) : (
                          <span>Dd</span>
                        )}
                      </DialogContent>
                    )}
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
