import { AnimalType, PriceType, Category, User } from "@prisma/client";

interface TrainingCenterEntityProps {
  id?: string;
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  holidays: string[];
  price: number;
  like: number;
  refundPolicys: string[];
  tutorId: string;
  corporationId: string;
  updatedAt?: Date;
}

export class TrainingCenterEntity {
  private id: string;
  private name: string;
  private introduction: string;
  private profile: string;
  private additionalImgs: string[];
  private address: string;
  private holidays: string[];
  private price: number;
  private like: number;
  private refundPolicys: string[];
  private tutorId: string;
  private corporationId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    name,
    introduction,
    profile,
    additionalImgs,
    address,
    holidays,
    price,
    like,
    refundPolicys,
    tutorId,
    corporationId,
    updatedAt,
  }: TrainingCenterEntityProps) {
    this.id = id ?? "";
    this.name = name;
    this.introduction = introduction;
    this.profile = profile;
    this.additionalImgs = additionalImgs;
    this.address = address;
    this.holidays = holidays;
    this.price = price;
    this.like = like;
    this.refundPolicys = refundPolicys;
    this.tutorId = tutorId;
    this.corporationId = corporationId;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
