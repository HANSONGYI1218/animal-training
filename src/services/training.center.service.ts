import {
  CreateTrainingCenterDto,
  GetTrainingCenterDetailDto,
  toJSON,
  UpdateTrainingCenterDto,
} from "@/dtos/training.center.dto";
import { TrainingCenterEntity } from "@/entities/training.center.entity";
import {
  createTrainingCenterRepository,
  deleteTrainingCenterRepository,
  getAllTrainingCentersRepository,
  getTrainingCenterByCorporationIdRepository,
  getTrainingCenterByIdRepository,
  getTrainingCenterByTutorIdRepository,
  updateTrainingCenterRepository,
} from "@/repositories/training.center.repository";

// 훈련소 생성
export const createTrainingCenterService = async (
  dto: CreateTrainingCenterDto,
): Promise<string> => {
  try {
    // const isExisted = await getTrainingCenterByIdService(dto.id);
    // if(isExisted) return null;

    const newTrainingCenter = new TrainingCenterEntity({
      ...dto,
    });

    const trainingCenterId = await createTrainingCenterRepository(
      toJSON(newTrainingCenter),
    );

    return trainingCenterId;
  } catch (error: any) {
    return error;
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
      throw new Error("trainingCenter is not found");
    }
    return trainingCenter as GetTrainingCenterDetailDto;
  } catch {
    return null;
  }
};

// 특정 corporationID의 강의 조회
export const getTrainingCenterByCorporationIdService = async (
  corporationId: string,
): Promise<GetTrainingCenterDetailDto[]> => {
  try {
    const trainingCenters =
      await getTrainingCenterByCorporationIdRepository(corporationId);

    if (!trainingCenters) {
      throw new Error("trainingCenters is not found");
    }
    return trainingCenters;
  } catch {
    return [];
  }
};

// 특정 tutorID의 강의 조회
export const getTrainingCenterByTutorIdService = async (
  trainingCenterId: string,
  tutorId: string,
): Promise<GetTrainingCenterDetailDto | null> => {
  try {
    const trainingCenter = await getTrainingCenterByTutorIdRepository(
      trainingCenterId,
      tutorId,
    );

    if (!trainingCenter) {
      throw new Error("trainingCenter is not found");
    }
    return trainingCenter;
  } catch {
    return null;
  }
};

// 훈련소 업데이트
export const updateTrainingCenterService = async (
  dto: UpdateTrainingCenterDto,
): Promise<void> => {
  try {
    const trainingCenter = await getTrainingCenterByIdRepository(dto.id);

    if (!trainingCenter) {
      throw new Error("trainingCenter is not found");
    }

    const updateTrainingCenter = new TrainingCenterEntity({
      ...trainingCenter,
      name: dto?.name ?? trainingCenter.name,
      introduction: dto?.introduction ?? trainingCenter.introduction,
      profile_images: dto?.profile_images ?? trainingCenter?.profile_images,
      phoneNumber: dto?.phoneNumber ?? trainingCenter?.phoneNumber,
      zipCode: dto?.zipCode ?? trainingCenter.zipCode,
      address: dto?.address ?? trainingCenter.address,
      detailAddress: dto?.detailAddress ?? trainingCenter.detailAddress,
      refundPolicys: dto?.refundPolicys ?? trainingCenter?.refundPolicys,
    });

    await updateTrainingCenterRepository(toJSON(updateTrainingCenter));
  } catch (error: any) {
    return error;
  }
};

// 강의 삭제
export const deleteTrainingCenterService = async (
  id: string,
): Promise<void> => {
  try {
    const trainingCenter = await getTrainingCenterByIdRepository(id);

    if (!trainingCenter) {
      throw new Error("trainingCenter is not found");
    }

    await deleteTrainingCenterRepository(id);
  } catch (error: any) {
    return error;
  }
};
