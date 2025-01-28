import { NextRequest, NextResponse } from "next/server";

import { CreateTutorDto, GetAllTutorDto, GetTutorDto } from "@/dtos/tutor.dto";
import {
  createTutorService,
  getTutorByIdService,
  updateTutorService,
  deleteTutorService,
  getAllTutorsService,
  getTutorByCorporationIdService,
} from "@/services/tutor.service";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateTutorDto = await req.json();

    const tutorId = await createTutorService(dto);
    return NextResponse.json(tutorId);
  } catch (error) {
    return new NextResponse("Failed to create Tutor", { status: 500 });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const corporationId = searchParams.get("corporationId");

  try {
    if (id) {
      const tutor: GetTutorDto | null = await getTutorByIdService(id as string);

      if (!tutor) return new Response("Tutor not found", { status: 404 });

      return NextResponse.json(tutor);
    }
    if (corporationId) {
      const tutors: GetAllTutorDto[] = await getTutorByCorporationIdService(
        corporationId as string,
      );

      if (!tutors) return new Response("tutors not found", { status: 404 });

      return NextResponse.json(tutors);
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
    const dto: CreateTutorDto = await req.json();

    await updateTutorService(dto);
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

    await deleteTutorService(id as string);

    return new NextResponse("Tutor deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete Tutor", { status: 500 });
  }
}
