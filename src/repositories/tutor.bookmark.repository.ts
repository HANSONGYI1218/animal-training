import prisma from "@/utils/db";
import {
  CreateTutorBookmarkDto,
  GetTutorBookmarkDto,
} from "@/dtos/tutor.bookmark.dto";

// 북마크 생성
export const createTutorBookmarkRepository = async (
  dto: CreateTutorBookmarkDto,
): Promise<void> => {
  try {
    await prisma.tutorBookmark.create({
      data: {
        userId: dto.userId,
        tutorId: dto.tutorId,
      },
    });
  } catch (error: any) {
    return error;
  }
};

// 특정 ID의 북마크 조회
export const getTutorBookmarkByIdRepository = async (
  id: string,
): Promise<GetTutorBookmarkDto | null> => {
  try {
    const tutorBookmark = await prisma.tutorBookmark.findUnique({
      where: {
        id: id,
      },
    });

    if (!tutorBookmark) {
      return null;
    }

    return tutorBookmark as GetTutorBookmarkDto;
  } catch {
    return null;
  }
};

// 북마크 삭제
export const deleteTutorBookmarkRepository = async (
  id: string,
): Promise<void> => {
  try {
    await prisma.tutorBookmark.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
