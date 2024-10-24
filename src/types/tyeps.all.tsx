export enum AnimalType {
  DOG = "DOG",
  CAT = "CAT",
}

export enum PriceType {
  FREE = "FREE",
  PAID = "PAID",
}

export enum GenderType {
  MALE = "MALE",
  FEMALE = "FEMALE",
}

export enum OccupationType {
  TRAINER = "TRAINER",
  VETERINARIAN = "VETERINARIAN",
  GROOMER = "GROOMER",
  PROFESSOR = "PROFESSOR",
}

export enum Category {
  FOOD = "FOOD",
  BEAUTY = "BEAUTY",
  HEALTH = "HEALTH",
  WALK = "WALK",
  TRAINING = "TRAINING",
  ADOPT = "ADOPT",
  PLAY = "PLAY",
  COMMUNICATION = "COMMUNICATION",
}

export enum AdoptionStatus {
  ADOPTION = "ADOPTION",
  ABANDON = "ABANDON",
}

export enum CurriculumStep {
  LECTURE = "LECTURE",
  LECTURE_END = "LECTURE_END",
  TRANING = "TRANING",
  END = "END",
}

export enum RatingStatus {
  VERY_GOOD = "VERY_GOOD",
  GOOD = "GOOD",
  GENERAL = "GENERAL",
  BAD = "BAD",
}

export enum AttendanceStatus {
  ATTENDANCE = "ATTENDANCE",
  TARDY = "TARDY",
  ABSENT = "ABSENT",
  SCHEDULED = "SCHEDULED",
}

export type Lecture = {
  id: string;
  title: string;
  content: string;
  animal_type: AnimalType;
  price_type: PriceType;
  category: Category;
  thumbnailPath: string;
  videoUrl: string;
  like: number;
  tags: string[];
  bookmark: boolean;
  tutorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tutor = {
  id: string;
  name: string;
  introduction: string;
  profile_img: string;
  career: string; // 최종(현재) 커리어
  occupation: OccupationType;
  corporationId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  registrationNumber: string;
  email?: string;
  nickname: string;
  birthday?: Date;
  gender?: GenderType;
  createdAt: Date;
  updatedAt: Date;
};

export type Corporation = {
  id: string;
  owner_name: string; // 대표자 이름
  corporation_name?: string; // 기업 이름
  address: string;
  phoneNumber: string;
  email?: string;
  business_number?: string; // 사업자번호
  createdAt: Date;
  updatedAt: Date;
};

export type Adoption = {
  id: string;
  adoption_date: Date;
  abandon_date: Date | null;
  status: AdoptionStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  corporationId: string | null;
  animalId: string;
};

export type Abandon = {
  id: string;
  abandon_date: Date;
  adoption_date: Date | null;
  abandon_reason: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  corporationId: string | null;
  animalId: string;
};

export type Animal = {
  id: string;
  name: string;
  age: number;
  gender: GenderType;
  profile: string;
  breed: string;
  additionalImgs: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  corporationId: string | null;
};

export type CurriculumLecture = {
  id: string;
  index: number;
  title: string;
  content: string;
  animal_type: AnimalType;
  category: Category;
  thumbnailPath: string;
  videoUrl: string;
  tutorId: string;
  curriculumCollectionId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserCurriculum = {
  id: string;
  curriculumType: AnimalType;
  curriculumStep: CurriculumStep;
  currentCategory: Category;
  attendances: Array<{
    training_date: Date;
    start_time: string | null;
    end_time: string | null;
    absent_reason: string | null;
    attendance_status: AttendanceStatus;
  }> | null;
  currentIndex: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface AttendanceRecord {
  training_date: Date;
  attendance_status: AttendanceStatus;
  start_time: string;
  end_time: string;
  absent_reason: string | null;
}

export type TraningCenter = {
  id: string;
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  holidays: string[];
  price: number;
  like: number;
  createdAt: Date;
  updatedAt: Date;
  tutorId: string;
  corporationId: string;
};

export type Review = {
  id: string;
  parentId: string | null;
  rating: RatingStatus;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  traningCenterId: string;
};

export type Notice = {
  id: string;
  title: string;
  content: string;
  image: string | null;
  attachments: string[];
  isFixed: boolean;
  index: number;
  createdAt: Date;
  updatedAt: Date;
};
