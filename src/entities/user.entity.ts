import { GenderType } from "@prisma/client";

interface UserEntityProps {
  id?: string;
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  registrationNumber: string;
  nickname: string;
  birthday: Date;
  gender: GenderType;
  isNewNews_SMS?: boolean;
  isNotice_SMS?: boolean;
  isPromotion_SMS?: boolean;
  isNewNews_Email?: boolean;
  isNotice_Email?: boolean;
  isPromotion_Email?: boolean;
  updatedAt?: Date;
}

export class UserEntity {
  private id: string;
  private name: string;
  private email: string;
  private address: string;
  private phoneNumber: string;
  private registrationNumber: string;
  private nickname: string;
  private birthday: Date;
  private gender: GenderType;
  private isNewNews_SMS: boolean;
  private isNotice_SMS: boolean;
  private isPromotion_SMS: boolean;
  private isNewNews_Email: boolean;
  private isNotice_Email: boolean;
  private isPromotion_Email: boolean;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    name,
    email,
    address,
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
    updatedAt,
  }: UserEntityProps) {
    this.id = id ?? "";
    this.name = name;
    this.email = email;
    this.address = address;
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
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
