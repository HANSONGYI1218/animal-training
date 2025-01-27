import { OccupationType } from "@/types/tyeps.all";
import { Lecture, Review, TutorBookmark } from "@prisma/client";

export type TutorDto = {
  id?: string;
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
  tutorTrainingCenter: {
    tutorId: string;
    trainingCenterId: string;
    price: string;
    holidays: string[];
    like: number;
    reviews: Review[];
    createdAt: Date;
    updatedAt: Date;
    trainingCenter: {
      name: string;
      address: string;
      detailAddress: string;
    };
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
  price?: string;
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

export function toJSON(tutor: any) {
  return JSON.parse(JSON.stringify(tutor));
}
