import { OccupationType } from "@/types/tyeps.all";
import { IsNotEmptyString } from "@/validate-decoration/validate-deco";

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

  price!: number;

  like!: number;
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
  createdAt!: Date;
  updatedAt!: Date;
}
