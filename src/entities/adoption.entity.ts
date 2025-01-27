import { AdoptionStatus, AdoptionStep } from "@prisma/client";

interface AdoptionEntityProps {
  id?: string;
  status: AdoptionStatus;
  step: AdoptionStep;
  adoption_date?: Date;
  abandon_date?: Date;
  abandon_reason?: string;
  applymentFormUrl?: string;
  learningAgreementUrl?: string;
  trainingAgreementUrl?: string;
  adopter_adoptionFormUrl?: string;
  breeder_adoptionFormUrl?: string;
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
  private applymentFormUrl?: string;
  private learningAgreementUrl?: string;
  private trainingAgreementUrl?: string;
  private adopter_adoptionFormUrl?: string;
  private breeder_adoptionFormUrl?: string;
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
    applymentFormUrl,
    learningAgreementUrl,
    trainingAgreementUrl,
    adopter_adoptionFormUrl,
    breeder_adoptionFormUrl,
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
    this.adoption_date = adoption_date;
    this.abandon_date = abandon_date;
    this.abandon_reason = abandon_reason;
    this.applymentFormUrl = applymentFormUrl;
    this.learningAgreementUrl = learningAgreementUrl;
    this.trainingAgreementUrl = trainingAgreementUrl;
    this.adopter_adoptionFormUrl = adopter_adoptionFormUrl;
    this.breeder_adoptionFormUrl = breeder_adoptionFormUrl;
    this.adopterId = adopterId;
    this.breederId = breederId;
    this.breederCorporationId = breederCorporationId;
    this.animalId = animalId;
    this.tutorTrainingCenterId = tutorTrainingCenterId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
