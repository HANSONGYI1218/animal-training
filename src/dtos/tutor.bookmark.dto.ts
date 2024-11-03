import { IsNotEmptyString } from "@/validate-decoration/validate-deco";

export class CreateTutorBookmarkDto {
  @IsNotEmptyString()
  userId!: string;

  @IsNotEmptyString()
  tutorId!: string;
}

export class GetTutorBookmarkDto {
  id!: string;
  userId!: string;
  tutorId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
