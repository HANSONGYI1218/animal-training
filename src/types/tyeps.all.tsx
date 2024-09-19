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
  bookmark: boolean;
};

/*
{
    id: 11,
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: "고양이",
    price_type: "유료",
    category: "훈련",
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
  },
];
*/
