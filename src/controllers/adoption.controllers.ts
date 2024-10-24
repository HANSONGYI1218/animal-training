import { NextResponse } from "next/server";
import {
  createAdoptionService,
  deleteAdoptionService,
  getAdoptionByIdService,
  getAdoptionByUserIdService,
  updateAdoptionService,
} from "@/services/adoption.services";
import { CreateAdoptionDto, GetAdoptionDto } from "@/dtos/adoption.dtos";

// 입양 생성
export const createAdoption = async (
  dto: CreateAdoptionDto,
): Promise<NextResponse> => {
  const createAdoption = await createAdoptionService(dto);

  if (!createAdoption) {
    throw NextResponse.json(
      { error: "Failed to create lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 특정 ID의 입양 조회
export const getAdoptionById = async (
  id: string,
): Promise<GetAdoptionDto | null> => {
  return (await getAdoptionByIdService(id)) ?? null;
};

// 특정 userId의 입양 조회
export const getAdoptionByUserId = async (
  userId: string,
): Promise<GetAdoptionDto[]> => {
  return await getAdoptionByUserIdService(userId);
};

// 입양 업데이트
export const updateAdoption = async (
  id: string,
  dto: Partial<CreateAdoptionDto>,
): Promise<NextResponse> => {
  const updatedAdoption = await updateAdoptionService(id, dto);

  if (!updatedAdoption) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 입양 삭제
export const deleteAdoption = async (id: string): Promise<NextResponse> => {
  const deletedAdoption: CreateAdoptionDto | null =
    await deleteAdoptionService(id);

  if (!deletedAdoption) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
