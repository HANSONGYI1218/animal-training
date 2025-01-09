import { OccupationType } from "@/types/tyeps.all";

interface TutorEntityProps {
  id?: string;
  name: string;
  introduction: string;
  career: string;
  profile_img: string;
  occupation: OccupationType;
  corporationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TutorEntity {
  private id?: string;
  private name: string;
  private introduction: string;
  private career: string;
  private profile_img: string;
  private occupation: OccupationType;
  private corporationId: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    name,
    introduction,
    career,
    profile_img,
    occupation,
    corporationId,
    createdAt,
    updatedAt,
  }: TutorEntityProps) {
    this.id = id;
    this.name = name;
    this.introduction = introduction;
    this.career = career;
    this.profile_img = profile_img;
    this.occupation = occupation;
    this.corporationId = corporationId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
