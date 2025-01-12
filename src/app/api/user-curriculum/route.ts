import { NextRequest, NextResponse } from "next/server";
import {
  CreateUserCurriculumDto,
  UserCurriculumDto,
  GetUserCurriculumDto,
  UpdateUserCurriculumDto,
} from "@/dtos/user.curriculum.dto";
import {
  createUserCurriculumService,
  getAllUserCurriculumsService,
  getUserCurriculumByIdService,
  updateUserCurriculumService,
  deleteUserCurriculumService,
  getUserCurriculumByUserIdService,
} from "@/services/user.curriculum.service";

// POST 요청 핸들러
async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateUserCurriculumDto = await req.json();

    await createUserCurriculumService(dto);
    return new NextResponse("Curriculum created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create Curriculum", {
      status: 500,
    });
  }
}

// GET 요청 핸들러
async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const userId = searchParams.get("userId");

  try {
    if (userId) {
      const user: GetUserCurriculumDto | null =
        await getUserCurriculumByUserIdService(userId);

      if (!user) return new Response("user not found", { status: 404 });

      return NextResponse.json(user);
    }
    if (id) {
      const curriculum: UserCurriculumDto | null =
        await getUserCurriculumByIdService(id);

      if (!curriculum)
        return new Response("Curriculum not found", { status: 404 });

      return NextResponse.json(curriculum);
    } else {
      const curriculums = await getAllUserCurriculumsService();

      return NextResponse.json(curriculums);
    }
  } catch (error) {
    return new NextResponse("Failed to create Lectur(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateUserCurriculumDto = await req.json();

    await updateUserCurriculumService(dto);
    return new NextResponse("Curriculum updated successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to update Curriculum", {
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

    return new NextResponse("Curriculum deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete Curriculum", {
      status: 500,
    });
  }
}

export { POST, GET, DELETE, PUT };
