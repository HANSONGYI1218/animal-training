import { NextRequest, NextResponse } from "next/server";

import {
  CreateUserDto,
  GetUserAdoptionRecordDto,
  GetUserDto,
} from "@/dtos/user.dtos";
import {
  createUser,
  deleteUser,
  getUserByUserInfo,
  getUserById,
  updateUser,
} from "@/controllers/user.controllers";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateUserDto = await req.json();

    await createUser(dto);
    return new NextResponse("User created successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create User", { status: 500 });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const registrationNumber = searchParams.get("registrationNumber");

  try {
    if (name && registrationNumber) {
      const user: GetUserAdoptionRecordDto | null = await getUserByUserInfo(
        name,
        registrationNumber,
      );

      if (!user) return new Response("user not found", { status: 404 });

      return NextResponse.json(user);
    }
    if (id) {
      const user: GetUserDto | null = await getUserById(id as string);

      if (!user) return new Response("user not found", { status: 404 });

      return NextResponse.json(user);
    }
  } catch (error) {
    return new NextResponse("Failed to create User(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");

    const dto: CreateUserDto = await req.json();

    await updateUser(id as string, dto);
    return new NextResponse("User updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update User", { status: 500 });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    const deletedUser = await deleteUser(id as string);
    if (!deletedUser) return new Response("User not found", { status: 404 });
    return new NextResponse("User deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete User", { status: 500 });
  }
}
