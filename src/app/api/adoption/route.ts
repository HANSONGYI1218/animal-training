import { NextRequest, NextResponse } from "next/server";

import {
  AdoptionAgreementDto,
  AdoptionTableDto,
  CreateAdoptionDto,
  GetAdoptionDto,
  GetCurriculumDto,
  UpdateAdoptionDto,
} from "@/dtos/adoption.dto";
import {
  createAdoptionService,
  deleteAdoptionService,
  getAdoptionAgreementService,
  getAdoptionByAdopterIdService,
  getAdoptionByAdoptionId,
  getAdoptionTableService,
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
  const adoptionId = searchParams.get("adoptionId");
  const adopterId = searchParams.get("adopterId");
  const breederId = searchParams.get("breederId");
  const isRecord = searchParams.get("isRecord");

  try {
    if (adoptionId) {
      const adoption: GetAdoptionDto | null = await getAdoptionByAdoptionId(
        adoptionId as string,
      );

      if (!adoption) return new Response("Adoption not found", { status: 404 });

      return NextResponse.json(adoption);
    }
    if (breederId) {
      const breederAdoptions: AdoptionTableDto[] =
        await getAdoptionTableService(breederId as string, isRecord as string);

      if (!breederAdoptions)
        return new Response("Adoption not found", { status: 404 });

      return NextResponse.json(breederAdoptions);
    }
    if (adopterId) {
      const breederAdoptions: GetCurriculumDto[] =
        await getAdoptionByAdopterIdService(adopterId as string);

      if (!breederAdoptions)
        return new Response("Adoption not found", { status: 404 });

      return NextResponse.json(breederAdoptions);
    }
    if (id) {
      const agreement: AdoptionAgreementDto = await getAdoptionAgreementService(
        id as string,
      );

      if (!agreement)
        return new Response("agreement not found", { status: 404 });

      return NextResponse.json(agreement);
    }
  } catch (error) {
    return new NextResponse("Failed to create Adoption(s)", { status: 500 });
  }
}

// PUT 요청 핸들러
export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const dto: UpdateAdoptionDto = await req.json();

    await updateAdoptionService(dto);

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
    await deleteAdoptionService(id as string);

    return new NextResponse("Adoption deleted successfully", { status: 200 });
  } catch (error) {
    return new NextResponse("Failed to delete Adoption", { status: 500 });
  }
}
