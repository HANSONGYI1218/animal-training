'use client';

import { Dot } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export default function TouchScroll({
  isStepbar,
  className,
  children,
}: {
  isStepbar?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAutoSliding, setIsAutoSliding] = useState(true);
  const slideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [previousX, setPreviousX] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setPreviousX(e.clientX);

    setIsAutoSliding(false);
    resetSlideTimeout();
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
    setIsAutoSliding(true);
    resetSlideTimeout();
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsAutoSliding(true);
    resetSlideTimeout();
  };

  const addGlobalMouseUpListener = () => {
    window.addEventListener('mouseup', handleMouseUp);
  };

  const removeGlobalMouseUpListener = () => {
    window.removeEventListener('mouseup', handleMouseUp);
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
    setCurrentStep(index);

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

  const startAutoSlide = () => {
    if (ref.current) {
      slideTimeoutRef.current = setTimeout(() => {
        const totalWidth = ref.current!.scrollWidth;
        const visibleWidth = ref.current!.clientWidth;
        const newScrollPosition = ref.current!.scrollLeft + visibleWidth / 2; // 화면의 절반 정도만 이동

        if (newScrollPosition >= totalWidth - visibleWidth) {
          smoothScrollTo(0); // 끝에 도달하면 처음으로 돌아가기
          setCurrentStep(0);
        } else {
          smoothScrollTo(newScrollPosition);
          setCurrentStep((prevStep) => (prevStep + 1) % 3); // 단계 증가
        }
        startAutoSlide(); // 다음 슬라이드를 위해 재귀 호출
      }, 5000); // 5초 후에 슬라이드
    }
  };

  const resetSlideTimeout = () => {
    if (slideTimeoutRef.current) {
      clearTimeout(slideTimeoutRef.current); // 기존 타이머 제거
    }
    if (isAutoSliding) {
      startAutoSlide(); // 새로운 타이머 시작
    }
  };

  // 컴포넌트가 마운트되면 자동 슬라이드 시작
  useEffect(() => {
    if (isAutoSliding) {
      startAutoSlide();
    }

    // 컴포넌트 언마운트 시 타이머 제거
    return () => {
      if (slideTimeoutRef.current) {
        clearTimeout(slideTimeoutRef.current);
      }
    };
  }, [isAutoSliding]);

  return (
    <section className={`flex w-full flex-col gap-6 ${className}`}>
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
        style={{ userSelect: 'none' }}
        className="scroll flex w-full overflow-x-auto"
      >
        <div
          className="flex w-full gap-6"
          style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
        >
          {children}
        </div>
      </div>
      <div className={`justify-center gap-4 ${isStepbar ? 'flex' : 'hidden'}`}>
        <Dot
          onClick={() => handleSpanClick(0)}
          className={`h-4 w-4 cursor-pointer rounded-full bg-black ${currentStep === 0 ? 'bg-black' : 'bg-slate-100'}`}
          stroke={`${currentStep === 0 ? 'black' : 'slate-100'}`}
        />
        <Dot
          onClick={() => handleSpanClick(1)}
          className={`h-4 w-4 cursor-pointer rounded-full bg-black ${currentStep === 1 ? 'bg-black' : 'bg-slate-100'}`}
          stroke={`${currentStep === 1 ? 'black' : 'slate-100'}`}
        />
        <Dot
          onClick={() => handleSpanClick(2)}
          className={`h-4 w-4 cursor-pointer rounded-full bg-black ${currentStep === 2 ? 'bg-black' : 'bg-slate-100'}`}
          stroke={`${currentStep === 2 ? 'black' : 'slate-100'}`}
        />
      </div>
    </section>
  );
}
