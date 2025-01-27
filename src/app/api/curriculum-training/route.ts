import { NextRequest, NextResponse } from "next/server";
import {
  CreateCurriculumTrainingDto,
  CurriculumTrainingDto,
  GetCurriculumTrainingDto,
  UpdateCurriculumTrainingDto,
} from "@/dtos/curriculum.training.dto";
import {
  createCurriculumTrainingService,
  getAllCurriculumTrainingsService,
  updateCurriculumTrainingService,
  deleteCurriculumTrainingService,
  getCurriculumTrainingByIdService,
} from "@/services/curriculum.training.service";
import { AnimalType } from "@prisma/client";

// DTO의 속성으로 타입을 구분할 수 있는 함수 정의
function isSelectCurriculumTrainingDto(
  dto: any,
): dto is { animal_type: string } {
  return (
    dto &&
    typeof dto === "object" &&
    "animal_type" in dto &&
    Object.keys(dto).length === 1
  );
}

// POST 요청 핸들러
async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateCurriculumTrainingDto = await req.json();

    if (isSelectCurriculumTrainingDto(dto)) {
      const curriculumTrainings: GetCurriculumTrainingDto[] =
        await getAllCurriculumTrainingsService(dto?.animal_type);

      return NextResponse.json(curriculumTrainings);
    } else {
      await createCurriculumTrainingService(dto);
      return new NextResponse("CurriculumTraining created successfully", {
        status: 200,
      });
    }
  } catch (error) {
    return new NextResponse("Failed to create CurriculumTraining", {
      status: 500,
    });
  }
}

// GET 요청 핸들러
async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");

  try {
    if (id) {
      const curriculumTraining: CurriculumTrainingDto | null =
        await getCurriculumTrainingByIdService(id as string);

      if (!curriculumTraining)
        return new Response("CurriculumTracurriculumTraining not found", {
          status: 404,
        });

      return NextResponse.json(curriculumTraining);
    }
  } catch (error) {
    return new NextResponse("Failed to create Lectur(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateCurriculumTrainingDto = await req.json();

    await updateCurriculumTrainingService(dto);
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
async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    await deleteCurriculumTrainingService(id as string);

    return new NextResponse("CurriculumLecture deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete CurriculumTraining", {
      status: 500,
    });
  }
}

export { POST, GET, DELETE, PUT };
