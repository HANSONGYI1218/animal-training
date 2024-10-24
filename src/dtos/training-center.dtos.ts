import {
  IsNotEmptyNumber,
  IsNotEmptyString,
} from "@/validate-decoration/validate-deco";
import { Corporation, Review, Tutor } from "@prisma/client";

export class CreateTrainingCenterDto {
  @IsNotEmptyString()
  name!: string;

  @IsNotEmptyString()
  introduction!: string;

  @IsNotEmptyString()
  profile!: string;

  additionalImgs!: string[];

  @IsNotEmptyString()
  address!: string;

  holidays!: string[];

  @IsNotEmptyNumber()
  price!: number;

  like!: number;

  refundPolicys!: string[];
}

export class GetTrainingCenterDto {
  id!: string;
  name!: string;
  introduction!: string;
  profile!: string;
  additionalImgs!: string[];
  address!: string;
  holidays!: string[];
  price!: number;
  like!: number;
  refundPolicys!: string[];
  _count!: {
    reviews: number;
  };
  tutorId!: string;
  corporationId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class GetTrainingCenterDetailDto {
  id!: string;
  name!: string;
  introduction!: string;
  profile!: string;
  additionalImgs!: string[];
  address!: string;
  holidays!: string[];
  price!: number;
  like!: number;
  refundPolicys!: string[];
  reviews!: Review[];
  tutor!: Tutor;
  corporation!: Corporation;
  createdAt!: Date;
  updatedAt!: Date;
}
