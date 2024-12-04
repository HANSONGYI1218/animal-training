import {
  TrainingCenter,
  Tutor,
  TutorTrainingCenter,
  User,
} from "@prisma/client";

export type UserTutorTrainingCenterDto = {
  id: string;
  userId: string;
  tutorTrainingCenterId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserTutorTrainingCenterDto = {
  userId: string;
  tutorTrainingCenterId: string;
};

export type UpdateUserTutorTrainingCenterDto = {
  id: string;
  userId: string;
  tutorTrainingCenterId: string;
};

export type UserTutorTrainingCenterByUserIdDto = {
  id: string;
  userId: string;
  tutorTrainingCenterId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  tutorTrainingCenter: {
    id: string;
    tutor: Tutor;
    price: string;
    holidays: string[];
    like: number;
    trainingCenter: TrainingCenter;
  };
};

export function toJSON(trainingCenter: any) {
  return JSON.parse(JSON.stringify(trainingCenter));
}
