import { Button } from "@/components/ui/button";
import { UserCurriculumDto } from "@/dtos/user.curriculum.dto";

export default function CurriculumLecturePromotion({
  userCurriculum,
}: {
  userCurriculum: UserCurriculumDto;
}) {
  return (
    <div className="sticky top-24 h-fit w-80 rounded-xl border">
      <div className="rounded-t-xl bg-green-100 px-6 py-2 font-semibold text-white">
        현재 학습할 페이지는?
      </div>
      <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col gap-4">
          <span className="text-xl font-semibold">
            지금{" "}
            <span className="text-red-500">
              {userCurriculum?.curriculumIndex + 1}강
            </span>
            을 학습할 차례에요!
          </span>
          <span className="text-2xl font-bold">
            아래를 눌러 이어서 학습해주세요
          </span>
        </div>
        <Button variant={"destructive"}>학습하러 가기</Button>
      </div>
    </div>
  );
}
