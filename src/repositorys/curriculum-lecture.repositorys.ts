import {
  CreateCurriculumLectureDto,
  GetCurriculumLectureDto,
} from "@/dtos/curriculum-lecture.dtos";
import prisma from "@/utils/db";
import { CurriculumCategory } from "@prisma/client";

// 커리큘럼 강의 생성
export const createCurriculumLectureRepository = async (
  dto: CreateCurriculumLectureDto,
): Promise<CreateCurriculumLectureDto | null> => {
  try {
    const curriculumLecture = await prisma.curriculumLecture.create({
      data: {
        index: dto.index,
        title: dto.title,
        content: dto.content,
        animal_type: dto.animal_type,
        category: dto.category,
        thumbnailPath: dto.thumbnailPath,
        videoUrl: dto.videoUrl,
        videoTime: dto.videoTime,
        tutorId: dto.tutorId,
      },
    });

    return curriculumLecture as CreateCurriculumLectureDto;
  } catch {
    return null;
  }
};

// 모든 커리큘럼 강의 조회
export const getAllCurriculumLecturesRepository = async (): Promise<
  GetCurriculumLectureDto[]
> => {
  try {
    const curriculumLectures = await prisma.curriculumLecture.findMany({});

    return curriculumLectures as GetCurriculumLectureDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 커리큘럼 강의 조회
export const getCurriculumLectureByIdRepository = async (
  id: string,
): Promise<GetCurriculumLectureDto | null> => {
  try {
    const curriculumLecture = await prisma.curriculumLecture.findUnique({
      where: {
        id: id,
      },
    });

    if (!curriculumLecture) {
      return null;
    }
    return curriculumLecture as GetCurriculumLectureDto;
  } catch {
    return null;
  }
};

// 특정 category의 커리큘럼 강의 조회
export const getCurriculumLectureByCategoryRepository = async (
  category: CurriculumCategory,
): Promise<GetCurriculumLectureDto[]> => {
  try {
    const curriculumLecture = await prisma.curriculumLecture.findMany({
      where: {
        category: category,
      },
    });

    return curriculumLecture as GetCurriculumLectureDto[];
  } catch {
    return [];
  }
};

// 커리큘럼 강의 업데이트
export const updateCurriculumLectureRepository = async (
  id: string,
  dto: Partial<CreateCurriculumLectureDto>,
): Promise<CreateCurriculumLectureDto | null> => {
  try {
    const updatedCurriculumLecture = await prisma.curriculumLecture.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
    return updatedCurriculumLecture as CreateCurriculumLectureDto;
  } catch {
    return null;
  }
};

// 커리큘럼 강의 삭제
export const deleteCurriculumLectureRepository = async (
  id: string,
): Promise<CreateCurriculumLectureDto | null> => {
  try {
    const deletedCurriculumLecture = await prisma.curriculumLecture.delete({
      where: {
        id: id,
      },
    });
    return deletedCurriculumLecture as CreateCurriculumLectureDto;
  } catch {
    return null;
  }
};
