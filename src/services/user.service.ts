import {
  CreateUserDto,
  GetUserAdoptionRecordDto,
  GetUserDto,
  toJSON,
  UpdateUserDto,
  UserDto,
} from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";
import {
  createUserRepository,
  deleteUserRepository,
  getUserByUserInfoRepository,
  getUserByIdRepository,
  updateUserRepository,
  getUserByLoginRepository,
} from "@/repositories/user.repository";
import { GenderType } from "@prisma/client";

// 유저 생성
const createUserService = async (dto: CreateUserDto): Promise<void> => {
  try {
    // const isExisted = await getUserByIdRepository(dto.id);
    // if(isExisted) return null;
    const newUser = new UserEntity({
      name: "",
      zipCode: "",
      address: "",
      detailAddress: "",
      phoneNumber: "",
      registrationNumber: "",
      nickname: "",
      birthday: new Date(),
      gender: GenderType.MALE,
      isNewNews_SMS: true,
      isNotice_SMS: true,
      isPromotion_SMS: true,
      isNewNews_Email: true,
      isNotice_Email: true,
      isPromotion_Email: true,
      ...dto,
    });

    await createUserRepository(toJSON(newUser));
  } catch (error: any) {
    return error;
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

// 특정 ID의 유저 로그인 조회
const getUserByLoginService = async (
  email: string,
  password: string,
): Promise<UserDto | null> => {
  try {
    const user = await getUserByLoginRepository(email, password);

    if (!user) {
      return null;
    }
    return user as UserDto;
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
const updateUserService = async (dto: UpdateUserDto): Promise<void> => {
  try {
    const user = await getUserByIdRepository(dto.id);

    if (!user) {
      throw new Error("user not found");
    }

    const updateUser = new UserEntity({
      ...user,
      email: dto?.email ?? user.email,
      password: dto?.password ?? user.password,
      zipCode: dto?.zipCode ?? user.zipCode,
      address: dto?.address ?? user.address,
      detailAddress: dto?.detailAddress ?? user.detailAddress,
      phoneNumber: dto?.phoneNumber ?? user.phoneNumber,
      nickname: dto?.nickname ?? user.nickname,
      isNewNews_SMS: dto?.isNewNews_SMS ?? user.isNewNews_SMS,
      isNotice_SMS: dto?.isNotice_SMS ?? user.isNotice_SMS,
      isPromotion_SMS: dto?.isPromotion_SMS ?? user.isPromotion_SMS,
      isNewNews_Email: dto?.isNewNews_Email ?? user.isNewNews_Email,
      isNotice_Email: dto?.isNotice_Email ?? user.isNotice_Email,
      isPromotion_Email: dto?.isPromotion_Email ?? user.isPromotion_Email,
      updatedAt: new Date(),
    });

    await updateUserRepository(toJSON(updateUser));
  } catch (error: any) {
    return error;
  }
};

// 강의 삭제
const deleteUserService = async (id: string): Promise<void> => {
  try {
    const user = getUserByIdRepository(id);

    if (!user) {
      throw new Error("user not found");
    }

    await deleteUserRepository(id);
  } catch (error: any) {
    return error;
  }
};

export {
  createUserService,
  getUserByIdService,
  getUserByLoginService,
  getUserByUserInfoService,
  updateUserService,
  deleteUserService,
};
