"use client";

export default function CurriculumBanner() {
  return (
    <section className="relative flex w-full flex-col overflow-hidden bg-[#F9F9F9] py-12">
      <div className="container relative z-10 mx-auto flex w-full max-w-[1150px]">
        <div className="flex w-full flex-col gap-12">
          <span className="text-3xl font-bold leading-relaxed">
            한송이님의 열정
            <br />
            쏭쓰가 응원할게요🚀
          </span>
        </div>
        <div className="flex w-1/2 flex-col items-center rounded-xl bg-grass-pattern bg-cover p-6">
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
