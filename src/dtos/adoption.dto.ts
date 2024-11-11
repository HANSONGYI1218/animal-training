import {
  AdoptionStatus,
  AdoptionStep,
  Animal,
  Corporation,
  User,
} from "@prisma/client";

export type CreateAdoptionDto = {
  status: AdoptionStatus;
  step: AdoptionStep;
  adopterId: string;
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
  id: string;
  adoption_date: Date;
  abandon_date: Date;
  status: AdoptionStatus;
  step: AdoptionStep;
  abandon_reason: string;
  adopterId: string;
  breederId?: string;
  breederCorporationId?: string;
  animalId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type AdoptionTableDto = {
  //입양자 리스트 표에서 사용
  id: string;
  status: AdoptionStatus;
  step: AdoptionStep;
  adopter: User;
  breeder: User | null;
  breederCorporation: Corporation | null;
  animalId: string | null;
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
