import { GenderType } from "@prisma/client";

interface AnimalEntityProps {
  id?: string;
  name: string;
  age: number;
  gender: GenderType;
  breed: string;
  profile: string;
  additionalImgs: string[] | null;
  intakeDate: Date;
  remarks?: string[];
  userId?: string;
  corporationId: string;
  updatedAt?: Date;
}

export class AnimalEntity {
  private id?: string;
  private name: string;
  private age: number;
  private gender: GenderType;
  private breed: string;
  private profile: string;
  private additionalImgs: string[] | null;
  private intakeDate: Date;
  private remarks?: string[];
  private userId?: string;
  private corporationId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    name,
    age,
    gender,
    breed,
    profile,
    additionalImgs,
    intakeDate,
    remarks,
    userId,
    corporationId,
    updatedAt,
  }: AnimalEntityProps) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.breed = breed;
    this.profile = profile;
    this.additionalImgs = additionalImgs;
    this.intakeDate = intakeDate;
    this.remarks = remarks;
    this.userId = userId;
    this.corporationId = corporationId;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
