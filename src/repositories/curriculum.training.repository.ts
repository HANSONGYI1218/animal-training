import {
  CreateCurriculumTrainingDto,
  CurriculumTrainingDto,
  GetCurriculumTrainingDto,
  toJSON,
} from "@/dtos/curriculum.training.dto";
import prisma from "@/utils/db";
import { AnimalType } from "@prisma/client";

// 커리큘럼 훈련 생성
export const createCurriculumTrainingRepository = async (
  dto: CreateCurriculumTrainingDto,
): Promise<void> => {
  try {
    const curriculumTraining = await prisma.curriculumTraining.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 모든 커리큘럼 훈련 조회
export const getAllCurriculumTrainingsRepository = async (
  animal_type: AnimalType,
): Promise<GetCurriculumTrainingDto[]> => {
  try {
    const curriculumTrainings = await prisma.curriculumTraining.findMany({
      where: {
        animal_type: animal_type,
      },
      orderBy: [
        { index: "asc" }, // 그 안에서 index 값 기준 정렬
      ],
    });

    return curriculumTrainings.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 ID의 커리큘럼 훈련 조회
export const getCurriculumTrainingByIdRepository = async (
  id: string,
): Promise<CurriculumTrainingDto | null> => {
  try {
    const curriculumTraining = await prisma.curriculumTraining.findUnique({
      where: {
        id: id,
      },
    });

    if (!curriculumTraining) {
      return null;
    }
    return toJSON(curriculumTraining);
  } catch {
    return null;
  }
};

// 커리큘럼 훈련 업데이트
export const updateCurriculumTrainingRepository = async (
  dto: CurriculumTrainingDto,
): Promise<void> => {
  try {
    const updatedCurriculumTraining = await prisma.curriculumTraining.update({
      where: {
        id: dto?.id,
      },
      data: {
        ...dto,
      },
    });
  } catch (error: any) {
    return error;
  }
};

// 커리큘럼 훈련 삭제
export const deleteCurriculumTrainingRepository = async (
  id: string,
): Promise<void> => {
  try {
    await prisma.curriculumTraining.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
