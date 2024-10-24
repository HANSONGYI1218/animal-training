import {
  CreateLectureDto,
  GetLectureDetailDto,
  GetLectureDto,
} from "@/dtos/lecture.dtos";
import {
  createLectureRepository,
  deleteLectureRepository,
  getAllLecturesRepository,
  getLectureByCategoryRepository,
  getLectureByIdRepository,
  getLectureByTagRepository,
  getLectureByTutorIdRepository,
  updateLectureRepository,
} from "@/repositorys/lecture.repositorys";
import { Category } from "@prisma/client";

// 강의 생성
export const createLectureService = async (
  dto: CreateLectureDto,
): Promise<CreateLectureDto | null> => {
  try {
    // const isExisted = await getLectureByIdRepository(dto.id);
    // if(isExisted) return null;

    const lecture = await createLectureRepository(dto);

    return lecture as CreateLectureDto;
  } catch {
    return null;
  }
};

// 모든 강의 조회
export const getAllLecturesService = async (): Promise<GetLectureDto[]> => {
  try {
    const lectures = await getAllLecturesRepository();

    return lectures as GetLectureDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 강의 조회
export const getLectureByIdService = async (
  id: string,
): Promise<GetLectureDetailDto | null> => {
  try {
    const lecture = await getLectureByIdRepository(id);

    if (!lecture) {
      return null;
    }

    return lecture as GetLectureDetailDto;
  } catch {
    return null;
  }
};

// 특정 강사의 강의 조회
export const getLectureByTutorIdService = async (
  tutorId: string,
): Promise<GetLectureDto[]> => {
  try {
    const lecture = await getLectureByTutorIdRepository(tutorId);

    return lecture as GetLectureDto[];
  } catch {
    return [];
  }
};

// 특정 CATEGORY 강의 조회
export const getLectureByCategoryService = async (
  category: Category,
): Promise<GetLectureDto[]> => {
  try {
    const lecture = await getLectureByCategoryRepository(category);

    return lecture as GetLectureDto[];
  } catch {
    return [];
  }
};

// 특정 Tag 강의 조회
export const getLectureByTagService = async (
  tag: string,
): Promise<GetLectureDto[]> => {
  try {
    const lecture = await getLectureByTagRepository(tag);

    return lecture as GetLectureDto[];
  } catch {
    return [];
  }
};

// 강의 업데이트
export const updateLectureService = async (
  id: string,
  dto: Partial<CreateLectureDto>,
): Promise<CreateLectureDto | null> => {
  try {
    const lecture = getLectureByIdService(id);

    if (!lecture) {
      return null;
    }

    const updatedLecture = await updateLectureRepository(id, dto);

    return updatedLecture as CreateLectureDto;
  } catch {
    return null;
  }
};

// 강의 삭제
export const deleteLectureService = async (
  id: string,
): Promise<CreateLectureDto | null> => {
  try {
    const lecture = getLectureByIdService(id);

    if (!lecture) {
      return null;
    }

    const deletedLecture = await deleteLectureRepository(id);

    return deletedLecture as CreateLectureDto;
  } catch {
    return null;
  }
};
