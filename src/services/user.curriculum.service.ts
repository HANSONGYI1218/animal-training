import {
  CreateUserCurriculumDto,
  UserCurriculumDto,
  toJSON,
  UpdateUserCurriculumDto,
  GetUserCurriculumDto,
} from "@/dtos/user.curriculum.dto";
import { UserCurriculumEntity } from "@/entities/user.curriculum.entity";
import {
  createUserCurriculumRepository,
  deleteUserCurriculumRepository,
  getAllUserCurriculumsRepository,
  getUserCurriculumByIdRepository,
  getUserCurriculumByUserIdRepository,
  updateUserCurriculumRepository,
} from "@/repositories/user.curriculum.repository";

// 사용자_커리큘럼 생성
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
  } //2e03afde-1868-48a8-bc99-3faf09b2d15e
};

// 모든 사용자_커리큘럼 조회
export const getAllUserCurriculumsService = async (): Promise<
  UserCurriculumDto[]
> => {
  try {
    const usercurriculum = await getAllUserCurriculumsRepository();

    return usercurriculum as UserCurriculumDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 사용자_커리큘럼 조회
export const getUserCurriculumByIdService = async (
  id: string,
): Promise<UserCurriculumDto | null> => {
  try {
    const usercurriculum = await getUserCurriculumByIdRepository(id);

    if (!usercurriculum) {
      return null;
    }

    return usercurriculum as UserCurriculumDto;
  } catch {
    return null;
  }
};

// 특정 userID의 사용자_커리큘럼 조회
export const getUserCurriculumByUserIdService = async (
  userId: string,
): Promise<GetUserCurriculumDto | null> => {
  try {
    const usercurriculum = await getUserCurriculumByUserIdRepository(userId);

    if (!usercurriculum) {
      return null;
    }
    return usercurriculum as GetUserCurriculumDto;
  } catch {
    return null;
  }
};

// 사용자_커리큘럼 업데이트
export const updateUserCurriculumService = async (
  dto: UpdateUserCurriculumDto,
): Promise<void> => {
  try {
    const userCurriculum = await getUserCurriculumByIdService(dto.id);

    if (!userCurriculum) {
      throw new Error("lecture not found");
    }

    const updateUserCurriculum = new UserCurriculumEntity({
      ...userCurriculum,
      lastVideoId: userCurriculum?.lastVideoId,
      lastVideoTime: userCurriculum?.lastVideoTime,
      curriculumStep: userCurriculum?.curriculumStep,
      //   attendances :userCurriculum?.animal_age,
      userId: userCurriculum?.userId,
      adoptionId: userCurriculum?.adoptionId,
    });

    await updateUserCurriculumRepository(toJSON(updateUserCurriculum));
  } catch (error: any) {
    return error;
  }
};

// 사용자_커리큘럼 삭제
export const deleteUserCurriculumService = async (
  id: string,
): Promise<void> => {
  try {
    const Usercurriculum = await getUserCurriculumByIdService(id);

    if (!Usercurriculum) {
      throw new Error("lecture not found");
    }

    await deleteUserCurriculumRepository(id);
  } catch (error: any) {
    return error;
  }
};
function getCurriculumByUserIdRepository(id: string) {
  throw new Error("Function not implemented.");
}
