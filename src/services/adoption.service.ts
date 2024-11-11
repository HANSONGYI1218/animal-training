import {
  AdoptionAgreementDto,
  AdoptionTableDto,
  CreateAdoptionDto,
  GetAdoptionDto,
  toJSON,
  UpdateAdoptionDto,
} from "@/dtos/adoption.dto";
import { AdoptionEntity } from "@/entities/adoption.entity";
import {
  createAdoptionRepository,
  deleteAdoptionRepository,
  getAdoptionAgreementRepository,
  getAdoptionByIdRepository,
  getAdoptionByUserIdRepository,
  getAdoptionTableRepository,
  updateAdoptionRepository,
} from "@/repositories/adoption.repository";

// 입양 생성
export const createAdoptionService = async (
  dto: CreateAdoptionDto,
): Promise<void> => {
  try {
    // const isExisted = await getAdoptionByIdService(dto.id);
    // if(isExisted) return null;

    const newAdoption = new AdoptionEntity({
      adoption_date: null,
      abandon_date: null,
      abandon_reason: null,
      educationForm: [],
      trainingForm: [],
      adoptionForm: [],
      animalId: null,
      ...dto,
    });

    await createAdoptionRepository(toJSON(newAdoption));
  } catch (error: any) {
    return error;
  }
};

// 분양자의 입양 리스트 가져오기
export const getAdoptionTableService = async (
  breederId: string,
): Promise<AdoptionTableDto[]> => {
  try {
    const adoption = await getAdoptionTableRepository(breederId);

    return adoption;
  } catch {
    return [];
  }
};

// 입양 동의서 가져오기
export const getAdoptionAgreementService = async (
  breederId: string,
): Promise<AdoptionAgreementDto> => {
  try {
    const adoption = await getAdoptionAgreementRepository(breederId);

    return adoption;
  } catch (error: any) {
    return error;
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
  dto: UpdateAdoptionDto,
): Promise<void> => {
  try {
    const adoption = await getAdoptionByIdRepository(dto.id);

    if (!adoption) {
      throw new Error("adoption is not found");
    }

    await updateAdoptionRepository(dto);
  } catch (error: any) {
    return error;
  }
};

// 입양 삭제
export const deleteAdoptionService = async (id: string): Promise<void> => {
  try {
    const adoption = await getAdoptionByIdRepository(id);

    if (!adoption) {
      throw new Error("adoption is not found");
    }

    await deleteAdoptionRepository(id);
  } catch (error: any) {
    return error;
  }
};
