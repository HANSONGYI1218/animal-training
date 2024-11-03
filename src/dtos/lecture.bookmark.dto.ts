import { IsNotEmptyString } from "@/validate-decoration/validate-deco";

export class CreateLectureBookmarkDto {
  @IsNotEmptyString()
  userId!: string;

  @IsNotEmptyString()
  lectureId!: string;
}

export class GetLectureBookmarkDto {
  id!: string;
  userId!: string;
  lectureId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
