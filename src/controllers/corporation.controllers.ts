import { NextResponse } from "next/server";
import {
  createCorporationService,
  deleteCorporationService,
  getAllCorporationsService,
  getCorporationByIdService,
  updateCorporationService,
} from "@/services/corporation.services";
import {
  CreateCorporationDto,
  GetCorporationDto,
} from "@/dtos/corporation.dtos";

// 기업 생성
export const createCorporation = async (
  dto: CreateCorporationDto,
): Promise<NextResponse> => {
  const createCorporation = await createCorporationService(dto);

  if (!createCorporation) {
    throw NextResponse.json(
      { error: "Failed to create lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 모든 기업 조회
export const getAllCorporations = async (): Promise<GetCorporationDto[]> => {
  return await getAllCorporationsService();
};

// 특정 ID의 기업 조회
export const getCorporationById = async (
  id: string,
): Promise<GetCorporationDto | null> => {
  return (await getCorporationByIdService(id)) ?? null;
};

// 기업 업데이트
export const updateCorporation = async (
  id: string,
  dto: Partial<CreateCorporationDto>,
): Promise<NextResponse> => {
  const updatedCorporation = await updateCorporationService(id, dto);

  if (!updatedCorporation) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 기업 삭제
export const deleteCorporation = async (id: string): Promise<NextResponse> => {
  const deletedCorporation = await deleteCorporationService(id);

  if (!deletedCorporation) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
