import { toJSON, UserCurriculumDto } from "@/dtos/user.curriculum.dto";
import prisma from "@/utils/db";

// 사용자 커리큘럼 생성
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

// 모든 사용자 커리큘럼 조회
export const getAllUserCurriculumsRepository = async (): Promise<
  UserCurriculumDto[]
> => {
  try {
    const userCurriculums = await prisma.userCurriculum.findMany();

    return userCurriculums.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 ID의 사용자 커리큘럼 조회
export const getUserCurriculumByUserIdRepository = async (
  userId: string,
): Promise<UserCurriculumDto | null> => {
  try {
    const userCurriculum = await prisma.userCurriculum.findFirst({
      where: {
        userId: userId,
      },
    });

    return toJSON(userCurriculum);
  } catch {
    return null;
  }
};

// 사용자 커리큘럼 업데이트
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

// 사용자 커리큘럼 삭제
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
