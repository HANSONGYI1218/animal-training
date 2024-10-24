import {
  CreateUserCurriculumDto,
  GetUserCurriculumDto,
} from "@/dtos/user-curriculum.dtos";
import prisma from "@/utils/db";

// 사용자 커리큘럼 생성
export const createUserCurriculumRepository = async (
  dto: CreateUserCurriculumDto,
): Promise<CreateUserCurriculumDto | null> => {
  try {
    const userCurriculum = await prisma.userCurriculum.create({
      data: {
        animal_type: dto.animal_type,
        curriculumStep: dto.curriculumStep,
        curriculumCategory: dto.curriculumCategory,
        curriculumIndex: dto.curriculumIndex,
        attendances: dto.attendances ?? undefined,
        userId: dto.userId,
      },
    });

    return userCurriculum as CreateUserCurriculumDto;
  } catch {
    return null;
  }
};

// 모든 사용자 커리큘럼 조회
export const getAllUserCurriculumsRepository = async (): Promise<
  GetUserCurriculumDto[]
> => {
  try {
    const userCurriculums = await prisma.userCurriculum.findMany();

    return userCurriculums as GetUserCurriculumDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 사용자 커리큘럼 조회
export const getUserCurriculumByUserIdRepository = async (
  userId: string,
): Promise<GetUserCurriculumDto | null> => {
  try {
    const userCurriculum = await prisma.userCurriculum.findFirst({
      where: {
        userId: userId,
      },
    });

    return userCurriculum as GetUserCurriculumDto;
  } catch {
    return null;
  }
};

// 사용자 커리큘럼 업데이트
export const updateUserCurriculumRepository = async (
  id: string,
  dto: Partial<CreateUserCurriculumDto>,
): Promise<CreateUserCurriculumDto | null> => {
  try {
    const updatedUserCurriculum = await prisma.userCurriculum.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        attendances: dto.attendances
          ? JSON.parse(JSON.stringify(dto.attendances))
          : undefined,
        updatedAt: new Date(),
      },
    });
    return updatedUserCurriculum as CreateUserCurriculumDto;
  } catch {
    return null;
  }
};

// 사용자 커리큘럼 삭제
export const deleteUserCurriculumRepository = async (
  id: string,
): Promise<CreateUserCurriculumDto | null> => {
  try {
    const deletedUserCurriculum = await prisma.userCurriculum.delete({
      where: {
        id: id,
      },
    });
    return deletedUserCurriculum as CreateUserCurriculumDto;
  } catch {
    return null;
  }
};
