import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns/format";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { ko } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatDate(date: Date) {
  const now = Date.now();
  const diff = (now - date.getTime()) / 1000; // 현재 시간과의 차이(초)
  return diff < 60 * 1
    ? "방금 전"
    : diff < 60 * 60 * 24 * 3
    ? formatDistanceToNow(date, { addSuffix: true, locale: ko })
    : format(date, "PPP EEE", { locale: ko });
}

export function formDateUntilExpiredLeft(date: Date) {
  const now = Date.now();
  const diff = Math.floor((date.getTime() - now) / (1000 * 60 * 60 * 24)); // 현재 시간과의 차이(초)
  return diff === 0 ? "D-DAY" : diff < 0 ? "이미 만료됨" : `D-${diff}`;
}

export const calculateAge = (birthdate: any) => {
  if (!birthdate) return "";

  const today = new Date();
  const birthdateDate = new Date(birthdate);
  const age = today.getFullYear() - birthdateDate.getFullYear();

  // Check if birthday has occurred this year
  return today.getMonth() < birthdateDate.getMonth() ||
    (today.getMonth() === birthdateDate.getMonth() &&
      today.getDate() < birthdateDate.getDate())
    ? age - 1
    : `만 ${age} 세`;
};

export const calculateKoreanAge = (birthdate: any) => {
  const today = new Date();
  const birthdateDate = new Date(birthdate);
  const age = today.getFullYear() - birthdateDate.getFullYear();
  return `${age + 1} 세`;
};

export function formatPeriodEnd(date: Date) {
  return date
    ? format(date, "yyyy.MM.dd (E)", { locale: ko })
    : formatDistanceToNow(date, { addSuffix: true, locale: ko });
}

export function formatPeriodEndWithoutWeek(date: Date) {
  return date
    ? format(date, "yyyy.MM.dd", { locale: ko })
    : formatDistanceToNow(date, { addSuffix: true, locale: ko });
}

export function toLocalizedDate(dateString: string) {
  if (dateString) {
    const dateObject = new Date(dateString);
    const localizedDateString = dateObject.toLocaleString();
    return localizedDateString;
  }
  return null;
}
