import { Review } from "@prisma/client";

interface TutorTrainingCenterEntityProps {
  id?: string;
  tutorId: string;
  trainingCenterId: string;
  price: string;
  holidays: string[];
  like: number;
  updatedAt?: Date;
}

export class TutorTrainingCenterEntity {
  private id?: string;
  private tutorId: string;
  private trainingCenterId: string;
  private price: string;
  private holidays: string[];
  private like: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    tutorId,
    trainingCenterId,
    holidays,
    price,
    like,
    updatedAt,
  }: TutorTrainingCenterEntityProps) {
    this.id = id;
    this.tutorId = tutorId;
    this.trainingCenterId = trainingCenterId;
    this.holidays = holidays;
    this.price = price;
    this.like = like;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
