import {
  GetTrainingCenterDetailDto,
  TrainingCenterDto,
} from "@/dtos/training.center.dto";
import prisma from "@/utils/db";

// 훈련소 생성
export const createTrainingCenterRepository = async (
  dto: TrainingCenterDto,
): Promise<void> => {
  try {
    await prisma.trainingCenter.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 모든 훈련소 조회
export const getAllTrainingCentersRepository = async (): Promise<
  GetTrainingCenterDetailDto[]
> => {
  try {
    const trainingCenter = await prisma.trainingCenter.findMany({
      include: {
        tutor: true,
        reviews: true,
        corporation: true,
      },
      orderBy: [
        { like: "desc" }, // isFixed 값이 true인 항목을 우선
      ],
    });

    return trainingCenter as GetTrainingCenterDetailDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 훈련소 조회
export const getTrainingCenterByIdRepository = async (
  id: string,
): Promise<GetTrainingCenterDetailDto | null> => {
  try {
    const trainingCenter = await prisma.trainingCenter.findUnique({
      where: {
        id: id,
      },
      include: {
        tutor: true,
        reviews: true,
        corporation: true,
      },
    });

    if (!trainingCenter) {
      return null;
    }
    return trainingCenter as GetTrainingCenterDetailDto;
  } catch {
    return null;
  }
};

// 훈련소 업데이트
export const updateTrainingCenterRepository = async (
  dto: TrainingCenterDto,
): Promise<void> => {
  try {
    await prisma.trainingCenter.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 훈련소 삭제
export const deleteTrainingCenterRepository = async (
  id: string,
): Promise<void> => {
  try {
    await prisma.trainingCenter.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
