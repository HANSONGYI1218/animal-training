import { CreateLectureDto, GetLectureDto } from "@/dtos/lecture.dtos";
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
import { Category } from "@prisma/client";
import { LectureService } from "@/services/lecture.services";

@Controller("lectures")
export class LectureController {
  constructor(private readonly lectureService: LectureService) {}

  // 강의 생성
  @Post()
  async createLecture(@Body() dto: CreateLectureDto): Promise<NextResponse> {
    const createLecture = await this.lectureService.createLecture(dto);

    if (!createLecture) {
      throw NextResponse.json(
        { error: "Failed to create lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }

  // 모든 강의 조회
  @Get()
  async getAllLectures(): Promise<GetLectureDto[]> {
    return await this.lectureService.getAllLectures();
  }

  // 특정 ID의 강의 조회
  @Get(":id")
  async getLectureById(@Param("id") id: string): Promise<GetLectureDto | null> {
    return (await this.lectureService.getLectureById(id)) ?? null;
  }

  // 특정 CATEGORY 강의 조회
  @Get(":id")
  async getLectureByCategory(
    @Param("category") category: Category,
  ): Promise<GetLectureDto[] | null> {
    return (await this.lectureService.getLectureByCategory(category)) ?? null;
  }

  // 강의 업데이트
  @Put(":id")
  async updateLecture(
    @Param("id") id: string,
    @Body() dto: Partial<CreateLectureDto>,
  ): Promise<NextResponse> {
    const deletedLecture = await this.lectureService.updateLecture(id, dto);

    if (!deletedLecture) {
      throw NextResponse.json(
        { error: "Failed to update lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }

  // 강의 삭제
  @Delete(":id")
  async deleteLecture(@Param("id") id: string): Promise<NextResponse> {
    const updatedLecture = await this.lectureService.deleteLecture(id);

    if (!updatedLecture) {
      throw NextResponse.json(
        { error: "Failed to update lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }
}
