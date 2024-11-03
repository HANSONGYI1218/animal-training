import { CurriculumLectureDto, toJSON } from "@/dtos/curriculum.lecture.dto";
import prisma from "@/utils/db";
import { CurriculumCategory } from "@prisma/client";

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
export const getAllCurriculumLecturesRepository = async (): Promise<
  CurriculumLectureDto[]
> => {
  try {
    const curriculumLectures = await prisma.curriculumLecture.findMany({});

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
): Promise<CurriculumLectureDto[]> => {
  try {
    const curriculumLectures = await prisma.curriculumLecture.findMany({
      where: {
        category: category,
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
