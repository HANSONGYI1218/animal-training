import { AnimalType, CurriculumCategory } from "@prisma/client";

interface CurriculumTrainingEntityProps {
  id?: string;
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
  category: CurriculumCategory;
  trainingTime: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CurriculumTrainingEntity {
  private id?: string;
  private index: number;
  private title: string;
  private content: string;
  private animal_type: AnimalType;
  private category: CurriculumCategory;
  private trainingTime: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    index,
    title,
    content,
    animal_type,
    category,
    trainingTime,
    createdAt,
    updatedAt,
  }: CurriculumTrainingEntityProps) {
    this.id = id;
    this.index = index;
    this.title = title;
    this.content = content;
    this.animal_type = animal_type;
    this.category = category;
    this.trainingTime = trainingTime;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
