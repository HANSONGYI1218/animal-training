export type CreateNoticeDto = {
  title: string;
  content: string;
  image: string;
  attachments: string[];
  isFixed: boolean;
  index: number;
};

export type UpdateNoticeDto = {
  id: string;
  title?: string;
  content?: string;
  image?: string;
  attachments?: string[];
  isFixed?: boolean;
  index?: number;
};

export type NoticeDto = {
  id: string;
  title: string;
  content: string;
  image: string;
  attachments: string[];
  isFixed: boolean;
  index: number;
  createdAt: Date;
  updatedAt: Date;
};

export function toJSON(user: any) {
  return JSON.parse(JSON.stringify(user));
}
