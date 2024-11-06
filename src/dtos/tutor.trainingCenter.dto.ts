export type TutorTrainingCenterDto = {
  tutorId: string;
  trainingCenterId: string;
  price: string;
  holidays: string[];
  like: number;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTutorTrainingCenterDto = {
  tutorId: string;
  trainingCenterId: string;
  price: string;
  holidays: string[];
};

export type UpdateTutorTrainingCenterDto = {
  tutorId: string;
  trainingCenterId: string;
  price?: string;
  holidays?: string[];
  like?: number;
};

export function toJSON(trainingCenter: any) {
  return JSON.parse(JSON.stringify(trainingCenter));
}
