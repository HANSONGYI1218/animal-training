import {
  CreateLectureBookmarkDto,
  GetLectureBookmarkDto,
} from "@/dtos/lecture.bookmark.dto";
import {
  createLectureBookmarkRepository,
  deleteLectureBookmarkRepository,
  getLectureBookmarkByIdRepository,
} from "@/repositories/lecture.bookmark.repository";

// 북마크 생성
export const createLectureBookmarkService = async (
  dto: CreateLectureBookmarkDto,
): Promise<CreateLectureBookmarkDto | null> => {
  try {
    // const isExisted = await getLectureBookmarkByIdService(dto.id);
    // if(isExisted) return null;

    const lectureBookmark = await createLectureBookmarkRepository(dto);

    if (!lectureBookmark) {
      return null;
    }
    return lectureBookmark as CreateLectureBookmarkDto;
  } catch {
    return null;
  }
};

// 특정 ID의 북마크 조회
export const getLectureBookmarkByIdService = async (
  id: string,
): Promise<GetLectureBookmarkDto | null> => {
  try {
    const lectureBookmark = await getLectureBookmarkByIdRepository(id);

    if (!lectureBookmark) {
      return null;
    }
    return lectureBookmark as GetLectureBookmarkDto;
  } catch {
    return null;
  }
};

// 북마크 삭제
export const deleteLectureBookmarkService = async (
  id: string,
): Promise<CreateLectureBookmarkDto | null> => {
  try {
    const lectureBookmark = getLectureBookmarkByIdRepository(id);

    if (!lectureBookmark) {
      return null;
    }

    const deletedLectureBookmark = await deleteLectureBookmarkRepository(id);

    return deletedLectureBookmark as CreateLectureBookmarkDto;
  } catch {
    return null;
  }
};
