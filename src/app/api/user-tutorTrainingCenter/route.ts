import { NextRequest, NextResponse } from "next/server";

import {
  CreateUserTutorTrainingCenterDto,
  UserTutorTrainingCenterDto,
  UpdateUserTutorTrainingCenterDto,
  UserTutorTrainingCenterByUserIdDto,
} from "@/dtos/user.tutorTrainingCenter.dto";
import {
  createUserTutorTrainingCenterService,
  deleteUserTutorTrainingCenterService,
  getUserTutorTrainingCenteByUserIdService,
  getUserTutorTrainingCenterByIdService,
  updateUserTutorTrainingCenterService,
} from "@/services/user.tutorTrainingCenter.service";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateUserTutorTrainingCenterDto = await req.json();

    await createUserTutorTrainingCenterService(dto);
    return new NextResponse("UserTutorTrainingCenter created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create UserTutorTrainingCenter", {
      status: 500,
    });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const userId = searchParams.get("userId");

  try {
    if (id) {
      const userTutorTrainingCenter: UserTutorTrainingCenterDto | null =
        await getUserTutorTrainingCenterByIdService(id as string);

      if (!userTutorTrainingCenter)
        return new Response("userTutorTrainingCenter not found", {
          status: 404,
        });

      return NextResponse.json(userTutorTrainingCenter);
    }
    if (userId) {
      const userTutorTrainingCenter: UserTutorTrainingCenterByUserIdDto[] =
        await getUserTutorTrainingCenteByUserIdService(userId as string);

      return NextResponse.json(userTutorTrainingCenter);
    }
  } catch (error) {
    return new NextResponse("Failed to create UserTutorTrainingCenter(s)", {
      status: 500,
    });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateUserTutorTrainingCenterDto = await req.json();

    await updateUserTutorTrainingCenterService(dto);

    return new NextResponse("User updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update User", { status: 500 });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req?.nextUrl;

    const id = searchParams.get("id");

    await deleteUserTutorTrainingCenterService(id as string);

    return new NextResponse("UserTutorTrainingCenter deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete UserTutorTrainingCenter", {
      status: 500,
    });
  }
}
