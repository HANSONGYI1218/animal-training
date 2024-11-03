import { AnimalType, CurriculumCategory } from "@prisma/client";

interface CurriculumLectureEntityProps {
  id?: string;
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
  category: CurriculumCategory;
  thumbnailPath: string;
  videoUrl: string;
  videoTime: string;
  tutorId: string;
  updatedAt?: Date;
}

export class CurriculumLectureEntity {
  private id: string;
  private index: number;
  private title: string;
  private content: string;
  private animal_type: AnimalType;
  private category: CurriculumCategory;
  private thumbnailPath: string;
  private videoUrl: string;
  private videoTime: string;
  private tutorId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    index,
    title,
    content,
    animal_type,
    category,
    thumbnailPath,
    videoUrl,
    videoTime,
    tutorId,
    updatedAt,
  }: CurriculumLectureEntityProps) {
    this.id = id ?? "";
    this.index = index;
    this.title = title;
    this.content = content;
    this.animal_type = animal_type;
    this.category = category;
    this.thumbnailPath = thumbnailPath;
    this.videoUrl = videoUrl;
    this.videoTime = videoTime;
    this.tutorId = tutorId;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
