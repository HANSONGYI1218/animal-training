import { NextRequest, NextResponse } from "next/server";

import { CreateAdoptionDto, GetAdoptionDto } from "@/dtos/adoption.dto";
import {
  createAdoptionService,
  deleteAdoptionService,
  getAdoptionByIdService,
  getAdoptionByUserIdService,
  updateAdoptionService,
} from "@/services/adoption.service";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateAdoptionDto = await req.json();

    await createAdoptionService(dto);
    return new NextResponse("Adoption created successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create Adoption", { status: 500 });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const userId = searchParams.get("userId");

  try {
    if (userId) {
      const userAdoption: GetAdoptionDto[] = await getAdoptionByUserIdService(
        userId as string,
      );

      if (!userAdoption)
        return new Response("Adoption not found", { status: 404 });

      return NextResponse.json(userAdoption);
    }
    if (id) {
      const adoption: GetAdoptionDto | null = await getAdoptionByIdService(
        id as string,
      );

      if (!adoption) return new Response("Adoption not found", { status: 404 });

      return NextResponse.json(adoption);
    }
  } catch (error) {
    return new NextResponse("Failed to create Adoption(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");

    const dto: CreateAdoptionDto = await req.json();

    await updateAdoptionService(id as string, dto);

    return new NextResponse("Adoption updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update Adoption", { status: 500 });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    const deletedAdoption = await deleteAdoptionService(id as string);

    if (!deletedAdoption)
      return new Response("Adoption not found", { status: 404 });

    return new NextResponse("Adoption deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete Adoption", { status: 500 });
  }
}
