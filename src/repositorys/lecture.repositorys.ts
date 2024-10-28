import {
  CreateLectureDto,
  GetLectureDetailDto,
  GetLectureDto,
} from "@/dtos/lecture.dtos";
import prisma from "@/utils/db";
import { Category } from "@prisma/client";
import { string } from "zod";

// 강의 생성
export const createLectureRepository = async (
  dto: CreateLectureDto,
): Promise<CreateLectureDto | null> => {
  try {
    const lecture = await prisma.lecture.create({
      data: {
        title: dto.title,
        content: dto.content,
        animal_type: dto.animal_type,
        price_type: dto.price_type,
        category: dto.category,
        thumbnailPath: dto.thumbnailPath,
        videoUrl: dto.videoUrl,
        like: dto.like,
        tags: dto.tags,
        tutorId: dto.tutorId,
      },
    });

    return lecture as CreateLectureDto;
  } catch {
    return null;
  }
};

// 모든 강의 조회
export const getAllLecturesRepository = async (): Promise<GetLectureDto[]> => {
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

    return lectures as GetLectureDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 강의 조회
export const getLectureByIdRepository = async (
  id: string,
): Promise<GetLectureDetailDto | null> => {
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
    return lecture as GetLectureDetailDto;
  } catch {
    return null;
  }
};

// 특정 강사의 강의 조회
export const getLectureByTutorIdRepository = async (
  tutorId: string,
): Promise<GetLectureDto[]> => {
  try {
    const lecture = await prisma.lecture.findMany({
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
    return lecture as GetLectureDto[];
  } catch {
    return [];
  }
};

// 특정 CATEGORY 강의 조회
export const getLectureByCategoryRepository = async (
  category: Category,
): Promise<GetLectureDto[]> => {
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

    return lecture as GetLectureDto[];
  } catch {
    return [];
  }
};

// 특정 Tag 강의 조회
export const getLectureByTagRepository = async (
  tag: string,
): Promise<GetLectureDto[]> => {
  try {
    const lecture = await prisma.lecture.findMany({
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

    return lecture as GetLectureDto[];
  } catch {
    return [];
  }
};

// 강의 업데이트
export const updateLectureRepository = async (
  id: string,
  dto: Partial<CreateLectureDto>,
): Promise<CreateLectureDto | null> => {
  try {
    const updatedLecture = await prisma.lecture.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
    return updatedLecture as CreateLectureDto;
  } catch {
    return null;
  }
};

// 강의 삭제
export const deleteLectureRepository = async (
  id: string,
): Promise<CreateLectureDto | null> => {
  try {
    const deletedLecture = await prisma.lecture.delete({
      where: {
        id: id,
      },
    });
    return deletedLecture as CreateLectureDto;
  } catch {
    return null;
  }
};
