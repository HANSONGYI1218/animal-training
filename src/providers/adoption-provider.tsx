"use client";

import { GetAdoptionDto } from "@/dtos/adoption.dto";
import { createContext, ReactNode } from "react";

// AdoptionContext를 생성합니다.
export const AdoptionContext = createContext<GetAdoptionDto | null>(null);

// AdoptionProviderProps 타입 정의
export interface AdoptionProviderProps {
  adoption: GetAdoptionDto;
  children: ReactNode; // 자식 컴포넌트
}

// AdoptionProvider 컴포넌트
export default function AdoptionProvider({
  adoption,
  children,
}: AdoptionProviderProps) {
  return (
    <AdoptionContext.Provider value={adoption}>
      <div className="flex h-full w-full flex-1 flex-col p-10">
        {children} {/* 자식 컴포넌트를 렌더링 */}
      </div>
    </AdoptionContext.Provider>
  );
}
