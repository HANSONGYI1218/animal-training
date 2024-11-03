import prisma from "@/utils/db";
import {
  GetUserAdoptionRecordDto,
  GetUserDto,
  UserDto,
  toJSON,
} from "@/dtos/user.dto";

// 유저 생성
const createUserRepository = async (dto: UserDto): Promise<void> => {
  try {
    await prisma.user.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 특정 ID의 유저 조회
const getUserByIdRepository = async (
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

// 특정 userInfo로 유저 조회
const getUserByUserInfoRepository = async (
  name: string,
  registrationNumber: string,
): Promise<GetUserAdoptionRecordDto | null> => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: name,
        registrationNumber: registrationNumber,
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
      return null;
    }

    return toJSON(user);
  } catch {
    return null;
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
  getUserByIdRepository,
  updateUserRepository,
  deleteUserRepository,
};
