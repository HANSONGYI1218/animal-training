import prisma from "@/utils/db";
import {
  GetUserAdoptionRecordDto,
  GetUserByCurriculumDto,
  GetUserDto,
  UserDto,
  GetUserSearchDto,
  toJSON,
} from "@/dtos/user.dto";
import { Adoption, AdoptionStep } from "@prisma/client";

// 유저 생성
const createUserRepository = async (dto: UserDto): Promise<GetUserDto> => {
  try {
    const user = await prisma.user.create({
      data: dto,
    });

    return toJSON(user);
  } catch (error: any) {
    return error;
  }
};

// 마이페이지에서의 유저 정보 조회
const getUserByMypageRepository = async (
  id: string,
): Promise<GetUserDto | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        lectureBookmarks: {
          select: {
            id: true, // 북마크의 ID
            lecture: true, // 관련 강의 정보
          },
        },
        tutorBookmarks: {
          select: {
            id: true, // 북마크의 ID
            tutor: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }
    return toJSON(user);
  } catch {
    return null;
  }
};

// 유저 정보 이메일을 통해 조회
const getUserByEmailRepository = async (
  email: string,
): Promise<GetUserSearchDto | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }
    return toJSON(user);
  } catch {
    return null;
  }
};

//커리큘럼 페이지에서의 유저 정보 조회
const getUserByCurriculumRepository = async (
  id: string,
): Promise<GetUserByCurriculumDto | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        adopterAdoptions: {
          where: {
            step: AdoptionStep.CURRICULUM, // 필터 조건
          },
          select: {
            id: true,
            status: true, //AdoptionStatus
            step: true, //AdoptionStep
            animal_type: true,
            curriculumStep: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }
    return toJSON(user);
  } catch {
    return null;
  }
};

// 특정 ID의 유저 로그인 조회
const getUserByLoginRepository = async (
  email: string,
  password: string,
): Promise<UserDto | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (!user) {
      return null;
    }
    return toJSON(user);
  } catch {
    return null;
  }
};

// 특정 userInfo로 유저 조회
const getUserByUserInfoRepository = async (
  name: string,
  email: string,
): Promise<GetUserAdoptionRecordDto | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: name,
        email: email,
      },
      include: {
        adopterAdoptions: {
          include: {
            animal: true, // Animal 정보도 함께 포함
          },
        },
      },
    });
    if (!user) {
      throw new Error("user is not found");
    }
    if (!user.adopterAdoptions) {
      throw new Error("user's adoption is not found");
    }

    return toJSON(user);
  } catch (error: any) {
    throw error;
  }
};

// 유저 업데이트
const updateUserRepository = async (dto: UserDto): Promise<void> => {
  try {
    await prisma.user.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  } catch (error: any) {
    return error;
  }
};

// 강의 삭제
const deleteUserRepository = async (id: string): Promise<void> => {
  try {
    await prisma.user.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};

export {
  createUserRepository,
  getUserByUserInfoRepository,
  getUserByEmailRepository,
  getUserByLoginRepository,
  getUserByMypageRepository,
  getUserByCurriculumRepository,
  updateUserRepository,
  deleteUserRepository,
};
