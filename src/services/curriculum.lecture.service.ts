import {
  CreateCurriculumLectureDto,
  CurriculumLectureDto,
  SelectCurriculumLectureDto,
  toJSON,
  UpdateCurriculumLectureDto,
} from "@/dtos/curriculum.lecture.dto";
import { CurriculumLectureEntity } from "@/entities/curriculum.lecture.entity";
import {
  createCurriculumLectureRepository,
  deleteCurriculumLectureRepository,
  getSelectCurriculumLecturesRepository,
  getCurriculumLectureByIdRepository,
  getCurriculumLectureByCategoryRepository,
  updateCurriculumLectureRepository,
} from "@/repositories/curriculum.lecture.repository";
import { AnimalType, CurriculumCategory } from "@prisma/client";

// 커리큘럼 강의 생성
export const createCurriculumLectureService = async (
  dto: CreateCurriculumLectureDto,
): Promise<void> => {
  try {
    // const isExisted = await getCurriculumLectureByIdRepository(dto.id);
    // if(isExisted) return null;
    const newCurriculumLecture = new CurriculumLectureEntity({
      ...dto,
    });

    await createCurriculumLectureRepository(toJSON(newCurriculumLecture));
  } catch (error: any) {
    return error;
  }
};

// 모든 커리큘럼 강의 조회
export const getSelectCurriculumLecturesService = async (
  dto: SelectCurriculumLectureDto,
): Promise<CurriculumLectureDto[]> => {
  try {
    const curriculumLectures = await getSelectCurriculumLecturesRepository(dto);

    return curriculumLectures as CurriculumLectureDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 커리큘럼 강의 조회
export const getCurriculumLectureByIdService = async (
  id: string,
): Promise<CurriculumLectureDto | null> => {
  try {
    const curriculumLecture = await getCurriculumLectureByIdRepository(id);

    if (!curriculumLecture) {
      return null;
    }

    return curriculumLecture as CurriculumLectureDto;
  } catch {
    return null;
  }
};

// 특정 category의 커리큘럼 강의 조회
export const getCurriculumLectureByCategoryService = async (
  category: CurriculumCategory,
  animalType: AnimalType,
): Promise<CurriculumLectureDto[]> => {
  try {
    const curriculumLecture = await getCurriculumLectureByCategoryRepository(
      category,
      animalType,
    );

    return curriculumLecture as CurriculumLectureDto[];
  } catch {
    return [];
  }
};

// 커리큘럼 강의 업데이트
export const updateCurriculumLectureService = async (
  dto: UpdateCurriculumLectureDto,
): Promise<void> => {
  try {
    const curriculumLecture = await getCurriculumLectureByIdService(dto.id);

    if (!curriculumLecture) {
      throw new Error("lecture not found");
    }

    const updateCurriculumLecture = new CurriculumLectureEntity({
      ...curriculumLecture,
      index: dto?.index ?? curriculumLecture.index,
      title: dto?.title ?? curriculumLecture.title,
      content: dto?.content ?? curriculumLecture.content,
      animal_type: dto?.animal_type ?? curriculumLecture.animal_type,
      category: dto?.category ?? curriculumLecture.category,
      thumbnailPath: dto?.thumbnailPath ?? curriculumLecture.thumbnailPath,
      videoUrl: dto?.videoUrl ?? curriculumLecture.videoUrl,
      videoTime: dto?.videoTime ?? curriculumLecture.videoTime,
      tutorId: dto?.tutorId ?? curriculumLecture.tutorId,
    });

    await updateCurriculumLectureRepository(toJSON(updateCurriculumLecture));
  } catch (error: any) {
    return error;
  }
};

// 커리큘럼 강의 삭제
export const deleteCurriculumLectureService = async (
  id: string,
): Promise<void> => {
  try {
    const curriculumLecture = await getCurriculumLectureByIdService(id);

    if (!curriculumLecture) {
      throw new Error("lecture not found");
    }

    await deleteCurriculumLectureRepository(id);
  } catch (error: any) {
    return error;
  }
};
