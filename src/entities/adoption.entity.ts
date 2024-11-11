import { AdoptionStatus, AdoptionStep } from "@prisma/client";

interface AdoptionEntityProps {
  id?: string;
  adoption_date: Date | null;
  abandon_date: Date | null;
  status: AdoptionStatus;
  step: AdoptionStep;
  abandon_reason: string | null;
  adopterId: string;
  breederId?: string;
  breederCorporationId?: string;
  educationForm: string[];
  trainingForm: string[];
  adoptionForm: string[];
  animalId: string | null;
  updatedAt?: Date;
}

export class AdoptionEntity {
  private id?: string;
  private adoption_date: Date | null;
  private abandon_date: Date | null;
  private status: AdoptionStatus;
  private step: AdoptionStep;
  private abandon_reason: string | null;
  private adopterId: string;
  private breederId?: string;
  private breederCorporationId?: string;
  private animalId: string | null;
  private educationForm: string[];
  private trainingForm: string[];
  private adoptionForm: string[];
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    adoption_date,
    abandon_date,
    status,
    step,
    abandon_reason,
    adopterId,
    breederId,
    breederCorporationId,
    animalId,
    educationForm,
    trainingForm,
    adoptionForm,
    updatedAt,
  }: AdoptionEntityProps) {
    this.id = id;
    this.adoption_date = adoption_date;
    this.abandon_date = abandon_date;
    this.status = status;
    this.step = step;
    this.abandon_reason = abandon_reason;
    this.adopterId = adopterId;
    this.breederId = breederId;
    this.breederCorporationId = breederCorporationId;
    this.animalId = animalId;
    this.educationForm = educationForm;
    this.trainingForm = trainingForm;
    this.adoptionForm = adoptionForm;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
