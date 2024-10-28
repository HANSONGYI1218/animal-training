import {
  CreateTutorBookmarkDto,
  GetTutorBookmarkDto,
} from "@/dtos/tutor-bookmark.dtos";
import {
  createTutorBookmarkRepository,
  deleteTutorBookmarkRepository,
  getTutorBookmarkByIdRepository,
} from "@/repositorys/tutor-bookmark.repositorys";

// 북마크 생성
export const createTutorBookmarkService = async (
  dto: CreateTutorBookmarkDto,
): Promise<CreateTutorBookmarkDto | null> => {
  try {
    // const isExisted = await getTutorBookmarkByIdService(dto.id);
    // if(isExisted) return null;

    const tutorBookmark = await createTutorBookmarkRepository(dto);

    if (!tutorBookmark) {
      return null;
    }
    return tutorBookmark as CreateTutorBookmarkDto;
  } catch {
    return null;
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
export const deleteTutorBookmarkService = async (
  id: string,
): Promise<CreateTutorBookmarkDto | null> => {
  try {
    const tutorBookmark = getTutorBookmarkByIdRepository(id);

    if (!tutorBookmark) {
      return null;
    }

    const deletedTutorBookmark = await deleteTutorBookmarkRepository(id);

    return deletedTutorBookmark as CreateTutorBookmarkDto;
  } catch {
    return null;
  }
};
