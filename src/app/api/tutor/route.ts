import { NextRequest, NextResponse } from "next/server";

import { CreateTutorDto, GetTutorDto } from "@/dtos/tutor.dtos";
import {
  createTutorService,
  getTutorByIdService,
  updateTutorService,
  deleteTutorService,
  getAllTutorsService,
} from "@/services/tutor.services";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateTutorDto = await req.json();

    await createTutorService(dto);
    return new NextResponse("Tutor created successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create Tutor", { status: 500 });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");

  try {
    if (id) {
      const tutor: GetTutorDto | null = await getTutorByIdService(id as string);

      if (!tutor) return new Response("Tutor not found", { status: 404 });

      return NextResponse.json(tutor);
    } else {
      const tutors = await getAllTutorsService();

      return NextResponse.json(tutors);
    }
  } catch (error) {
    return new NextResponse("Failed to create Tutor(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");

    const dto: CreateTutorDto = await req.json();

    await updateTutorService(id as string, dto);
    return new NextResponse("Tutor updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update Tutor", { status: 500 });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    const deletedTutor = await deleteTutorService(id as string);
    if (!deletedTutor) return new Response("Tutor not found", { status: 404 });
    return new NextResponse("Tutor deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete Tutor", { status: 500 });
  }
}
