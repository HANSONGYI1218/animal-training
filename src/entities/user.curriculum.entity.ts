import {
  AnimalType,
  CurriculumCategory,
  CurriculumStep,
  Prisma,
} from "@prisma/client";

interface UserCurriculumEntityProps {
  id?: string;
  animal_type: AnimalType;
  curriculumStep: CurriculumStep;
  curriculumCategory: CurriculumCategory;
  curriculumIndex: number;
  attendances: Prisma.JsonValue[];
  userId: string;
  updatedAt?: Date;
}

export class UserCurriculumEntity {
  private id: string;
  private animal_type: AnimalType;
  private curriculumStep: CurriculumStep;
  private curriculumCategory: CurriculumCategory;
  private curriculumIndex: number;
  private attendances: Prisma.JsonValue[];
  private userId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    animal_type,
    curriculumStep,
    curriculumCategory,
    curriculumIndex,
    attendances,
    userId,
    updatedAt,
  }: UserCurriculumEntityProps) {
    this.id = id ?? "";
    this.animal_type = animal_type;
    this.curriculumStep = curriculumStep;
    this.curriculumCategory = curriculumCategory;
    this.curriculumIndex = curriculumIndex;
    this.attendances = attendances;
    this.userId = userId;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
