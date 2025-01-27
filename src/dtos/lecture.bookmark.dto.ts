export type CreateLectureBookmarkDto = {
  userId: string;
  lectureId: string;
};

export type GetLectureBookmarkDto = {
  id: string;
  userId: string;
  lectureId: string;
  createdAt: Date;
  updatedAt: Date;
};
