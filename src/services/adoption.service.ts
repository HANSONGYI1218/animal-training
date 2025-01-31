import {
  AdoptionAgreementsDto,
  AdoptionTableDto,
  CreateAdoptionDto,
  GetAdoptionDto,
  GetAdoptionWithAnimalDto,
  GetCurriculumDto,
  toJSON,
  UpdateAdoptionDto,
} from "@/dtos/adoption.dto";
import { AdoptionEntity } from "@/entities/adoption.entity";
import {
  createAdoptionRepository,
  deleteAdoptionRepository,
  getAdoptionAgreementRepository,
  getAdoptionByAdopterIdRepository,
  getAdoptionByAdoptionIdRepository,
  getAdoptionByIdRepository,
  getAdoptionByUserIdRepository,
  getAdoptionTableRepository,
  updateAdoptionRepository,
} from "@/repositories/adoption.repository";

// 입양 생성
export const createAdoptionService = async (
  dto: CreateAdoptionDto,
): Promise<string> => {
  try {
    // const isExisted = await getAdoptionByIdService(dto.id);
    // if(isExisted) return null;

    const newAdoption = new AdoptionEntity({
      ...dto,
    });

    const adotionId = await createAdoptionRepository(toJSON(newAdoption));

    return adotionId;
  } catch (error: any) {
    return error;
  }
};

// 분양자의 입양 리스트 가져오기
export const getAdoptionTableService = async (
  breederId: string,
  isRecord: string,
): Promise<AdoptionTableDto[]> => {
  try {
    const adoption = await getAdoptionTableRepository(breederId, isRecord);

    return adoption;
  } catch {
    return [];
  }
};

// 분양폼 id로 정보 조회
export const getAdoptionByAdoptionId = async (
  adoptionId: string,
): Promise<GetAdoptionDto | null> => {
  try {
    const adoption = await getAdoptionByAdoptionIdRepository(adoptionId);

    return adoption;
  } catch {
    return null;
  }
};

// 입양자의 입양  가져오기
export const getAdoptionByAdopterIdService = async (
  adopterId: string,
): Promise<GetCurriculumDto[]> => {
  try {
    const adoption = await getAdoptionByAdopterIdRepository(adopterId);

    return adoption;
  } catch {
    return [];
  }
};

// 입양 동의서 가져오기
export const getAdoptionAgreementService = async (
  breederId: string,
): Promise<AdoptionAgreementsDto> => {
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
): Promise<GetAdoptionWithAnimalDto[]> => {
  try {
    const adoptions = await getAdoptionByUserIdRepository(userId);

    return adoptions;
  } catch {
    return [];
  }
};

// 입양 업데이트
export const updateAdoptionService = async (
  dto: UpdateAdoptionDto,
): Promise<void> => {
  try {
    const adoption: GetAdoptionDto | null = await getAdoptionByIdRepository(
      dto.id,
    );

    if (!adoption) {
      throw new Error("adoption is not found");
    }
    const updateCorporation = new AdoptionEntity({
      ...adoption,
      status: dto?.status ?? adoption.status,
      step: dto?.step ?? adoption.step,
      adoption_date: dto?.adoption_date ?? adoption?.adoption_date ?? undefined,
      abandon_date: dto?.abandon_date ?? adoption?.abandon_date ?? undefined,
      abandon_reason: dto?.abandon_reason ?? adoption.abandon_reason,
      learningAgreementUrl:
        dto?.learningAgreementUrl ?? adoption.learningAgreementUrl,
      trainingAgreementUrl:
        dto?.trainingAgreementUrl ?? adoption.trainingAgreementUrl,
      adopter_adoptionFormUrl:
        dto?.adopter_adoptionFormUrl ?? adoption.adopter_adoptionFormUrl,
      breeder_adoptionFormUrl:
        dto?.breeder_adoptionFormUrl ?? adoption.breeder_adoptionFormUrl,
      adopterId: dto?.adopterId ?? adoption.adopterId,
    });

    await updateAdoptionRepository(toJSON(updateCorporation));
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
