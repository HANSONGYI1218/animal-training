import { AnimalAge, AnimalSize, AnimalType, GenderType } from "@prisma/client";

interface AnimalEntityProps {
  id?: string;
  name: string;
  age: number;
  gender: GenderType;
  animal_type: AnimalType;
  animal_size: AnimalSize;
  animal_age: AnimalAge;
  breed: string;
  profile: string;
  additionalImgs: string[] | null;
  intakeDate: Date;
  remarks?: string[];
  userId?: string;
  corporationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AnimalEntity {
  private id?: string;
  private name: string;
  private age: number;
  private gender: GenderType;
  private animal_type: AnimalType;
  private animal_size: AnimalSize;
  private animal_age: AnimalAge;
  private breed: string;
  private profile: string;
  private additionalImgs: string[] | null;
  private intakeDate: Date;
  private remarks?: string[];
  private userId?: string;
  private corporationId: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    name,
    age,
    gender,
    animal_type,
    animal_size,
    animal_age,
    breed,
    profile,
    additionalImgs,
    intakeDate,
    remarks,
    userId,
    corporationId,
    createdAt,
    updatedAt,
  }: AnimalEntityProps) {
    this.id = id;
    this.name = name;
    this.age = age;
    this.gender = gender;
    this.animal_type = animal_type;
    this.animal_size = animal_size;
    this.animal_age = animal_age;
    this.breed = breed;
    this.profile = profile;
    this.additionalImgs = additionalImgs;
    this.intakeDate = intakeDate;
    this.remarks = remarks;
    this.userId = userId;
    this.corporationId = corporationId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
