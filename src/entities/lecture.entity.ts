import { AnimalType, PriceType, Category } from "@prisma/client";

interface LectureEntityProps {
  id?: string;
  title: string;
  content: string;
  animal_type: AnimalType;
  price_type: PriceType;
  category: Category;
  thumbnailPath: string;
  videoUrl: string;
  like: number;
  tags: string[];
  tutorId: string;
  corporationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class LectureEntity {
  private id?: string;
  private title: string;
  private content: string;
  private animal_type: AnimalType;
  private price_type: PriceType;
  private category: Category;
  private thumbnailPath: string;
  private videoUrl: string;
  private like: number;
  private tags: string[];
  private tutorId: string;
  private corporationId: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    title,
    content,
    animal_type,
    price_type,
    category,
    thumbnailPath,
    videoUrl,
    like,
    tags,
    tutorId,
    corporationId,
    createdAt,
    updatedAt,
  }: LectureEntityProps) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.animal_type = animal_type;
    this.price_type = price_type;
    this.category = category;
    this.thumbnailPath = thumbnailPath;
    this.videoUrl = videoUrl;
    this.like = like;
    this.tags = tags;
    this.tutorId = tutorId;
    this.corporationId = corporationId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
