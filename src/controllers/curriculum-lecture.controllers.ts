import {
  CreateCurriculumLectureDto,
  GetCurriculumLectureDto,
} from "@/dtos/curriculum-lecture.dtos";
import { NextResponse } from "next/server";
import {
  createCurriculumLectureService,
  getAllCurriculumLecturesService,
  getCurriculumLectureByIdService,
  getCurriculumLectureByCategoryService,
  updateCurriculumLectureService,
  deleteCurriculumLectureService,
} from "@/services/curriculum-lecture.services";
import { CurriculumCategory } from "@prisma/client";

// 커리큘럼 강의 생성
export const createCurriculumLecture = async (
  dto: CreateCurriculumLectureDto,
): Promise<NextResponse> => {
  const createCurriculumLecture = await createCurriculumLectureService(dto);

  if (!createCurriculumLecture) {
    throw NextResponse.json(
      { error: "Failed to create Curriculumlecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 모든 커리큘럼 강의 조회
export const getAllCurriculumLectures = async (): Promise<
  GetCurriculumLectureDto[]
> => {
  return await getAllCurriculumLecturesService();
};

// 특정 ID의 커리큘럼 강의 조회
export const getCurriculumLectureById = async (
  id: string,
): Promise<GetCurriculumLectureDto | null> => {
  return (await getCurriculumLectureByIdService(id)) ?? null;
};

// 특정 category의 커리큘럼 강의 조회
export const getCurriculumLectureByCategory = async (
  category: CurriculumCategory,
): Promise<GetCurriculumLectureDto[]> => {
  return await getCurriculumLectureByCategoryService(category);
};

// 커리큘럼 강의 업데이트
export const updateCurriculumLecture = async (
  id: string,
  dto: Partial<CreateCurriculumLectureDto>,
): Promise<NextResponse> => {
  const deletedCurriculumLecture = await updateCurriculumLectureService(
    id,
    dto,
  );

  if (!deletedCurriculumLecture) {
    throw NextResponse.json(
      { error: "Failed to update Curriculumlecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 커리큘럼 강의 삭제
export const deleteCurriculumLecture = async (
  id: string,
): Promise<NextResponse> => {
  const updatedCurriculumLecture = await deleteCurriculumLectureService(id);

  if (!updatedCurriculumLecture) {
    throw NextResponse.json(
      { error: "Failed to update Curriculumlecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
