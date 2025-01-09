import { CorporationAccessStatus } from "@prisma/client";

interface CorporationEntityProps {
  id?: string;
  password: string;
  owner_name: string;
  corporation_name: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  phoneNumber: string;
  email: string;
  business_number: string;
  accessStatus?: CorporationAccessStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export class CorporationEntity {
  private id?: string;
  private password: string;
  private owner_name: string;
  private corporation_name: string;
  private zipCode: string;
  private address: string;
  private detailAddress: string;
  private phoneNumber: string;
  private email: string;
  private business_number: string;
  private accessStatus: CorporationAccessStatus;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    password,
    owner_name,
    corporation_name,
    zipCode,
    address,
    detailAddress,
    phoneNumber,
    email,
    business_number,
    accessStatus,
    createdAt,
    updatedAt,
  }: CorporationEntityProps) {
    this.id = id;
    this.password = password;
    this.owner_name = owner_name;
    this.corporation_name = corporation_name;
    this.zipCode = zipCode;
    this.address = address;
    this.detailAddress = detailAddress;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.business_number = business_number;
    this.accessStatus = accessStatus ?? CorporationAccessStatus.STANDARD;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
