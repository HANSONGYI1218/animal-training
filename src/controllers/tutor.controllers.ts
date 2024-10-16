import { NextResponse } from "next/server";
import {
  createTutorService,
  getTutorByIdService,
  updateTutorService,
  deleteTutorService,
  getAllTutorsService,
} from "@/services/tutor.services";
import { CreateTutorDto, GetTutorDto } from "@/dtos/tutor.dtos";

// 강사 생성
export const createTutor = async (
  dto: CreateTutorDto,
): Promise<NextResponse> => {
  const createTutor = await createTutorService(dto);

  if (!createTutor) {
    throw NextResponse.json(
      { error: "Failed to create lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 모든 강사 조회
export const getAllTutors = async (): Promise<GetTutorDto[]> => {
  return await getAllTutorsService();
};

// 특정 ID의 강사 조회
export const getTutorById = async (id: string): Promise<GetTutorDto | null> => {
  return (await getTutorByIdService(id)) ?? null;
};

// 강사 업데이트
export const updateTutor = async (
  id: string,
  dto: Partial<CreateTutorDto>,
): Promise<NextResponse> => {
  const updatedTutor = await updateTutorService(id, dto);

  if (!updatedTutor) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 강의 삭제
export const deleteTutor = async (id: string): Promise<NextResponse> => {
  const deletedTutor = await deleteTutorService(id);

  if (!deletedTutor) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
