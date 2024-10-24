import {
  CreateUserCurriculumDto,
  GetUserCurriculumDto,
} from "@/dtos/user-curriculum.dtos";
import { NextResponse } from "next/server";
import {
  createUserCurriculumService,
  deleteUserCurriculumService,
  getAllUserCurriculumsService,
  getUserCurriculumByUserIdService,
  updateUserCurriculumService,
} from "@/services/user-curriculum.services";

// 사용자 커리큘럼 강의 생성
export const createUserCurriculum = async (
  dto: CreateUserCurriculumDto,
): Promise<NextResponse> => {
  const createUserCurriculum = await createUserCurriculumService(dto);

  if (!createUserCurriculum) {
    throw NextResponse.json(
      { error: "Failed to create UserCurriculum" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 모든 사용자 커리큘럼 강의 조회
export const getAllUserCurriculums = async (): Promise<
  GetUserCurriculumDto[]
> => {
  return await getAllUserCurriculumsService();
};

// 특정 ID의 사용자 커리큘럼 강의 조회
export const getUserCurriculumByUserId = async (
  userId: string,
): Promise<GetUserCurriculumDto | null> => {
  return (await getUserCurriculumByUserIdService(userId)) ?? null;
};

// 사용자 커리큘럼 강의 업데이트
export const updateUserCurriculum = async (
  id: string,
  dto: Partial<CreateUserCurriculumDto>,
): Promise<NextResponse> => {
  const deletedUserCurriculum = await updateUserCurriculumService(id, dto);

  if (!deletedUserCurriculum) {
    throw NextResponse.json(
      { error: "Failed to update UserCurriculum" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 사용자 커리큘럼 강의 삭제
export const deleteUserCurriculum = async (
  id: string,
): Promise<NextResponse> => {
  const updatedUserCurriculum = await deleteUserCurriculumService(id);

  if (!updatedUserCurriculum) {
    throw NextResponse.json(
      { error: "Failed to update UserCurriculum" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
