import { CurriculumStep } from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";

interface UserCurriculumEntityProps {
  id?: string;
  lastVideoId?: string;
  lastVideoTime?: string;
  curriculumStep: CurriculumStep;
  attendances?: InputJsonValue[];
  userId: string;
  adoptionId: string;
  tutorTrainingCenterId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserCurriculumEntity {
  private id?: string;
  private lastVideoId?: string;
  private lastVideoTime?: string;
  private curriculumStep: CurriculumStep;
  private attendances?: InputJsonValue[];
  private userId: string;
  private adoptionId: string;
  private tutorTrainingCenterId?: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    lastVideoId,
    lastVideoTime,
    curriculumStep,
    attendances,
    userId,
    adoptionId,
    tutorTrainingCenterId,
    createdAt,
    updatedAt,
  }: UserCurriculumEntityProps) {
    this.id = id;
    this.lastVideoId = lastVideoId;
    this.lastVideoTime = lastVideoTime;
    this.curriculumStep = curriculumStep;
    this.attendances = attendances ?? [];
    this.userId = userId;
    this.adoptionId = adoptionId;
    this.tutorTrainingCenterId = tutorTrainingCenterId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
