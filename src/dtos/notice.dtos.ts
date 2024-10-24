import {
  IsNotEmptyBoolean,
  IsNotEmptyNumber,
  IsNotEmptyString,
} from "@/validate-decoration/validate-deco";

export class CreateNoticeDto {
  @IsNotEmptyString()
  title!: string;

  @IsNotEmptyString()
  content!: string;

  @IsNotEmptyString()
  image!: string;

  attachments!: string[];

  @IsNotEmptyBoolean()
  isFixed!: boolean;

  @IsNotEmptyNumber()
  index!: number;
}

export class GetNoticeDto {
  id!: string;
  title!: string;
  content!: string;
  image!: string;
  attachments!: string[];
  isFixed!: boolean;
  index!: number;
  createdAt!: Date;
  updatedAt!: Date;
}
