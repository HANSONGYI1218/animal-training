import {
  IsNotEmptyDate,
  IsNotEmptyString,
} from "@/validate-decoration/validate-deco";
import {
  Adoption,
  GenderType,
  Lecture,
  LectureBookmark,
  Tutor,
  TutorBookmark,
} from "@prisma/client";
import { IsEnum } from "class-validator";

export class CreateUserDto {
  @IsNotEmptyString()
  name!: string;

  @IsNotEmptyString()
  email!: string;

  @IsNotEmptyString()
  address!: string;

  @IsNotEmptyString()
  phoneNumber!: string;

  @IsNotEmptyString()
  registrationNumber!: string;

  @IsNotEmptyString()
  nickname!: string;

  @IsNotEmptyDate()
  birthday!: Date;

  @IsEnum(GenderType, {
    message: "gender must be a valid gender value",
  })
  gender!: GenderType;
}

export class UpdateUserDto {
  email!: string;
  address!: string;
  phoneNumber!: string;
  nickname!: string;
}

export class GetUserDto {
  id!: string;
  name!: string;
  email!: string;
  address!: string;
  phoneNumber!: string;
  registrationNumber!: string;
  nickname!: string;
  birthday!: Date;
  gender!: GenderType;
  lectureBookmarks!: {
    id: string;
    lecture: Lecture;
  }[];
  tutorBookmarks!: {
    id: string;
    tutor: Tutor;
  }[];
  isNewNews_SMS!: boolean;
  isNotice_SMS!: boolean;
  isPromotion_SMS!: boolean;
  isNewNews_Email!: boolean;
  isNotice_Email!: boolean;
  isPromotion_Email!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}

export class GetUserAdoptionRecordDto {
  id!: string;
  name!: string;
  email!: string;
  address!: string;
  phoneNumber!: string;
  registrationNumber!: string;
  nickname!: string;
  birthday!: Date;
  gender!: GenderType;
  adopterAdoptions!: Adoption[] | null;
  createdAt!: Date;
  updatedAt!: Date;
}
