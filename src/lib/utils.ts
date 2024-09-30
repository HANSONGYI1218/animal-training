import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthDate: Date) {
  const now = new Date();
  const diff = now.getTime() - birthDate.getTime();

  // 밀리초 단위 차이를 년도로 변환
  const ageDate = new Date(diff);

  // 1970년을 기준으로 나이를 계산 (Unix Epoch 기준)
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}
