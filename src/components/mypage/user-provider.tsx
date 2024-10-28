"use client";

import { GetUserDto } from "@/dtos/user.dtos";
import { createContext, ReactNode } from "react";

// UserContext를 생성합니다.
export const UserContext = createContext<GetUserDto | null>(null);

// UserProviderProps 타입 정의
interface UserProviderProps {
  user: GetUserDto; // 사용자 정보
  children: ReactNode; // 자식 컴포넌트
}

// UserProvider 컴포넌트
export default function UserProvider({ user, children }: UserProviderProps) {
  return (
    <UserContext.Provider value={user}>
      <div className="flex h-full w-full flex-1 flex-col p-10">
        {children} {/* 자식 컴포넌트를 렌더링 */}
      </div>
    </UserContext.Provider>
  );
}
