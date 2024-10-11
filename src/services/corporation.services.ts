import { Injectable } from "@nestjs/common";
import prisma from "@/utils/db";
import { CreateTutorDto, GetTutorDto } from "@/dtos/tutor.dtos";
import {
  CreateCorporationDto,
  GetCorporationDto,
} from "@/dtos/corporation.dtos";

@Injectable()
export class CorporationService {
  // 기업 생성
  async createCorporation(
    dto: CreateCorporationDto,
  ): Promise<CreateCorporationDto | null> {
    try {
      const corporation = await prisma.corporation.create({
        data: {
          owner_name: dto.owner_name,
          corporation_name: dto.corporation_name,
          address: dto.address,
          phoneNumber: dto.phoneNumber,
          email: dto.email,
          business_number: dto.business_number,
        },
      });

      if (!corporation) {
        return null;
      }
      return corporation as CreateCorporationDto;
    } catch {
      return null;
    }
  }

  // 모든 강의 조회
  async getAllCorporations(): Promise<GetCorporationDto[]> {
    try {
      const corporations = await prisma.corporation.findMany();

      return corporations as GetCorporationDto[];
    } catch {
      return [];
    }
  }

  // 특정 ID의 강의 조회
  async getCorporationById(id: string): Promise<GetCorporationDto | null> {
    try {
      const corporation = await prisma.corporation.findUnique({
        where: {
          id: id,
        },
      });
      return corporation as GetCorporationDto;
    } catch {
      return null;
    }
  }

  // 기업 업데이트
  async updateCorporation(
    id: string,
    dto: Partial<CreateCorporationDto>,
  ): Promise<CreateCorporationDto | null> {
    try {
      const corporation = this.getCorporationById(id);

      if (!corporation) {
        return null;
      }

      const updatedCorporation = await prisma.corporation.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
          updatedAt: new Date(),
        },
      });
      return updatedCorporation as CreateCorporationDto;
    } catch {
      return null;
    }
  }

  // 강의 삭제
  async deleteCorporation(id: string): Promise<GetCorporationDto | null> {
    try {
      const corporation = this.getCorporationById(id);

      if (!corporation) {
        return null;
      }

      const deletedCorporation = await prisma.corporation.delete({
        where: {
          id: id,
        },
      });
      return deletedCorporation as GetCorporationDto;
    } catch {
      return null;
    }
  }
}
