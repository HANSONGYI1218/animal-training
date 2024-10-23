import {
  CreateUserCurriculumDto,
  GetUserCurriculumDto,
} from "@/dtos/user-curriculum.dtos";
import {
  createUserCurriculumRepository,
  deleteUserCurriculumRepository,
  getAllUserCurriculumsRepository,
  getUserCurriculumByUserIdRepository,
  updateUserCurriculumRepository,
} from "@/repositorys/user-curriculum.repositorys";

// 사용자 커리큘럼 생성
export const createUserCurriculumService = async (
  dto: CreateUserCurriculumDto,
): Promise<CreateUserCurriculumDto | null> => {
  try {
    // const isExisted = await getUserCurriculumByIdRepository(dto.id);
    // if(isExisted) return null;

    const Usercurriculum = await createUserCurriculumRepository(dto);

    return Usercurriculum as CreateUserCurriculumDto;
  } catch {
    return null;
  }
};

// 모든 사용자 커리큘럼 조회
export const getAllUserCurriculumsService = async (): Promise<
  GetUserCurriculumDto[]
> => {
  try {
    const userCurriculums = await getAllUserCurriculumsRepository();

    return userCurriculums as GetUserCurriculumDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 사용자 커리큘럼 조회
export const getUserCurriculumByUserIdService = async (
  userId: string,
): Promise<GetUserCurriculumDto | null> => {
  try {
    const userCurriculum = await getUserCurriculumByUserIdRepository(userId);

    if (!userCurriculum) {
      return null;
    }

    return userCurriculum as GetUserCurriculumDto;
  } catch {
    return null;
  }
};

// 사용자 커리큘럼 업데이트
export const updateUserCurriculumService = async (
  id: string,
  dto: Partial<CreateUserCurriculumDto>,
): Promise<CreateUserCurriculumDto | null> => {
  try {
    const userCurriculum = getUserCurriculumByUserIdService(id);

    if (!userCurriculum) {
      return null;
    }

    const updatedUserCurriculum = await updateUserCurriculumRepository(id, dto);

    return updatedUserCurriculum as CreateUserCurriculumDto;
  } catch {
    return null;
  }
};

// 사용자 커리큘럼 삭제
export const deleteUserCurriculumService = async (
  id: string,
): Promise<CreateUserCurriculumDto | null> => {
  try {
    const userCurriculum = getUserCurriculumByUserIdService(id);

    if (!userCurriculum) {
      return null;
    }

    const deletedUserCurriculum = await deleteUserCurriculumRepository(id);

    return deletedUserCurriculum as CreateUserCurriculumDto;
  } catch {
    return null;
  }
};
