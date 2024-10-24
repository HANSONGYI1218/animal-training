import {
  CreateCurriculumTrainingDto,
  GetCurriculumTrainingDto,
} from "@/dtos/curriculum-training.dtos";
import prisma from "@/utils/db";

// 커리큘럼 훈련 생성
export const createCurriculumTrainingRepository = async (
  dto: CreateCurriculumTrainingDto,
): Promise<CreateCurriculumTrainingDto | null> => {
  try {
    const curriculumTraining = await prisma.curriculumTraining.create({
      data: {
        index: dto.index,
        title: dto.title,
        content: dto.content,
        animal_type: dto.animal_type,
        category: dto.category,
        trainingTime: dto.trainingTime,
      },
    });

    return curriculumTraining as CreateCurriculumTrainingDto;
  } catch {
    return null;
  }
};

// 모든 커리큘럼 훈련 조회
export const getAllCurriculumTrainingsRepository = async (): Promise<
  GetCurriculumTrainingDto[]
> => {
  try {
    const curriculumTrainings = await prisma.curriculumTraining.findMany({
      orderBy: [
        { index: "asc" }, // 그 안에서 index 값 기준 정렬
      ],
    });

    return curriculumTrainings as GetCurriculumTrainingDto[];
  } catch {
    return [];
  }
};

// 커리큘럼 훈련 업데이트
export const updateCurriculumTrainingRepository = async (
  id: string,
  dto: Partial<CreateCurriculumTrainingDto>,
): Promise<CreateCurriculumTrainingDto | null> => {
  try {
    const updatedCurriculumTraining = await prisma.curriculumTraining.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
    return updatedCurriculumTraining as CreateCurriculumTrainingDto;
  } catch {
    return null;
  }
};

// 커리큘럼 훈련 삭제
export const deleteCurriculumTrainingRepository = async (
  id: string,
): Promise<CreateCurriculumTrainingDto | null> => {
  try {
    const deletedCurriculumTraining = await prisma.curriculumTraining.delete({
      where: {
        id: id,
      },
    });
    return deletedCurriculumTraining as CreateCurriculumTrainingDto;
  } catch {
    return null;
  }
};
