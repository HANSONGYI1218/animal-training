import {
  CreateAnimalDto,
  GetAnimalDto,
  toJSON,
  UpdateAnimalDto,
} from "@/dtos/animal.dto";
import { AnimalEntity } from "@/entities/animal.entity";
import {
  createAnimalRepository,
  deleteAnimalRepository,
  getAnimalByCorporationIdRepository,
  getAnimalByIdRepository,
  updateAnimalRepository,
} from "@/repositories/animal.repository";

// 분양동물 생성
export const createAnimalService = async (
  dto: CreateAnimalDto,
): Promise<void> => {
  try {
    // const isExisted = await getAnimalByIdService(dto.id);
    // if(isExisted) return null;

    const newAnimal = new AnimalEntity({
      ...dto,
    });

    await createAnimalRepository(toJSON(newAnimal));
  } catch (error: any) {
    return error;
  }
};

// 분양동물 특정 id로 가져오기
export const getAnimalByIdService = async (
  id: string,
): Promise<GetAnimalDto | null> => {
  try {
    const animal = await getAnimalByIdRepository(id);

    return animal;
  } catch {
    return null;
  }
};

// 분양동물 특정 corporationId로 가져오기
export const getAnimalByCorporationIdService = async (
  corporationId: string,
): Promise<GetAnimalDto[]> => {
  try {
    const animals = await getAnimalByCorporationIdRepository(corporationId);

    return animals;
  } catch {
    return [];
  }
};

// 분양동물 업데이트
export const updateAnimalService = async (
  dto: UpdateAnimalDto,
): Promise<void> => {
  try {
    const animal = await getAnimalByIdRepository(dto.id);

    if (!animal) {
      throw new Error("Animal is not found");
    }
    const updateCorporation = new AnimalEntity({
      ...animal,
      name: dto?.name ?? animal.name,
      age: dto?.age ?? animal.age,
      gender: dto?.gender ?? animal.gender,
      animal_type: dto?.animal_type ?? animal.animal_type,
      animal_size: dto?.animal_size ?? animal.animal_size,
      animal_age: dto?.animal_age ?? animal.animal_age,
      breed: dto?.breed ?? animal.breed,
      profile: dto?.profile ?? animal?.profile ?? null,
      additionalImgs: dto?.additionalImgs ?? animal?.additionalImgs ?? null,
      intakeDate: dto?.intakeDate ?? animal?.intakeDate,
      remarks: dto?.remarks ?? animal?.remarks,
      userId: dto?.userId ?? animal.userId,
      corporationId: dto?.corporationId ?? animal.corporationId,
    });

    await updateAnimalRepository(toJSON(updateCorporation));
  } catch (error: any) {
    return error;
  }
};

// 분양동물 삭제
export const deleteAnimalService = async (id: string): Promise<void> => {
  try {
    const animal = await getAnimalByIdRepository(id);

    if (!animal) {
      throw new Error("Animal is not found");
    }

    await deleteAnimalRepository(id);
  } catch (error: any) {
    return error;
  }
};
