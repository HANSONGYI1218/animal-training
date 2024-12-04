import { NextRequest, NextResponse } from "next/server";

import {
  CreateUserDto,
  GetUserAdoptionRecordDto,
  GetUserByCurriculumDto,
  GetUserDto,
  GetUserSearchDto,
  UpdateUserDto,
  UserDto,
} from "@/dtos/user.dto";
import {
  createUserService,
  deleteUserService,
  getUserByCurriculumService,
  getUserByEmailService,
  getUserByLoginService,
  getUserByMypageService,
  getUserByUserInfoService,
  updateUserService,
} from "@/services/user.service";
import { AnimalType } from "@prisma/client";

// POST 요청 핸들러
async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateUserDto = await req.json();

    const user: GetUserDto = await createUserService(dto);
    return NextResponse.json(user);
  } catch (error) {
    return new NextResponse("Failed to create User", { status: 500 });
  }
}

// GET 요청 핸들러
async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const curriculum_userId = searchParams.get("curriculum_userId");
  const name = searchParams.get("name");
  const registrationNumber = searchParams.get("registrationNumber");
  const email = searchParams.get("email");
  const password = searchParams.get("password");

  try {
    if (name && registrationNumber) {
      const user: GetUserAdoptionRecordDto | null =
        await getUserByUserInfoService(name, registrationNumber);

      if (!user) return new Response("user not found", { status: 404 });

      return NextResponse.json(user);
    }

    if (email) {
      const user: GetUserSearchDto | null = await getUserByEmailService(email);

      return NextResponse.json(user);
    }
    if (email && password) {
      const user: UserDto | null = await getUserByLoginService(email, password);

      return NextResponse.json(user);
    }
    if (id) {
      const user: GetUserDto | null = await getUserByMypageService(
        id as string,
      );

      if (!user) return new Response("user not found", { status: 404 });

      return NextResponse.json(user);
    }
    if (curriculum_userId) {
      const user: GetUserByCurriculumDto | null =
        await getUserByCurriculumService(curriculum_userId as string);

      if (!user) return new Response("user not found", { status: 404 });

      return NextResponse.json(user);
    }
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({ error: error.message || "An error occurred" }),
      { status: 500 },
    );
  }
}

// PUT 요청 핸들러
async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { animalType, ...dto }: { animalType: AnimalType } & UpdateUserDto =
      await req.json();

    await updateUserService(dto, animalType);

    return new NextResponse("User updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update User", { status: 500 });
  }
}

// DELETE 요청 핸들러
async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    await deleteUserService(id as string);

    return new NextResponse("User deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete User", { status: 500 });
  }
}

export { POST, GET, DELETE, PUT };
