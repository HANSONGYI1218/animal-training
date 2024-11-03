import { NextRequest, NextResponse } from "next/server";
import {
  CreateUserCurriculumDto,
  UpdateUserCurriculumDto,
  UserCurriculumDto,
} from "@/dtos/user.curriculum.dto";
import {
  createUserCurriculumService,
  deleteUserCurriculumService,
  getAllUserCurriculumsService,
  getUserCurriculumByUserIdService,
  updateUserCurriculumService,
} from "@/services/user.curriculum.service";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateUserCurriculumDto = await req.json();

    await createUserCurriculumService(dto);
    return new NextResponse("UserCurriculum created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create UserCurriculum", {
      status: 500,
    });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const userId = searchParams.get("userId");

  try {
    if (userId) {
      const userCurriculum: UserCurriculumDto | null =
        await getUserCurriculumByUserIdService(userId as string);

      if (!userCurriculum)
        return new Response("UserCurriculum not found", { status: 404 });

      return NextResponse.json(userCurriculum);
    } else {
      const userCurriculums = await getAllUserCurriculumsService();

      return NextResponse.json(userCurriculums);
    }
  } catch (error) {
    return new NextResponse("Failed to create userCurriculum(s)", {
      status: 500,
    });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateUserCurriculumDto = await req.json();

    await updateUserCurriculumService(dto);
    return new NextResponse("UserCurriculum updated successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to update UserCurriculum", {
      status: 500,
    });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");

    await deleteUserCurriculumService(id as string);

    return new NextResponse("UserCurriculum deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete UserCurriculum", {
      status: 500,
    });
  }
}
