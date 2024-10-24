import prisma from "@/utils/db";
import { CreateTutorDto, GetTutorDto } from "@/dtos/tutor.dtos";

// 강사 생성
export const createTutorRepository = async (
  dto: CreateTutorDto,
): Promise<CreateTutorDto | null> => {
  try {
    const tutor = await prisma.tutor.create({
      data: {
        name: dto.name,
        introduction: dto.introduction,
        career: dto.career,
        profile_img: dto.profile_img,
        occupation: dto.occupation,
        corporationId: dto.corporationId,
      },
    });

    return tutor as CreateTutorDto;
  } catch {
    return null;
  }
};

// 모든 강사 조회
export const getAllTutorsRepository = async (): Promise<GetTutorDto[]> => {
  try {
    const tutors = await prisma.tutor.findMany({
      include: {
        corporation: {
          select: { id: true, corporation_name: true },
        },
        trainingCenter: {
          select: { id: true, name: true, address: true },
        },
      },
    });

    return tutors as GetTutorDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 강사 조회
export const getTutorByIdRepository = async (
  id: string,
): Promise<GetTutorDto | null> => {
  try {
    const tutor = await prisma.tutor.findUnique({
      where: {
        id: id,
      },
      include: {
        corporation: {
          select: { id: true, corporation_name: true },
        },
        trainingCenter: {
          select: { id: true, name: true, address: true },
        },
      },
    });

    if (!tutor) {
      return null;
    }
    return tutor as GetTutorDto;
  } catch {
    return null;
  }
};

// 강사 업데이트
export const updateTutorRepository = async (
  id: string,
  dto: Partial<CreateTutorDto>,
): Promise<CreateTutorDto | null> => {
  try {
    const updatedTutor = await prisma.tutor.update({
      where: {
        id: id,
      },
      data: {
        ...dto,
        updatedAt: new Date(),
      },
    });
    return updatedTutor as CreateTutorDto;
  } catch {
    return null;
  }
};

// 강사 삭제
export const deleteTutorRepository = async (
  id: string,
): Promise<CreateTutorDto | null> => {
  try {
    const deletedTutor = await prisma.tutor.delete({
      where: {
        id: id,
      },
    });
    return deletedTutor as CreateTutorDto;
  } catch {
    return null;
  }
};
