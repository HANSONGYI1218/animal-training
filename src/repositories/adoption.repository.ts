import prisma from "@/utils/db";
import { CreateAdoptionDto, GetAdoptionDto } from "@/dtos/adoption.dto";

// 입양 생성
export const createAdoptionRepository = async (
  dto: CreateAdoptionDto,
): Promise<CreateAdoptionDto | null> => {
  try {
    const adoption = await prisma.adoption.create({
      data: {
        adoption_date: dto.adoption_date,
        abandon_date: dto.abandon_date,
        status: dto.status,
        abandon_reason: dto.abandon_reason,
        adopterId: dto.adopterId,
        breederId: dto.breederId,
        adopterCorporationId: dto.adopterCorporationId,
        breederCorporationId: dto.breederCorporationId,
        animalId: dto.animalId,
      },
    });

    return adoption as CreateAdoptionDto;
  } catch {
    return null;
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
        adopterCorporation: true,
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
        adopterCorporation: true,
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
  id: string,
  dto: Partial<CreateAdoptionDto>,
): Promise<CreateAdoptionDto | null> => {
  try {
    const updatedAdoption = await prisma.adoption.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
    return updatedAdoption as CreateAdoptionDto;
  } catch {
    return null;
  }
};

// 입양 삭제
export const deleteAdoptionRepository = async (
  id: string,
): Promise<CreateAdoptionDto | null> => {
  try {
    const deletedAdoption = await prisma.adoption.delete({
      where: {
        id: id,
      },
    });
    return deletedAdoption as CreateAdoptionDto;
  } catch {
    return null;
  }
};
