import {
  CreateTutorTrainingCenterDto,
  UpdateTutorTrainingCenterDto,
  TutorTrainingCenterDto,
  toJSON,
} from "@/dtos/tutor.trainingCenter.dto";
import { TutorTrainingCenterEntity } from "@/entities/tutor.trainingCenter.entity";
import {
  createTutorTrainingCenterRepository,
  deleteTutorTrainingCenterRepository,
  getAllTutorTrainingCentersRepository,
  getTutorTrainingCenterByIdRepository,
  updateTutorTrainingCenterRepository,
} from "@/repositories/tutor.trainingCenter.repository";

// 훈련소 훈련사 관계 생성
export const createTutorTrainingCenterService = async (
  dto: CreateTutorTrainingCenterDto,
): Promise<void> => {
  try {
    // const isExisted = await getTutorTrainingCenterByIdService(dto.id);
    // if(isExisted) return null;

    const newTutorTrainingCenter = new TutorTrainingCenterEntity({
      ...dto,
      like: 0,
    });

    await createTutorTrainingCenterRepository(toJSON(newTutorTrainingCenter));
  } catch (error: any) {
    return error;
  }
};

// 모든 강의 조회
export const getAllTutorTrainingCentersService = async (): Promise<
  TutorTrainingCenterDto[]
> => {
  try {
    const TutortrainingCenters = await getAllTutorTrainingCentersRepository();

    return TutortrainingCenters;
  } catch {
    return [];
  }
};

// 특정 ID의 강의 조회
export const getTutorTrainingCenterByIdService = async (
  id: string,
): Promise<TutorTrainingCenterDto | null> => {
  try {
    const TutortrainingCenter = await getTutorTrainingCenterByIdRepository(id);

    if (!TutortrainingCenter) {
      throw new Error("TutortrainingCenter is not found");
    }
    return TutortrainingCenter;
  } catch {
    return null;
  }
};

// 훈련소 훈련사 관계 업데이트
export const updateTutorTrainingCenterService = async (
  dto: UpdateTutorTrainingCenterDto,
): Promise<void> => {
  try {
    const tutortrainingCenter = await getTutorTrainingCenterByIdRepository(
      dto?.id,
    );

    if (!tutortrainingCenter) {
      throw new Error("TutortrainingCenter is not found");
    }

    const updateTutorTrainingCenter = new TutorTrainingCenterEntity({
      ...tutortrainingCenter,
      price: dto?.price ?? tutortrainingCenter.price,
      holidays: dto?.holidays ?? tutortrainingCenter.holidays,
      animal_types: dto?.animal_types ?? tutortrainingCenter.animal_types,
      like: dto?.like ?? tutortrainingCenter?.like,
    });

    await updateTutorTrainingCenterRepository(
      toJSON(updateTutorTrainingCenter),
    );
  } catch (error: any) {
    return error;
  }
};

// 강의 삭제
export const deleteTutorTrainingCenterService = async (
  id: string,
): Promise<void> => {
  try {
    const TutortrainingCenter = await getTutorTrainingCenterByIdRepository(id);

    if (!TutortrainingCenter) {
      throw new Error("TutortrainingCenter is not found");
    }

    await deleteTutorTrainingCenterRepository(id);
  } catch (error: any) {
    return error;
  }
};
