"use client";

import { Link } from "lucide-react";
import { toast } from "sonner";
import AgreementCenter from "./center-agreement";
import { useState } from "react";
import { GetUserCurriculumDto } from "@/dtos/user.curriculum.dto";
import CenterCall from "./center-call";

export default function CenterPromotion({
  price,
  callNumber,
  tutorTrainingCenterId,
  userCurriculum,
}: {
  price: string;
  callNumber: string;
  tutorTrainingCenterId: string;
  userCurriculum: GetUserCurriculumDto | null;
}) {
  const priceNumber = Number(price.replace(/,/g, "")); // 쉼표 제거 후 숫자로 변환
  const discount = 20; // 20% 할인
  const discountedPrice = priceNumber * (1 - discount / 100); // 20% 할인된 가격 계산
  const [isSuccess, setIsSuccess] = useState(
    userCurriculum?.adoption?.trainingAgreementUrl ? true : false,
  );

  return (
    <div className="sticky top-24 h-fit w-80 rounded-xl border">
      <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
        특가 할인중!
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">
            먼저 훈련소에 문의 후 <br />
            신청해주세요!
          </span>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">
              {discountedPrice.toLocaleString()}원
            </span>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-red-500">20%</span>
              <span className="font-semibold text-gray-500 line-through">
                {price}원
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <CenterCall callNumber={callNumber} />
          <AgreementCenter
            adoptionId={userCurriculum?.adoptionId}
            userCurriculumId={userCurriculum?.id}
            tutorTrainingCenterId={tutorTrainingCenterId}
            isSuccess={isSuccess}
            setIsSuccess={setIsSuccess}
          />
        </div>
        <div
          onClick={() => {
            let nowUrl = window.location.href;

            //nowUrl 변수에 담긴 주소를
            navigator.clipboard.writeText(nowUrl).then((res) => {
              toast.success("주소가 복사되었습니다.", {
                description: "해당 훈련소를 공유해보세요!",
              });
            });
          }}
          className="flex cursor-pointer items-center gap-2 underline-offset-4 hover:underline"
        >
          <Link className="h-4 w-4" /> 공유하기
        </div>
      </div>
    </div>
  );
}
