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

export function parseTime(timeString: string): number {
  const timeParts = timeString.split(":");

  let totalSeconds = 0;

  // 시간, 분, 초를 파싱하여 초로 변환
  if (timeParts.length === 3) {
    const [hrs, mins, secs] = timeParts.map(Number);
    totalSeconds = hrs * 3600 + mins * 60 + secs;
  } else if (timeParts.length === 2) {
    const [mins, secs] = timeParts.map(Number);
    totalSeconds = mins * 60 + secs;
  } else if (timeParts.length === 1) {
    const [secs] = timeParts.map(Number);
    totalSeconds = secs;
  }

  return totalSeconds;
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

export function formatAnimalAge(age: number): string {
  if (age < 0) {
    return "0"; // 음수는 유효하지 않은 나이로 처리
  }

  const years = Math.floor(age); // 정수 부분 (년)
  const months = Math.floor((age - years) * 12); // 소수점 부분을 내림하여 월로 변환

  if (years === 0 && months > 0) {
    return `${months}개월`;
  } else if (months === 0) {
    return `${years}년`;
  } else {
    return `${years}년 ${months}개월`;
  }
}

export const enterKeyDown = (event: any) => {
  // textarea 안에서는 Enter 키를 허용
  if (event.key === "Enter" && event.target.tagName !== "TEXTAREA") {
    event.preventDefault(); // Enter 키의 기본 동작을 막음
  }
};

export async function getVideoDuration(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = URL.createObjectURL(file);

    video.onloadedmetadata = () => {
      URL.revokeObjectURL(video.src);
      const formattedDuration = formatTime(video.duration); // 시:분:초 변환
      resolve(formattedDuration);
    };

    video.onerror = () => {
      reject(new Error("영상 정보를 불러올 수 없습니다."));
    };
  });
}
