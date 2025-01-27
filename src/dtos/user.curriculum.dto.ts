import { AnimalType } from "@/types/tyeps.all";
import {
  AnimalSize,
  AnimalAge,
  CurriculumStep,
  GenderType,
} from "@prisma/client";

export type UserCurriculumDto = {
  id: string;
  lastVideoId: string;
  lastVideoTime: string;
  curriculumStep: CurriculumStep;
  //   attendances?: Json[];
  userId: string;
  adoptionId: string;
  tutorTrainingCenterId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserCurriculumDto = {
  curriculumStep: CurriculumStep;
  //   attendances?: Json[];
  userId: string;
  adoptionId: string;
};

export type UpdateUserCurriculumDto = {
  id: string;
  lastVideoId?: string;
  lastVideoTime?: string;
  curriculumStep?: CurriculumStep;
  //   attendances?: Json[];
  userId?: string;
  adoptionId?: string;
  tutorTrainingCenterId?: string;
};

export type GetUserCurriculumDto = {
  id: string;
  lastVideoId: string;
  lastVideoTime: string;
  curriculumStep: CurriculumStep;
  //   attendances?: Json[];
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

export function toJSON(userCurriculum: any) {
  return JSON.parse(JSON.stringify(userCurriculum));
}
