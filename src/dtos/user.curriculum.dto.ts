import {
  AnimalType,
  CurriculumStep,
  CurriculumCategory,
  Prisma,
} from "@prisma/client";

export type CreateUserCurriculumDto = {
  animal_type: AnimalType;
  curriculumStep: CurriculumStep;
  curriculumCategory: CurriculumCategory;
  curriculumIndex: number;
  attendances: Prisma.JsonValue[];
  userId: string;
};

export type UpdateUserCurriculumDto = {
  id: string;
  animal_type?: AnimalType;
  curriculumStep?: CurriculumStep;
  curriculumCategory?: CurriculumCategory;
  curriculumIndex?: number;
  attendances: Prisma.JsonValue[];
  userId?: string;
};

export type UserCurriculumDto = {
  id: string;
  animal_type: AnimalType;
  curriculumStep: CurriculumStep;
  curriculumCategory: CurriculumCategory;
  curriculumIndex: number;
  attendances: Prisma.JsonValue[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
