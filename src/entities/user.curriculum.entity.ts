import {
  AnimalType,
  AnimalSize,
  AnimalAge,
  CurriculumCategory,
  CurriculumStep,
} from "@prisma/client";

interface UserCurriculumLectureEntityProps {
  id?: string;
  animal_type: AnimalType;
  animal_size: AnimalSize;
  animal_age: AnimalAge;
  category: CurriculumCategory;
  lastVideoId: string;
  lastVideoTime: number;
  curriculumSteps: CurriculumStep;
  //   attendances?: Json[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserCurriculumLectureEntity {
  private id?: string;
  private animal_type: AnimalType;
  private animal_size: AnimalSize;
  private animal_age: AnimalAge;
  private category: CurriculumCategory;
  private lastVideoId: string;
  private lastVideoTime: number;
  private curriculumSteps: CurriculumStep;
  //   attendances?: Json[];
  private userId: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    animal_type,
    animal_size,
    animal_age,
    category,
    lastVideoId,
    lastVideoTime,
    curriculumSteps,
    //   attendances,
    userId,
    createdAt,
    updatedAt,
  }: UserCurriculumLectureEntityProps) {
    this.id = id;
    this.animal_type = animal_type;
    this.animal_size = animal_size;
    this.animal_age = animal_age;
    this.category = category;
    this.lastVideoId = lastVideoId;
    this.lastVideoTime = lastVideoTime;
    this.curriculumSteps = curriculumSteps;
    //  this.attendances=attendances;
    this.userId = userId;
    this.createdAt = createdAt ?? undefined;
    this.updatedAt = updatedAt ?? undefined;
  }
}
