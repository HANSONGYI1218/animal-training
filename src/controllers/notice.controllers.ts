import { NextResponse } from "next/server";
import {
  createNoticeService,
  getNoticeByIdService,
  updateNoticeService,
  deleteNoticeService,
  getAllNoticesService,
} from "@/services/notice.services";
import { CreateNoticeDto, GetNoticeDto } from "@/dtos/notice.dtos";

// 공지 생성
export const createNotice = async (
  dto: CreateNoticeDto,
): Promise<NextResponse> => {
  const createNotice = await createNoticeService(dto);

  if (!createNotice) {
    throw NextResponse.json(
      { error: "Failed to create lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 모든 공지 조회
export const getAllNotices = async (): Promise<GetNoticeDto[]> => {
  return await getAllNoticesService();
};

// 특정 ID의 공지 조회
export const getNoticeById = async (
  id: string,
): Promise<GetNoticeDto | null> => {
  return (await getNoticeByIdService(id)) ?? null;
};

// 공지 업데이트
export const updateNotice = async (
  id: string,
  dto: Partial<CreateNoticeDto>,
): Promise<NextResponse> => {
  const updatedNotice = await updateNoticeService(id, dto);

  if (!updatedNotice) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};

// 강의 삭제
export const deleteNotice = async (id: string): Promise<NextResponse> => {
  const deletedNotice = await deleteNoticeService(id);

  if (!deletedNotice) {
    throw NextResponse.json(
      { error: "Failed to update lecture" },
      { status: 500 },
    );
  }

  return NextResponse.json({ status: 200 });
};
