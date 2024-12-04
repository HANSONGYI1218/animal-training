import { NextRequest, NextResponse } from "next/server";

import {
  GetAnimalDto,
  CreateAnimalDto,
  UpdateAnimalDto,
} from "@/dtos/animal.dto";
import {
  createAnimalService,
  deleteAnimalService,
  getAnimalByCorporationIdService,
  getAnimalByIdService,
  updateAnimalService,
} from "@/services/animal.service";

// POST 요청 핸들러
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateAnimalDto = await req.json();

    await createAnimalService(dto);
    return new NextResponse("Animal created successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to create Animal", { status: 500 });
  }
}

// GET 요청 핸들러
export async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;

  const id = searchParams.get("id");
  const corporationId = searchParams.get("corporationId");

  try {
    if (id) {
      const animal: GetAnimalDto | null = await getAnimalByIdService(
        id as string,
      );

      if (!animal) return new Response("animal not found", { status: 404 });

      return NextResponse.json(animal);
    }
    if (corporationId) {
      const animals: GetAnimalDto[] = await getAnimalByCorporationIdService(
        corporationId as string,
      );

      return NextResponse.json(animals);
    }
  } catch (error) {
    return new NextResponse("Failed to create Animal(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateAnimalDto = await req.json();

    await updateAnimalService(dto);

    return new NextResponse("Animal updated successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to update Animal", { status: 500 });
  }
}

// DELETE 요청 핸들러
export async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    await deleteAnimalService(id as string);

    return new NextResponse("Animal deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete Animal", { status: 500 });
  }
}
