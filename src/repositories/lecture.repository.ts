import {
  GetLectureDto,
  GetLectureWithTutorDto,
  LectureDto,
  toJSON,
} from "@/dtos/lecture.dto";
import prisma from "@/utils/db";
import { Category } from "@prisma/client";

// 강의 생성
export const createLectureRepository = async (
  dto: LectureDto,
): Promise<void> => {
  try {
    await prisma.lecture.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 모든 강의 조회
export const getAllLecturesRepository = async (): Promise<
  GetLectureWithTutorDto[]
> => {
  try {
    const lectures = await prisma.lecture.findMany({
      include: {
        tutor: {
          select: {
            id: true,
            name: true,
            occupation: true,
          },
        },
        bookmarks: { where: { userId: "1" } }, //유저의 북마크 하나만 나옴
      },
    });

    return lectures.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 ID의 강의 조회
export const getLectureByIdRepository = async (
  id: string,
): Promise<GetLectureDto | null> => {
  try {
    const lecture = await prisma.lecture.findUnique({
      where: {
        id: id,
      },
      include: {
        tutor: true,
        bookmarks: { where: { userId: "1" } },
      },
    });
    return toJSON(lecture);
  } catch {
    return null;
  }
};

// 특정 corporationID의 강의 조회
export const getLectureByCorporationIdRepository = async (
  corporationId: string,
): Promise<GetLectureDto[]> => {
  try {
    const lectures = await prisma.lecture.findMany({
      where: {
        corporationId: corporationId,
      },
      include: {
        tutor: true,
        bookmarks: { where: { userId: "1" } },
      },
    });
    return lectures.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 강사의 강의 조회
export const getLectureByTutorIdRepository = async (
  tutorId: string,
): Promise<GetLectureWithTutorDto[]> => {
  try {
    const lectures = await prisma.lecture.findMany({
      where: {
        tutorId: tutorId,
      },
      include: {
        tutor: {
          select: { id: true, name: true, occupation: true },
        },
        bookmarks: { where: { userId: "1" } },
      },
    });
    return lectures.map(toJSON);
  } catch {
    return [];
  }
};

// 특정 CATEGORY 강의 조회
export const getLectureByCategoryRepository = async (
  category: Category,
): Promise<GetLectureWithTutorDto[]> => {
  try {
    const lecture = await prisma.lecture.findMany({
      where: {
        category: category,
      },
      include: {
        tutor: {
          select: { id: true, name: true, occupation: true },
        },
        bookmarks: { where: { userId: "1" } },
      },
    });

    return toJSON(lecture);
  } catch {
    return [];
  }
};

// 특정 Tag 강의 조회
export const getLectureByTagRepository = async (
  tag: string,
): Promise<GetLectureWithTutorDto[]> => {
  try {
    const lectures = await prisma.lecture.findMany({
      where: {
        tags: {
          has: tag, // `tag`와 일치하는 태그를 가진 항목들
        },
      },

      include: {
        tutor: {
          select: { id: true, name: true, occupation: true },
        },
        bookmarks: { where: { userId: "1" } },
      },
      take: 6,
    });

    return lectures.map(toJSON);
  } catch {
    return [];
  }
};

// 강의 업데이트
export const updateLectureRepository = async (
  dto: LectureDto,
): Promise<void> => {
  try {
    await prisma.lecture.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 강의 삭제
export const deleteLectureRepository = async (id: string): Promise<void> => {
  try {
    await prisma.lecture.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
