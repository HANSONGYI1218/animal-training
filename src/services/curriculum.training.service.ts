import {
  CreateCurriculumTrainingDto,
  CurriculumTrainingDto,
  GetCurriculumTrainingDto,
  toJSON,
  UpdateCurriculumTrainingDto,
} from "@/dtos/curriculum.training.dto";
import { CurriculumTrainingEntity } from "@/entities/curriculum.training.entity";
import {
  createCurriculumTrainingRepository,
  deleteCurriculumTrainingRepository,
  getAllCurriculumTrainingsRepository,
  getCurriculumTrainingByIdRepository,
  updateCurriculumTrainingRepository,
} from "@/repositories/curriculum.training.repository";
import { AnimalType } from "@prisma/client";

// 커리큘럼 훈련 생성
export const createCurriculumTrainingService = async (
  dto: CreateCurriculumTrainingDto,
): Promise<void> => {
  try {
    // const isExisted = await getCurriculumTrainingByIdRepository(dto.id);
    // if(isExisted) return null;

    await createCurriculumTrainingRepository(dto);
  } catch (error: any) {
    return error;
  }
};

// 모든 커리큘럼 훈련 조회
export const getAllCurriculumTrainingsService = async (
  animal_type: AnimalType,
): Promise<GetCurriculumTrainingDto[]> => {
  try {
    const curriculumTrainings =
      await getAllCurriculumTrainingsRepository(animal_type);

    return curriculumTrainings as GetCurriculumTrainingDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 커리큘럼 훈련 조회
export const getCurriculumTrainingByIdService = async (
  id: string,
): Promise<CurriculumTrainingDto | null> => {
  try {
    const curriculumTraining = await getCurriculumTrainingByIdRepository(id);

    if (!curriculumTraining) {
      return null;
    }

    return curriculumTraining as CurriculumTrainingDto;
  } catch {
    return null;
  }
};

// 커리큘럼 훈련 업데이트
export const updateCurriculumTrainingService = async (
  dto: UpdateCurriculumTrainingDto,
): Promise<void> => {
  try {
    const curriculumTraining = await getCurriculumTrainingByIdService(dto.id);

    if (!curriculumTraining) {
      throw new Error("Training not found");
    }

    const updateCurriculumTraining = new CurriculumTrainingEntity({
      ...curriculumTraining,
      index: dto?.index ?? curriculumTraining.index,
      title: dto?.title ?? curriculumTraining.title,
      content: dto?.content ?? curriculumTraining.content,
      animal_type: dto?.animal_type ?? curriculumTraining.animal_type,
      category: dto?.category ?? curriculumTraining.category,
      trainingTime: dto?.trainingTime ?? curriculumTraining.trainingTime,
    });

    await updateCurriculumTrainingRepository(toJSON(updateCurriculumTraining));
  } catch (error: any) {
    return error;
  }
};

// 커리큘럼 훈련 삭제
export const deleteCurriculumTrainingService = async (
  id: string,
): Promise<void> => {
  try {
    await deleteCurriculumTrainingRepository(id);
  } catch (error: any) {
    return error;
  }
};
