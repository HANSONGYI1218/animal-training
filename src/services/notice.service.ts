import {
  CreateNoticeDto,
  NoticeDto,
  toJSON,
  UpdateNoticeDto,
} from "@/dtos/notice.dto";
import { NoticeEntity } from "@/entities/notice.entity";
import {
  createNoticeRepository,
  deleteNoticeRepository,
  getAllNoticesRepository,
  getNoticeByIdRepository,
  updateNoticeRepository,
} from "@/repositories/notice.repository";

// 공지 생성
export const createNoticeService = async (
  dto: CreateNoticeDto,
): Promise<void> => {
  try {
    // const isExisted = await getNoticeByIdRepository(dto.id);
    // if(isExisted) return null;g

    const createNotice = new NoticeEntity({
      ...dto,
    });

    await createNoticeRepository(toJSON(createNotice));
  } catch (error: any) {
    return error;
  }
};

// 모든 공지 조회
export const getAllNoticesService = async (): Promise<NoticeDto[]> => {
  try {
    const notices = await getAllNoticesRepository();

    return notices as NoticeDto[];
  } catch {
    return [];
  }
};

// 특정 ID의 공지 조회
export const getNoticeByIdService = async (
  id: string,
): Promise<NoticeDto | null> => {
  try {
    const notice = await getNoticeByIdRepository(id);

    if (!notice) {
      return null;
    }

    return notice as NoticeDto;
  } catch {
    return null;
  }
};

// 공지 업데이트
export const updateNoticeService = async (
  dto: UpdateNoticeDto,
): Promise<void> => {
  try {
    const notice = await getNoticeByIdRepository(dto.id);

    if (!notice) {
      throw new Error("notice is not found");
    }

    const updateNotice = new NoticeEntity({
      ...notice,
      title: dto?.title ?? notice.title,
      content: dto?.content ?? notice.content,
      image: dto?.image ?? notice?.image,
      attachments: dto?.attachments ?? notice?.attachments,
      isFixed: dto?.isFixed ?? notice?.isFixed,
      index: dto?.index ?? notice?.index,
      updatedAt: new Date(),
    });

    await updateNoticeRepository(toJSON(updateNotice));
  } catch (error: any) {
    return error;
  }
};

// 공지 삭제
export const deleteNoticeService = async (id: string): Promise<void> => {
  try {
    const notice = await getNoticeByIdRepository(id);

    if (!notice) {
      throw new Error("notice is not found");
    }
    await deleteNoticeRepository(id);
  } catch (error: any) {
    return error;
  }
};
