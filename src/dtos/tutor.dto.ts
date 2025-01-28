import { Lecture, OccupationType, Review, TutorBookmark } from "@prisma/client";

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
  tutorTrainingCenters: {
    id: string;
    trainingCenter: {
      name: string;
      introduction: string;
      profile_images: string[];
      zipCode: string;
      address: string;
      detailAddress: string;
      phoneNumber: string;
    };
  }[];
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
