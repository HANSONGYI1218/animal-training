"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function RecordBanner() {
  const ref = useRef(null);
  const isInView = useInView(ref);

  return (
    <section
      ref={ref}
      className="flex w-full flex-col overflow-hidden bg-green-100 py-4"
    >
      <div className="container mx-auto flex w-full max-w-[1150px]">
        <div className="flex w-full flex-col gap-8 py-12">
          <div className="flex flex-col gap-4">
            <span className="text-4xl font-bold text-white">쓰스와 함께</span>
            <div className="relative flex h-11">
              <span className="text-4xl font-bold text-orange-500">
                책임있는
              </span>
            </div>

            <span className="text-4xl font-bold text-white">
              분양 문화를 만들어가요!
            </span>
          </div>
          <span className="whitespace-pre-line text-lg font-semibold text-white">
            입양자의 입양 기록을 찾아보세요!
          </span>
          <span className="whitespace-pre-line text-sm text-white">
            입양자의 이름과 주민등록번호가 필요해요.
          </span>
        </div>
        <div className="relative flex w-full items-center justify-center">
          <div className="relative flex h-[384px] w-[384px] translate-y-14 flex-col overflow-hidden rounded-full">
            <img
              src="/icons/record-circle.svg"
              alt="collaboration"
              className="relative z-20 h-full w-full translate-y-2 rounded-full"
            />
            <Image
              src="/images/record/grass.png"
              width={350}
              height={60}
              alt="grass"
              className={`absolute -bottom-20 left-3 z-10 ${isInView ? "opacity-100" : "opacity-0"}`}
            />
          </div>

          <Image
            src="/images/record/dog.png"
            width={120}
            height={120}
            alt="dog"
            className={`absolute bottom-2 left-1/2 -translate-x-1/2 ${isInView ? "opacity-100" : "opacity-0"}`}
          />

          <motion.div
            initial={{
              x: "-50%", // 수평 중앙에 맞추기 위한 조정
              y: "-50%", // 수직 중앙에 맞추기 위한 조정
              rotate: -6,
            }}
            animate={{
              x: -260, // 애니메이션 시 -260으로 이동
              rotate: 0, // 회전 값 초기화
            }}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 0.8,
            }}
            className={`absolute left-1/2 top-1/2 z-20 flex flex-col items-center justify-center gap-2 rounded-xl border-8 bg-white px-8 py-5 shadow-xl`}
          >
            <Image
              src="/images/record/collaboration.png"
              width={64}
              height={64}
              alt="collaboration"
            />
            <span className="text-xl font-bold">책임</span>
          </motion.div>

          <motion.div
            initial={{
              x: "-50%", // 수평 중앙에 맞추기 위한 조정
              y: "-50%", // 수직 중앙에 맞추기 위한 조정
              rotate: 0,
            }}
            animate={{
              y: -198, // 수직 위치 유지
              rotate: 0, // 회전 값 초기화
            }}
            whileHover={{ scale: 1.05 }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 0.8,
            }}
            className={`absolute left-1/2 top-1/2 z-10 flex flex-col items-center justify-center gap-2 rounded-xl border-8 bg-white px-8 py-5 shadow-xl`}
          >
            <Image
              src="/images/record/paper-plane.png"
              width={64}
              height={64}
              alt="paper-plane"
            />
            <span className="text-xl font-bold">진심</span>
          </motion.div>

          <motion.div
            initial={{
              x: "-50%", // 수평 중앙에 맞추기 위한 조정
              y: "-50%", // 수직 중앙에 맞추기 위한 조정
              rotate: 6,
            }}
            whileHover={{ scale: 1.05 }}
            animate={{
              x: 110, // 애니메이션 시 -260으로 이동
              rotate: 0, // 회전 값 초기화
            }}
            transition={{
              type: "spring",
              bounce: 0.4,
              duration: 0.8,
            }}
            className={`absolute left-1/2 top-1/2 z-0 flex flex-col items-center justify-center gap-2 rounded-xl border-8 bg-white px-8 py-5 shadow-xl`}
          >
            <Image
              src="/images/record/affection.png"
              width={64}
              height={64}
              alt="affection"
            />
            <span className="text-xl font-bold">애정</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
