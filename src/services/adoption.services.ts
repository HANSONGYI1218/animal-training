import { CreateAdoptionDto, GetAdoptionDto } from "@/dtos/adoption.dtos";
import {
  createAdoptionRepository,
  deleteAdoptionRepository,
  getAdoptionByIdRepository,
  getAdoptionByUserIdRepository,
  updateAdoptionRepository,
} from "@/repositorys/adoption.repositorys";

// 입양 생성
export const createAdoptionService = async (
  dto: CreateAdoptionDto,
): Promise<CreateAdoptionDto | null> => {
  try {
    // const isExisted = await getAdoptionByIdService(dto.id);
    // if(isExisted) return null;

    const adoption = await createAdoptionRepository(dto);

    if (!adoption) {
      return null;
    }
    return adoption as CreateAdoptionDto;
  } catch {
    return null;
  }
};

// 특정 ID의 입양 조회
export const getAdoptionByIdService = async (
  id: string,
): Promise<GetAdoptionDto | null> => {
  try {
    const adoption = await getAdoptionByIdRepository(id);

    if (!adoption) {
      return null;
    }
    return adoption as GetAdoptionDto;
  } catch {
    return null;
  }
};

// 특정 userId의 입양 조회
export const getAdoptionByUserIdService = async (
  userId: string,
): Promise<GetAdoptionDto[]> => {
  try {
    const adoptions = await getAdoptionByUserIdRepository(userId);

    return adoptions as GetAdoptionDto[];
  } catch {
    return [];
  }
};

// 입양 업데이트
export const updateAdoptionService = async (
  id: string,
  dto: Partial<CreateAdoptionDto>,
): Promise<CreateAdoptionDto | null> => {
  try {
    const adoption = getAdoptionByIdRepository(id);

    if (!adoption) {
      return null;
    }

    const updatedAdoption = await updateAdoptionRepository(id, dto);

    return updatedAdoption as CreateAdoptionDto;
  } catch {
    return null;
  }
};

// 입양 삭제
export const deleteAdoptionService = async (
  id: string,
): Promise<GetAdoptionDto | null> => {
  try {
    const adoption = getAdoptionByIdRepository(id);

    if (!adoption) {
      return null;
    }

    const deletedAdoption = await deleteAdoptionRepository(id);

    return deletedAdoption as GetAdoptionDto;
  } catch {
    return null;
  }
};
