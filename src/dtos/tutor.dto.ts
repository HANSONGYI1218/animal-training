import { OccupationType } from "@/types/tyeps.all";
import { Lecture, TutorBookmark } from "@prisma/client";

export type TutorDto = {
  id: string;
  name: string;
  introduction: string;
  career: string;
  profile_img: string;
  occupation: OccupationType;
  corporationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateTutorDto = {
  name: string;
  introduction: string;
  career: string;
  profile_img: string;
  occupation: OccupationType;
  corporationId: string;
};

export type GetTutorDto = {
  id: string;
  name: string;
  introduction: string;
  career: string;
  profile_img: string;
  occupation: OccupationType;
  corporationId: string;
  corporation: {
    id: string;
    corporation_name: string;
  };
  trainingCenter: {
    id: string;
    name: string;
    address: string;
  };
  bookmarks: TutorBookmark[];
  createdAt: Date;
  updatedAt: Date;
};

export type GetAllTutorDto = {
  id: string;
  name: string;
  introduction: string;
  career: string;
  profile_img: string;
  occupation: OccupationType;
};

export type UpdateTutorDto = {
  id: string;
  name?: string;
  introduction?: string;
  career?: string;
  profile_img?: string;
  occupation?: OccupationType;
  corporationId?: string;
};

export type GetTutorWithLecture = {
  id: string;
  name: string;
  introduction: string;
  career: string;
  profile_img: string;
  occupation: OccupationType;
  corporationId: string;
  lectures: Lecture[];
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
