export enum AnimalType {
  DOG = "강아지",
  CAT = "고양이",
}

export enum PriceType {
  FREE = "무료",
  PAID = "유료",
}

export enum Category {
  FOOD = "식품",
  BEAUTY = "미용",
  HEALTH = "건강",
  WALK = "산책",
  TRANING = "훈련",
  ADOPT = "입양",
  PLAY = "놀이",
  COMMUNICATION = "의사소통",
}

export type Lecture = {
  id: string;
  title: string;
  content: string;
  animal_type: AnimalType;
  trainer_name: string;
  price_type: PriceType;
  category: Category;
  thumbnailPath: string;
  videoUrl: string;
  createdAt: Date;
  updatedAt: Date;
  like: number;
  tag: string[];
  bookmark: boolean;
};
