import {
  CreateUserCurriculumLectureDto,
  UserCurriculumLectureDto,
  toJSON,
  UpdateUserCurriculumLectureDto,
} from "@/dtos/user.curriculum.dto";
import { UserCurriculumLectureEntity } from "@/entities/user.curriculum.entity";
import {
  createUserCurriculumLectureRepository,
  deleteUserCurriculumLectureRepository,
  getAllUserCurriculumLecturesRepository,
  getUserCurriculumLectureByIdRepository,
  updateUserCurriculumLectureRepository,
} from "@/repositories/user.curriculum.repository";
import { AnimalType } from "@prisma/client";

// 커리큘럼 강의 생성
export const createUserCurriculumLectureService = async (
  dto: CreateUserCurriculumLectureDto,
): Promise<void> => {
  try {
    // const isExisted = await getUserCurriculumLectureByIdRepository(dto.id);
    // if(isExisted) return null;
    const newUserCurriculumLecture = new UserCurriculumLectureEntity({
      ...dto,
    });

    await createUserCurriculumLectureRepository(
      toJSON(newUserCurriculumLecture),
    );
  } catch (error: any) {
    return error;
  }
};

// 모든 커리큘럼 강의 조회
export const getAllUserCurriculumLecturesService = async (): Promise<
  UserCurriculumLectureDto[]
> => {
  try {
    const UsercurriculumLectures =
      await getAllUserCurriculumLecturesRepository();

    return UsercurriculumLectures as UserCurriculumLectureDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 커리큘럼 강의 조회
export const getUserCurriculumLectureByIdService = async (
  id: string,
): Promise<UserCurriculumLectureDto | null> => {
  try {
    const UsercurriculumLecture =
      await getUserCurriculumLectureByIdRepository(id);

    if (!UsercurriculumLecture) {
      return null;
    }

    return UsercurriculumLecture as UserCurriculumLectureDto;
  } catch {
    return null;
  }
};

// 커리큘럼 강의 업데이트
export const updateUserCurriculumLectureService = async (
  dto: UpdateUserCurriculumLectureDto,
): Promise<void> => {
  try {
    const userCurriculumLecture = await getUserCurriculumLectureByIdService(
      dto.id,
    );

    if (!userCurriculumLecture) {
      throw new Error("lecture not found");
    }

    const updateUserCurriculumLecture = new UserCurriculumLectureEntity({
      ...userCurriculumLecture,
      animal_type: userCurriculumLecture?.animal_type,
      animal_size: userCurriculumLecture?.animal_size,
      animal_age: userCurriculumLecture?.animal_age,
      category: userCurriculumLecture?.category,
      lastVideoId: userCurriculumLecture?.lastVideoId,
      lastVideoTime: userCurriculumLecture?.lastVideoTime,
      curriculumSteps: userCurriculumLecture?.curriculumSteps,
      //   attendances :userCurriculumLecture?.animal_age,
      userId: userCurriculumLecture?.userId,
    });

    await updateUserCurriculumLectureRepository(
      toJSON(updateUserCurriculumLecture),
    );
  } catch (error: any) {
    return error;
  }
};

// 커리큘럼 강의 삭제
export const deleteUserCurriculumLectureService = async (
  id: string,
): Promise<void> => {
  try {
    const UsercurriculumLecture = await getUserCurriculumLectureByIdService(id);

    if (!UsercurriculumLecture) {
      throw new Error("lecture not found");
    }

    await deleteUserCurriculumLectureRepository(id);
  } catch (error: any) {
    return error;
  }
};
