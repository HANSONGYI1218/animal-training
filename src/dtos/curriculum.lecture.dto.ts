import { AnimalType } from "@/types/tyeps.all";
import { CurriculumCategory } from "@prisma/client";

export type CreateCurriculumLectureDto = {
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
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
  category: CurriculumCategory;
  thumbnailPath: string;
  videoUrl: string;
  videoTime: string;
  tutorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
