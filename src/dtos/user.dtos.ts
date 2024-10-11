import {
  IsNotEmptyDate,
  IsNotEmptyString,
} from "@/validate-decoration/validate-deco";
import { GenderType } from "@prisma/client";
import { IsEnum } from "class-validator";

export class CreateUserDto {
  @IsNotEmptyString()
  name!: string;

  @IsNotEmptyString()
  email!: string;

  @IsNotEmptyString()
  address!: string;

  @IsNotEmptyString()
  phoneNumber!: string;

  @IsNotEmptyString()
  registrationNumber!: string;

  @IsNotEmptyString()
  nickname!: string;

  @IsNotEmptyDate()
  birthday!: Date;

  @IsEnum(GenderType, {
    message: "gender must be a valid gender value",
  })
  gender!: GenderType;

  @IsNotEmptyString()
  lectureId!: string;
}

export class GetUserDto {
  id!: string;
  name!: string;
  email!: string;
  address!: string;
  phoneNumber!: string;
  registrationNumber!: string;
  nickname!: string;
  birthday!: Date;
  gender!: GenderType;
  lectureId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
