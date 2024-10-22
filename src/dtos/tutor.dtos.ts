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
  occupation!: OccupationType;
  corporation!: {
    id: string;
    corporation_name: string;
  };
  trainingCenter!: {
    id: string;
    name: string;
    address: string;
  };
  createdAt!: Date;
  updatedAt!: Date;
}
