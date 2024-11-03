import {
  AnimalType,
  AttendanceStatus,
  CurriculumStep,
  CurriculumCategory,
} from "@prisma/client";

export type CreateUserCurriculumDto = {
  animal_type: AnimalType;
  curriculumStep: CurriculumStep;
  curriculumCategory: CurriculumCategory;
  curriculumIndex: number;
  attendances: {
    training_date: Date;
    start_time: string | null;
    end_time: string | null;
    absent_reason: string | null;
    attendance_status: AttendanceStatus;
  }[];
  userId: string;
};

export type UpdateUserCurriculumDto = {
  id: string;
  animal_type?: AnimalType;
  curriculumStep?: CurriculumStep;
  curriculumCategory?: CurriculumCategory;
  curriculumIndex?: number;
  attendances: {
    training_date: Date;
    start_time: string | null;
    end_time: string | null;
    absent_reason: string | null;
    attendance_status: AttendanceStatus;
  }[];
  userId?: string;
};

export type UserCurriculumDto = {
  id: string;
  animal_type: AnimalType;
  curriculumStep: CurriculumStep;
  curriculumCategory: CurriculumCategory;
  curriculumIndex: number;
  attendances: {
    training_date: Date;
    start_time: string | null;
    end_time: string | null;
    absent_reason: string | null;
    attendance_status: AttendanceStatus;
  }[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
