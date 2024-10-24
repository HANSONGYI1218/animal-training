import { NextRequest, NextResponse } from "next/server";
import {
  CreateCurriculumTrainingDto,
  GetCurriculumTrainingDto,
} from "@/dtos/curriculum-training.dtos";
import {
  createCurriculumTraining,
  deleteCurriculumTraining,
  getAllCurriculumTrainings,
  updateCurriculumTraining,
} from "@/controllers/curriculum-training.controllers";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateCurriculumTrainingDto = await req.json();

    await createCurriculumTraining(dto);
    return new NextResponse("CurriculumTraining created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create CurriculumTraining", {
      status: 500,
    });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const curriculumTrainings: GetCurriculumTrainingDto[] =
      await getAllCurriculumTrainings();

    return NextResponse.json(curriculumTrainings);
  } catch (error) {
    return new NextResponse("Failed to create Lectur(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");

    const dto: CreateCurriculumTrainingDto = await req.json();

    await updateCurriculumTraining(id as string, dto);
    return new NextResponse("CurriculumTraining updated successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to update CurriculumTraining", {
      status: 500,
    });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    const deletedCurriculumTraining = await deleteCurriculumTraining(
      id as string,
    );
    if (!deletedCurriculumTraining)
      return new Response("CurriculumTraining not found", { status: 404 });
    return new NextResponse("CurriculumTraining deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete CurriculumTraining", {
      status: 500,
    });
  }
}
