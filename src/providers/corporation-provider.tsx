"use client";

import { CorporationDetailDto } from "@/dtos/corporation.dto";
import { createContext, ReactNode } from "react";

// CorporationContext를 생성합니다.
export const CorporationContext = createContext<CorporationDetailDto | null>(
  null,
);

// CorporationProviderProps 타입 정의
export interface CorporationProviderProps {
  corporation: CorporationDetailDto;
  children: ReactNode; // 자식 컴포넌트
}

// CorporationProvider 컴포넌트
export default function CorporationProvider({
  corporation,
  children,
}: CorporationProviderProps) {
  return (
    <CorporationContext.Provider value={corporation}>
      <div className="flex h-full w-full flex-1 flex-col p-10">
        {children} {/* 자식 컴포넌트를 렌더링 */}
      </div>
    </CorporationContext.Provider>
  );
}
