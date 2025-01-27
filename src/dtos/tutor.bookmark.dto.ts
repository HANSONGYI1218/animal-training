export type CreateTutorBookmarkDto = {
  userId: string;
  tutorId: string;
};

export type GetTutorBookmarkDto = {
  id: string;
  userId: string;
  tutorId: string;
  createdAt: Date;
  updatedAt: Date;
};
