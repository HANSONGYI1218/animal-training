import { CurriculumStep } from "@prisma/client";
import { Bookmark, PawPrint, PlaySquare, TrafficCone } from "lucide-react";

export default function CurriculumBanner({
  currentStep,
}: {
  currentStep: CurriculumStep | null;
}) {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-[#F9F9F9] py-12">
      <div className="container relative z-10 mx-auto flex w-full max-w-[1150px]">
        <div className="flex w-full flex-col justify-between">
          <span className="text-3xl font-bold leading-relaxed">
            한송이님의 열정
            <br />
            퍼디가 응원할게요🚀
          </span>
          <div className="flex h-24 w-full items-center gap-14">
            <div className="relative flex w-14 flex-col items-center gap-2">
              <div
                className={`absolute z-0 h-[52px] w-[52px] rounded-2xl bg-lime-400 bg-opacity-50 shadow-xl ${currentStep === CurriculumStep.LECTURE ? "-top-3 left-4 flex rotate-[24deg] animate-pulse" : "left-0 top-0 hidden"}`}
              />
              <div
                className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 shadow-xl ${currentStep === CurriculumStep.LECTURE ? "bg-opacity-30" : "bg-opacity-50"}`}
              >
                <div
                  className={`absolute left-0 top-0 z-10 h-14 w-14 ${currentStep === CurriculumStep.LECTURE ? "flex blur-[1px]" : "hidden"}`}
                />
                <PlaySquare className="relaitve z-20 h-8 w-8" />
              </div>
              <span className="font-semibold text-neutral-700">강의</span>
            </div>
            <div className="relative flex w-14 flex-col items-center gap-2">
              <div
                className={`absolute z-0 h-[52px] w-[52px] rounded-2xl bg-red-200 bg-opacity-50 shadow-xl ${currentStep && ([CurriculumStep.TRAINING, CurriculumStep.LECTURE_END] as CurriculumStep[]).includes(currentStep) ? "-top-3 left-4 flex rotate-[24deg] animate-pulse" : "left-0 top-0 hidden"}`}
              />
              <div
                className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-200 shadow-xl ${currentStep && ([CurriculumStep.TRAINING, CurriculumStep.LECTURE_END] as CurriculumStep[]).includes(currentStep) ? "bg-opacity-20" : "bg-opacity-50"}`}
              >
                <div
                  className={`absolute left-0 top-0 z-10 h-14 w-14 ${currentStep && ([CurriculumStep.TRAINING, CurriculumStep.LECTURE_END] as CurriculumStep[]).includes(currentStep) ? "flex blur-[1px]" : "hidden"}`}
                />
                <TrafficCone className="relaitve z-20 h-8 w-8" />
              </div>
              <span className="font-semibold text-neutral-700">훈련</span>
            </div>
            <div className="relative flex w-14 flex-col items-center gap-2">
              <div
                className={`absolute z-0 h-[52px] w-[52px] rounded-2xl bg-sky-100 shadow-xl ${currentStep && ([CurriculumStep.TRAINING_END, CurriculumStep.END] as CurriculumStep[]).includes(currentStep) ? "-top-3 left-4 flex rotate-[24deg] animate-pulse" : "left-0 top-0 hidden"}`}
              />
              <div
                className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100 shadow-xl ${currentStep && ([CurriculumStep.TRAINING_END, CurriculumStep.END] as CurriculumStep[]).includes(currentStep) ? "bg-opacity-30" : ""}`}
              >
                <div
                  className={`absolute left-0 top-0 z-10 h-14 w-14 ${currentStep && ([CurriculumStep.TRAINING_END, CurriculumStep.END] as CurriculumStep[]).includes(currentStep) ? "flex blur-[1px]" : "hidden"}`}
                />
                <PawPrint className="relaitve z-20 h-8 w-8" />
              </div>
              <span className="font-semibold text-neutral-700">입양</span>
            </div>
          </div>
        </div>
        <div className="relative flex w-1/2 flex-col items-center rounded-xl bg-white">
          <div className="flex w-full flex-1 flex-col items-center gap-4 rounded-xl bg-white p-6">
            <Bookmark
              className="absolute -top-2 right-3 h-8 w-8"
              stroke="#00592D"
              fill="#00592D"
            />
            <span className="text-lg font-semibold">커리큘럼 수칙</span>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">
                1. 강의는 정해진 단계로만 학습해요
              </span>
              <span className="font-semibold">
                2. 강의 진도율이 <span className="text-red-500">총합 90%</span>
                이상이어야 해요
              </span>
              <span className="font-semibold">
                3. 강의를 모두 학습한 후 훈련소를 선택해요
              </span>
              <span className="flex flex-col">
                <span className="font-semibold">
                  4. 모든 훈련소의{" "}
                  <span className="text-red-500">커리큘럼은 동일</span>해요
                </span>
                <span className="ml-4 text-xs font-semibold text-neutral-500">
                  * 훈련사와 상담 후 반려동물에 따라 커리큘럼이 달라질 수 있어요
                </span>
              </span>
              <span className="font-semibold">
                5. 중도 탈락 시{" "}
                <span className="text-red-500">반환금은 훈련소마다 상이</span>
                해요
              </span>
              <span className="font-semibold">
                6. 책임감을 가지고 훈련에 참여해 주세요
              </span>
            </div>
          </div>
          <div className="flex h-5 w-full rounded-b-2xl bg-green-100" />
        </div>
      </div>
    </section>
  );
}
