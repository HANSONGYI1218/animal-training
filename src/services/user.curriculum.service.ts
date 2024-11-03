import {
  CreateUserCurriculumDto,
  toJSON,
  UpdateUserCurriculumDto,
  UserCurriculumDto,
} from "@/dtos/user.curriculum.dto";
import { UserCurriculumEntity } from "@/entities/user.curriculum.entity";
import {
  createUserCurriculumRepository,
  deleteUserCurriculumRepository,
  getAllUserCurriculumsRepository,
  getUserCurriculumByUserIdRepository,
  updateUserCurriculumRepository,
} from "@/repositories/user.curriculum.repository";

// 사용자 커리큘럼 생성
export const createUserCurriculumService = async (
  dto: CreateUserCurriculumDto,
): Promise<void> => {
  try {
    // const isExisted = await getUserCurriculumByIdRepository(dto.id);
    // if(isExisted) return null;

    const newUserCurriculum = new UserCurriculumEntity({
      ...dto,
    });

    await createUserCurriculumRepository(toJSON(newUserCurriculum));
  } catch (error: any) {
    return error;
  }
};

// 모든 사용자 커리큘럼 조회
export const getAllUserCurriculumsService = async (): Promise<
  UserCurriculumDto[]
> => {
  try {
    const userCurriculums = await getAllUserCurriculumsRepository();

    return userCurriculums.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 ID의 사용자 커리큘럼 조회
export const getUserCurriculumByUserIdService = async (
  userId: string,
): Promise<UserCurriculumDto | null> => {
  try {
    const userCurriculum = await getUserCurriculumByUserIdRepository(userId);

    if (!userCurriculum) {
      return null;
    }

    return userCurriculum as UserCurriculumDto;
  } catch {
    return null;
  }
};

// 사용자 커리큘럼 업데이트
export const updateUserCurriculumService = async (
  dto: UpdateUserCurriculumDto,
): Promise<void> => {
  try {
    const userCurriculum = await getUserCurriculumByUserIdService(dto.id);

    if (!userCurriculum) {
      throw new Error("usercurriculum is not found");
    }

    const updateUserCurriculum = new UserCurriculumEntity({
      ...userCurriculum,
      animal_type: dto?.animal_type ?? userCurriculum.animal_type,
      curriculumStep: dto?.curriculumStep ?? userCurriculum.curriculumStep,
      curriculumCategory:
        dto?.curriculumCategory ?? userCurriculum.curriculumCategory,
      curriculumIndex: dto?.curriculumIndex ?? userCurriculum.curriculumIndex,
      attendances: dto?.attendances ?? userCurriculum?.attendances ?? null,
      updatedAt: new Date(),
    });

    await updateUserCurriculumRepository(toJSON(updateUserCurriculum));
  } catch (error: any) {
    return error;
  }
};

// 사용자 커리큘럼 삭제
export const deleteUserCurriculumService = async (
  id: string,
): Promise<void> => {
  try {
    const userCurriculum = await getUserCurriculumByUserIdService(id);

    if (!userCurriculum) {
      throw new Error("usercurriculum is not found");
    }

    await deleteUserCurriculumRepository(id);
  } catch (error: any) {
    return error;
  }
};
