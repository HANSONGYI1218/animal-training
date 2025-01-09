interface UserTutorTrainingCenterEntityProps {
  id?: string;
  userId: string;
  tutorTrainingCenterId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class UserTutorTrainingCenterEntity {
  private id?: string;
  private userId: string;
  private tutorTrainingCenterId: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    userId,
    tutorTrainingCenterId,
    createdAt,
    updatedAt,
  }: UserTutorTrainingCenterEntityProps) {
    this.id = id;
    this.userId = userId;
    this.tutorTrainingCenterId = tutorTrainingCenterId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
