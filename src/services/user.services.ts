import {
  CreateUserDto,
  GetUserAdoptionRecordDto,
  GetUserDto,
  UpdateUserDto,
} from "@/dtos/user.dtos";
import {
  createUserRepository,
  deleteUserRepository,
  getUserByUserInfoRepository,
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

// 특정 userInfo로 유저 조회
const getUserByUserInfoService = async (
  name: string,
  registrationNumber: string,
): Promise<GetUserAdoptionRecordDto | null> => {
  try {
    const user = await getUserByUserInfoRepository(name, registrationNumber);

    if (!user) {
      return null;
    }
    return user as GetUserAdoptionRecordDto;
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
  getUserByIdService,
  getUserByUserInfoService,
  updateUserService,
  deleteUserService,
};
