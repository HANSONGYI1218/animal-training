import {
  toJSON,
  UserTutorTrainingCenterByUserIdDto,
  UserTutorTrainingCenterDto,
} from "@/dtos/user.tutorTrainingCenter.dto";
import prisma from "@/utils/db";

// 훈련소와 사용자 관계 생성
export const createUserTutorTrainingCenterRepository = async (
  dto: UserTutorTrainingCenterDto,
): Promise<void> => {
  try {
    await prisma.userTutorTrainingCenter.create({
      data: {
        ...dto,
      },
    });
  } catch (error: any) {
    return error;
  }
};

// 사용자가 신청한 훈련소 관계 조회
export const getUserTutorTrainingCenteByUserIdRepository = async (
  userId: string,
): Promise<UserTutorTrainingCenterByUserIdDto[]> => {
  try {
    const userTutorTrainingCenters =
      await prisma.userTutorTrainingCenter.findMany({
        where: {
          userId: userId,
        },
        include: {
          user: true,
          tutorTrainingCenter: {
            select: {
              id: true,
              tutor: true,
              price: true,
              holidays: true,
              like: true,
              trainingCenter: true,
            },
          },
        },
      });

    return toJSON(userTutorTrainingCenters);
  } catch {
    return [];
  }
};

// 특정 ID의 훈련소와 사용자 관계 조회
export const getUserTutorTrainingCenterByIdRepository = async (
  id: string,
): Promise<UserTutorTrainingCenterDto | null> => {
  try {
    const userTutorTrainingCenter =
      await prisma.userTutorTrainingCenter.findFirst({
        where: {
          id: id,
        },
      });

    if (!userTutorTrainingCenter) {
      return null;
    }
    return toJSON(userTutorTrainingCenter);
  } catch {
    return null;
  }
};

// 훈련소와 사용자 관계 업데이트
export const updateUserTutorTrainingCenterRepository = async (
  dto: UserTutorTrainingCenterDto,
): Promise<void> => {
  try {
    await prisma.userTutorTrainingCenter.update({
      where: {
        id: dto?.id,
      },
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 훈련소와 사용자 관계 삭제
export const deleteUserTutorTrainingCenterRepository = async (
  id: string,
): Promise<void> => {
  try {
    await prisma.userTutorTrainingCenter.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
