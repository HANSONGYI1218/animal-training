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

@Controller("tutors")
export class TutorController {
  constructor(private readonly tutorService: TutorService) {}

  // 강사 생성
  @Post()
  async createTutor(@Body() dto: CreateTutorDto): Promise<NextResponse> {
    const createTutor = await this.tutorService.createTutor(dto);

    if (!createTutor) {
      throw NextResponse.json(
        { error: "Failed to create lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }

  // 모든 강사 조회
  @Get()
  async getAllTutors(): Promise<GetTutorDto[]> {
    return await this.tutorService.getAllTutors();
  }

  // 특정 ID의 강사 조회
  @Get(":id")
  async getTutorById(@Param("id") id: string): Promise<GetTutorDto | null> {
    return (await this.tutorService.getTutorById(id)) ?? null;
  }

  // 강사 업데이트
  @Put(":id")
  async updateTutor(
    @Param("id") id: string,
    @Body() dto: Partial<CreateTutorDto>,
  ): Promise<NextResponse> {
    const updatedTutor = await this.tutorService.updateTutor(id, dto);

    if (!updatedTutor) {
      throw NextResponse.json(
        { error: "Failed to update lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }

  // 강의 삭제
  @Delete(":id")
  async deleteTutor(@Param("id") id: string): Promise<NextResponse> {
    const deletedTutor = await this.tutorService.deleteTutor(id);

    if (!deletedTutor) {
      throw NextResponse.json(
        { error: "Failed to update lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }
}
