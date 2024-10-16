import prisma from "@/utils/db";
import {
  CreateCorporationDto,
  GetCorporationDto,
} from "@/dtos/corporation.dtos";

// 기업 생성
export const createCorporationService = async (
  dto: CreateCorporationDto,
): Promise<CreateCorporationDto | null> => {
  try {
    const corporation = await prisma.corporation.create({
      data: {
        owner_name: dto.owner_name,
        corporation_name: dto.corporation_name,
        address: dto.address,
        phoneNumber: dto.phoneNumber,
        email: dto.email,
        business_number: dto.business_number,
      },
    });

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
    const corporations = await prisma.corporation.findMany();

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
    const corporation = await prisma.corporation.findUnique({
      where: {
        id: id,
      },
    });
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
    const corporation = getCorporationByIdService(id);

    if (!corporation) {
      return null;
    }

    const updatedCorporation = await prisma.corporation.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
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
    const corporation = getCorporationByIdService(id);

    if (!corporation) {
      return null;
    }

    const deletedCorporation = await prisma.corporation.delete({
      where: {
        id: id,
      },
    });
    return deletedCorporation as GetCorporationDto;
  } catch {
    return null;
  }
};
