import {
  createTrainingCenterService,
  deleteTrainingCenterService,
  getAllTrainingCentersService,
  getTrainingCenterByCorporationIdService,
  getTrainingCenterByIdService,
  getTrainingCenterByTutorIdService,
  updateTrainingCenterService,
} from "@/services/training.center.service";
import {
  CreateTrainingCenterDto,
  GetTrainingCenterDetailDto,
  TrainingCenterOnlyOneTutorDto,
  UpdateTrainingCenterDto,
} from "@/dtos/training.center.dto";
import { NextRequest, NextResponse } from "next/server";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateTrainingCenterDto = await req.json();

    await createTrainingCenterService(dto);
    return new NextResponse("TrainingCenter created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create TrainingCenter", { status: 500 });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const tutorId = searchParams.get("tutorId");
  const corporationId = searchParams.get("corporationId");

  try {
    if (id) {
      if (tutorId) {
        const trainingCenter: TrainingCenterOnlyOneTutorDto | null =
          await getTrainingCenterByTutorIdService(
            id as string,
            tutorId as string,
          );

        if (!trainingCenter)
          return new Response("TrainingCenter not found", { status: 404 });

        return NextResponse.json(trainingCenter);
      } else {
        const trainingCenter: GetTrainingCenterDetailDto | null =
          await getTrainingCenterByIdService(id as string);

        if (!trainingCenter)
          return new Response("TrainingCenter not found", { status: 404 });

        return NextResponse.json(trainingCenter);
      }
    }
    if (corporationId) {
      const trainingCenters: GetTrainingCenterDetailDto[] =
        await getTrainingCenterByCorporationIdService(corporationId as string);

      return NextResponse.json(trainingCenters);
    }
    const trainingCenters: GetTrainingCenterDetailDto[] =
      await getAllTrainingCentersService();

    return NextResponse.json(trainingCenters);
  } catch (error) {
    return new NextResponse("Failed to create TrainingCenter(s)", {
      status: 500,
    });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateTrainingCenterDto = await req.json();

    await updateTrainingCenterService(dto);
    return new NextResponse("TrainingCenter updated successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to update TrainingCenter", { status: 500 });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    await deleteTrainingCenterService(id as string);

    return new NextResponse("TrainingCenter deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete TrainingCenter", { status: 500 });
  }
}
