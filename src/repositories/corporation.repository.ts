import prisma from "@/utils/db";
import {
  CorporationDetailDto,
  CorporationDto,
  toJSON,
} from "@/dtos/corporation.dto";

// 기업 생성
export const createCorporationRepository = async (
  dto: CorporationDto,
): Promise<void> => {
  try {
    await prisma.corporation.create({
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 특정 ID의 기업 로그인 조회
export const getCorporationByLoginRepository = async (
  email: string,
  password: string,
): Promise<CorporationDto | null> => {
  try {
    const corporation = await prisma.corporation.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (!corporation) {
      return null;
    }

    return toJSON(corporation);
  } catch {
    return null;
  }
};

// 특정 ID의 기업 조회
export const getCorporationByIdRepository = async (
  id: string,
): Promise<CorporationDetailDto | null> => {
  try {
    const corporation = await prisma.corporation.findUnique({
      where: {
        id: id,
      },
      include: {
        tutors: {
          include: {
            lectures: true,
          },
        },
        trainingCenters: {
          include: {
            tutorTrainingCenters: {
              select: {
                tutor: {
                  select: {
                    id: true,
                    name: true,
                    profile_img: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!corporation) {
      return null;
    }

    return toJSON(corporation);
  } catch {
    return null;
  }
};

// 기업 업데이트
export const updateCorporationRepository = async (
  dto: CorporationDto,
): Promise<void> => {
  try {
    await prisma.corporation.update({
      where: {
        id: dto.id,
      },
      data: dto,
    });
  } catch (error: any) {
    return error;
  }
};

// 기업 삭제
export const deleteCorporationRepository = async (
  id: string,
): Promise<void> => {
  try {
    await prisma.corporation.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
