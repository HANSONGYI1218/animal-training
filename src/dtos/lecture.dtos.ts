import {
  IsNotEmptyBoolean,
  IsNotEmptyNumber,
  IsNotEmptyString,
} from "@/validate-decoration/validate-deco";
import {
  LectureBookmark,
  AnimalType,
  Category,
  PriceType,
  Tutor,
} from "@prisma/client";
import { IsEnum } from "class-validator";

export class CreateLectureDto {
  @IsNotEmptyString()
  title!: string;

  @IsNotEmptyString()
  content!: string;

  @IsEnum(AnimalType, {
    message: "animal_type must be a valid AnimalType value",
  })
  animal_type!: AnimalType;

  @IsEnum(PriceType, { message: "price_type must be a valid PriceType value" })
  price_type!: PriceType;

  @IsEnum(Category, { message: "category must be a valid Category value" })
  category!: Category;

  @IsNotEmptyString()
  thumbnailPath!: string;

  @IsNotEmptyString()
  videoUrl!: string;

  @IsNotEmptyNumber()
  like!: number;

  tags!: string[];

  @IsNotEmptyString()
  tutorId!: string;
}

export class GetLectureDto {
  id!: string;
  title!: string;
  content!: string;
  animal_type!: AnimalType;
  price_type!: PriceType;
  category!: Category;
  thumbnailPath!: string;
  videoUrl!: string;
  like!: number;
  tags!: string[];
  tutor!: {
    id: string;
    name: string;
    occupation: string;
  };
  bookmarks!: LectureBookmark[];
  createdAt!: Date;
  updatedAt!: Date;
}

export class GetLectureDetailDto {
  id!: string;
  title!: string;
  content!: string;
  animal_type!: AnimalType;
  price_type!: PriceType;
  category!: Category;
  thumbnailPath!: string;
  videoUrl!: string;
  like!: number;
  tags!: string[];
  tutor!: Tutor;
  bookmarks!: LectureBookmark[];
  createdAt!: Date;
  updatedAt!: Date;
}
