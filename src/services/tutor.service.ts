import {
  CreateTutorDto,
  GetAllTutorDto,
  GetTutorDto,
  toJSON,
  TutorDto,
  UpdateTutorDto,
} from "@/dtos/tutor.dto";
import { TutorEntity } from "@/entities/tutor.entity";
import {
  createTutorRepository,
  deleteTutorRepository,
  getAllTutorsRepository,
  getTutorByCorporationIdRepository,
  getTutorByIdRepository,
  updateTutorRepository,
} from "@/repositories/tutor.repository";

// 강사 생성
export const createTutorService = async (
  dto: CreateTutorDto,
): Promise<string> => {
  try {
    const newTutor = new TutorEntity({
      ...dto,
    });

    const tutorId = await createTutorRepository(toJSON(newTutor));

    return tutorId;
  } catch (error: any) {
    return error;
  }
};

// 모든 강사 조회
export const getAllTutorsService = async (): Promise<GetAllTutorDto[]> => {
  try {
    const tutors = await getAllTutorsRepository();

    return tutors as GetAllTutorDto[];
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
      throw new Error("tutor not found");
    }

    return tutor as GetTutorDto;
  } catch {
    return null;
  }
};

// 특정 corporationID의 강사 조회
export const getTutorByCorporationIdService = async (
  corporationId: string,
): Promise<GetAllTutorDto[]> => {
  try {
    const tutors = await getTutorByCorporationIdRepository(corporationId);

    return tutors;
  } catch {
    return [];
  }
};

// 강사 업데이트
export const updateTutorService = async (
  dto: Partial<UpdateTutorDto>,
): Promise<void> => {
  try {
    const tutor = await getTutorByIdRepository(dto.id!);

    if (!tutor) {
      throw new Error("tutor not found");
    }

    const updateTutor = new TutorEntity({
      ...tutor,
      name: dto?.name ?? tutor.name,
      introduction: dto?.introduction ?? tutor.introduction,
      career: dto?.career ?? tutor?.career,
      profile_img: dto?.profile_img ?? tutor?.profile_img,
      occupation: dto?.occupation ?? tutor?.occupation,
      corporationId: dto?.corporationId ?? tutor?.corporationId,
    });

    await updateTutorRepository(toJSON(updateTutor));
  } catch (error: any) {
    return error;
  }
};

// 강사 삭제
export const deleteTutorService = async (id: string): Promise<void> => {
  try {
    const tutor = await getTutorByIdRepository(id);

    if (!tutor) {
      throw new Error("tutor not found");
    }

    await deleteTutorRepository(id);
  } catch (error: any) {
    return error;
  }
};
