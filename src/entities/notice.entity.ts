import { AnimalType, PriceType, Category, User } from "@prisma/client";

interface NoticeEntityProps {
  id?: string;
  title: string;
  content: string;
  image: string;
  attachments: string[];
  isFixed: boolean;
  index: number;
  updatedAt?: Date;
}

export class NoticeEntity {
  private id: string;
  private title: string;
  private content: string;
  private image: string;
  private attachments: string[];
  private isFixed: boolean;
  private index: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    title,
    content,
    image,
    attachments,
    isFixed,
    index,
    updatedAt,
  }: NoticeEntityProps) {
    this.id = id ?? "";
    this.title = title;
    this.content = content;
    this.image = image;
    this.attachments = attachments;
    this.isFixed = isFixed;
    this.index = index;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
