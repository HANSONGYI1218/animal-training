import prisma from "@/utils/db";
import {
  CreateLectureBookmarkDto,
  GetLectureBookmarkDto,
} from "@/dtos/lecture-bookmark.dtos";

// 북마크 생성
export const createLectureBookmarkRepository = async (
  dto: CreateLectureBookmarkDto,
): Promise<CreateLectureBookmarkDto | null> => {
  try {
    const lectureBookmark = await prisma.lectureBookmark.create({
      data: {
        ...dto,
      },
    });

    return lectureBookmark as CreateLectureBookmarkDto;
  } catch {
    return null;
  }
};

// 특정 ID의 북마크 조회
export const getLectureBookmarkByIdRepository = async (
  id: string,
): Promise<GetLectureBookmarkDto | null> => {
  try {
    const lectureBookmark = await prisma.lectureBookmark.findUnique({
      where: {
        id: id,
      },
    });

    if (!lectureBookmark) {
      return null;
    }

    return lectureBookmark as GetLectureBookmarkDto;
  } catch {
    return null;
  }
};

// 북마크 삭제
export const deleteLectureBookmarkRepository = async (
  id: string,
): Promise<CreateLectureBookmarkDto | null> => {
  try {
    const deletedLectureBook = await prisma.lectureBookmark.delete({
      where: {
        id: id,
      },
    });

    return deletedLectureBook as CreateLectureBookmarkDto;
  } catch {
    return null;
  }
};
