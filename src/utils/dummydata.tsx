import { Lecture, AnimalType, Category, PriceType } from "@/types/tyeps.all";

const lectureData: Lecture[] = [
  {
    id: "1",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    trainer_name: "강형욱",
    price_type: PriceType.FREE,
    category: Category.TRANING,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 8,
    bookmark: true,
  },
  {
    id: "2",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    trainer_name: "강형욱",
    price_type: PriceType.FREE,
    category: Category.BEAUTY,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date("2024-8-20"),
    updatedAt: new Date(),
    like: 12,
    bookmark: true,
  },
  {
    id: "3",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    trainer_name: "강형욱",
    price_type: PriceType.PAID,
    category: Category.TRANING,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date("2024-8-23"),
    updatedAt: new Date(),
    like: 2,
    bookmark: false,
  },
  {
    id: "4",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
    아무렴 강형욱 훈련사와 함께하는 훈련!
    재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    trainer_name: "강형욱",
    price_type: PriceType.PAID,
    category: Category.COMMUNICATION,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
    like: 1,
    bookmark: true,
  },
  {
    id: "5",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    trainer_name: "설채현",
    price_type: PriceType.FREE,
    category: Category.COMMUNICATION,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    bookmark: false,
  },
  {
    id: "6",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!! 강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    trainer_name: "설채현",
    price_type: PriceType.FREE,
    category: Category.FOOD,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date("2024-3-23"),
    updatedAt: new Date(),
    like: 0,
    bookmark: true,
  },
  {
    id: "7",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!! 강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.DOG,
    trainer_name: "설채현",
    price_type: PriceType.FREE,
    category: Category.FOOD,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    bookmark: false,
  },
  {
    id: "8",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.CAT,
    trainer_name: "설채현",
    price_type: PriceType.FREE,
    category: Category.HEALTH,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date("2024-8-28"),
    updatedAt: new Date(),
    like: 0,
    bookmark: true,
  },
  {
    id: "9",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.CAT,
    trainer_name: "설채현",
    price_type: PriceType.PAID,
    category: Category.HEALTH,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    bookmark: false,
  },
  {
    id: "10",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    trainer_name: "설채현",
    price_type: PriceType.PAID,
    thumbnailPath: "/Test-courseImg-cat.png",
    category: Category.HEALTH,
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 8,
    bookmark: true,
  },
  {
    id: "11",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    trainer_name: "설채현",
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    bookmark: false,
  },
];

const myCoursDummy = [
  {
    id: 1,
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    progress: 68,
    thumbnail: "/Test-courseImg.png",
    courseVideoUrl: "",
  },
  {
    id: "2",
    title: "shkseshk!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    progress: 60,
    thumbnail: "/Test-courseImg.png",
    courseVideoUrl: "",
  },
  {
    id: "3",
    title: "강형욱 선생님과",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    progress: 30,
    thumbnail: "/Test-courseImg.png",
    courseVideoUrl: "",
  },
  {
    id: "4",
    title: "현상, 강형욱 훈련",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    progress: 10,
    thumbnail: "/Test-courseImg.png",
    courseVideoUrl: "",
  },
  {
    id: "5",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    progress: 100,
    thumbnail: "/Test-courseImg.png",
    courseVideoUrl: "",
  },
  {
    id: "6",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    progress: 80,
    thumbnail: "/Test-courseImg.png",
    courseVideoUrl: "",
  },
];

export default {
  lectureData,
  myCoursDummy,
};
