import {
  CreateTrainingCenterDto,
  GetTrainingCenterDetailDto,
  GetTrainingCenterDto,
} from "@/dtos/training-center.dtos";
import prisma from "@/utils/db";

// 훈련소 생성
export const createTrainingCenterRepository = async (
  dto: CreateTrainingCenterDto,
): Promise<CreateTrainingCenterDto | null> => {
  try {
    const trainingCenter = await prisma.trainingCenter.create({
      data: {
        name: dto.name,
        introduction: dto.introduction,
        profile: dto.profile,
        additionalImgs: dto.additionalImgs,
        address: dto.address,
        holidays: dto.holidays,
        price: dto.price,
        like: dto.like,
      },
    });

    return trainingCenter as CreateTrainingCenterDto;
  } catch {
    return null;
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
  id: string,
  dto: Partial<CreateTrainingCenterDto>,
): Promise<CreateTrainingCenterDto | null> => {
  try {
    const updatedTrainingCenter = await prisma.trainingCenter.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
    return updatedTrainingCenter as CreateTrainingCenterDto;
  } catch {
    return null;
  }
};

// 훈련소 삭제
export const deleteTrainingCenterRepository = async (
  id: string,
): Promise<CreateTrainingCenterDto | null> => {
  try {
    const deletedTrainingCenter = await prisma.trainingCenter.delete({
      where: {
        id: id,
      },
    });
    return deletedTrainingCenter as CreateTrainingCenterDto;
  } catch {
    return null;
  }
};
