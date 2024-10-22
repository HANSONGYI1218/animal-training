import prisma from "@/utils/db";
import { CreateUserDto, GetUserDto, UpdateUserDto } from "@/dtos/user.dtos";

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

// 모든 유저 조회
const getAllUsersRepository = async (): Promise<GetUserDto[]> => {
  try {
    const users = await prisma.user.findMany();

    return users as GetUserDto[];
  } catch {
    return [];
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
  getAllUsersRepository,
  getUserByIdRepository,
  updateUserRepository,
  deleteUserRepository,
};
