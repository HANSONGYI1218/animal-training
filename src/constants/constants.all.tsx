import {
  Category,
  AnimalType,
  PriceType,
  GenderType,
  OccupationType,
  AdoptionStatus,
} from "@/types/tyeps.all";

export const categorySwap: { [key in Category | string]: string } = {
  [Category.FOOD]: "식품",
  [Category.BEAUTY]: "미용",
  [Category.HEALTH]: "건강",
  [Category.WALK]: "산책",
  [Category.TRAINING]: "훈련",
  [Category.ADOPT]: "입양",
  [Category.PLAY]: "놀이",
  [Category.COMMUNICATION]: "의사소통",
};

export const animalTypeSwap: { [key in AnimalType | string]: string } = {
  [AnimalType.DOG]: "강아지",
  [AnimalType.CAT]: "고양이",
};

export const priceTypeSwap: { [key in PriceType | string]: string } = {
  [PriceType.FREE]: "무료",
  [PriceType.PAID]: "유료",
};

export const genderTypeSwap: { [key in GenderType | string]: string } = {
  [GenderType.MALE]: "남성",
  [GenderType.FEMALE]: "여성",
};

export const genderAmianlTypeSwap: { [key in GenderType | string]: string } = {
  [GenderType.MALE]: "남",
  [GenderType.FEMALE]: "여",
};

export const occupationTypeSwap: { [key in OccupationType | string]: string } =
  {
    [OccupationType.TRAINER]: "훈련사",
    [OccupationType.VETERINARIAN]: "수의사",
    [OccupationType.GROOMER]: "미용사",
    [OccupationType.PROFESSOR]: "교수",
  };

export const adoptionStatusTypeSwap: {
  [key in AdoptionStatus | string]: string;
} = {
  [AdoptionStatus.ADOPTION]: "입양중",
  [AdoptionStatus.ABANDON]: "파양",
};

export enum SortType {
  ASC = "최신순",
  DESC = "오래된순",
  POPULARITY = "인기순",
}

export function getCategoryByValue(value: string): Category | undefined {
  return Object.entries(categorySwap).find(
    ([key, val]) => val === value,
  )?.[0] as Category | undefined;
}

export function getPriceTypeByValue(value: string): PriceType | undefined {
  return Object.entries(priceTypeSwap).find(
    ([key, val]) => val === value,
  )?.[0] as PriceType | undefined;
}

export function getAnimalTypeByValue(value: string): AnimalType | undefined {
  return Object.entries(animalTypeSwap).find(
    ([key, val]) => val === value,
  )?.[0] as AnimalType | undefined;
}

export function getOccupationTypeByValue(
  value: string,
): OccupationType | undefined {
  return Object.entries(occupationTypeSwap).find(
    ([key, val]) => val === value,
  )?.[0] as OccupationType | undefined;
}
