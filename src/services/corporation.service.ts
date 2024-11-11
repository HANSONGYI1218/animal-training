import {
  CreateCorporationDto,
  CorporationDto,
  UpdateCorporationDto,
  toJSON,
  CorporationDetailDto,
} from "@/dtos/corporation.dto";
import { CorporationEntity } from "@/entities/corporation.entity";
import {
  createCorporationRepository,
  deleteCorporationRepository,
  getCorporationByIdRepository,
  getCorporationByLoginRepository,
  updateCorporationRepository,
} from "@/repositories/corporation.repository";

// 기업 생성
export const createCorporationService = async (
  dto: CreateCorporationDto,
): Promise<void> => {
  try {
    // const isExisted = await getCorporationByIdService(dto.id);
    // if(isExisted) return null;

    const newCorportaion = new CorporationEntity({
      ...dto,
      owner_name: "",
      corporation_name: "",
      zipCode: "",
      address: "",
      detailAddress: "",
      phoneNumber: "",
      business_number: "",
      accessStatus: "STANDARD",
    });

    await createCorporationRepository(toJSON(newCorportaion));
  } catch (error: any) {
    return error;
  }
};

// 특정 ID의 기업 로그인 조회
export const getCorporationByLoginService = async (
  email: string,
  password: string,
): Promise<CorporationDto | null> => {
  try {
    const corporation = await getCorporationByLoginRepository(email, password);

    if (!corporation) {
      return null;
    }
    return corporation;
  } catch {
    return null;
  }
};

// 특정 ID의 기업 조회
export const getCorporationByIdService = async (
  id: string,
): Promise<CorporationDetailDto | null> => {
  try {
    const corporation = await getCorporationByIdRepository(id);

    if (!corporation) {
      return null;
    }
    return corporation;
  } catch {
    return null;
  }
};

// 기업 업데이트
export const updateCorporationService = async (
  dto: UpdateCorporationDto,
): Promise<void> => {
  try {
    const corporation = await getCorporationByIdRepository(dto.id);

    if (!corporation) {
      throw new Error("corporation is bot found");
    }

    const updateCorporation = new CorporationEntity({
      ...corporation,
      password: dto?.password ?? corporation.password,
      owner_name: dto?.owner_name ?? corporation.owner_name,
      corporation_name: dto?.corporation_name ?? corporation.corporation_name,
      zipCode: dto?.zipCode ?? corporation.zipCode,
      address: dto?.address ?? corporation.address,
      detailAddress: dto?.detailAddress ?? corporation.detailAddress,
      phoneNumber: dto?.phoneNumber ?? corporation.phoneNumber,
      email: dto?.email ?? corporation.email,
      business_number: dto?.business_number ?? corporation.business_number,
      updatedAt: new Date(),
    });

    await updateCorporationRepository(toJSON(updateCorporation));
  } catch (error: any) {
    return error;
  }
};

// 기업 삭제
export const deleteCorporationService = async (id: string): Promise<void> => {
  try {
    const corporation = await getCorporationByIdRepository(id);

    if (!corporation) {
      throw new Error("corporation is bot found");
    }

    await deleteCorporationRepository(id);
  } catch (error: any) {
    return error;
  }
};
