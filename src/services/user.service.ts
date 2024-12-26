import {
  CreateUserDto,
  GetUserAdoptionRecordDto,
  GetUserByCurriculumDto,
  GetUserDto,
  GetUserSearchDto,
  toJSON,
  UpdateUserDto,
  UserDto,
} from "@/dtos/user.dto";
import { UserEntity } from "@/entities/user.entity";
import {
  createUserRepository,
  deleteUserRepository,
  getUserByUserInfoRepository,
  getUserByMypageRepository,
  getUserByCurriculumRepository,
  updateUserRepository,
  getUserByLoginRepository,
  getUserByEmailRepository,
} from "@/repositories/user.repository";
import { AnimalType, CurriculumStep, GenderType } from "@prisma/client";

// 유저 생성
const createUserService = async (dto: CreateUserDto): Promise<GetUserDto> => {
  try {
    // const isExisted = await getUserByIdRepository(dto.id);
    // if(isExisted) return null;
    const newUser = new UserEntity({
      ...dto,
      name: "",
      zipCode: "",
      address: "",
      detailAddress: "",
      phoneNumber: "",
      registrationNumber: "",
      nickname: "",
      birthday: null,
      gender: GenderType.MALE,
      isNewNews_SMS: true,
      isNotice_SMS: true,
      isPromotion_SMS: true,
      isNewNews_Email: true,
      isNotice_Email: true,
      isPromotion_Email: true,
      lastVideoIndexs: [],
      lastVideoTimes: [],
      curriculumSteps: [],
    });

    const user = await createUserRepository(toJSON(newUser));

    return user;
  } catch (error: any) {
    return error;
  }
};

// 유저 정보 이메일을 통해 조회
const getUserByEmailService = async (
  email: string,
): Promise<GetUserSearchDto | null> => {
  try {
    const user = await getUserByEmailRepository(email);

    if (!user) {
      return null;
    }
    return user;
  } catch {
    return null;
  }
};

// 마이페이지에서의 유저 정보 조회
const getUserByMypageService = async (
  id: string,
): Promise<GetUserDto | null> => {
  try {
    const user = await getUserByMypageRepository(id);

    if (!user) {
      return null;
    }
    return user as GetUserDto;
  } catch {
    return null;
  }
};

//커리큘럼 페이지에서의 유저 정보 조회
const getUserByCurriculumService = async (
  id: string,
): Promise<GetUserByCurriculumDto | null> => {
  try {
    const user = await getUserByCurriculumRepository(id);

    if (!user) {
      return null;
    }
    return user as GetUserByCurriculumDto;
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
  email: string,
): Promise<GetUserAdoptionRecordDto | null> => {
  try {
    const user = await getUserByUserInfoRepository(name, email);

    return user as GetUserAdoptionRecordDto;
  } catch (error: any) {
    throw error;
  }
};

// 유저 업데이트
const updateUserService = async (
  dto: UpdateUserDto,
  animalType: AnimalType,
): Promise<void> => {
  try {
    const user = await getUserByMypageRepository(dto.id);

    if (!user) {
      throw new Error("user not found");
    }

    const updateUser = new UserEntity({
      ...user,
      name: dto?.name ?? user.name,
      email: dto?.email ?? user.email,
      birthday: dto?.birthday ?? user.birthday,
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
      lastVideoTimes:
        animalType === AnimalType.DOG
          ? [dto?.lastVideoTime ?? 0, user?.lastVideoTimes[1] ?? 0]
          : [user?.lastVideoTimes[0] ?? 0, dto?.lastVideoTime ?? 0],
      lastVideoIndexs:
        animalType === AnimalType.DOG
          ? [dto?.lastVideoIndex ?? -2, user?.lastVideoIndexs[1] ?? -2]
          : [user?.lastVideoIndexs[0] ?? -2, dto?.lastVideoIndex ?? -2],
      curriculumSteps:
        animalType === AnimalType.DOG
          ? [
              dto?.curriculumStep ?? CurriculumStep.LECTURE,
              user?.curriculumSteps[1] ?? CurriculumStep.LECTURE,
            ]
          : [
              user?.curriculumSteps[0] ?? CurriculumStep.LECTURE,
              dto?.curriculumStep ?? CurriculumStep.LECTURE,
            ],
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
    const user = getUserByMypageRepository(id);

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
  getUserByMypageService,
  getUserByEmailService,
  getUserByLoginService,
  getUserByUserInfoService,
  getUserByCurriculumService,
  updateUserService,
  deleteUserService,
};
