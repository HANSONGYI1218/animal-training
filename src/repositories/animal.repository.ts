import prisma from "@/utils/db";
import { AnimalDto, GetAnimalDto, toJSON } from "@/dtos/animal.dto";

// 분양동물 생성
export const createAnimalRepository = async (dto: AnimalDto): Promise<void> => {
  try {
    await prisma.animal.create({
      data: {
        ...dto,
      },
    });
  } catch (error: any) {
    return error;
  }
};

// 분양동물 특정 id로 가져오기
export const getAnimalByIdRepository = async (
  id: string,
): Promise<GetAnimalDto | null> => {
  try {
    const animal = await prisma.animal.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        corporation: true,
        adoption: true,
      },
    });

    if (!animal) {
      return null;
    }

    return toJSON(animal);
  } catch {
    return null;
  }
};

// 분양동물 특정 corporationId로 가져오기
export const getAnimalByCorporationIdRepository = async (
  corporationId: string,
): Promise<GetAnimalDto[]> => {
  try {
    const animals = await prisma.animal.findMany({
      where: {
        corporationId: corporationId,
      },
      include: {
        user: true,
        corporation: true,
      },
    });

    if (!animals) {
      return [];
    }

    return animals.map(toJSON);
  } catch {
    return [];
  }
};

// 분양동물 업데이트
export const updateAnimalRepository = async (dto: AnimalDto): Promise<void> => {
  try {
    await prisma.animal.update({
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

// 분양동물 삭제
export const deleteAnimalRepository = async (id: string): Promise<void> => {
  try {
    await prisma.animal.delete({
      where: {
        id: id,
      },
    });
  } catch (error: any) {
    return error;
  }
};
