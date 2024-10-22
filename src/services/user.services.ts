import { CreateUserDto, GetUserDto, UpdateUserDto } from "@/dtos/user.dtos";
import {
  createUserRepository,
  deleteUserRepository,
  getAllUsersRepository,
  getUserByIdRepository,
  updateUserRepository,
} from "@/repositorys/user.repository";

// 유저 생성
const createUserService = async (
  dto: CreateUserDto,
): Promise<CreateUserDto | null> => {
  try {
    // const isExisted = await getUserByIdRepository(dto.id);
    // if(isExisted) return null;

    const user = await createUserRepository(dto);

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
    const users = await getAllUsersRepository();

    return users as GetUserDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 유저 조회
const getUserByIdService = async (id: string): Promise<GetUserDto | null> => {
  try {
    const user = await getUserByIdRepository(id);

    if (!user) {
      return null;
    }
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
    const user = getUserByIdRepository(id);

    if (!user) {
      return null;
    }

    const updatedUser = await updateUserRepository(id, dto);

    return updatedUser as CreateUserDto;
  } catch {
    return null;
  }
};

// 강의 삭제
const deleteUserService = async (id: string): Promise<GetUserDto | null> => {
  try {
    const user = getUserByIdRepository(id);

    if (!user) {
      return null;
    }

    const deletedUser = await deleteUserRepository(id);

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
