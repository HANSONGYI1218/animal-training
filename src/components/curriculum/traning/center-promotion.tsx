import { Button } from "@/components/ui/button";

export default function CenterPromotion() {
  return (
    <div className="sticky top-24 h-fit w-80 rounded-xl border">
      <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
        특가 할인중!
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">지금 바로 신청하세요!</span>
          <div className="flex flex-col gap-1">
            <span className="text-2xl font-bold">24,000원</span>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-red-500">20%</span>
              <span className="font-semibold text-gray-500 line-through">
                30,000원
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button variant={"destructive"}>훈련 신청하기</Button>
        </div>
        <div className="">공유하기 자리</div>
      </div>
    </div>
  );
}
