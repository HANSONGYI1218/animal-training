import {
  CreateUserTutorTrainingCenterDto,
  UpdateUserTutorTrainingCenterDto,
  UserTutorTrainingCenterByUserIdDto,
  UserTutorTrainingCenterDto,
  toJSON,
} from "@/dtos/user.tutorTrainingCenter.dto";
import { UserTutorTrainingCenterEntity } from "@/entities/user.tutorTrainingCenter.entity";
import {
  createUserTutorTrainingCenterRepository,
  deleteUserTutorTrainingCenterRepository,
  getUserTutorTrainingCenteByUserIdRepository,
  getUserTutorTrainingCenterByIdRepository,
  updateUserTutorTrainingCenterRepository,
} from "@/repositories/user.tutorTrainingCenter.repository";

// 훈련소 사용자 관계 생성
export const createUserTutorTrainingCenterService = async (
  dto: CreateUserTutorTrainingCenterDto,
): Promise<void> => {
  try {
    // const isExisted = await getUserTutorTrainingCenterByIdService(dto.id);
    // if(isExisted) return null;

    const newUserTutorTrainingCenter = new UserTutorTrainingCenterEntity({
      ...dto,
    });

    await createUserTutorTrainingCenterRepository(
      toJSON(newUserTutorTrainingCenter),
    );
  } catch (error: any) {
    return error;
  }
};

// 사용자가 신청한 훈련소 관계 조회
export const getUserTutorTrainingCenteByUserIdService = async (
  userId: string,
): Promise<UserTutorTrainingCenterByUserIdDto[]> => {
  try {
    const UserTutortrainingCenters =
      await getUserTutorTrainingCenteByUserIdRepository(userId);

    return UserTutortrainingCenters;
  } catch {
    return [];
  }
};

// 특정 ID의 훈련소와 사용자 관계 조회
export const getUserTutorTrainingCenterByIdService = async (
  id: string,
): Promise<UserTutorTrainingCenterDto | null> => {
  try {
    const UserTutortrainingCenter =
      await getUserTutorTrainingCenterByIdRepository(id);

    if (!UserTutortrainingCenter) {
      throw new Error("UserTutortrainingCenter is not found");
    }
    return UserTutortrainingCenter;
  } catch {
    return null;
  }
};

// 훈련소 사용자 관계 업데이트
export const updateUserTutorTrainingCenterService = async (
  dto: UpdateUserTutorTrainingCenterDto,
): Promise<void> => {
  try {
    const UserTutortrainingCenter =
      await getUserTutorTrainingCenterByIdRepository(dto?.id);

    if (!UserTutortrainingCenter) {
      throw new Error("UserTutortrainingCenter is not found");
    }

    const updateUserTutorTrainingCenter = new UserTutorTrainingCenterEntity({
      ...UserTutortrainingCenter,
    });

    await updateUserTutorTrainingCenterRepository(
      toJSON(updateUserTutorTrainingCenter),
    );
  } catch (error: any) {
    return error;
  }
};

// 강의 삭제
export const deleteUserTutorTrainingCenterService = async (
  id: string,
): Promise<void> => {
  try {
    const UserTutortrainingCenter =
      await getUserTutorTrainingCenterByIdRepository(id);

    if (!UserTutortrainingCenter) {
      throw new Error("UserTutortrainingCenter is not found");
    }

    await deleteUserTutorTrainingCenterRepository(id);
  } catch (error: any) {
    return error;
  }
};
