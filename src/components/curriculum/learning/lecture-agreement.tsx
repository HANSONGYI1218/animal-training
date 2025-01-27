"use client";

import { learningAgreementPdfCreation } from "@/components/document/learning-agreementPDF-create";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight, Dot, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AgreementLecture({
  adoptionId,
  isOpened,
  setIsOpened,
  lectureId,
}: {
  adoptionId: string;
  isOpened: boolean;
  setIsOpened: any;
  lectureId: string;
}) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const onSubimt = async () => {
    try {
      setIsLoading(true);
      await learningAgreementPdfCreation(adoptionId);

      router.push(`/curriculum/lecture/${lectureId}`);
    } catch {
      toast("not found", {
        description: "잠시 후 다시 시도해 주세요.",
      });
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpened}
      onOpenChange={(open) => {
        if (isLoading && !open) {
          setIsOpened(true);
          return;
        }
        if (!open) {
          setIsAllChecked(false);
          setIsLoading(false);
        }
        setIsOpened(!isOpened);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="hidden">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-8 sm:max-w-md">
        <DialogHeader className="flex flex-col gap-8">
          <DialogTitle className="text-center">
            강의 커리큘럼 서비스 이용약관
          </DialogTitle>
          <DialogDescription className="flex break-keep">
            퍼디 서비스를 이용해 주셔서 감사합니다. <br />
            퍼디 강의 커리큘럼을 시청하기 전 훈련 동의서 및 이용약관에 대한
            동의가 필요합니다.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex items-center space-x-2 border-b pb-2">
            <Checkbox
              id="allCheck"
              onClick={() => {
                setIsAllChecked(!isAllChecked);
              }}
              className="h-6 w-6 rounded-full data-[state=checked]:border-green-100 data-[state=checked]:bg-green-100"
            />
            <label
              htmlFor="allCheck"
              className="font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              전체 동의
            </label>
          </div>
          <div className="flex flex-col gap-4">
            <div className="ml-2 flex items-center gap-2">
              <Dot className="h-2 w-2 bg-black" />
              <label
                htmlFor="service"
                className="flex-1 leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span className="text-red-500">&#40;필수&#41;</span> 퍼디 강의
                서비스 이용 약관
              </label>
              <ChevronRight className="h-4 w-4 cursor-pointer items-end text-muted-foreground" />
            </div>
            <div className="ml-2 flex items-center gap-2">
              <Dot className="h-2 w-2 bg-black" />
              <label
                htmlFor="personalInfo"
                className="flex-1 leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span className="text-red-500">&#40;필수&#41;</span> 개인 정보
                수집 및 이용 동의서
              </label>
              <ChevronRight className="h-4 w-4 cursor-pointer items-end text-muted-foreground" />
            </div>
            <div className="ml-2 flex items-center gap-2">
              <Dot className="h-2 w-2 bg-black" />
              <label
                htmlFor="share"
                className="flex-1 leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                <span className="text-red-500">&#40;필수&#41;</span> 제 3 자
                정보 제공 동의
              </label>
              <ChevronRight className="h-4 w-4 cursor-pointer items-end text-muted-foreground" />
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-col rounded-xl bg-neutral-100 px-4 py-6 text-sm text-muted-foreground">
          <span>고객님께서는 동의를 거부할 수 있습니다.</span>
          <span>
            단, 필수정보 동의 거부 시 서비스 이용에 제한이 있을 수 있습니다.
          </span>
          <span className="opacity-0">___</span>
          <span>이용 약관 동이 후 강의 커리큘럼을 시청하실 수 있습니다.</span>
        </div>

        <Button
          disabled={isAllChecked === false || isLoading}
          type="button"
          variant="destructive"
          className="w-24 self-end"
          onClick={(e) => {
            if (isLoading) {
              e.preventDefault(); // 버튼 클릭 방지
              e.stopPropagation(); // 이벤트 전파 중단
              return;
            }
            onSubimt();
          }}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : "동의"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
