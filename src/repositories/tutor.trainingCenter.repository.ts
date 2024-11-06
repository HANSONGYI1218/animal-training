import {
  toJSON,
  TutorTrainingCenterDto,
} from "@/dtos/tutor.trainingCenter.dto";
import prisma from "@/utils/db";
import { Review } from "@prisma/client";

// 훈련소와 강사 관계 생성
export const createTutorTrainingCenterRepository = async (
  dto: TutorTrainingCenterDto,
): Promise<void> => {
  try {
    await prisma.tutorTrainingCenter.create({
      data: {
        ...dto,
      },
    });
  } catch (error: any) {
    return error;
  }
};

// 모든 훈련소와 강사 관계 조회
export const getAllTutorTrainingCentersRepository = async (): Promise<
  TutorTrainingCenterDto[]
> => {
  try {
    const tutorTrainingCenters = await prisma.tutorTrainingCenter.findMany();

    return toJSON(tutorTrainingCenters);
  } catch {
    return [];
  }
};

// 특정 ID의 훈련소와 강사 관계 조회
export const getTutorTrainingCenterByIdRepository = async (
  tutorId: string,
  trainingCenterId: string,
): Promise<TutorTrainingCenterDto | null> => {
  try {
    const tutorTrainingCenter = await prisma.tutorTrainingCenter.findFirst({
      where: {
        tutorId: tutorId,
        trainingCenterId: trainingCenterId,
      },
    });

    if (!tutorTrainingCenter) {
      return null;
    }
    return toJSON(tutorTrainingCenter);
  } catch {
    return null;
  }
};

// 훈련소와 강사 관계 업데이트
export const updateTutorTrainingCenterRepository = async (
  dto: TutorTrainingCenterDto,
): Promise<void> => {
  try {
    await prisma.tutorTrainingCenter.update({
      where: {
        tutorId_trainingCenterId: {
          tutorId: dto.tutorId,
          trainingCenterId: dto.trainingCenterId,
        },
      },
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 훈련소와 강사 관계 삭제
export const deleteTutorTrainingCenterRepository = async (
  tutorId: string,
  trainingCenterId: string,
): Promise<void> => {
  try {
    await prisma.tutorTrainingCenter.delete({
      where: {
        tutorId_trainingCenterId: {
          tutorId: tutorId,
          trainingCenterId: trainingCenterId,
        },
      },
    });
  } catch (error: any) {
    return error;
  }
};
