import { NextRequest, NextResponse } from "next/server";
import {
  CreateCurriculumLectureDto,
  CurriculumLectureDto,
  UpdateCurriculumLectureDto,
} from "@/dtos/curriculum.lecture.dto";
import {
  createCurriculumLectureService,
  getAllCurriculumLecturesService,
  getCurriculumLectureByIdService,
  getCurriculumLectureByCategoryService,
  updateCurriculumLectureService,
  deleteCurriculumLectureService,
} from "@/services/curriculum.lecture.service";
import { CurriculumCategory } from "@prisma/client";

// POST 요청 핸들러
async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateCurriculumLectureDto = await req.json();

    await createCurriculumLectureService(dto);
    return new NextResponse("CurriculumLecture created successfully", {
      status: 200,
    });
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

  try {
    if (category) {
      const curriculumLecture: CurriculumLectureDto[] =
        await getCurriculumLectureByCategoryService(
          CurriculumCategory[
            category as keyof typeof CurriculumCategory
          ] as CurriculumCategory,
        );

      return NextResponse.json(curriculumLecture);
    }
    if (id) {
      const curriculumLecture: CurriculumLectureDto | null =
        await getCurriculumLectureByIdService(id as string);

      if (!curriculumLecture)
        return new Response("CurriculumLecture not found", { status: 404 });

      return NextResponse.json(curriculumLecture);
    } else {
      const curriculumLectures = await getAllCurriculumLecturesService();

      return NextResponse.json(curriculumLectures);
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
