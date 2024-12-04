import {
  Adoption,
  AdoptionStatus,
  AdoptionStep,
  AnimalType,
  CurriculumStep,
  GenderType,
  Lecture,
  Tutor,
} from "@prisma/client";

export type UserDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  registrationNumber: string;
  nickname: string;
  birthday: Date;
  gender: GenderType;
  isNewNews_SMS: boolean;
  isNotice_SMS: boolean;
  isPromotion_SMS: boolean;
  isNewNews_Email: boolean;
  isNotice_Email: boolean;
  isPromotion_Email: boolean;
  lastVideoIndexs: number[];
  lastVideoTimes: number[];
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserDto = {
  email?: string;
  password?: string;
  name?: string;
  phoneNumber?: string;
  birthday?: Date;
  gender: GenderType;
  zipCode?: string;
  address?: string;
  detailAddress?: string;
};

export type UpdateUserDto = {
  id: string;
  email?: string;
  password?: string;
  zipCode?: string;
  address?: string;
  detailAddress?: string;
  phoneNumber?: string;
  nickname?: string;
  isNewNews_SMS?: boolean;
  isNotice_SMS?: boolean;
  isPromotion_SMS?: boolean;
  isNewNews_Email?: boolean;
  isNotice_Email?: boolean;
  isPromotion_Email?: boolean;
  lastVideoIndex?: number;
  lastVideoTime?: number;
};

export type GetUserDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  registrationNumber: string;
  nickname: string;
  birthday: Date;
  gender: GenderType;
  lectureBookmarks: {
    id: string;
    lecture: Lecture;
  }[];
  tutorBookmarks: {
    id: string;
    tutor: Tutor;
  }[];
  isNewNews_SMS: boolean;
  isNotice_SMS: boolean;
  isPromotion_SMS: boolean;
  isNewNews_Email: boolean;
  isNotice_Email: boolean;
  isPromotion_Email: boolean;
  lastVideoIndexs: number[];
  lastVideoTimes: number[];
  createdAt: Date;
  updatedAt: Date;
};

export type GetUserByCurriculumDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  registrationNumber: string;
  nickname: string;
  birthday: Date;
  gender: GenderType;
  adopterAdoptions: {
    id: string;
    status: AdoptionStatus;
    step: AdoptionStep;
    animal_type: AnimalType;
    curriculumStep: CurriculumStep;
  }[];
  lastVideoIndexs: number[];
  lastVideoTimes: number[];
  createdAt: Date;
  updatedAt: Date;
};

export type GetUserAdoptionRecordDto = {
  id: string;
  name: string;
  email: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  registrationNumber: string;
  nickname: string;
  birthday: Date;
  gender: GenderType;
  adopterAdoptions: Adoption[] | null;
  lastVideoIndexs: string[];
  lastVideoTimes: number[];
  createdAt: Date;
  updatedAt: Date;
};

export type GetUserSearchDto = {
  id: string;
  name: string;
  email: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  nickname: string;
  birthday: Date;
  gender: GenderType;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
