import prisma from "@/utils/db";
import {
  CreateCorporationDto,
  GetCorporationDto,
} from "@/dtos/corporation.dtos";
import {
  createCorporationRepository,
  deleteCorporationRepository,
  getAllCorporationsRepository,
  getCorporationByIdRepository,
  updateCorporationRepository,
} from "@/repositorys/corporation.repositorys";

// 기업 생성
export const createCorporationService = async (
  dto: CreateCorporationDto,
): Promise<CreateCorporationDto | null> => {
  try {
    // const isExisted = await getCorporationByIdService(dto.id);
    // if(isExisted) return null;

    const corporation = await createCorporationRepository(dto);

    if (!corporation) {
      return null;
    }
    return corporation as CreateCorporationDto;
  } catch {
    return null;
  }
};

// 모든 강의 조회
export const getAllCorporationsService = async (): Promise<
  GetCorporationDto[]
> => {
  try {
    const corporations = await getAllCorporationsRepository();

    return corporations as GetCorporationDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 강의 조회
export const getCorporationByIdService = async (
  id: string,
): Promise<GetCorporationDto | null> => {
  try {
    const corporation = await getCorporationByIdRepository(id);

    if (!corporation) {
      return null;
    }
    return corporation as GetCorporationDto;
  } catch {
    return null;
  }
};

// 기업 업데이트
export const updateCorporationService = async (
  id: string,
  dto: Partial<CreateCorporationDto>,
): Promise<CreateCorporationDto | null> => {
  try {
    const corporation = getCorporationByIdRepository(id);

    if (!corporation) {
      return null;
    }

    const updatedCorporation = await updateCorporationRepository(id, dto);

    return updatedCorporation as CreateCorporationDto;
  } catch {
    return null;
  }
};

// 강의 삭제
export const deleteCorporationService = async (
  id: string,
): Promise<GetCorporationDto | null> => {
  try {
    const corporation = getCorporationByIdRepository(id);

    if (!corporation) {
      return null;
    }

    const deletedCorporation = await deleteCorporationRepository(id);

    return deletedCorporation as GetCorporationDto;
  } catch {
    return null;
  }
};
