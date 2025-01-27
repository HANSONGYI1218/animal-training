import { AnimalType } from "@prisma/client";

export type TutorTrainingCenterDto = {
  id: string;
  tutorId: string;
  trainingCenterId: string;
  price: string;
  holidays: string[];
  animal_types: AnimalType[];
  like: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTutorTrainingCenterDto = {
  tutorId: string;
  trainingCenterId: string;
  price: string;
  holidays: string[];
  animal_types: AnimalType[];
};

export type UpdateTutorTrainingCenterDto = {
  id: string;
  tutorId: string;
  trainingCenterId: string;
  price?: string;
  holidays?: string[];
  animal_types?: AnimalType[];
  like?: number;
};

export function toJSON(trainingCenter: any) {
  return JSON.parse(JSON.stringify(trainingCenter));
}
