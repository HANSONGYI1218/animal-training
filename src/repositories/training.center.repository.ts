import {
  GetTrainingCenterDetailDto,
  toGetDtoJSON,
  toJSON,
  TrainingCenterDto,
  TrainingCenterOnlyOneTutorDto,
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
        tutorTrainingCenters: {
          select: {
            tutor: {
              select: {
                id: true,
                name: true,
                career: true,
              },
            },
          },
        },
        corporation: true,
      },
      orderBy: [
        { createdAt: "desc" }, // isFixed 값이 true인 항목을 우선
      ],
    });

    return toJSON(trainingCenter);
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
        tutorTrainingCenters: {
          select: {
            tutor: {
              select: {
                id: true,
                name: true,
                profile_img: true,
              },
            },
          },
        },
        corporation: true,
      },
    });

    if (!trainingCenter) {
      return null;
    }
    return toJSON(trainingCenter);
  } catch {
    return null;
  }
};

// 특정 corporationID의 훈련소 조회
export const getTrainingCenterByCorporationIdRepository = async (
  corporationId: string,
): Promise<GetTrainingCenterDetailDto[]> => {
  try {
    const trainingCenters = await prisma.trainingCenter.findMany({
      where: {
        corporationId: corporationId,
      },
      include: {
        tutorTrainingCenters: {
          select: {
            tutor: {
              select: {
                id: true,
                name: true,
                profile_img: true,
              },
            },
          },
        },
        corporation: true,
      },
    });

    return trainingCenters.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 tutorId의 훈련소 조회
export const getTrainingCenterByTutorIdRepository = async (
  trainingCenterId: string,
  tutorId: string,
): Promise<TrainingCenterOnlyOneTutorDto | null> => {
  try {
    const trainingCenter = await prisma.trainingCenter.findUnique({
      where: {
        id: trainingCenterId,
      },
      include: {
        tutorTrainingCenters: {
          where: {
            tutorId: tutorId,
          },
          select: {
            price: true,
            holidays: true,
            like: true,
            reviews: true,
            tutor: {
              select: {
                id: true,
                name: true,
                career: true,
                introduction: true,
              },
            },
          },
          take: 1,
        },
        corporation: true,
      },
    });

    if (!trainingCenter) {
      return null;
    }
    return toGetDtoJSON(trainingCenter);
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
