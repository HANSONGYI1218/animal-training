import { NextRequest, NextResponse } from "next/server";
import { CreateLectureDto, GetLectureDetailDto } from "@/dtos/lecture.dtos";
import {
  createLecture,
  deleteLecture,
  getAllLectures,
  getLectureByCategory,
  getLectureById,
  getLectureByTag,
  getLectureByTutorId,
  updateLecture,
} from "@/controllers/lecture.controllers";
import { Category } from "@prisma/client";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateLectureDto = await req.json();

    await createLecture(dto);
    return new NextResponse("Lecture created successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create Lecture", { status: 500 });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const tutorId = searchParams.get("tutorId");
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");

  try {
    if (tag) {
      const lecture = await getLectureByTag(tag as string);

      return NextResponse.json(lecture);
    }
    if (category && category !== "all") {
      const lecture = await getLectureByCategory(
        Category[category.toUpperCase() as keyof typeof Category] as Category,
      );

      return NextResponse.json(lecture);
    }

    if (tutorId) {
      const lecture = await getLectureByTutorId(tutorId as string);

      return NextResponse.json(lecture);
    }

    if (id) {
      const lecture: GetLectureDetailDto | null = await getLectureById(
        id as string,
      );

      if (!lecture) return new Response("Lecture not found", { status: 404 });

      return NextResponse.json(lecture);
    } else {
      const lectures = await getAllLectures();

      return NextResponse.json(lectures);
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

    const dto: CreateLectureDto = await req.json();

    await updateLecture(id as string, dto);
    return new NextResponse("Lecture updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update Lecture", { status: 500 });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    const deletedLecture = await deleteLecture(id as string);
    if (!deletedLecture)
      return new Response("Lecture not found", { status: 404 });
    return new NextResponse("Lecture deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete Lecture", { status: 500 });
  }
}
