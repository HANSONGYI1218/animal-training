import {
  CreateCurriculumTrainingDto,
  GetCurriculumTrainingDto,
} from "@/dtos/curriculum-training.dtos";
import {
  createCurriculumTrainingRepository,
  deleteCurriculumTrainingRepository,
  getAllCurriculumTrainingsRepository,
  updateCurriculumTrainingRepository,
} from "@/repositorys/curriculum-training.repositorys";

// 커리큘럼 훈련 생성
export const createCurriculumTrainingService = async (
  dto: CreateCurriculumTrainingDto,
): Promise<CreateCurriculumTrainingDto | null> => {
  try {
    // const isExisted = await getCurriculumTrainingByIdRepository(dto.id);
    // if(isExisted) return null;

    const curriculumTraining = await createCurriculumTrainingRepository(dto);

    return curriculumTraining as CreateCurriculumTrainingDto;
  } catch {
    return null;
  }
};

// 모든 커리큘럼 훈련 조회
export const getAllCurriculumTrainingsService = async (): Promise<
  GetCurriculumTrainingDto[]
> => {
  try {
    const curriculumTrainings = await getAllCurriculumTrainingsRepository();

    return curriculumTrainings as GetCurriculumTrainingDto[];
  } catch {
    return [];
  }
};

// 커리큘럼 훈련 업데이트
export const updateCurriculumTrainingService = async (
  category: string,
  dto: Partial<CreateCurriculumTrainingDto>,
): Promise<CreateCurriculumTrainingDto | null> => {
  try {
    const updatedCurriculumTraining = await updateCurriculumTrainingRepository(
      category,
      dto,
    );

    return updatedCurriculumTraining as CreateCurriculumTrainingDto;
  } catch {
    return null;
  }
};

// 커리큘럼 훈련 삭제
export const deleteCurriculumTrainingService = async (
  id: string,
): Promise<CreateCurriculumTrainingDto | null> => {
  try {
    const deletedCurriculumTraining =
      await deleteCurriculumTrainingRepository(id);

    return deletedCurriculumTraining as CreateCurriculumTrainingDto;
  } catch {
    return null;
  }
};
