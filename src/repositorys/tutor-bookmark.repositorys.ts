import prisma from "@/utils/db";
import {
  CreateTutorBookmarkDto,
  GetTutorBookmarkDto,
} from "@/dtos/tutor-bookmark.dtos";

// 북마크 생성
export const createTutorBookmarkRepository = async (
  dto: CreateTutorBookmarkDto,
): Promise<CreateTutorBookmarkDto | null> => {
  try {
    const tutorBookmark = await prisma.tutorBookmark.create({
      data: {
        userId: dto.userId,
        tutorId: dto.tutorId,
      },
    });

    return tutorBookmark as CreateTutorBookmarkDto;
  } catch {
    return null;
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
): Promise<CreateTutorBookmarkDto | null> => {
  try {
    const deletedTutorBook = await prisma.tutorBookmark.delete({
      where: {
        id: id,
      },
    });

    return deletedTutorBook as CreateTutorBookmarkDto;
  } catch {
    return null;
  }
};
