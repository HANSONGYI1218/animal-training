import { OccupationType } from "@/types/tyeps.all";
import { IsNotEmptyString } from "@/validate-decoration/validate-deco";
import { IsEnum } from "class-validator";

export class CreateTutorDto {
  @IsNotEmptyString()
  name!: string;

  @IsNotEmptyString()
  introduction!: string;

  @IsNotEmptyString()
  career!: string;

  @IsNotEmptyString()
  profile_img!: string;

  @IsNotEmptyString()
  traning_location!: string;

  @IsNotEmptyString()
  traning_name!: string;

  @IsNotEmptyString()
  corporation_name!: string;

  @IsEnum(OccupationType, {
    message: "occupation must be a valid OccupationType value",
  })
  occupation!: OccupationType;

  @IsNotEmptyString()
  corporationId!: string;
}

export class GetTutorDto {
  id!: string;
  name!: string;
  introduction!: string;
  career!: string;
  profile_img!: string;
  traning_name!: string;
  traning_location!: string;
  corporation_name!: string;
  occupation!: OccupationType;
  corporationId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
