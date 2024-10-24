import {
  CreateTrainingCenterDto,
  GetTrainingCenterDetailDto,
  GetTrainingCenterDto,
} from "@/dtos/training-center.dtos";
import {
  createTrainingCenterService,
  deleteTrainingCenterService,
  getAllTrainingCentersService,
  getTrainingCenterByIdService,
  updateTrainingCenterService,
} from "@/services/training-center.service";
import { NextResponse } from "next/server";

// 훈련소 생성
export const createTrainingCenter = async (
  dto: CreateTrainingCenterDto,
): Promise<NextResponse> => {
  const createTrainingCenter = await createTrainingCenterService(dto);

  if (!createTrainingCenter) {
    throw NextResponse.json(
      { error: "Failed to create lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 모든 훈련소 조회
export const getAllTrainingCenters = async (): Promise<
  GetTrainingCenterDetailDto[]
> => {
  return await getAllTrainingCentersService();
};

// 특정 ID의 훈련소 조회
export const getTrainingCenterById = async (
  id: string,
): Promise<GetTrainingCenterDetailDto | null> => {
  return (await getTrainingCenterByIdService(id)) ?? null;
};

// 훈련소 업데이트
export const updateTrainingCenter = async (
  id: string,
  dto: Partial<CreateTrainingCenterDto>,
): Promise<NextResponse> => {
  const updatedTrainingCenter = await updateTrainingCenterService(id, dto);

  if (!updatedTrainingCenter) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 강의 삭제
export const deleteTrainingCenter = async (
  id: string,
): Promise<NextResponse> => {
  const deletedTrainingCenter = await deleteTrainingCenterService(id);

  if (!deletedTrainingCenter) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
