"use client";

import { GetUserByCurriculumDto } from "@/dtos/user.dto";
import { createContext, ReactNode } from "react";

// UserContext를 생성합니다.
export const UserCurriculumContext =
  createContext<GetUserByCurriculumDto | null>(null);

type UserWithId = GetUserByCurriculumDto & { id: string };

// UserProviderProps 타입 정의
export interface UserProviderProps {
  user: UserWithId;
  children: ReactNode; // 자식 컴포넌트
}

// UserProvider 컴포넌트
export default function UserCurriculumProvider({
  user,
  children,
}: UserProviderProps) {
  return (
    <UserCurriculumContext.Provider value={user}>
      {children} {/* 자식 컴포넌트를 렌더링 */}
    </UserCurriculumContext.Provider>
  );
}
