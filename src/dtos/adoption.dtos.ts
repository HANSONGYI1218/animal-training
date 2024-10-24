import {
  IsNotEmptyDate,
  IsNotEmptyString,
} from "@/validate-decoration/validate-deco";
import { AdoptionStatus, Animal, GenderType, User } from "@prisma/client";
import { IsEnum } from "class-validator";

export class CreateAdoptionDto {
  @IsNotEmptyDate()
  adoption_date!: Date;

  @IsNotEmptyDate()
  abandon_date!: Date;

  @IsEnum(AdoptionStatus, {
    message: "AdoptionStatus must be a valid gender value",
  })
  status!: AdoptionStatus;

  @IsNotEmptyString()
  abandon_reason!: string;

  @IsNotEmptyString()
  adopterId!: string;

  @IsNotEmptyString()
  breederId!: string;

  @IsNotEmptyString()
  adopterCorporationId!: string;

  @IsNotEmptyString()
  breederCorporationId!: string;

  @IsNotEmptyString()
  animalId!: string;
}

export class GetAdoptionDto {
  id!: string;
  adoption_date!: Date;
  abandon_date!: Date;
  status!: AdoptionStatus;
  abandon_reason!: string;
  adopter!: User[] | null;
  breeder!: User[] | null;
  adopterCorporation!: User[] | null;
  breederCorporation!: User[] | null;
  animalId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}

export class GetAdoptionWithAnimalDto {
  id!: string;
  adoption_date!: Date;
  abandon_date!: Date;
  status!: AdoptionStatus;
  abandon_reason!: string;
  adopterId!: string | null;
  breederId!: string | null;
  adopterCorporationId!: string | null;
  breederCorporationId!: string | null;
  animal!: Animal;
  createdAt!: Date;
  updatedAt!: Date;
}
