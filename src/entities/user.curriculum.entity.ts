import { CurriculumStep } from "@prisma/client";

interface UserCurriculumEntityProps {
  id?: string;
  lastVideoId?: string;
  lastVideoTime?: string;
  curriculumStep: CurriculumStep;
  //   attendances?: Json[];
  userId: string;
  adoptionId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserCurriculumEntity {
  private id?: string;
  private lastVideoId?: string;
  private lastVideoTime?: string;
  private curriculumStep: CurriculumStep;
  //   attendances?: Json[];
  private userId: string;
  private adoptionId: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    lastVideoId,
    lastVideoTime,
    curriculumStep,
    //   attendances,
    userId,
    adoptionId,
    createdAt,
    updatedAt,
  }: UserCurriculumEntityProps) {
    this.id = id;
    this.lastVideoId = lastVideoId;
    this.lastVideoTime = lastVideoTime;
    this.curriculumStep = curriculumStep;
    //  this.attendances=attendances;
    this.userId = userId;
    this.adoptionId = adoptionId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
