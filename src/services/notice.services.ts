import { CreateNoticeDto, GetNoticeDto } from "@/dtos/notice.dtos";
import {
  createNoticeRepository,
  deleteNoticeRepository,
  getAllNoticesRepository,
  getNoticeByIdRepository,
  updateNoticeRepository,
} from "@/repositorys/notice.repositorys";

// 공지 생성
export const createNoticeService = async (
  dto: CreateNoticeDto,
): Promise<CreateNoticeDto | null> => {
  try {
    // const isExisted = await getNoticeByIdRepository(dto.id);
    // if(isExisted) return null;g

    const notice = await createNoticeRepository(dto);

    return notice as CreateNoticeDto;
  } catch {
    return null;
  }
};

// 모든 공지 조회
export const getAllNoticesService = async (): Promise<GetNoticeDto[]> => {
  try {
    const notices = await getAllNoticesRepository();

    return notices as GetNoticeDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 공지 조회
export const getNoticeByIdService = async (
  id: string,
): Promise<GetNoticeDto | null> => {
  try {
    const notice = await getNoticeByIdRepository(id);

    if (!notice) {
      return null;
    }

    return notice as GetNoticeDto;
  } catch {
    return null;
  }
};

// 공지 업데이트
export const updateNoticeService = async (
  id: string,
  dto: Partial<CreateNoticeDto>,
): Promise<CreateNoticeDto | null> => {
  try {
    const notice = getNoticeByIdRepository(id);

    if (!notice) {
      return null;
    }

    const updatedNotice = await updateNoticeRepository(id, dto);

    return updatedNotice as CreateNoticeDto;
  } catch {
    return null;
  }
};

// 공지 삭제
export const deleteNoticeService = async (
  id: string,
): Promise<CreateNoticeDto | null> => {
  try {
    const notice = getNoticeByIdRepository(id);

    if (!notice) {
      return null;
    }

    const deletedNotice = await deleteNoticeRepository(id);

    return deletedNotice as CreateNoticeDto;
  } catch {
    return null;
  }
};
