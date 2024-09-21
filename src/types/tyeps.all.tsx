export enum AnimalType {
  DOG = '강아지',
  CAT = '고양이',
}

export enum PriceType {
  FREE = '무료',
  PAID = '유료',
}

export enum SexType {
  MALE = '남성',
  FEMALE = '여성',
}

export enum OccupationType {
  TRAINER = '훈련사',
  VETERINARIAN = '수의사',
  GROOMER = '미용사',
  PROFESSOR = '교수',
}

export enum Category {
  FOOD = '식품',
  BEAUTY = '미용',
  HEALTH = '건강',
  WALK = '산책',
  TRANING = '훈련',
  ADOPT = '입양',
  PLAY = '놀이',
  COMMUNICATION = '의사소통',
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
  tag: string[];
  bookmark: boolean;
  tutor: Tutor;
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
  corporation: Corporation;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: string;
  name: string;
  address: string;
  phoneNumber: string;
  email?: string;
  nickname: string;
  birthday?: Date;
  sex?: SexType;
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
