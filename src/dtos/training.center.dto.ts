import { AnimalType, Corporation, Review } from "@prisma/client";

export type TrainingCenterDto = {
  id: string;
  name: string;
  introduction: string;
  profile_images: string[];
  phoneNumber: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  refundPolicys: string[];
  corporationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTrainingCenterDto = {
  name: string;
  introduction: string;
  profile_images: string[];
  phoneNumber: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  refundPolicys: string[];
  corporationId: string;
};

export type UpdateTrainingCenterDto = {
  id: string;
  name?: string;
  introduction?: string;
  profile_images?: string[];
  phoneNumber?: string;
  zipCode?: string;
  address?: string;
  detailAddress?: string;
  refundPolicys?: string[];
};

export type GetTrainingCenterDto = {
  id: string;
  name: string;
  introduction: string;
  profile_images: string[];
  phoneNumber: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  refundPolicys: string[];
  corporationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetTrainingCenterDetailDto = {
  id: string;
  name: string;
  introduction: string;
  profile_images: string[];
  phoneNumber: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  refundPolicys: string[];
  tutorTrainingCenters: {
    id: string;
    price: string;
    holidays: string[];
    like: number;
    reviews: Review[];
    animal_types: AnimalType[];
    tutor: {
      id: string;
      name: string;
      career?: string;
      profile_img?: string;
      introduction?: string;
    };
  }[];
  corporationId: string;
  corporation: Corporation;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(trainingCenter: any) {
  return JSON.parse(JSON.stringify(trainingCenter));
}
