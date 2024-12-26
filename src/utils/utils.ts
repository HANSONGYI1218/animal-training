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

export function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const formattedMins = mins.toString().padStart(2, "0");
  const formattedSecs = secs.toString().padStart(2, "0");
  if (hrs === 0 && mins === 0) {
    return `0:${formattedSecs}`;
  } else if (hrs === 0) {
    return `${mins}:${formattedSecs}`;
  }
  return `${hrs}:${formattedMins}:${formattedSecs}`;
}

export const generateRandomNickname = (): string => {
  const koreanSyllables = [
    "가",
    "나",
    "다",
    "라",
    "마",
    "바",
    "사",
    "아",
    "자",
    "차",
    "카",
    "타",
    "파",
    "하",
    "강",
    "남",
    "달",
    "람",
    "만",
    "박",
    "상",
    "안",
    "장",
    "찬",
    "칸",
    "탄",
    "판",
    "한",
    "고",
    "노",
    "도",
    "로",
    "모",
    "보",
    "소",
    "오",
    "조",
    "초",
    "코",
    "토",
    "포",
    "호",
  ];

  const numSyllables = Math.floor(Math.random() * 3) + 2; // Randomly 2~4 syllables
  const selectedSyllables = Array.from(
    { length: numSyllables },
    () => koreanSyllables[Math.floor(Math.random() * koreanSyllables.length)],
  );

  const randomNumbers = Array.from({ length: 3 }, () =>
    Math.floor(Math.random() * 10),
  ).join("");

  return selectedSyllables.join("") + randomNumbers;
};
