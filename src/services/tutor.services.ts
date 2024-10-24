import { CreateTutorDto, GetTutorDto } from "@/dtos/tutor.dtos";
import {
  createTutorRepository,
  deleteTutorRepository,
  getAllTutorsRepository,
  getTutorByIdRepository,
  updateTutorRepository,
} from "@/repositorys/tutor.repositorys";

// 강사 생성
export const createTutorService = async (
  dto: CreateTutorDto,
): Promise<CreateTutorDto | null> => {
  try {
    // const isExisted = await getTutorByIdRepository(dto.id);
    // if(isExisted) return null;

    const tutor = await createTutorRepository(dto);

    return tutor as CreateTutorDto;
  } catch {
    return null;
  }
};

// 모든 강사 조회
export const getAllTutorsService = async (): Promise<GetTutorDto[]> => {
  try {
    const tutors = await getAllTutorsRepository();

    return tutors as GetTutorDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 강사 조회
export const getTutorByIdService = async (
  id: string,
): Promise<GetTutorDto | null> => {
  try {
    const tutor = await getTutorByIdRepository(id);

    if (!tutor) {
      return null;
    }

    return tutor as GetTutorDto;
  } catch {
    return null;
  }
};

// 강사 업데이트
export const updateTutorService = async (
  id: string,
  dto: Partial<CreateTutorDto>,
): Promise<CreateTutorDto | null> => {
  try {
    const tutor = getTutorByIdRepository(id);

    if (!tutor) {
      return null;
    }

    const updatedTutor = await updateTutorRepository(id, dto);

    return updatedTutor as CreateTutorDto;
  } catch {
    return null;
  }
};

// 강사 삭제
export const deleteTutorService = async (
  id: string,
): Promise<CreateTutorDto | null> => {
  try {
    const tutor = getTutorByIdRepository(id);

    if (!tutor) {
      return null;
    }

    const deletedTutor = await deleteTutorRepository(id);

    return deletedTutor as CreateTutorDto;
  } catch {
    return null;
  }
};
