import { AnimalType } from "@/types/tyeps.all";
import { AnimalAge, AnimalSize, CurriculumCategory } from "@prisma/client";

export type CreateCurriculumLectureDto = {
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
  animal_sizes: AnimalSize[];
  animal_ages: AnimalAge[];
  category: CurriculumCategory;
  thumbnailPath: string;
  videoUrl: string;
  videoTime: string;
  tutorId: string;
};

export type UpdateCurriculumLectureDto = {
  id: string;
  index?: number;
  title?: string;
  content?: string;
  animal_type?: AnimalType;
  animal_sizes?: AnimalSize[];
  animal_ages?: AnimalAge[];
  category?: CurriculumCategory;
  thumbnailPath?: string;
  videoUrl?: string;
  videoTime?: string;
  tutorId?: string;
};

export type CurriculumLectureDto = {
  id: string;
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
  animal_sizes: AnimalSize[];
  animal_ages: AnimalAge[];
  category: CurriculumCategory;
  thumbnailPath: string;
  videoUrl: string;
  videoTime: string;
  tutorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type SelectCurriculumLectureDto = {
  animal_type: AnimalType;
  animal_size: AnimalSize;
  animal_age: AnimalAge;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
