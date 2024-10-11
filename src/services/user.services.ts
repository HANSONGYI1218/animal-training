import { Injectable } from "@nestjs/common";
import prisma from "@/utils/db";
import { CreateUserDto, GetUserDto } from "@/dtos/user.dtos";

@Injectable()
export class UserService {
  // 유저 생성
  async createUser(dto: CreateUserDto): Promise<CreateUserDto | null> {
    try {
      const user = await prisma.user.create({
        data: {
          name: dto.name,
          email: dto.email,
          address: dto.address,
          phoneNumber: dto.phoneNumber,
          registrationNumber: dto.registrationNumber,
          nickname: dto.nickname,
          birthday: dto.birthday,
          gender: dto.gender,
          lectureId: dto.lectureId,
        },
      });

      if (!user) {
        return null;
      }
      return user as CreateUserDto;
    } catch {
      return null;
    }
  }

  // 모든 유저 조회
  async getAllUsers(): Promise<GetUserDto[]> {
    try {
      const users = await prisma.user.findMany();

      return users as GetUserDto[];
    } catch {
      return [];
    }
  }

  // 특정 ID의 유저 조회
  async getUserById(id: string): Promise<GetUserDto | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user as GetUserDto;
    } catch {
      return null;
    }
  }

  // 유저 업데이트
  async updateUser(
    id: string,
    dto: Partial<CreateUserDto>,
  ): Promise<CreateUserDto | null> {
    try {
      const user = this.getUserById(id);

      if (!user) {
        return null;
      }

      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
          updatedAt: new Date(),
        },
      });
      return updatedUser as CreateUserDto;
    } catch {
      return null;
    }
  }

  // 강의 삭제
  async deleteUser(id: string): Promise<GetUserDto | null> {
    try {
      const user = this.getUserById(id);

      if (!user) {
        return null;
      }

      const deletedUser = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      return deletedUser as GetUserDto;
    } catch {
      return null;
    }
  }
}
