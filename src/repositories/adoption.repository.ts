import prisma from "@/utils/db";
import {
  AdoptionAgreementDto,
  AdoptionDto,
  AdoptionTableDto,
  GetAdoptionDto,
  GetAdoptionWithAnimalDto,
  GetCurriculumDto,
  toJSON,
} from "@/dtos/adoption.dto";

// 입양 생성
export const createAdoptionRepository = async (
  dto: AdoptionDto,
): Promise<void> => {
  try {
    await prisma.adoption.create({
      data: {
        ...dto,
        attendances: [],
      },
    });
  } catch (error: any) {
    return error;
  }
};

// 분양자의 입양 리스트 가져오기
export const getAdoptionTableRepository = async (
  breederId: string,
  isRecord: string,
): Promise<AdoptionTableDto[]> => {
  try {
    const adoptions = await prisma.adoption.findMany({
      where: {
        breederCorporationId: breederId,
        status:
          isRecord === "true"
            ? { in: ["ADOPTION", "ABANDON"] }
            : "NOT_ADOPTION",
      },
      include: {
        adopter: true,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    if (!adoptions) {
      return [];
    }

    return adoptions.map(toJSON);
  } catch {
    return [];
  }
};

// 입양자의 입양 리스트 가져오기
export const getAdoptionByAdopterIdRepository = async (
  adopterId: string,
): Promise<GetCurriculumDto[]> => {
  try {
    const adoptions = await prisma.adoption.findMany({
      where: {
        adopterId: adopterId,
      },
      orderBy: [{ createdAt: "desc" }],
    });

    if (!adoptions) {
      return [];
    }

    return adoptions.map(toJSON);
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
        tutorTrainingCenter: true,
        animal: true,
      },
    });

    if (!adoption) {
      return null;
    }

    return toJSON(adoption);
  } catch {
    return null;
  }
};

// 분양폼 id로 정보 조회
export const getAdoptionByAdoptionIdRepository = async (
  adoptionId: string,
): Promise<GetAdoptionDto | null> => {
  try {
    const adoption = await prisma.adoption.findUnique({
      where: {
        id: adoptionId,
      },
      include: {
        adopter: true,
        breeder: true,
        breederCorporation: true,
        animal: true,
      },
    });

    if (!adoption) {
      return null;
    }

    return toJSON(adoption);
  } catch {
    return null;
  }
};

// 특정 userId의 입양 조회
export const getAdoptionByUserIdRepository = async (
  userId: string,
): Promise<GetAdoptionWithAnimalDto[]> => {
  try {
    const adoptions = await prisma.adoption.findMany({
      where: {
        adopterId: userId,
      },
      include: {
        adopter: true,
        breeder: true,
        breederCorporation: true,
        animal: true,
      },
    });

    return adoptions.map(toJSON);
  } catch {
    return [];
  }
};

// 입양 업데이트
export const updateAdoptionRepository = async (
  dto: AdoptionDto,
): Promise<void> => {
  try {
    await prisma.adoption.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
        attendances: [],
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
