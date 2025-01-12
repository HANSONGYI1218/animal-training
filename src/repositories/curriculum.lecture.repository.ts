import {
  CurriculumLectureDto,
  SelectCurriculumLectureDto,
  toJSON,
} from "@/dtos/curriculum.lecture.dto";
import prisma from "@/utils/db";
import { AnimalType, CurriculumCategory } from "@prisma/client";

// 커리큘럼 강의 생성
export const createCurriculumLectureRepository = async (
  dto: CurriculumLectureDto,
): Promise<void> => {
  try {
    await prisma.curriculumLecture.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 모든 커리큘럼 강의 조회
export const getSelectCurriculumLecturesRepository = async (
  dto: SelectCurriculumLectureDto,
): Promise<CurriculumLectureDto[]> => {
  try {
    const curriculumLectures = await prisma.curriculumLecture.findMany({
      where: {
        animal_type: dto?.animal_type, // 정확히 일치하는 값
        animal_ages: {
          has: dto?.animal_age, // 배열에 포함된 값인지 확인
        },
        animal_sizes: {
          has: dto?.animal_size, // 배열에 포함된 값인지 확인
        },
      },
      orderBy: {
        index: "asc", // 오름차순 정렬
      },
    });

    return curriculumLectures.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 ID의 커리큘럼 강의 조회
export const getCurriculumLectureByIdRepository = async (
  id: string,
): Promise<CurriculumLectureDto | null> => {
  try {
    const curriculumLecture = await prisma.curriculumLecture.findUnique({
      where: {
        id: id,
      },
    });

    if (!curriculumLecture) {
      return null;
    }
    return toJSON(curriculumLecture);
  } catch {
    return null;
  }
};

// 특정 category의 커리큘럼 강의 조회
export const getCurriculumLectureByCategoryRepository = async (
  category: CurriculumCategory,
  animalType: AnimalType,
): Promise<CurriculumLectureDto[]> => {
  try {
    const curriculumLectures = await prisma.curriculumLecture.findMany({
      where: {
        category: category,
        animal_type: animalType,
      },
    });

    return curriculumLectures.map(toJSON);
  } catch {
    return [];
  }
};

// 커리큘럼 강의 업데이트
export const updateCurriculumLectureRepository = async (
  dto: CurriculumLectureDto,
): Promise<void> => {
  try {
    await prisma.curriculumLecture.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 커리큘럼 강의 삭제
export const deleteCurriculumLectureRepository = async (
  id: string,
): Promise<void> => {
  try {
    await prisma.curriculumLecture.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
