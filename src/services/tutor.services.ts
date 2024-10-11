import { Injectable } from "@nestjs/common";
import prisma from "@/utils/db";
import { CreateTutorDto, GetTutorDto } from "@/dtos/tutor.dtos";

@Injectable()
export class TutorService {
  // 강사 생성
  async createTutor(dto: CreateTutorDto): Promise<CreateTutorDto | null> {
    try {
      const tutor = await prisma.tutor.create({
        data: {
          name: dto.name,
          introduction: dto.introduction,
          career: dto.career,
          profile_img: dto.profile_img,
          traning_name: dto.traning_name,
          traning_location: dto.traning_location,
          corporation_name: dto.corporation_name,
          occupation: dto.occupation,
          corporationId: dto.corporationId,
        },
      });

      if (!tutor) {
        return null;
      }
      return tutor as CreateTutorDto;
    } catch {
      return null;
    }
  }

  // 모든 강의 조회
  async getAllTutors(): Promise<GetTutorDto[]> {
    try {
      const tutors = await prisma.tutor.findMany();

      return tutors as GetTutorDto[];
    } catch {
      return [];
    }
  }

  // 특정 ID의 강의 조회
  async getTutorById(id: string): Promise<GetTutorDto | null> {
    try {
      const tutor = await prisma.tutor.findUnique({
        where: {
          id: id,
        },
      });
      return tutor as GetTutorDto;
    } catch {
      return null;
    }
  }

  // 강사 업데이트
  async updateTutor(
    id: string,
    dto: Partial<CreateTutorDto>,
  ): Promise<CreateTutorDto | null> {
    try {
      const tutor = this.getTutorById(id);

      if (!tutor) {
        return null;
      }

      const updatedTutor = await prisma.tutor.update({
        where: {
          id: id,
        },
        data: {
          ...dto,
          updatedAt: new Date(),
        },
      });
      return updatedTutor as CreateTutorDto;
    } catch {
      return null;
    }
  }

  // 강의 삭제
  async deleteTutor(id: string): Promise<GetTutorDto | null> {
    try {
      const tutor = this.getTutorById(id);

      if (!tutor) {
        return null;
      }

      const deletedTutor = await prisma.tutor.delete({
        where: {
          id: id,
        },
      });
      return deletedTutor as GetTutorDto;
    } catch {
      return null;
    }
  }
}
