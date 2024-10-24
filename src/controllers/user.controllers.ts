import { NextResponse } from "next/server";
import {
  CreateUserDto,
  GetUserAdoptionRecordDto,
  GetUserDto,
  UpdateUserDto,
} from "@/dtos/user.dtos";
import {
  createUserService,
  getUserByIdService,
  getUserByUserInfoService,
  updateUserService,
  deleteUserService,
} from "@/services/user.services";

// 유저 생성 함수
export const createUser = async (dto: CreateUserDto): Promise<NextResponse> => {
  const createUser = await createUserService(dto);

  if (!createUser) {
    throw NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 특정 ID의 유저 조회 함수
export const getUserById = async (id: string): Promise<GetUserDto | null> => {
  return (await getUserByIdService(id)) ?? null;
};

// 특정 userInfo로 유저 조회 함수
export const getUserByUserInfo = async (
  name: string,
  registrationNumber: string,
): Promise<GetUserAdoptionRecordDto | null> => {
  return (await getUserByUserInfoService(name, registrationNumber)) ?? null;
};

// 유저 업데이트 함수
export const updateUser = async (
  id: string,
  dto: Partial<UpdateUserDto>,
): Promise<NextResponse> => {
  const updatedUser = await updateUserService(id, dto);

  if (!updatedUser) {
    throw NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 유저 삭제 함수
export const deleteUser = async (id: string): Promise<NextResponse> => {
  const deletedUser = await deleteUserService(id);

  if (!deletedUser) {
    throw NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
