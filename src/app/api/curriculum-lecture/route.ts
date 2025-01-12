import { NextRequest, NextResponse } from "next/server";
import {
  CreateCurriculumLectureDto,
  CurriculumLectureDto,
  UpdateCurriculumLectureDto,
  SelectCurriculumLectureDto,
} from "@/dtos/curriculum.lecture.dto";
import {
  createCurriculumLectureService,
  getSelectCurriculumLecturesService,
  getCurriculumLectureByIdService,
  getCurriculumLectureByCategoryService,
  updateCurriculumLectureService,
  deleteCurriculumLectureService,
} from "@/services/curriculum.lecture.service";
import { AnimalType, CurriculumCategory } from "@prisma/client";

// DTO의 속성으로 타입을 구분할 수 있는 함수 정의
function isSelectCurriculumLectureDto(
  dto: any,
): dto is SelectCurriculumLectureDto {
  return "animal_type" in dto && "animal_size" in dto && "animal_age" in dto;
}

// POST 요청 핸들러
async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateCurriculumLectureDto | SelectCurriculumLectureDto =
      await req.json();

    if (isSelectCurriculumLectureDto(dto)) {
      const curriculumLectures = await getSelectCurriculumLecturesService(dto);

      return NextResponse.json(curriculumLectures);
    } else {
      await createCurriculumLectureService(dto);
      return new NextResponse("CurriculumLecture created successfully", {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse("Failed to create CurriculumLecture", {
      status: 500,
    });
  }
}

// GET 요청 핸들러
async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const category = searchParams.get("category");
  const animalType = searchParams.get("animalType");

  try {
    if (category && animalType) {
      const curriculumLecture: CurriculumLectureDto[] =
        await getCurriculumLectureByCategoryService(
          CurriculumCategory[
            category as keyof typeof CurriculumCategory
          ] as CurriculumCategory,
          AnimalType[animalType as keyof typeof AnimalType] as AnimalType,
        );

      return NextResponse.json(curriculumLecture);
    }
    if (id) {
      const curriculumLecture: CurriculumLectureDto | null =
        await getCurriculumLectureByIdService(id as string);

      if (!curriculumLecture)
        return new Response("CurriculumLecture not found", { status: 404 });

      return NextResponse.json(curriculumLecture);
    }
  } catch (error) {
    return new NextResponse("Failed to create Lectur(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateCurriculumLectureDto = await req.json();

    await updateCurriculumLectureService(dto);
    return new NextResponse("CurriculumLecture updated successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to update CurriculumLecture", {
      status: 500,
    });
  }
}

// DELETE 요청 핸들러
async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    await deleteCurriculumLectureService(id as string);

    return new NextResponse("CurriculumLecture deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete CurriculumLecture", {
      status: 500,
    });
  }
}

export { POST, GET, DELETE, PUT };
