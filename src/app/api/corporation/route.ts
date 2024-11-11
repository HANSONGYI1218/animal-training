import { NextRequest, NextResponse } from "next/server";
import {
  CorporationDetailDto,
  CorporationDto,
  CreateCorporationDto,
  UpdateCorporationDto,
} from "@/dtos/corporation.dto";
import {
  createCorporationService,
  deleteCorporationService,
  getCorporationByIdService,
  getCorporationByLoginService,
  updateCorporationService,
} from "@/services/corporation.service";

// POST 요청 핸들러
async function POST(req: NextRequest, res: NextResponse) {
  try {
    const dto: CreateCorporationDto = await req.json();

    await createCorporationService(dto);
    return new NextResponse("Corporation created successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to create Corporation", { status: 500 });
  }
}

// GET 요청 핸들러
async function GET(req: NextRequest, res: NextResponse) {
  const { searchParams } = req?.nextUrl;
  const id = searchParams.get("id");

  const email = searchParams.get("email");
  const password = searchParams.get("password");

  try {
    if (id) {
      const Corporation: CorporationDetailDto | null =
        await getCorporationByIdService(id as string);

      if (!Corporation)
        return new Response("Corporation not found", { status: 404 });

      return NextResponse.json(Corporation);
    }
    if (email && password) {
      const user: CorporationDto | null = await getCorporationByLoginService(
        email,
        password,
      );

      return NextResponse.json(user);
    }
  } catch (error) {
    return new NextResponse("Failed to create Corporation(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateCorporationDto = await req.json();

    await updateCorporationService(dto);

    return new NextResponse("Corporation updated successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to update Corporation", { status: 500 });
  }
}

// DELETE 요청 핸들러
async function DELETE(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;

    const id = searchParams.get("id");
    await deleteCorporationService(id as string);

    return new NextResponse("Corporation deleted successfully", {
      status: 200,
    });
  } catch (error) {
    return new NextResponse("Failed to delete Corporation", { status: 500 });
  }
}

export { POST, GET, DELETE, PUT };
