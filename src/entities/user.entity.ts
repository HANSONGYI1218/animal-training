import { CurriculumStep, GenderType } from "@prisma/client";

interface UserEntityProps {
  id?: string;
  name: string;
  email: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  password: string;
  phoneNumber: string;
  registrationNumber: string;
  nickname: string;
  birthday: Date | null;
  gender: GenderType;
  isNewNews_SMS?: boolean;
  isNotice_SMS?: boolean;
  isPromotion_SMS?: boolean;
  isNewNews_Email?: boolean;
  isNotice_Email?: boolean;
  isPromotion_Email?: boolean;
  lastVideoIndexs: number[];
  lastVideoTimes: number[];
  curriculumSteps: CurriculumStep[];
  updatedAt?: Date;
}

export class UserEntity {
  private id?: string;
  private name: string;
  private email: string;
  private zipCode: string;
  private address: string;
  private detailAddress: string;
  private password: string;
  private phoneNumber: string;
  private registrationNumber: string;
  private nickname: string;
  private birthday: Date | null;
  private gender: GenderType;
  private isNewNews_SMS: boolean;
  private isNotice_SMS: boolean;
  private isPromotion_SMS: boolean;
  private isNewNews_Email: boolean;
  private isNotice_Email: boolean;
  private isPromotion_Email: boolean;
  private lastVideoIndexs: number[];
  private lastVideoTimes: number[];
  private curriculumSteps: CurriculumStep[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    name,
    email,
    zipCode,
    address,
    detailAddress,
    password,
    phoneNumber,
    registrationNumber,
    nickname,
    birthday,
    gender,
    isNewNews_SMS = true,
    isNotice_SMS = true,
    isPromotion_SMS = true,
    isNewNews_Email = true,
    isNotice_Email = true,
    isPromotion_Email = true,
    lastVideoIndexs,
    lastVideoTimes,
    curriculumSteps,
    updatedAt,
  }: UserEntityProps) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.zipCode = zipCode;
    this.address = address;
    this.detailAddress = detailAddress;
    this.phoneNumber = phoneNumber;
    this.registrationNumber = registrationNumber;
    this.nickname = nickname;
    this.birthday = birthday;
    this.gender = gender;
    this.isNewNews_SMS = isNewNews_SMS;
    this.isNotice_SMS = isNotice_SMS;
    this.isPromotion_SMS = isPromotion_SMS;
    this.isNewNews_Email = isNewNews_Email;
    this.isNotice_Email = isNotice_Email;
    this.isPromotion_Email = isPromotion_Email;
    this.lastVideoIndexs = lastVideoIndexs;
    this.lastVideoTimes = lastVideoTimes;
    this.curriculumSteps = curriculumSteps;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
