import { Button } from "../../ui/button";

export default function TrainingCenterPromotion() {
  return (
    <div className="sticky top-24 h-fit w-80 rounded-xl border">
      <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
        특가 할인중!
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <span className="text-lg font-semibold leading-7">
            하루 20명 선착순
            <br />
            강형욱, 설채현, 한송이
            <br />
            훈련소 <span className="text-red-500">5만원</span> 할인 특가!
          </span>
          <span className="line-clamp-2 text-sm font-semibold text-gray-500">
            강형욱, 설채현, 한송이, 이제헌, 이재현, 유재석, 이소현, 박소정,
            이하루, 설치치
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"destructive"}>이벤트 보러가기</Button>
        </div>
        <div className="">공유하기 자리</div>
      </div>
    </div>
  );
}
