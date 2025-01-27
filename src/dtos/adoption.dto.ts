import {
  AdoptionStatus,
  AdoptionStep,
  Animal,
  Corporation,
  TutorTrainingCenter,
  User,
  UserCurriculum,
} from "@prisma/client";

export type AdoptionDto = {
  id?: string;
  status: AdoptionStatus;
  step: AdoptionStep;
  adoption_date: Date | null;
  abandon_date: Date | null;
  abandon_reason: string;
  applymentFormUrl: string;
  learningAgreementUrl: string;
  trainingAgreementUrl: string;
  adopter_adoptionFormUrl: string;
  breeder_adoptionFormUrl: string;
  adopterId: string;
  breederId: string;
  breederCorporationId: string;
  animalId: string;
  tutorTrainingCenterId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateAdoptionDto = {
  status: AdoptionStatus;
  step: AdoptionStep;
  adopterId: string;
  breederId?: string;
  breederCorporationId?: string;
  animalId: string;
};

export type UpdateAdoptionDto = {
  id: string;
  status?: AdoptionStatus;
  step?: AdoptionStep;
  adoption_date?: Date;
  abandon_date?: Date;
  abandon_reason?: string;
  applymentFormUrl?: string;
  learningAgreementUrl?: string;
  trainingAgreementUrl?: string;
  adopter_adoptionFormUrl?: string;
  breeder_adoptionFormUrl?: string;
  adopterId?: string;
};

export type GetAdoptionDto = {
  id?: string;
  status: AdoptionStatus;
  step: AdoptionStep;
  adoption_date: Date | null;
  abandon_date: Date | null;
  abandon_reason: string;
  applymentFormUrl: string;
  learningAgreementUrl: string;
  trainingAgreementUrl: string;
  adopter_adoptionFormUrl: string;
  breeder_adoptionFormUrl: string;
  adopterId: string;
  breederId: string;
  breederCorporationId: string;
  animalId: string;
  tutorTrainingCenterId: string;
  adopter: User;
  breeder: User;
  breederCorporation: Corporation;
  animal: Animal;
  tutorTrainingCenter: TutorTrainingCenter;
  userCurriculum: UserCurriculum;
  createdAt: Date;
  updatedAt: Date;
};

export type GetCurriculumDto = {
  id?: string;
  status: AdoptionStatus;
  step: AdoptionStep;
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
  animal: Animal;
  createdAt: Date;
  updatedAt: Date;
};

export type AdoptionAgreementsDto = {
  id: string;
  applymentFormUrl: string;
  learningAgreementUrl: string;
  trainingAgreementUrl: string;
  adopter_adoptionFormUrl: string;
  breeder_adoptionFormUrl: string;
};

export type GetAdoptionWithAnimalDto = {
  //입양기록에서 사용
  id: string;
  adoption_date: Date;
  abandon_date: Date;
  status: AdoptionStatus;
  abandon_reason: string;
  adopterId: string;
  breederId: string;
  breederCorporationId: string;
  adopter: User;
  breeder: User;
  breederCorporation: Corporation;
  animal: Animal;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(adoption: any) {
  return JSON.parse(JSON.stringify(adoption));
}
