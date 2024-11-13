import {
  AdoptionStatus,
  AdoptionStep,
  Animal,
  Corporation,
  User,
} from "@prisma/client";

export type CreateAdoptionDto = {
  invite_email: string;
  breederId?: string;
  breederCorporationId?: string;
};

export type UpdateAdoptionDto = {
  id: string;
  adoption_date?: Date;
  abandon_date?: Date;
  status?: AdoptionStatus;
  step?: AdoptionStep;
  abandon_reason?: string;
};

export type GetAdoptionDto = {
  id?: string;
  invite_email: string;
  adoption_date: Date;
  abandon_date: Date;
  status: AdoptionStatus;
  step: AdoptionStep;
  abandon_reason: string;
  adopterId: string;
  breederId?: string;
  breederCorporationId?: string;
  educationForm: string[];
  trainingForm: string[];
  adoptionForm: string[];
  animalId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AdoptionTableDto = {
  //입양자 리스트 표에서 사용
  id: string;
  invite_email: string;
  status: AdoptionStatus;
  step: AdoptionStep;
  adopter: User;
  breeder: User | null;
  breederCorporation: Corporation | null;
  animalId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type AdoptionAgreementDto = {
  id: string;
  educationForm: string[];
  trainingForm: string[];
  adoptionForm: string[];
};

export type GetAdoptionWithAnimalDto = {
  //입양기록에서 사용
  id: string;
  adoption_date: Date;
  abandon_date: Date;
  status: AdoptionStatus;
  abandon_reason: string;
  adopterId: string;
  breederId: string | null;
  breederCorporationId: string | null;
  animal: Animal;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(adoption: any) {
  return JSON.parse(JSON.stringify(adoption));
}
