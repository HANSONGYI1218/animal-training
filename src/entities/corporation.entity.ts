import { GetTrainingCenterDetailDto } from "@/dtos/training.center.dto";
import { GetTutorDto, GetTutorWithLecture } from "@/dtos/tutor.dto";
import { CorporationAccessStatus } from "@prisma/client";

interface CorporationEntityProps {
  id?: string;
  owner_name: string;
  corporation_name: string;
  address: string;
  phoneNumber: string;
  email: string;
  business_number: string;
  accessStatus?: CorporationAccessStatus;
  updatedAt?: Date;
}

export class CorporationEntity {
  private id: string;
  private owner_name: string;
  private corporation_name: string;
  private address: string;
  private phoneNumber: string;
  private email: string;
  private business_number: string;
  private accessStatus: CorporationAccessStatus;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    owner_name,
    corporation_name,
    address,
    phoneNumber,
    email,
    business_number,
    accessStatus,
    updatedAt,
  }: CorporationEntityProps) {
    this.id = id ?? "";
    this.owner_name = owner_name;
    this.corporation_name = corporation_name;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.business_number = business_number;
    this.accessStatus = accessStatus ?? CorporationAccessStatus.STANDARD;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
