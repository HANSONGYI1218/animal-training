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

import { CreateUserDto, GetUserDto } from "@/dtos/user.dtos";
import { UserService } from "@/services/user.services";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 유저 생성
  @Post()
  async createUser(@Body() dto: CreateUserDto): Promise<NextResponse> {
    const createUser = await this.userService.createUser(dto);

    if (!createUser) {
      throw NextResponse.json(
        { error: "Failed to create lecture" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }

  // 모든 유저 조회
  @Get()
  async getAllUsers(): Promise<GetUserDto[]> {
    return await this.userService.getAllUsers();
  }

  // 특정 ID의 유저 조회
  @Get(":id")
  async getUserById(@Param("id") id: string): Promise<GetUserDto | null> {
    return (await this.userService.getUserById(id)) ?? null;
  }

  // 유저 업데이트
  @Put(":id")
  async updateUser(
    @Param("id") id: string,
    @Body() dto: Partial<CreateUserDto>,
  ): Promise<NextResponse> {
    const updatedUser = await this.userService.updateUser(id, dto);

    if (!updatedUser) {
      throw NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }

  // 강의 삭제
  @Delete(":id")
  async deleteUser(@Param("id") id: string): Promise<NextResponse> {
    const deletedUser = await this.userService.deleteUser(id);

    if (!deletedUser) {
      throw NextResponse.json(
        { error: "Failed to update user" },
        { status: 500 },
      );
    }

    return NextResponse.json({ status: 200 });
  }
}
