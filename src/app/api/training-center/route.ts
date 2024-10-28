import {
  createTrainingCenterService,
  deleteTrainingCenterService,
  getAllTrainingCentersService,
  getTrainingCenterByIdService,
  updateTrainingCenterService,
} from "@/services/training-center.service";
import {
  CreateTrainingCenterDto,
  GetTrainingCenterDetailDto,
} from "@/dtos/training-center.dtos";
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

  try {
    if (id) {
      const trainingCenter: GetTrainingCenterDetailDto | null =
        await getTrainingCenterByIdService(id as string);

      if (!trainingCenter)
        return new Response("TrainingCenter not found", { status: 404 });

      return NextResponse.json(trainingCenter);
    } else {
      const trainingCenters: GetTrainingCenterDetailDto[] =
        await getAllTrainingCentersService();

      return NextResponse.json(trainingCenters);
    }
  } catch (error) {
    return new NextResponse("Failed to create TrainingCenter(s)", {
      status: 500,
    });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");

    const dto: CreateTrainingCenterDto = await req.json();

    await updateTrainingCenterService(id as string, dto);
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
    const deletedTrainingCenter = await deleteTrainingCenterService(
      id as string,
    );
    if (!deletedTrainingCenter)
      return new Response("TrainingCenter not found", { status: 404 });
    return new NextResponse("TrainingCenter deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete TrainingCenter", { status: 500 });
  }
}
