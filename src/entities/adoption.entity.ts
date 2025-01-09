import { AdoptionStatus, AdoptionStep } from "@prisma/client";

interface AdoptionEntityProps {
  id?: string;
  status: AdoptionStatus;
  step: AdoptionStep;
  adoption_date?: Date;
  abandon_date?: Date;
  abandon_reason?: string;
  educationForm?: string[];
  trainingForm?: string[];
  adoptionForm?: string[];
  adopterId: string;
  breederId?: string;
  breederCorporationId?: string;
  animalId: string;
  tutorTrainingCenterId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class AdoptionEntity {
  private id?: string;
  private status: AdoptionStatus;
  private step: AdoptionStep;
  private adoption_date?: Date;
  private abandon_date?: Date;
  private abandon_reason?: string;
  private educationForm?: string[];
  private trainingForm?: string[];
  private adoptionForm?: string[];
  private adopterId: string;
  private breederId?: string;
  private breederCorporationId?: string;
  private animalId: string;
  private tutorTrainingCenterId?: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    status,
    step,
    adoption_date,
    abandon_date,
    abandon_reason,
    educationForm,
    trainingForm,
    adoptionForm,
    adopterId,
    breederId,
    breederCorporationId,
    animalId,
    tutorTrainingCenterId,
    createdAt,
    updatedAt,
  }: AdoptionEntityProps) {
    this.id = id;
    this.status = status;
    this.step = step;
    this.adoption_date = adoption_date ?? undefined;
    this.abandon_date = abandon_date ?? undefined;
    this.abandon_reason = abandon_reason ?? undefined;
    this.educationForm = educationForm ?? undefined;
    this.trainingForm = trainingForm ?? undefined;
    this.adoptionForm = adoptionForm ?? undefined;
    this.adopterId = adopterId;
    this.breederId = breederId ?? undefined;
    this.breederCorporationId = breederCorporationId ?? undefined;
    this.animalId = animalId;
    this.tutorTrainingCenterId = tutorTrainingCenterId ?? undefined;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
