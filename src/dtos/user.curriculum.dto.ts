import { AnimalType } from "@/types/tyeps.all";
import {
  CurriculumCategory,
  AnimalSize,
  AnimalAge,
  CurriculumStep,
} from "@prisma/client";

export type UserCurriculumLectureDto = {
  id: string;
  animal_type: AnimalType;
  animal_size: AnimalSize;
  animal_age: AnimalAge;
  category: CurriculumCategory;
  lastVideoId: string;
  lastVideoTime: number;
  curriculumSteps: CurriculumStep;
  //   attendances?: Json[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserCurriculumLectureDto = {
  animal_type: AnimalType;
  animal_size: AnimalSize;
  animal_age: AnimalAge;
  category: CurriculumCategory;
  lastVideoId: string;
  lastVideoTime: number;
  curriculumSteps: CurriculumStep;
  //   attendances?: Json[];
  userId: string;
};

export type UpdateUserCurriculumLectureDto = {
  id: string;
  animal_type?: AnimalType;
  animal_size?: AnimalSize;
  animal_age?: AnimalAge;
  category?: CurriculumCategory;
  lastVideoId?: string;
  lastVideoTime?: number;
  curriculumSteps?: CurriculumStep;
  //   attendances?: Json[];
  userId?: string;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
