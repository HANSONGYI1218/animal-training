"use client";

import { useEffect, useRef, useState } from "react";

export default function TouchScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const [previousX, setPreviousX] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setPreviousX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !ref.current) {
      return;
    }

    const delta = e.clientX - previousX;
    ref.current.scrollLeft += delta;
    setPreviousX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const addGlobalMouseUpListener = () => {
    window.addEventListener("mouseup", handleMouseUp);
  };

  const removeGlobalMouseUpListener = () => {
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const smoothScrollTo = (targetPosition: number) => {
    if (!ref.current) return;

    const startPosition = ref.current.scrollLeft;
    const distance = targetPosition - startPosition;
    const duration = 500; // 스크롤 지속 시간 (밀리초 단위)
    let startTime: number | null = null;

    const smoothStep = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1); // 0에서 1 사이의 값
      const easeInOutQuad =
        percentage < 0.5
          ? 2 * percentage * percentage
          : -1 + (4 - 2 * percentage) * percentage; // 부드러운 easing 함수

      ref.current!.scrollLeft = startPosition + distance * easeInOutQuad;

      if (progress < duration) {
        requestAnimationFrame(smoothStep); // 애니메이션 지속
      }
    };

    requestAnimationFrame(smoothStep);
  };

  const handleSpanClick = (index: number) => {
    if (ref.current) {
      const totalWidth = ref.current.scrollWidth;
      const visibleWidth = ref.current.clientWidth;
      let targetPosition = 0;

      if (index === 0) {
        targetPosition = 0;
      } else if (index === 1) {
        targetPosition = (totalWidth - visibleWidth) / 2;
      } else if (index === 2) {
        targetPosition = totalWidth - visibleWidth;
      }

      smoothScrollTo(targetPosition);
    }
  };

  return (
    <section className="flex flex-col">
      <div
        ref={ref}
        onMouseDown={(e: React.MouseEvent<HTMLDivElement>) => {
          handleMouseDown(e);
          addGlobalMouseUpListener();
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={() => {
          handleMouseUp();
          removeGlobalMouseUpListener();
        }}
        style={{ userSelect: "none" }}
        className="scroll flex w-full overflow-x-auto"
      >
        <div
          className="flex w-full gap-6"
          style={{ pointerEvents: isDragging ? "none" : "auto" }}
        >
          {children}
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <span
          onClick={() => handleSpanClick(0)}
          className="cursor-pointer text-xl font-extrabold"
        >
          _____
        </span>
        <span
          onClick={() => handleSpanClick(1)}
          className="cursor-pointer text-xl font-extrabold"
        >
          _____
        </span>
        <span
          onClick={() => handleSpanClick(2)}
          className="cursor-pointer text-xl font-extrabold"
        >
          _____
        </span>
      </div>
    </section>
  );
}
