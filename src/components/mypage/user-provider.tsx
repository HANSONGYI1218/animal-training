"use client";

import { GetUserDto } from "@/dtos/user.dtos";
import { GenderType, Lecture, Tutor } from "@prisma/client";
import { createContext, ReactNode } from "react";

// UserContext를 생성합니다.
export const UserContext = createContext<GetUserDto | null>(null);

export type User = {
  id: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  registrationNumber: string;
  nickname: string;
  birthday: Date;
  gender: GenderType;
  lectureBookmarks: {
    id: string;
    lecture: Lecture;
  }[];
  tutorBookmarks: {
    id: string;
    tutor: Tutor;
  }[];
  isNewNews_SMS: boolean;
  isNotice_SMS: boolean;
  isPromotion_SMS: boolean;
  isNewNews_Email: boolean;
  isNotice_Email: boolean;
  isPromotion_Email: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// UserProviderProps 타입 정의
export interface UserProviderProps {
  user: User;
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
