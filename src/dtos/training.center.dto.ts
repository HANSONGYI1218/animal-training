import { Corporation, Review, Tutor } from "@prisma/client";

export type TrainingCenterDto = {
  id: string;
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  holidays: string[];
  price: number;
  like: number;
  refundPolicys: string[];
  tutorId: string;
  corporationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTrainingCenterDto = {
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  holidays: string[];
  price: number;
  like: number;
  refundPolicys: string[];
  tutorId: string;
  corporationId: string;
};

export type UpdateTrainingCenterDto = {
  id: string;
  name?: string;
  introduction?: string;
  profile?: string;
  additionalImgs?: string[];
  address?: string;
  holidays?: string[];
  price?: number;
  like?: number;
  refundPolicys?: string[];
  tutorId?: string;
  corporationId?: string;
};

export type GetTrainingCenterDto = {
  id: string;
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  holidays: string[];
  price: number;
  like: number;
  refundPolicys: string[];
  _count: {
    reviews: number;
  };
  tutorId: string;
  corporationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type GetTrainingCenterDetailDto = {
  id: string;
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  holidays: string[];
  price: number;
  like: number;
  refundPolicys: string[];
  reviews: Review[];
  tutor: Tutor;
  corporation: Corporation;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
