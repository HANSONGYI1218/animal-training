import {
  AnimalType,
  AnimalSize,
  AnimalAge,
  CurriculumCategory,
} from "@prisma/client";

interface CurriculumLectureEntityProps {
  id?: string;
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
  animal_sizes: AnimalSize[];
  animal_ages: AnimalAge[];
  category: CurriculumCategory;
  thumbnailPath: string;
  videoUrl: string;
  videoTime: string;
  tutorId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CurriculumLectureEntity {
  private id?: string;
  private index: number;
  private title: string;
  private content: string;
  private animal_type: AnimalType;
  private animal_sizes: AnimalSize[];
  private animal_ages: AnimalAge[];
  private category: CurriculumCategory;
  private thumbnailPath: string;
  private videoUrl: string;
  private videoTime: string;
  private tutorId: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    index,
    title,
    content,
    animal_type,
    animal_sizes,
    animal_ages,
    category,
    thumbnailPath,
    videoUrl,
    videoTime,
    tutorId,
    createdAt,
    updatedAt,
  }: CurriculumLectureEntityProps) {
    this.id = id;
    this.index = index;
    this.title = title;
    this.content = content;
    this.animal_type = animal_type;
    this.animal_sizes = animal_sizes;
    this.animal_ages = animal_ages;
    this.category = category;
    this.thumbnailPath = thumbnailPath;
    this.videoUrl = videoUrl;
    this.videoTime = videoTime;
    this.tutorId = tutorId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
