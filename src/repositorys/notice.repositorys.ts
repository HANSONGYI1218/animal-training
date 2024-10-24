import { CreateNoticeDto, GetNoticeDto } from "@/dtos/notice.dtos";
import prisma from "@/utils/db";
import { Category } from "@prisma/client";

// 공지 생성
export const createNoticeRepository = async (
  dto: CreateNoticeDto,
): Promise<CreateNoticeDto | null> => {
  try {
    const notice = await prisma.notice.create({
      data: {
        title: dto.title,
        content: dto.content,
        image: dto.image,
        attachments: dto.attachments,
        isFixed: dto.isFixed,
        index: dto.index,
      },
    });

    return notice as CreateNoticeDto;
  } catch {
    return null;
  }
};

// 모든 공지 조회
export const getAllNoticesRepository = async (): Promise<GetNoticeDto[]> => {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: [
        { isFixed: "desc" }, // isFixed 값이 true인 항목을 우선
        { index: "asc" }, // 그 안에서 index 값 기준 정렬
      ],
    });

    return notices as GetNoticeDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 공지 조회
export const getNoticeByIdRepository = async (
  id: string,
): Promise<GetNoticeDto | null> => {
  try {
    const notice = await prisma.notice.findUnique({
      where: {
        id: id,
      },
    });
    return notice as GetNoticeDto;
  } catch {
    return null;
  }
};

// 공지 업데이트
export const updateNoticeRepository = async (
  id: string,
  dto: Partial<CreateNoticeDto>,
): Promise<CreateNoticeDto | null> => {
  try {
    const updatedNotice = await prisma.notice.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
    return updatedNotice as CreateNoticeDto;
  } catch {
    return null;
  }
};

// 공지 삭제
export const deleteNoticeRepository = async (
  id: string,
): Promise<CreateNoticeDto | null> => {
  try {
    const deletedNotice = await prisma.notice.delete({
      where: {
        id: id,
      },
    });
    return deletedNotice as CreateNoticeDto;
  } catch {
    return null;
  }
};
