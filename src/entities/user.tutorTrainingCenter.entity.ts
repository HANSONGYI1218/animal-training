import { Review } from "@prisma/client";

interface UserTutorTrainingCenterEntityProps {
  id?: string;
  userId: string;
  tutorTrainingCenterId: string;
  updatedAt?: Date;
}

export class UserTutorTrainingCenterEntity {
  private id?: string;
  private userId: string;
  private tutorTrainingCenterId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    userId,
    tutorTrainingCenterId,
    updatedAt,
  }: UserTutorTrainingCenterEntityProps) {
    this.id = id;
    this.userId = userId;
    this.tutorTrainingCenterId = tutorTrainingCenterId;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
