import prisma from "@/utils/db";
import {
  GetAllTutorDto,
  GetTutorDto,
  toJSON,
  TutorDto,
} from "@/dtos/tutor.dto";

// 강사 생성
export const createTutorRepository = async (dto: TutorDto): Promise<string> => {
  try {
    const tutor = await prisma.tutor.create({
      data: dto,
    });

    return tutor?.id;
  } catch (error: any) {
    return error;
  }
};

// 모든 강사 조회
export const getAllTutorsRepository = async (): Promise<GetAllTutorDto[]> => {
  try {
    const tutors = await prisma.tutor.findMany({
      select: {
        id: true,
        name: true,
        introduction: true,
        career: true,
        profile_img: true,
        occupation: true,
      },
    });

    return tutors.map(toJSON);
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
        tutorTrainingCenters: {
          select: {
            id: true,
            trainingCenter: {
              select: {
                name: true,
                introduction: true,
                profile_images: true,
                zipCode: true,
                address: true,
                detailAddress: true,
                phoneNumber: true,
              },
            },
          },
        },
        bookmarks: { where: { userId: "1" } },
      },
    });

    if (!tutor) {
      return null;
    }

    return toJSON(tutor);
  } catch {
    return null;
  }
};

// 특정 corporationID의 강사 조회
export const getTutorByCorporationIdRepository = async (
  corporationId: string,
): Promise<GetAllTutorDto[]> => {
  try {
    const tutors = await prisma.tutor.findMany({
      where: {
        corporationId: corporationId,
      },
    });

    return tutors.map(toJSON);
  } catch {
    return [];
  }
};

// 강사 업데이트
export const updateTutorRepository = async (
  dto: Partial<TutorDto>,
): Promise<void> => {
  try {
    await prisma.tutor.update({
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

// 강사 삭제
export const deleteTutorRepository = async (id: string): Promise<void> => {
  try {
    await prisma.tutor.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
