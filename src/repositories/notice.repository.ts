import { toJSON } from "@/dtos/notice.dto";
import { NoticeDto } from "@/dtos/notice.dto";
import prisma from "@/utils/db";

// 공지 생성
export const createNoticeRepository = async (dto: NoticeDto): Promise<void> => {
  try {
    await prisma.notice.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 모든 공지 조회
export const getAllNoticesRepository = async (): Promise<NoticeDto[]> => {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [
        { isFixed: "desc" }, // isFixed 값이 true인 항목을 우선
        { index: "asc" }, // 그 안에서 index 값 기준 정렬
      ],
    });

    return notices.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 ID의 공지 조회
export const getNoticeByIdRepository = async (
  id: string,
): Promise<NoticeDto | null> => {
  try {
    const notice = await prisma.notice.findUnique({
      where: {
        id: id,
      },
    });
    return toJSON(notice);
  } catch {
    return null;
  }
};

// 공지 업데이트
export const updateNoticeRepository = async (dto: NoticeDto): Promise<void> => {
  try {
    await prisma.notice.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 공지 삭제
export const deleteNoticeRepository = async (id: string): Promise<void> => {
  try {
    await prisma.notice.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
