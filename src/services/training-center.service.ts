import {
  CreateTrainingCenterDto,
  GetTrainingCenterDetailDto,
  GetTrainingCenterDto,
} from "@/dtos/training-center.dtos";
import {
  createTrainingCenterRepository,
  deleteTrainingCenterRepository,
  getAllTrainingCentersRepository,
  getTrainingCenterByIdRepository,
  updateTrainingCenterRepository,
} from "@/repositorys/training-center.repository";

// 훈련소 생성
export const createTrainingCenterService = async (
  dto: CreateTrainingCenterDto,
): Promise<CreateTrainingCenterDto | null> => {
  try {
    // const isExisted = await getTrainingCenterByIdService(dto.id);
    // if(isExisted) return null;

    const trainingCenter = await createTrainingCenterRepository(dto);

    if (!trainingCenter) {
      return null;
    }
    return trainingCenter as CreateTrainingCenterDto;
  } catch {
    return null;
  }
};

// 모든 강의 조회
export const getAllTrainingCentersService = async (): Promise<
  GetTrainingCenterDetailDto[]
> => {
  try {
    const trainingCenters = await getAllTrainingCentersRepository();

    return trainingCenters as GetTrainingCenterDetailDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 강의 조회
export const getTrainingCenterByIdService = async (
  id: string,
): Promise<GetTrainingCenterDetailDto | null> => {
  try {
    const trainingCenter = await getTrainingCenterByIdRepository(id);

    if (!trainingCenter) {
      return null;
    }
    return trainingCenter as GetTrainingCenterDetailDto;
  } catch {
    return null;
  }
};

// 훈련소 업데이트
export const updateTrainingCenterService = async (
  id: string,
  dto: Partial<CreateTrainingCenterDto>,
): Promise<CreateTrainingCenterDto | null> => {
  try {
    const trainingCenter = getTrainingCenterByIdRepository(id);

    if (!trainingCenter) {
      return null;
    }

    const updatedTrainingCenter = await updateTrainingCenterRepository(id, dto);

    return updatedTrainingCenter as CreateTrainingCenterDto;
  } catch {
    return null;
  }
};

// 강의 삭제
export const deleteTrainingCenterService = async (
  id: string,
): Promise<GetTrainingCenterDto | null> => {
  try {
    const trainingCenter = getTrainingCenterByIdRepository(id);

    if (!trainingCenter) {
      return null;
    }

    const deletedTrainingCenter = await deleteTrainingCenterRepository(id);

    return deletedTrainingCenter as GetTrainingCenterDto;
  } catch {
    return null;
  }
};
