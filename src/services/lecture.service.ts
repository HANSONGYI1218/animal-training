import {
  CreateLectureDto,
  GetLectureDto,
  GetLectureWithTutorDto,
  toJSON,
  UpdateLectureDto,
} from "@/dtos/lecture.dto";
import { LectureEntity } from "@/entities/lecture.entity";
import {
  createLectureRepository,
  deleteLectureRepository,
  getAllLecturesRepository,
  getLectureByCategoryRepository,
  getLectureByCorporationIdRepository,
  getLectureByIdRepository,
  getLectureByTagRepository,
  getLectureByTutorIdRepository,
  updateLectureRepository,
} from "@/repositories/lecture.repository";
import { Category } from "@prisma/client";

// 강의 생성
export const createLectureService = async (
  dto: CreateLectureDto,
): Promise<void> => {
  try {
    // const isExisted = await getLectureByIdRepository(dto.id);
    // if(isExisted) return null;

    const newLecture = new LectureEntity({
      ...dto,
    });

    await createLectureRepository(toJSON(newLecture));
  } catch (error: any) {
    return error;
  }
};

// 모든 강의 조회
export const getAllLecturesService = async (): Promise<
  GetLectureWithTutorDto[]
> => {
  try {
    const lectures = await getAllLecturesRepository();

    return lectures as GetLectureWithTutorDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 강의 조회
export const getLectureByIdService = async (
  id: string,
): Promise<GetLectureDto | null> => {
  try {
    const lecture = await getLectureByIdRepository(id);

    if (!lecture) {
      throw new Error("lecture not found");
    }

    return lecture as GetLectureDto;
  } catch {
    return null;
  }
};

// 특정 corporationID의 강의 조회
export const getLectureByCorporationIdService = async (
  corporationId: string,
): Promise<GetLectureDto[]> => {
  try {
    const lectures = await getLectureByCorporationIdRepository(corporationId);

    return lectures;
  } catch {
    return [];
  }
};

// 특정 강사의 강의 조회
export const getLectureByTutorIdService = async (
  tutorId: string,
): Promise<GetLectureWithTutorDto[]> => {
  try {
    const lecture = await getLectureByTutorIdRepository(tutorId);

    return lecture as GetLectureWithTutorDto[];
  } catch {
    return [];
  }
};

// 특정 CATEGORY 강의 조회
export const getLectureByCategoryService = async (
  category: Category,
): Promise<GetLectureWithTutorDto[]> => {
  try {
    const lecture = await getLectureByCategoryRepository(category);

    return lecture as GetLectureWithTutorDto[];
  } catch {
    return [];
  }
};

// 특정 Tag 강의 조회
export const getLectureByTagService = async (
  tag: string,
): Promise<GetLectureWithTutorDto[]> => {
  try {
    const lecture = await getLectureByTagRepository(tag);

    return lecture as GetLectureWithTutorDto[];
  } catch {
    return [];
  }
};

// 강의 업데이트
export const updateLectureService = async (
  dto: UpdateLectureDto,
): Promise<void> => {
  try {
    const lecture = await getLectureByIdService(dto.id);

    if (!lecture) {
      throw new Error("lecture not found");
    }

    const updateLecture = new LectureEntity({
      ...lecture,
      title: dto?.title ?? lecture.title,
      content: dto?.content ?? lecture.content,
      animal_type: dto?.animal_type ?? lecture.animal_type,
      price_type: dto?.price_type ?? lecture.price_type,
      category: dto?.category ?? lecture.category,
      thumbnailPath: dto?.thumbnailPath ?? lecture.thumbnailPath,
      videoUrl: dto?.videoUrl ?? lecture.videoUrl,
      like: dto?.like ?? lecture.like,
      tags: dto?.tags ?? lecture.tags,
      tutorId: dto?.tutorId ?? lecture.tutorId,
    });

    await updateLectureRepository(toJSON(updateLecture));
  } catch (error: any) {
    return error;
  }
};

// 강의 삭제
export const deleteLectureService = async (id: string): Promise<void> => {
  try {
    const lecture = getLectureByIdService(id);

    if (!lecture) {
      throw new Error("lecture not found");
    }

    await deleteLectureRepository(id);
  } catch (error: any) {
    return error;
  }
};
