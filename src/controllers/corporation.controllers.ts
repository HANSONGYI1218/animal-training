import { NextResponse } from "next/server";
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from "@nestjs/common";
import { TutorService } from "@/services/tutor.services";
import { CreateTutorDto, GetTutorDto } from "@/dtos/tutor.dtos";
import { CorporationService } from "@/services/corporation.services";
import {
  CreateCorporationDto,
  GetCorporationDto,
} from "@/dtos/corporation.dtos";

@Controller("corporations")
export class CorporationController {
  constructor(private readonly corporationService: CorporationService) {}

  // 기업 생성
  @Post()
  async createCorporation(
    @Body() dto: CreateCorporationDto,
  ): Promise<NextResponse> {
    const createCorporation =
      await this.corporationService.createCorporation(dto);

    if (!createCorporation) {
      throw NextResponse.json(
        { error: "Failed to create lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }

  // 모든 기업 조회
  @Get()
  async getAllCorporations(): Promise<GetCorporationDto[]> {
    return await this.corporationService.getAllCorporations();
  }

  // 특정 ID의 기업 조회
  @Get(":id")
  async getCorporationById(
    @Param("id") id: string,
  ): Promise<GetCorporationDto | null> {
    return (await this.corporationService.getCorporationById(id)) ?? null;
  }

  // 기업 업데이트
  @Put(":id")
  async updateCorporation(
    @Param("id") id: string,
    @Body() dto: Partial<CreateCorporationDto>,
  ): Promise<NextResponse> {
    const updatedCorporation = await this.corporationService.updateCorporation(
      id,
      dto,
    );

    if (!updatedCorporation) {
      throw NextResponse.json(
        { error: "Failed to update lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }

  // 기업 삭제
  @Delete(":id")
  async deleteCorporation(@Param("id") id: string): Promise<NextResponse> {
    const deletedCorporation =
      await this.corporationService.deleteCorporation(id);

    if (!deletedCorporation) {
      throw NextResponse.json(
        { error: "Failed to update lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }
}
