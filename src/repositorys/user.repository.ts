import prisma from "@/utils/db";
import {
  CreateUserDto,
  GetUserAdoptionRecordDto,
  GetUserDto,
  UpdateUserDto,
} from "@/dtos/user.dtos";

// 유저 생성
const createUserRepository = async (
  dto: CreateUserDto,
): Promise<CreateUserDto | null> => {
  try {
    const user = await prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        address: dto.address,
        phoneNumber: dto.phoneNumber,
        registrationNumber: dto.registrationNumber,
        nickname: dto.nickname,
        birthday: dto.birthday,
        gender: dto.gender,
        lectureId: dto.lectureId,
      },
    });

    return user as CreateUserDto;
  } catch {
    return null;
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
    });

    if (!user) {
      return null;
    }
    return user as GetUserDto;
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

    return user as GetUserAdoptionRecordDto;
  } catch {
    return null;
  }
};

// 유저 업데이트
const updateUserRepository = async (
  id: string,
  dto: Partial<UpdateUserDto>,
): Promise<UpdateUserDto | null> => {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
    return updatedUser as CreateUserDto;
  } catch {
    return null;
  }
};

// 강의 삭제
const deleteUserRepository = async (id: string): Promise<GetUserDto | null> => {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    return deletedUser as GetUserDto;
  } catch {
    return null;
  }
};

export {
  createUserRepository,
  getUserByUserInfoRepository,
  getUserByIdRepository,
  updateUserRepository,
  deleteUserRepository,
};
