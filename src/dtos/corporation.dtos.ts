import { OccupationType } from "@/types/tyeps.all";
import { IsNotEmptyString } from "@/validate-decoration/validate-deco";

export class CreateCorporationDto {
  @IsNotEmptyString()
  owner_name!: string;

  @IsNotEmptyString()
  corporation_name!: string;

  @IsNotEmptyString()
  address!: string;

  @IsNotEmptyString()
  phoneNumber!: string;

  @IsNotEmptyString()
  email!: string;

  @IsNotEmptyString()
  business_number!: string;
}

export class GetCorporationDto {
  id!: string;
  owner_name!: string;
  corporation_name!: string;
  address!: string;
  phoneNumber!: string;
  email!: OccupationType;
  business_number!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
