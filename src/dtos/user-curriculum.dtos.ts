import { AttendanceStatus } from "@/types/tyeps.all";
import { IsNotEmptyString } from "@/validate-decoration/validate-deco";
import { AnimalType, CurriculumStep, CurriculumCategory } from "@prisma/client";
import { IsEnum } from "class-validator";

export class CreateUserCurriculumDto {
  @IsEnum(AnimalType, {
    message: "animal_type must be a valid AnimalType value",
  })
  animal_type!: AnimalType;

  @IsEnum(CurriculumStep, {
    message: "curriculum_step must be a valid AnimalType value",
  })
  curriculumStep!: CurriculumStep;

  @IsEnum(CurriculumCategory, {
    message: "CurriculumCategory must be a valid AnimalType value",
  })
  curriculumCategory!: CurriculumCategory;

  curriculumIndex!: number;

  attendances!: Array<{
    training_date: Date;
    start_time: string | null;
    end_time: string | null;
    absent_reason: string | null;
    attendance_status: AttendanceStatus;
  }> | null;

  @IsNotEmptyString()
  userId!: string;
}

export class GetUserCurriculumDto {
  id!: string;
  animal_type!: AnimalType;
  curriculumStep!: CurriculumStep;
  curriculumCategory!: CurriculumCategory;
  curriculumIndex!: number;
  attendances!: Array<{
    training_date: Date;
    start_time: string | null;
    end_time: string | null;
    absent_reason: string | null;
    attendance_status: AttendanceStatus;
  }> | null;
  createdAt!: Date;
  updatedAt!: Date;
}
