import {
  CreateCurriculumLectureDto,
  GetCurriculumLectureDto,
} from "@/dtos/curriculum-lecture.dtos";
import {
  createCurriculumLectureRepository,
  deleteCurriculumLectureRepository,
  getAllCurriculumLecturesRepository,
  getCurriculumLectureByIdRepository,
  getCurriculumLectureByCategoryRepository,
  updateCurriculumLectureRepository,
} from "@/repositorys/curriculum-lecture.repositorys";
import { CurriculumCategory } from "@prisma/client";

// 커리큘럼 강의 생성
export const createCurriculumLectureService = async (
  dto: CreateCurriculumLectureDto,
): Promise<CreateCurriculumLectureDto | null> => {
  try {
    // const isExisted = await getCurriculumLectureByIdRepository(dto.id);
    // if(isExisted) return null;

    const curriculumLecture = await createCurriculumLectureRepository(dto);

    return curriculumLecture as CreateCurriculumLectureDto;
  } catch {
    return null;
  }
};

// 모든 커리큘럼 강의 조회
export const getAllCurriculumLecturesService = async (): Promise<
  GetCurriculumLectureDto[]
> => {
  try {
    const curriculumLectures = await getAllCurriculumLecturesRepository();

    return curriculumLectures as GetCurriculumLectureDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 커리큘럼 강의 조회
export const getCurriculumLectureByIdService = async (
  id: string,
): Promise<GetCurriculumLectureDto | null> => {
  try {
    const curriculumLecture = await getCurriculumLectureByIdRepository(id);

    if (!curriculumLecture) {
      return null;
    }

    return curriculumLecture as GetCurriculumLectureDto;
  } catch {
    return null;
  }
};

// 특정 category의 커리큘럼 강의 조회
export const getCurriculumLectureByCategoryService = async (
  id: CurriculumCategory,
): Promise<GetCurriculumLectureDto[]> => {
  try {
    const curriculumLecture =
      await getCurriculumLectureByCategoryRepository(id);

    return curriculumLecture as GetCurriculumLectureDto[];
  } catch {
    return [];
  }
};

// 커리큘럼 강의 업데이트
export const updateCurriculumLectureService = async (
  category: string,
  dto: Partial<CreateCurriculumLectureDto>,
): Promise<CreateCurriculumLectureDto | null> => {
  try {
    const curriculumLecture = getCurriculumLectureByIdService(category);

    if (!curriculumLecture) {
      return null;
    }

    const updatedCurriculumLecture = await updateCurriculumLectureRepository(
      category,
      dto,
    );

    return updatedCurriculumLecture as CreateCurriculumLectureDto;
  } catch {
    return null;
  }
};

// 커리큘럼 강의 삭제
export const deleteCurriculumLectureService = async (
  id: string,
): Promise<CreateCurriculumLectureDto | null> => {
  try {
    const curriculumLecture = getCurriculumLectureByIdService(id);

    if (!curriculumLecture) {
      return null;
    }

    const deletedCurriculumLecture =
      await deleteCurriculumLectureRepository(id);

    return deletedCurriculumLecture as CreateCurriculumLectureDto;
  } catch {
    return null;
  }
};
