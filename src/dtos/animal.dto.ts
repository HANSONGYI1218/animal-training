import {
  Adoption,
  AnimalType,
  Corporation,
  GenderType,
  User,
} from "@prisma/client";

export type AnimalDto = {
  id?: string;
  name: string;
  age: number;
  gender: GenderType;
  animalType: AnimalType;
  breed: string;
  profile: string;
  additionalImgs: string[];
  intakeDate: Date;
  remarks: string[];
  userId: string;
  corporationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAnimalDto = {
  corporationId: string;
  name: string;
  age: number;
  gender: GenderType;
  animalType: AnimalType;
  breed: string;
  profile: string;
  additionalImgs: string[];
  intakeDate: Date;
  remarks?: string[];
};

export type UpdateAnimalDto = {
  id: string;
  name?: string;
  age?: number;
  gender?: GenderType;
  animalType?: AnimalType;
  breed?: string;
  profile?: string;
  additionalImgs?: string[];
  intakeDate?: Date;
  remarks?: string[];
  userId?: string;
  corporationId?: string;
};

export type GetAnimalDto = {
  id?: string;
  name: string;
  age: number;
  gender: GenderType;
  animalType: AnimalType;
  breed: string;
  profile: string;
  additionalImgs: string[];
  intakeDate: Date;
  remarks: string[];
  userId: string;
  corporationId: string;
  user: User;
  adoption: Adoption;
  corporation: Corporation;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(Animal: any) {
  return JSON.parse(JSON.stringify(Animal));
}
