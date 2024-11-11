import prisma from "@/utils/db";
import {
  AdoptionAgreementDto,
  AdoptionTableDto,
  CreateAdoptionDto,
  GetAdoptionDto,
  toJSON,
  UpdateAdoptionDto,
} from "@/dtos/adoption.dto";

// 입양 생성
export const createAdoptionRepository = async (
  dto: GetAdoptionDto,
): Promise<void> => {
  try {
    await prisma.adoption.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 분양자의 입양 리스트 가져오기
export const getAdoptionTableRepository = async (
  breederId: string,
): Promise<AdoptionTableDto[]> => {
  try {
    const adoption = await prisma.adoption.findMany({
      where: {
        breederCorporationId: breederId,
      },
      include: {
        adopter: true,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    if (!adoption) {
      return [];
    }

    return adoption.map(toJSON);
  } catch {
    return [];
  }
};

// 입양 동의서 가져오기
export const getAdoptionAgreementRepository = async (
  id: string,
): Promise<AdoptionAgreementDto> => {
  try {
    const agreement = await prisma.adoption.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        educationForm: true,
        trainingForm: true,
        adoptionForm: true,
      },
    });

    if (!agreement) {
      throw new Error();
    }

    return toJSON(agreement);
  } catch (error: any) {
    return error;
  }
};

// 특정 ID의 입양 조회
export const getAdoptionByIdRepository = async (
  id: string,
): Promise<GetAdoptionDto | null> => {
  try {
    const adoption = await prisma.adoption.findUnique({
      where: {
        id: id,
      },
      include: {
        adopter: true,
        breeder: true,
        breederCorporation: true,
      },
    });

    if (!adoption) {
      return null;
    }

    return adoption as GetAdoptionDto;
  } catch {
    return null;
  }
};

// 특정 userId의 입양 조회
export const getAdoptionByUserIdRepository = async (
  userId: string,
): Promise<GetAdoptionDto[]> => {
  try {
    const adoptions = await prisma.adoption.findMany({
      where: {
        adopterId: userId,
      },
      include: {
        adopter: true,
        breeder: true,
        breederCorporation: true,
      },
    });

    return adoptions as GetAdoptionDto[];
  } catch {
    return [];
  }
};

// 입양 업데이트
export const updateAdoptionRepository = async (
  dto: UpdateAdoptionDto,
): Promise<void> => {
  try {
    await prisma.adoption.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
  } catch (error: any) {
    return error;
  }
};

// 입양 삭제
export const deleteAdoptionRepository = async (id: string): Promise<void> => {
  try {
    await prisma.adoption.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
