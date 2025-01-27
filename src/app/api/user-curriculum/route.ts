import { NextRequest, NextResponse } from "next/server";
import {
  CreateUserCurriculumDto,
  UserCurriculumDto,
  GetUserCurriculumDto,
  UpdateUserCurriculumDto,
  UserCurriculumWithTutorTrainingCenterDto,
} from "@/dtos/user.curriculum.dto";
import {
  createUserCurriculumService,
  getAllUserCurriculumsService,
  getUserCurriculumByIdService,
  updateUserCurriculumService,
  deleteUserCurriculumService,
  getUserCurriculumByUserIdService,
  getUserCurriculumWithTutorTrainingCenterService,
} from "@/services/user.curriculum.service";

// POST 요청 핸들러
async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateUserCurriculumDto = await req.json();

    await createUserCurriculumService(dto);
    return new NextResponse("usercurriculum created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create usercurriculum", {
      status: 500,
    });
  }
}

// GET 요청 핸들러
async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const userId = searchParams.get("userId");
  const isTutorTrainingCenter = searchParams.get("isTutorTrainingCenter");

  try {
    if (userId) {
      if (isTutorTrainingCenter) {
        const usercurriculum: UserCurriculumWithTutorTrainingCenterDto | null =
          await getUserCurriculumWithTutorTrainingCenterService(userId);

        if (!usercurriculum)
          return new Response("usercurriculum not found", { status: 404 });

        return NextResponse.json(usercurriculum);
      }
      const usercurriculum: GetUserCurriculumDto | null =
        await getUserCurriculumByUserIdService(userId);

      if (!usercurriculum)
        return new Response("usercurriculum not found", { status: 404 });

      return NextResponse.json(usercurriculum);
    }
    if (id) {
      const usercurriculum: UserCurriculumDto | null =
        await getUserCurriculumByIdService(id);

      if (!usercurriculum)
        return new Response("usercurriculum not found", { status: 404 });

      return NextResponse.json(usercurriculum);
    } else {
      const usercurriculums = await getAllUserCurriculumsService();

      return NextResponse.json(usercurriculums);
    }
  } catch (error) {
    return new NextResponse("Failed to get usercurriculum(s)", {
      status: 500,
    });
  }
}

// PUT 요청 핸들러
async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateUserCurriculumDto = await req.json();

    await updateUserCurriculumService(dto);
    return new NextResponse("usercurriculum updated successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to update usercurriculum", {
      status: 500,
    });
  }
}

// DELETE 요청 핸들러
async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    await deleteUserCurriculumService(id as string);

    return new NextResponse("usercurriculum deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete usercurriculum", {
      status: 500,
    });
  }
}

export { POST, GET, DELETE, PUT };
