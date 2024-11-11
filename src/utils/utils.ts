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

export function formatPrice(price: number | undefined) {
  if (price === undefined) return "";
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ID 생성 함수 (예시로 간단한 UUID 생성)
export function generateId(): string {
  return Math.random().toString(36).slice(2, 9);
}

// 렌덤값 생성
export function generateSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000);
}
