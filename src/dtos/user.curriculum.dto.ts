import { AnimalType } from "@/types/tyeps.all";
import {
  AnimalSize,
  AnimalAge,
  CurriculumStep,
  GenderType,
  OccupationType,
} from "@prisma/client";
import { InputJsonValue } from "@prisma/client/runtime/library";

export type UserCurriculumDto = {
  id: string;
  lastVideoId: string;
  lastVideoTime: string;
  curriculumStep: CurriculumStep;
  attendances: InputJsonValue[];
  userId: string;
  adoptionId: string;
  tutorTrainingCenterId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserCurriculumDto = {
  curriculumStep: CurriculumStep;
  userId: string;
  adoptionId: string;
};

export type UpdateUserCurriculumDto = {
  id: string;
  lastVideoId?: string;
  lastVideoTime?: string;
  curriculumStep?: CurriculumStep;
  attendances?: InputJsonValue[];
  userId?: string;
  adoptionId?: string;
  tutorTrainingCenterId?: string;
};

export type GetUserCurriculumDto = {
  id: string;
  lastVideoId: string;
  lastVideoTime: string;
  curriculumStep: CurriculumStep;
  attendances: InputJsonValue[];
  userId: string;
  user: {
    name: string;
    email: string;
    zipCode: string;
    address: string;
    detailAddress: string;
    phoneNumber: string;
    birthday: string;
    gender: string;
  };
  adoptionId: string;
  adoption: {
    status: string;
    step: string;
    learningAgreementUrl: string;
    trainingAgreementUrl: string;
    adopter_adoptionFormUrl: string;
    breeder_adoptionFormUrl: string;
    animal: {
      id: string;
      name: string;
      age: number;
      gender: GenderType;
      animal_type: AnimalType;
      animal_size: AnimalSize;
      animal_age: AnimalAge;
    };
  };
  tutorTrainingCenterId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCurriculumWithTutorTrainingCenterDto = {
  id: string;
  lastVideoId: string;
  lastVideoTime: string;
  curriculumStep: CurriculumStep;
  attendances: InputJsonValue[];
  userId: string;
  adoptionId: string;
  tutorTrainingCenter: {
    id: string;
    tutor: {
      id: string;
      name: string;
      introduction: string;
      career: string;
      profile_img: string;
      occupation: OccupationType;
    };
    trainingCenter: {
      id: string;
      name: string;
      introduction: string;
      profile: string;
      zipCode: string;
      address: string;
      detailAddress: string;
      phoneNumber: string;
      refundPolicys: string;
    };
    price: string;
    holidays: string[];
    animal_types: AnimalType[];
    like: number;
  };
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(userCurriculum: any) {
  return JSON.parse(JSON.stringify(userCurriculum));
}
