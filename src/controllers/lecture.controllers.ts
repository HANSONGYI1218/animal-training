import {
  CreateLectureDto,
  GetLectureDetailDto,
  GetLectureDto,
} from "@/dtos/lecture.dtos";
import { NextResponse } from "next/server";
import { Category } from "@prisma/client";
import {
  createLectureService,
  getAllLecturesService,
  getLectureByIdService,
  getLectureByCategoryService,
  updateLectureService,
  deleteLectureService,
  getLectureByTutorIdService,
  getLectureByTagService,
} from "@/services/lecture.services";

// 강의 생성
export const createLecture = async (
  dto: CreateLectureDto,
): Promise<NextResponse> => {
  const createLecture = await createLectureService(dto);

  if (!createLecture) {
    throw NextResponse.json(
      { error: "Failed to create lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 모든 강의 조회
export const getAllLectures = async (): Promise<GetLectureDto[]> => {
  return await getAllLecturesService();
};

// 특정 ID의 강의 조회
export const getLectureById = async (
  id: string,
): Promise<GetLectureDetailDto | null> => {
  return (await getLectureByIdService(id)) ?? null;
};

// 특정 강사의 강의 조회
export const getLectureByTutorId = async (
  tutorId: string,
): Promise<GetLectureDto[]> => {
  return await getLectureByTutorIdService(tutorId);
};

// 특정 CATEGORY 강의 조회
export const getLectureByCategory = async (
  category: Category,
): Promise<GetLectureDto[]> => {
  return await getLectureByCategoryService(category);
};

// 특정 Tag 강의 조회
export const getLectureByTag = async (
  tag: string,
): Promise<GetLectureDto[]> => {
  return await getLectureByTagService(tag);
};

// 강의 업데이트
export const updateLecture = async (
  id: string,
  dto: Partial<CreateLectureDto>,
): Promise<NextResponse> => {
  const deletedLecture = await updateLectureService(id, dto);

  if (!deletedLecture) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 강의 삭제
export const deleteLecture = async (id: string): Promise<NextResponse> => {
  const updatedLecture = await deleteLectureService(id);

  if (!updatedLecture) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
