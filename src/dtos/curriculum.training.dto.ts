import { AnimalType } from "@/types/tyeps.all";
import { CurriculumCategory } from "@prisma/client";

export type CurriculumTrainingDto = {
  id: string;
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
  category: CurriculumCategory;
  trainingTime: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateCurriculumTrainingDto = {
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
  category: CurriculumCategory;
  trainingTime: string;
};

export type UpdateCurriculumTrainingDto = {
  id: string;
  index?: number;
  title?: string;
  content?: string;
  animal_type?: AnimalType;
  category?: CurriculumCategory;
  trainingTime?: string;
};

export type GetCurriculumTrainingDto = {
  id: string;
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
  category: CurriculumCategory;
  trainingTime: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
