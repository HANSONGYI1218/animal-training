import {
  CreateTutorBookmarkDto,
  GetTutorBookmarkDto,
} from "@/dtos/tutor.bookmark.dto";
import {
  createTutorBookmarkRepository,
  deleteTutorBookmarkRepository,
  getTutorBookmarkByIdRepository,
} from "@/repositories/tutor.bookmark.repository";

// 북마크 생성
export const createTutorBookmarkService = async (
  dto: CreateTutorBookmarkDto,
): Promise<void> => {
  try {
    // const isExisted = await getTutorBookmarkByIdService(dto.id);
    // if(isExisted) return null;

    await createTutorBookmarkRepository(dto);
  } catch (error: any) {
    return error;
  }
};

// 특정 ID의 북마크 조회
export const getTutorBookmarkByIdService = async (
  id: string,
): Promise<GetTutorBookmarkDto | null> => {
  try {
    const tutorBookmark = await getTutorBookmarkByIdRepository(id);

    if (!tutorBookmark) {
      return null;
    }
    return tutorBookmark as GetTutorBookmarkDto;
  } catch {
    return null;
  }
};

// 북마크 삭제
export const deleteTutorBookmarkService = async (id: string): Promise<void> => {
  try {
    const tutorBookmark = getTutorBookmarkByIdRepository(id);

    if (!tutorBookmark) {
      throw new Error("tutorBookmark not found");
    }

    await deleteTutorBookmarkRepository(id);
  } catch (error: any) {
    return error;
  }
};
