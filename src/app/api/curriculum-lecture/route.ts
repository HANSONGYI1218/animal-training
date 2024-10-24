import { NextRequest, NextResponse } from "next/server";
import {
  CreateCurriculumLectureDto,
  GetCurriculumLectureDto,
} from "@/dtos/curriculum-lecture.dtos";
import {
  createCurriculumLecture,
  deleteCurriculumLecture,
  getAllCurriculumLectures,
  getCurriculumLectureById,
  getCurriculumLectureByCategory,
  updateCurriculumLecture,
} from "@/controllers/curriculum-lecture.controllers";
import { CurriculumCategory } from "@prisma/client";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateCurriculumLectureDto = await req.json();

    await createCurriculumLecture(dto);
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
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const category = searchParams.get("category");

  try {
    if (category) {
      const curriculumLecture: GetCurriculumLectureDto[] =
        await getCurriculumLectureByCategory(
          CurriculumCategory[
            category as keyof typeof CurriculumCategory
          ] as CurriculumCategory,
        );

      return NextResponse.json(curriculumLecture);
    }
    if (id) {
      const curriculumLecture: GetCurriculumLectureDto | null =
        await getCurriculumLectureById(id as string);

      if (!curriculumLecture)
        return new Response("CurriculumLecture not found", { status: 404 });

      return NextResponse.json(curriculumLecture);
    } else {
      const curriculumLectures = await getAllCurriculumLectures();

      return NextResponse.json(curriculumLectures);
    }
  } catch (error) {
    return new NextResponse("Failed to create Lectur(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");

    const dto: CreateCurriculumLectureDto = await req.json();

    await updateCurriculumLecture(id as string, dto);
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
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    const deletedCurriculumLecture = await deleteCurriculumLecture(
      id as string,
    );
    if (!deletedCurriculumLecture)
      return new Response("CurriculumLecture not found", { status: 404 });
    return new NextResponse("CurriculumLecture deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete CurriculumLecture", {
      status: 500,
    });
  }
}
