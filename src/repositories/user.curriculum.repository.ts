import {
  GetUserCurriculumDto,
  UserCurriculumDto,
  toJSON,
} from "@/dtos/user.curriculum.dto";
import prisma from "@/utils/db";
import { CurriculumStep } from "@prisma/client";

// 사용자_커리큘럼 생성
export const createUserCurriculumRepository = async (
  dto: UserCurriculumDto,
): Promise<void> => {
  try {
    await prisma.userCurriculum.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 모든 사용자_커리큘럼 조회
export const getAllUserCurriculumsRepository = async (): Promise<
  UserCurriculumDto[]
> => {
  try {
    const usercurriculum = await prisma.userCurriculum.findMany({});

    return usercurriculum.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 ID의 사용자_커리큘럼 조회
export const getUserCurriculumByIdRepository = async (
  id: string,
): Promise<UserCurriculumDto | null> => {
  try {
    const usercurriculum = await prisma.userCurriculum.findUnique({
      where: {
        id: id,
      },
    });

    if (!usercurriculum) {
      return null;
    }
    return toJSON(usercurriculum);
  } catch {
    return null;
  }
};

// 특정 userID의 사용자_커리큘럼 조회
export const getUserCurriculumByUserIdRepository = async (
  userId: string,
): Promise<GetUserCurriculumDto | null> => {
  try {
    const usercurriculum = await prisma.userCurriculum.findUnique({
      where: {
        userId: userId,
        curriculumStep: {
          not: CurriculumStep.END,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            zipCode: true,
            address: true,
            detailAddress: true,
            phoneNumber: true,
            birthday: true,
            gender: true,
          },
        },
        adoption: {
          select: {
            status: true, // AdoptionStatus
            step: true, // AdoptionStep
            animalId: true,
            animal: {
              // animal을 include로 포함
              select: {
                id: true,
                name: true,
                age: true,
                gender: true,
                animal_type: true,
                animal_size: true,
                animal_age: true,
              },
            },
          },
        },
      },
    });

    if (!usercurriculum) {
      return null;
    }
    return toJSON(usercurriculum);
  } catch {
    return null;
  }
};

// 사용자_커리큘럼 업데이트
export const updateUserCurriculumRepository = async (
  dto: UserCurriculumDto,
): Promise<void> => {
  try {
    await prisma.userCurriculum.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 사용자_커리큘럼 삭제
export const deleteUserCurriculumRepository = async (
  id: string,
): Promise<void> => {
  try {
    await prisma.userCurriculum.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
