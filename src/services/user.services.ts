import { Injectable } from "@nestjs/common";
import prisma from "@/utils/db";
import { CreateUserDto, GetUserDto, UpdateUserDto } from "@/dtos/user.dtos";

// 유저 생성
const createUserService = async (
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

    if (!user) {
      return null;
    }
    return user as CreateUserDto;
  } catch {
    return null;
  }
};

// 모든 유저 조회
const getAllUsersService = async (): Promise<GetUserDto[]> => {
  try {
    const users = await prisma.user.findMany();

    return users as GetUserDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 유저 조회
const getUserByIdService = async (id: string): Promise<GetUserDto | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });
    return user as GetUserDto;
  } catch {
    return null;
  }
};

// 유저 업데이트
const updateUserService = async (
  id: string,
  dto: Partial<UpdateUserDto>,
): Promise<UpdateUserDto | null> => {
  try {
    const user = getUserByIdService(id);

    if (!user) {
      return null;
    }

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
const deleteUserService = async (id: string): Promise<GetUserDto | null> => {
  try {
    const user = getUserByIdService(id);

    if (!user) {
      return null;
    }

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
  createUserService,
  getAllUsersService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
};
