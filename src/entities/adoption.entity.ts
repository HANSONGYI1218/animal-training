import {
  AdoptionStatus,
  AdoptionStep,
  AnimalType,
  CurriculumStep,
  Prisma,
} from "@prisma/client";

interface AdoptionEntityProps {
  id?: string;
  status: AdoptionStatus;
  step: AdoptionStep;
  animal_type: AnimalType;
  curriculumStep: CurriculumStep;
  adoption_date: Date | null;
  abandon_date: Date | null;
  abandon_reason: string;
  educationForm: string[];
  trainingForm: string[];
  adoptionForm: string[];
  attendances: Prisma.JsonArray;
  adopterId: string;
  breederId: string | null;
  breederCorporationId: string | null;
  animalId: string;
  tutorTrainingCenterId: string | null;
  updatedAt?: Date;
}

export class AdoptionEntity {
  private id?: string;
  private status: AdoptionStatus;
  private step: AdoptionStep;
  private animal_type: AnimalType;
  private curriculumStep: CurriculumStep;
  private adoption_date: Date | null;
  private abandon_date: Date | null;
  private abandon_reason: string;
  private educationForm: string[];
  private trainingForm: string[];
  private adoptionForm: string[];
  private attendances: Prisma.JsonArray;
  private adopterId: string;
  private breederId: string | null;
  private breederCorporationId: string | null;
  private animalId: string;
  private tutorTrainingCenterId: string | null;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    status,
    step,
    animal_type,
    curriculumStep,
    adoption_date,
    abandon_date,
    abandon_reason,
    educationForm,
    trainingForm,
    adoptionForm,
    attendances = [],
    adopterId,
    breederId,
    breederCorporationId,
    animalId,
    tutorTrainingCenterId,
    updatedAt,
  }: AdoptionEntityProps) {
    this.id = id;
    this.status = status;
    this.step = step;
    this.animal_type = animal_type;
    this.curriculumStep = curriculumStep;
    this.adoption_date = adoption_date;
    this.abandon_date = abandon_date;
    this.abandon_reason = abandon_reason;
    this.educationForm = educationForm;
    this.trainingForm = trainingForm;
    this.adoptionForm = adoptionForm;
    this.attendances = attendances;
    this.adopterId = adopterId;
    this.breederId = breederId;
    this.breederCorporationId = breederCorporationId;
    this.animalId = animalId;
    this.tutorTrainingCenterId = tutorTrainingCenterId;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
