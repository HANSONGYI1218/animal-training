import { AnimalType } from "@prisma/client";

interface TutorTrainingCenterEntityProps {
  id?: string;
  tutorId: string;
  trainingCenterId: string;
  price: string;
  holidays: string[];
  animal_types: AnimalType[];
  like: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TutorTrainingCenterEntity {
  private id?: string;
  private tutorId: string;
  private trainingCenterId: string;
  private price: string;
  private holidays: string[];
  private animal_types: string[];
  private like: number;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    tutorId,
    trainingCenterId,
    holidays,
    animal_types,
    price,
    like,
    updatedAt,
    createdAt,
  }: TutorTrainingCenterEntityProps) {
    this.id = id;
    this.tutorId = tutorId;
    this.trainingCenterId = trainingCenterId;
    this.holidays = holidays;
    this.animal_types = animal_types;
    this.price = price;
    this.like = like;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
