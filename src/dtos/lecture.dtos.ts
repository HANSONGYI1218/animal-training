import {
  AnimalType,
  Category,
  OccupationType,
  PriceType,
} from "@/types/tyeps.all";
import {
  IsNotEmptyBoolean,
  IsNotEmptyNumber,
  IsNotEmptyString,
} from "@/validate-decoration/validate-deco";
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
  tutor_name!: string;

  @IsEnum(OccupationType, {
    message: "tutor_occupation must be a valid OccupationType value",
  })
  tutor_occupation!: OccupationType;

  @IsNotEmptyString()
  videoUrl!: string;

  @IsNotEmptyNumber()
  like!: number;

  tags!: string[];

  @IsNotEmptyBoolean()
  bookmark!: boolean;

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
  tutor_name!: string;
  tutor_occupation!: OccupationType;
  videoUrl!: string;
  like!: number;
  tags!: string[];
  bookmark!: boolean;
  tutorId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
