import { UserCurriculumLectureDto, toJSON } from "@/dtos/user.curriculum.dto";
import prisma from "@/utils/db";
import { AnimalType, CurriculumCategory } from "@prisma/client";

// 커리큘럼 강의 생성
export const createUserCurriculumLectureRepository = async (
  dto: UserCurriculumLectureDto,
): Promise<void> => {
  try {
    await prisma.userCurriculum.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 모든 커리큘럼 강의 조회
export const getAllUserCurriculumLecturesRepository = async (): Promise<
  UserCurriculumLectureDto[]
> => {
  try {
    const UsercurriculumLectures = await prisma.userCurriculum.findMany({});

    return UsercurriculumLectures.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 ID의 커리큘럼 강의 조회
export const getUserCurriculumLectureByIdRepository = async (
  id: string,
): Promise<UserCurriculumLectureDto | null> => {
  try {
    const UsercurriculumLecture = await prisma.userCurriculum.findUnique({
      where: {
        id: id,
      },
    });

    if (!UsercurriculumLecture) {
      return null;
    }
    return toJSON(UsercurriculumLecture);
  } catch {
    return null;
  }
};

// 커리큘럼 강의 업데이트
export const updateUserCurriculumLectureRepository = async (
  dto: UserCurriculumLectureDto,
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

// 커리큘럼 강의 삭제
export const deleteUserCurriculumLectureRepository = async (
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
