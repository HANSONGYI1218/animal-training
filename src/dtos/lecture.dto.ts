import {
  LectureBookmark,
  AnimalType,
  Category,
  PriceType,
  Tutor,
} from "@prisma/client";

export type LectureDto = {
  id: string;
  title: string;
  content: string;
  animal_type: AnimalType;
  price_type: PriceType;
  category: Category;
  thumbnailPath: string;
  videoUrl: string;
  like: number;
  tags: string[];
  tutorId: string;
  corporationId: string;
  createddAt: Date;
  updatedAt: Date;
};

export type CreateLectureDto = {
  title: string;
  content: string;
  animal_type: AnimalType;
  price_type: PriceType;
  category: Category;
  thumbnailPath: string;
  videoUrl: string;
  like: number;
  tags: string[];
  tutorId: string;
  corporationId: string;
};

export type UpdateLectureDto = {
  id: string;
  title?: string;
  content?: string;
  animal_type?: AnimalType;
  price_type?: PriceType;
  category?: Category;
  thumbnailPath?: string;
  videoUrl?: string;
  like?: number;
  tags?: string[];
  tutorId?: string;
};

export type GetLectureWithTutorDto = {
  id: string;
  title: string;
  content: string;
  animal_type: AnimalType;
  price_type: PriceType;
  category: Category;
  thumbnailPath: string;
  videoUrl: string;
  like: number;
  tags: string[];
  tutor: {
    id: string;
    name: string;
    occupation: string;
  };
  corporationId: string;
  bookmarks: LectureBookmark[];
  createdAt: Date;
  updatedAt: Date;
};

export type GetLectureDto = {
  id: string;
  title: string;
  content: string;
  animal_type: AnimalType;
  price_type: PriceType;
  category: Category;
  thumbnailPath: string;
  videoUrl: string;
  like: number;
  tags: string[];
  corporationId: string;
  tutor: Tutor;
  bookmarks: LectureBookmark[];
  tutorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
