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

export type Lecture = {
  id: string;
  title: string;
  content: string;
  animal_type: AnimalType;
  price_type: PriceType;
  category: Category;
  thumbnailPath: string;
  tutor_name: string;
  tutor_occupation: OccupationType;
  videoUrl: string;
  like: number;
  tag: string[];
  bookmark: boolean;
  tutorId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tutor = {
  id: string;
  name: string;
  introduction: string;
  career: string; // 최종(현재) 커리어
  traning_location: string; //훈련소 위치
  traning_name: string; //훈련소 이름
  occupation: OccupationType;
  corporation_name: string;
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
  additionalImg: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string | null;
  corporationId: string | null;
};
