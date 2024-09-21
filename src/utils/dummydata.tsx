import {
  Lecture,
  AnimalType,
  Category,
  PriceType,
  OccupationType,
  Tutor,
  Corporation,
} from "@/types/tyeps.all";

const lectureData: Lecture[] = [
  {
    id: "1",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    price_type: PriceType.FREE,
    category: Category.TRANING,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 8,
    tag: ["배변", "훈련"],
    bookmark: true,
    tutor: {
      id: "4",
      name: "강형욱",
      introduction: "안녕하세요. 강형욱입니다.",
      career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
      occupation: OccupationType.TRAINER,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "2",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    price_type: PriceType.FREE,
    category: Category.BEAUTY,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date("2024-8-20"),
    updatedAt: new Date(),
    like: 12,
    tag: ["배변", "훈련", "코카스파니엘"],
    bookmark: true,
    tutor: {
      id: "4",
      name: "강형욱",
      introduction: "안녕하세요. 강형욱입니다.",
      career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
      occupation: OccupationType.TRAINER,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "3",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    price_type: PriceType.PAID,
    category: Category.TRANING,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date("2024-8-23"),
    updatedAt: new Date(),
    like: 2,
    tag: ["코카스파니엘"],
    bookmark: false,
    tutor: {
      id: "4",
      name: "강형욱",
      introduction: "안녕하세요. 강형욱입니다.",
      career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
      occupation: OccupationType.TRAINER,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "4",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
    아무렴 강형욱 훈련사와 함께하는 훈련!
    재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    price_type: PriceType.PAID,
    category: Category.COMMUNICATION,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
    like: 1,
    tag: ["코카스파니엘", "사료", "강형욱"],
    bookmark: true,
    tutor: {
      id: "4",
      name: "강형욱",
      introduction: "안녕하세요. 강형욱입니다.",
      career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
      occupation: OccupationType.TRAINER,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "5",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.DOG,
    price_type: PriceType.FREE,
    category: Category.COMMUNICATION,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["리트리버", "강형욱"],
    bookmark: false,
    tutor: {
      id: "5",
      name: "강형욱",
      introduction: "안녕하세요. 강형욱입니다.",
      career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
      occupation: OccupationType.TRAINER,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "6",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!! 강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.FREE,
    category: Category.FOOD,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date("2024-3-23"),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄", "강형욱"],
    bookmark: true,
    tutor: {
      id: "6",
      name: "강형욱",
      introduction: "안녕하세요. 강형욱입니다.",
      career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
      occupation: OccupationType.TRAINER,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "7",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!! 강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.DOG,
    price_type: PriceType.FREE,
    category: Category.FOOD,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄", "강형욱"],
    bookmark: false,
    tutor: {
      id: "1",
      name: "강형욱",
      introduction: "안녕하세요. 강형욱입니다.",
      career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
      occupation: OccupationType.TRAINER,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "8",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.CAT,
    price_type: PriceType.FREE,
    category: Category.HEALTH,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date("2024-8-28"),
    updatedAt: new Date(),
    like: 0,
    tag: ["배변", "훈련", "코카스파니엘", "강형욱"],
    bookmark: true,
    tutor: {
      id: "1",
      name: "강형욱",
      introduction: "안녕하세요. 강형욱입니다.",
      career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
      occupation: OccupationType.TRAINER,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "9",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content: `강아지의 다양한 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!
      아무렴 강형욱 훈련사와 함께하는 훈련!
      재밌게 즐겨보고 반려견을 더 사랑하세요!!`,
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.HEALTH,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "8",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "10",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    thumbnailPath: "/Test-courseImg-cat.png",
    category: Category.HEALTH,
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 8,
    tag: ["배변", "훈련", "코카스파니엘"],
    bookmark: true,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "11",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "12",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "13",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "14",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "15",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "16",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "17",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "18",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "19",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "20",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.DOG,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "21",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.DOG,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "22",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "23",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "24",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "25",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "26",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "27",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "28",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "29",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "30",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "31",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
  {
    id: "32",
    title: "강형욱 선생님과 함께하는 강아지 배변 훈련!",
    content:
      "강아지의 고양이 배변 현상, 강형욱 훈련사님의 깊은 내공으로 궁금증 해결!!",
    animal_type: AnimalType.CAT,
    price_type: PriceType.PAID,
    category: Category.PLAY,
    thumbnailPath: "/Test-courseImg-cat.png",
    videoUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    like: 0,
    tag: ["시츄"],
    bookmark: false,
    tutor: {
      id: "7",
      name: "설채현",
      introduction: "안녕하세요. 설채현입니다.",
      career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
      occupation: OccupationType.VETERINARIAN,
      corporation: {
        id: "1",
        owner_name: "강형욱", // 대표자 이름
        corporation_name: "보듬컴퍼니", // 기업 이름
        address: "중랑구 상봉동 씨티7 202호",
        phoneNumber: "02-3333-33333",
        email: "admin@mubg.ddd",
        business_number: "02-3333-33333", // 사업자번호
        createdAt: new Date("2024-7-23"),
        updatedAt: new Date(),
      },
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
  },
];

const TutorData: Tutor[] = [
  {
    id: "1",
    name: "강형욱",
    introduction: "안녕하세요. 강형욱입니다.",
    career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
    occupation: OccupationType.TRAINER,
    corporation: {
      id: "1",
      owner_name: "강형욱", // 대표자 이름
      corporation_name: "보듬컴퍼니", // 기업 이름
      address: "중랑구 상봉동 씨티7 202호",
      phoneNumber: "02-3333-33333",
      email: "admin@mubg.ddd",
      business_number: "02-3333-33333", // 사업자번호
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "강형욱",
    introduction: "안녕하세요. 강형욱입니다.",
    career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
    occupation: OccupationType.TRAINER,
    corporation: {
      id: "1",
      owner_name: "강형욱", // 대표자 이름
      corporation_name: "보듬컴퍼니", // 기업 이름
      address: "중랑구 상봉동 씨티7 202호",
      phoneNumber: "02-3333-33333",
      email: "admin@mubg.ddd",
      business_number: "02-3333-33333", // 사업자번호
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "강형욱",
    introduction: "안녕하세요. 강형욱입니다.",
    career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
    occupation: OccupationType.TRAINER,
    corporation: {
      id: "1",
      owner_name: "강형욱", // 대표자 이름
      corporation_name: "보듬컴퍼니", // 기업 이름
      address: "중랑구 상봉동 씨티7 202호",
      phoneNumber: "02-3333-33333",
      email: "admin@mubg.ddd",
      business_number: "02-3333-33333", // 사업자번호
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "강형욱",
    introduction: `안녕하세요. 강형욱입니다.
    안녕하세요, 저는 동물들을 사랑하고 그들의 건강을 책임지는 수의사입니다.
    다양한 동물들의 질병을 진단하고 치료하며, 반려동물과 그 가족들에게 최상의 케어를 제공하기 위해 항상 노력하고 있습니다.
    동물들이 건강하고 행복하게 지낼 수 있도록 돕는 것이 저의 가장 큰 보람입니다.`,
    career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
    occupation: OccupationType.TRAINER,
    corporation: {
      id: "1",
      owner_name: "강형욱", // 대표자 이름
      corporation_name: "보듬컴퍼니", // 기업 이름
      address: "중랑구 상봉동 씨티7 202호",
      phoneNumber: "02-3333-33333",
      email: "admin@mubg.ddd",
      business_number: "02-3333-33333", // 사업자번호
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "강형욱",
    introduction: "안녕하세요. 강형욱입니다.",
    career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
    occupation: OccupationType.TRAINER,
    corporation: {
      id: "1",
      owner_name: "강형욱", // 대표자 이름
      corporation_name: "보듬컴퍼니", // 기업 이름
      address: "중랑구 상봉동 씨티7 202호",
      phoneNumber: "02-3333-33333",
      email: "admin@mubg.ddd",
      business_number: "02-3333-33333", // 사업자번호
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "강형욱",
    introduction: `안녕하세요. 강형욱입니다.
    안녕하세요, 저는 동물들을 사랑하고 그들의 건강을 책임지는 수의사입니다.
    다양한 동물들의 질병을 진단하고 치료하며, 반려동물과 그 가족들에게 최상의 케어를 제공하기 위해 항상 노력하고 있습니다.
    동물들이 건강하고 행복하게 지낼 수 있도록 돕는 것이 저의 가장 큰 보람입니다.`,
    career: "보듬컴퍼니 훈련사", // 최종(현재) 커리어
    occupation: OccupationType.TRAINER,
    corporation: {
      id: "1",
      owner_name: "강형욱", // 대표자 이름
      corporation_name: "보듬컴퍼니", // 기업 이름
      address: "중랑구 상봉동 씨티7 202호",
      phoneNumber: "02-3333-33333",
      email: "admin@mubg.ddd",
      business_number: "02-3333-33333", // 사업자번호
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },

  {
    id: "7",
    name: "설채현",
    introduction: "안녕하세요. 설채현입니다.",
    career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
    occupation: OccupationType.VETERINARIAN,
    corporation: {
      id: "1",
      owner_name: "강형욱", // 대표자 이름
      corporation_name: "보듬컴퍼니", // 기업 이름
      address: "중랑구 상봉동 씨티7 202호",
      phoneNumber: "02-3333-33333",
      email: "admin@mubg.ddd",
      business_number: "02-3333-33333", // 사업자번호
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "8",
    name: "설채현",
    introduction: "안녕하세요. 설채현입니다.",
    career: "보듬컴퍼니 수의사", // 최종(현재) 커리어
    occupation: OccupationType.VETERINARIAN,
    corporation: {
      id: "1",
      owner_name: "강형욱", // 대표자 이름
      corporation_name: "보듬컴퍼니", // 기업 이름
      address: "중랑구 상봉동 씨티7 202호",
      phoneNumber: "02-3333-33333",
      email: "admin@mubg.ddd",
      business_number: "02-3333-33333", // 사업자번호
      createdAt: new Date("2024-7-23"),
      updatedAt: new Date(),
    },
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
];

const CorporationData: Corporation[] = [
  {
    id: "1",
    owner_name: "강형욱", // 대표자 이름
    corporation_name: "보듬컴퍼니", // 기업 이름
    address: "중랑구 상봉동 씨티7 202호",
    phoneNumber: "02-3333-33333",
    email: "admin@mubg.ddd",
    business_number: "02-3333-33333", // 사업자번호
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "2",
    owner_name: "강형욱", // 대표자 이름
    corporation_name: "보듬컴퍼니", // 기업 이름
    address: "중랑구 상봉동 씨티7 202호",
    phoneNumber: "02-3333-33333",
    email: "admin@mubg.ddd",
    business_number: "02-3333-33333", // 사업자번호
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "3",
    owner_name: "강형욱", // 대표자 이름
    corporation_name: "보듬컴퍼니", // 기업 이름
    address: "중랑구 상봉동 씨티7 202호",
    phoneNumber: "02-3333-33333",
    email: "admin@mubg.ddd",
    business_number: "02-3333-33333", // 사업자번호
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "4",
    owner_name: "강형욱", // 대표자 이름
    corporation_name: "보듬컴퍼니", // 기업 이름
    address: "중랑구 상봉동 씨티7 202호",
    phoneNumber: "02-3333-33333",
    email: "admin@mubg.ddd",
    business_number: "02-3333-33333", // 사업자번호
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "5",
    owner_name: "강형욱", // 대표자 이름
    corporation_name: "보듬컴퍼니", // 기업 이름
    address: "중랑구 상봉동 씨티7 202호",
    phoneNumber: "02-3333-33333",
    email: "admin@mubg.ddd",
    business_number: "02-3333-33333", // 사업자번호
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
  {
    id: "6",
    owner_name: "강형욱", // 대표자 이름
    corporation_name: "보듬컴퍼니", // 기업 이름
    address: "중랑구 상봉동 씨티7 202호",
    phoneNumber: "02-3333-33333",
    email: "admin@mubg.ddd",
    business_number: "02-3333-33333", // 사업자번호
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },

  {
    id: "7",
    owner_name: "강형욱", // 대표자 이름
    corporation_name: "보듬컴퍼니", // 기업 이름
    address: "중랑구 상봉동 씨티7 202호",
    phoneNumber: "02-3333-33333",
    email: "admin@mubg.ddd",
    business_number: "02-3333-33333", // 사업자번호
    createdAt: new Date("2024-7-23"),
    updatedAt: new Date(),
  },
];

export default {
  lectureData,
  TutorData,
  CorporationData,
};
