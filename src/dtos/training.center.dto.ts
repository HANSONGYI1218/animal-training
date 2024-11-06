import { Corporation, Review } from "@prisma/client";

export type TrainingCenterDto = {
  id: string;
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  refundPolicys: string[];
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
  refundPolicys: string[];
  corporationId: string;
};

export type UpdateTrainingCenterDto = {
  id: string;
  name?: string;
  introduction?: string;
  profile?: string;
  additionalImgs?: string[];
  address?: string;
  refundPolicys?: string[];
};

export type GetTrainingCenterDto = {
  id: string;
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  refundPolicys: string[];
  corporationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TrainingCenterOnlyOneTutorDto = {
  id: string;
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  refundPolicys: string[];
  tutorTrainingCenter: {
    price: string;
    reviews: Review[];
    holidays: string[];
    like: number;
    tutor: {
      id: string;
      name: string;
      career: string;
      introduction: string;
    };
  };
  corporation: Corporation;
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
  refundPolicys: string[];
  tutorTrainingCenters: {
    tutor: {
      id: string;
      name: string;
      career?: string;
      profile_img?: string;
    };
  }[];
  corportaionId: string;
  corporation: Corporation;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(trainingCenter: any) {
  return JSON.parse(JSON.stringify(trainingCenter));
}

export function toGetDtoJSON(trainingCenter: any) {
  return {
    ...trainingCenter,
    tutorTrainingCenter:
      trainingCenter.tutorTrainingCenters.length > 0
        ? {
            price: trainingCenter.tutorTrainingCenters[0].price,
            holidays: trainingCenter.tutorTrainingCenters[0].holidays,
            like: trainingCenter.tutorTrainingCenters[0].like,
            reviews: trainingCenter.tutorTrainingCenters[0].reviews,
            tutor: {
              id: trainingCenter.tutorTrainingCenters[0].tutor.id,
              name: trainingCenter.tutorTrainingCenters[0].tutor.name,
              career: trainingCenter.tutorTrainingCenters[0].tutor.career,
              introduction:
                trainingCenter.tutorTrainingCenters[0].tutor.introduction,
            },
          }
        : null,
  };
}
