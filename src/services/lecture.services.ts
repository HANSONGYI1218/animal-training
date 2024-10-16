import { CreateLectureDto, GetLectureDto } from "@/dtos/lecture.dtos";
import prisma from "@/utils/db";
import { Category } from "@prisma/client";

// 강의 생성
export const createLectureService = async (
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
        tutor_name: dto.tutor_name,
        tutor_occupation: dto.tutor_occupation,
        videoUrl: dto.videoUrl,
        like: dto.like,
        tags: dto.tags,
        bookmark: dto.bookmark,
        tutorId: dto.tutorId,
      },
    });

    if (!lecture) {
      return null;
    }
    return lecture as CreateLectureDto;
  } catch {
    return null;
  }
};

// 모든 강의 조회
export const getAllLecturesService = async (): Promise<GetLectureDto[]> => {
  try {
    const lectures = await prisma.lecture.findMany();

    return lectures as GetLectureDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 강의 조회
export const getLectureByIdService = async (
  id: string,
): Promise<GetLectureDto | null> => {
  try {
    const lecture = await prisma.lecture.findUnique({
      where: {
        id: id,
      },
    });
    return lecture as GetLectureDto;
  } catch {
    return null;
  }
};

// 특정 CATEGORY 강의 조회
export const getLectureByCategoryService = async (
  category: Category,
): Promise<GetLectureDto[] | null> => {
  try {
    const lecture = await prisma.lecture.findMany({
      where: {
        category: category,
      },
    });
    return lecture as GetLectureDto[];
  } catch {
    return null;
  }
};

// 강의 업데이트
export const updateLectureService = async (
  id: string,
  dto: Partial<CreateLectureDto>,
): Promise<GetLectureDto | null> => {
  try {
    const lecture = getLectureByIdService(id);

    if (!lecture) {
      return null;
    }

    const updatedLecture = await prisma.lecture.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
    return updatedLecture as GetLectureDto;
  } catch {
    return null;
  }
};

// 강의 삭제
export const deleteLectureService = async (
  id: string,
): Promise<GetLectureDto | null> => {
  try {
    const lecture = getLectureByIdService(id);

    if (!lecture) {
      return null;
    }

    const deletedLecture = await prisma.lecture.delete({
      where: {
        id: id,
      },
    });
    return deletedLecture as GetLectureDto;
  } catch {
    return null;
  }
};
