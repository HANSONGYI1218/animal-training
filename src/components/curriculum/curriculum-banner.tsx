"use client";

import { Dot, Goal, Home, Monitor } from "lucide-react";
import type { UserCurriculum } from "@/types/tyeps.all";
import { motion } from "framer-motion";

export default function CurriculumBanner({
  currentCurriculum,
}: {
  currentCurriculum: UserCurriculum;
}) {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-[#F9F9F9] py-12">
      <div className="container relative z-10 mx-auto flex w-full max-w-[1150px]">
        <div className="flex w-full flex-col gap-12">
          <span className="text-3xl font-bold leading-relaxed">
            한송이님의 열정
            <br />
            쏭쓰가 응원할게요🚀
          </span>
          <div className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                animate={
                  currentCurriculum?.curriculumStep === "LECTURE" && {
                    scale: 1.1,
                  }
                }
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full ${currentCurriculum?.curriculumStep === "LECTURE" ? "bg-green-100" : "bg-neutral-300"}`}
              >
                <Monitor
                  stroke="#ffffff"
                  className="h-4 w-4"
                  strokeWidth={2.5}
                />
              </motion.div>
              <span className="text-sm font-semibold text-neutral-700">
                강의
              </span>
            </div>
            <hr
              className={`w-24 -translate-y-3 border-2 ${currentCurriculum?.curriculumStep === "LECTURE" ? "border-green-100" : "border-neutral-300"}`}
            />
            <div className="flex flex-col items-center">
              <motion.div
                animate={
                  currentCurriculum?.curriculumStep === "TRANING" && {
                    scale: 1.1,
                  }
                }
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full ${currentCurriculum?.curriculumStep === "TRANING" ? "bg-green-100" : "bg-neutral-300"}`}
              >
                <Home stroke="#ffffff" className="h-4 w-4" strokeWidth={2.5} />
              </motion.div>
              <span className="text-sm font-semibold text-neutral-700">
                훈련
              </span>
            </div>
            <hr
              className={`w-24 -translate-y-3 border-2 ${currentCurriculum?.curriculumStep === "TRANING" ? "border-green-100" : "border-neutral-300"}`}
            />
            <div className="flex flex-col items-center">
              <motion.div
                animate={
                  currentCurriculum?.curriculumStep === "END" && {
                    scale: 1.1,
                  }
                }
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className={`flex h-10 w-10 items-center justify-center rounded-full ${currentCurriculum?.curriculumStep === "END" ? "bg-green-100" : "bg-neutral-300"}`}
              >
                <Goal stroke="#ffffff" className="h-4 w-4" strokeWidth={2.5} />
              </motion.div>
              <span className="text-sm font-semibold text-neutral-700">
                입양
              </span>
            </div>
          </div>
        </div>
        <div className="bg-grass-pattern flex w-1/2 flex-col items-center rounded-xl bg-cover p-6">
          <div className="flex w-full flex-col items-center gap-4 rounded-xl bg-white p-6">
            <span className="text-lg font-semibold">커리큘럼 수칙</span>
            <div className="flex flex-col gap-2">
              <span className="font-semibold">
                1. 강의는 정해진 단계로만 학습해요
              </span>
              <span className="font-semibold">
                2. 강의 진도율이 <span className="text-red-500">총합 90%</span>{" "}
                이상이어야 해요
              </span>
              <span className="font-semibold">
                3. 강의를 모두 학습한 후 훈련소를 선택해요
              </span>
              <span className="font-semibold">
                4. 모든 훈련소의{" "}
                <span className="text-red-500">커리큘럼은 동일</span>해요
              </span>
              <span className="font-semibold">
                5. 중도 탈락 시{" "}
                <span className="text-red-500">반환금은 훈련소마다 상이</span>
                해요
              </span>
              <span className="font-semibold">
                6. 훈련사님의 응답이 조금은 느릴 수 있어요
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
