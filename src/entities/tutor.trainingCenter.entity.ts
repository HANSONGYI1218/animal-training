interface TutorTrainingCenterEntityProps {
  id?: string;
  tutorId: string;
  trainingCenterId: string;
  price: string;
  holidays: string[];
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
  private like: number;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    tutorId,
    trainingCenterId,
    holidays,
    price,
    like,
    updatedAt,
    createdAt,
  }: TutorTrainingCenterEntityProps) {
    this.id = id;
    this.tutorId = tutorId;
    this.trainingCenterId = trainingCenterId;
    this.holidays = holidays;
    this.price = price;
    this.like = like;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
