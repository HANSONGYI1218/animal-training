import { AnimalType } from "@/types/tyeps.all";
import {
  IsNotEmptyNumber,
  IsNotEmptyString,
} from "@/validate-decoration/validate-deco";
import { CurriculumCategory } from "@prisma/client";
import { IsEnum } from "class-validator";

export class CreateCurriculumTrainingDto {
  @IsNotEmptyNumber()
  index!: number;

  @IsNotEmptyString()
  title!: string;

  @IsNotEmptyString()
  content!: string;

  @IsEnum(AnimalType, {
    message: "animal_type must be a valid AnimalType value",
  })
  animal_type!: AnimalType;

  @IsEnum(CurriculumCategory, {
    message: "category must be a valid Category value",
  })
  category!: CurriculumCategory;

  @IsNotEmptyString()
  trainingTime!: number;
}

export class GetCurriculumTrainingDto {
  id!: string;
  index!: number;
  title!: string;
  content!: string;
  animal_type!: AnimalType;
  category!: CurriculumCategory;
  trainingTime!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
