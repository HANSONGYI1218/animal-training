import { OccupationType } from "@/types/tyeps.all";
import { CorporationAccessStatus } from "@prisma/client";
import { GetTrainingCenterDetailDto } from "./training.center.dto";
import { GetTutorWithLecture } from "./tutor.dto";

export type CreateCorporationDto = {
  owner_name: string;
  corporation_name: string;
  address: string;
  phoneNumber: string;
  email: string;
  business_number: string;
};

export type UpdateCorporationDto = {
  id: string;
  owner_name?: string;
  corporation_name?: string;
  address?: string;
  phoneNumber?: string;
  email?: string;
  business_number?: string;
};

export type CorporationDto = {
  id: string;
  owner_name: string;
  corporation_name: string;
  address: string;
  phoneNumber: string;
  email: OccupationType;
  business_number: string;
  accessStatus: CorporationAccessStatus;
  createdAt: Date;
  updatedAt: Date;
};

export type CorporationDetailDto = {
  id: string;
  owner_name: string;
  corporation_name: string;
  address: string;
  phoneNumber: string;
  email: OccupationType;
  accessStatus: CorporationAccessStatus;
  business_number: string;
  tutors: GetTutorWithLecture[];
  trainingCenters: GetTrainingCenterDetailDto[];
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
