import { NextRequest, NextResponse } from "next/server";

import {
  CreateTutorTrainingCenterDto,
  TutorTrainingCenterDto,
  UpdateTutorTrainingCenterDto,
} from "@/dtos/tutor.trainingCenter.dto";
import {
  createTutorTrainingCenterService,
  deleteTutorTrainingCenterService,
  getTutorTrainingCenterByIdService,
  updateTutorTrainingCenterService,
} from "@/services/tutor.trainingCenter.service";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateTutorTrainingCenterDto = await req.json();

    await createTutorTrainingCenterService(dto);
    return new NextResponse("TutorTrainingCenter created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create TutorTrainingCenter", {
      status: 500,
    });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const tutorId = searchParams.get("tutorId");
  const trainingCenterId = searchParams.get("trainingCenterId");

  try {
    if (tutorId && trainingCenterId) {
      const TutorTrainingCenter: TutorTrainingCenterDto | null =
        await getTutorTrainingCenterByIdService(
          tutorId as string,
          trainingCenterId as string,
        );

      if (!TutorTrainingCenter)
        return new Response("TutorTrainingCenter not found", { status: 404 });

      return NextResponse.json(TutorTrainingCenter);
    }
  } catch (error) {
    return new NextResponse("Failed to create TutorTrainingCenter(s)", {
      status: 500,
    });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateTutorTrainingCenterDto = await req.json();

    await updateTutorTrainingCenterService(dto);

    return new NextResponse("User updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update User", { status: 500 });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req?.nextUrl;

    const tutorId = searchParams.get("tutorId");
    const trainingCenterId = searchParams.get("trainingCenterId");

    await deleteTutorTrainingCenterService(
      tutorId as string,
      trainingCenterId as string,
    );

    return new NextResponse("TutorTrainingCenter deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete TutorTrainingCenter", {
      status: 500,
    });
  }
}
