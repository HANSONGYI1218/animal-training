import {
  CreateCurriculumTrainingDto,
  GetCurriculumTrainingDto,
} from "@/dtos/curriculum-training.dtos";
import { NextResponse } from "next/server";
import {
  createCurriculumTrainingService,
  getAllCurriculumTrainingsService,
  updateCurriculumTrainingService,
  deleteCurriculumTrainingService,
} from "@/services/curriculum-training.services";

// 커리큘럼 강의 생성
export const createCurriculumTraining = async (
  dto: CreateCurriculumTrainingDto,
): Promise<NextResponse> => {
  const createCurriculumTraining = await createCurriculumTrainingService(dto);

  if (!createCurriculumTraining) {
    throw NextResponse.json(
      { error: "Failed to create CurriculumTraining" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 모든 커리큘럼 강의 조회
export const getAllCurriculumTrainings = async (): Promise<
  GetCurriculumTrainingDto[]
> => {
  return await getAllCurriculumTrainingsService();
};

// 커리큘럼 강의 업데이트
export const updateCurriculumTraining = async (
  id: string,
  dto: Partial<CreateCurriculumTrainingDto>,
): Promise<NextResponse> => {
  const deletedCurriculumTraining = await updateCurriculumTrainingService(
    id,
    dto,
  );

  if (!deletedCurriculumTraining) {
    throw NextResponse.json(
      { error: "Failed to update CurriculumTraining" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 커리큘럼 강의 삭제
export const deleteCurriculumTraining = async (
  id: string,
): Promise<NextResponse> => {
  const updatedCurriculumTraining = await deleteCurriculumTrainingService(id);

  if (!updatedCurriculumTraining) {
    throw NextResponse.json(
      { error: "Failed to update CurriculumTraining" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
