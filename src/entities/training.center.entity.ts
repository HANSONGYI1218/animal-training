interface TrainingCenterEntityProps {
  id?: string;
  name: string;
  introduction: string;
  profile_images: string[];
  phoneNumber: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  refundPolicys: string[];
  corporationId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class TrainingCenterEntity {
  private id?: string;
  private name: string;
  private introduction: string;
  private profile_images: string[];
  private phoneNumber: string;
  private zipCode: string;
  private address: string;
  private detailAddress: string;
  private refundPolicys: string[];
  private corporationId: string;
  private createdAt?: Date;
  private updatedAt?: Date;

  constructor({
    id,
    name,
    introduction,
    profile_images,
    phoneNumber,
    zipCode,
    address,
    detailAddress,
    refundPolicys,
    corporationId,
    createdAt,
    updatedAt,
  }: TrainingCenterEntityProps) {
    this.id = id;
    this.name = name;
    this.introduction = introduction;
    this.profile_images = profile_images;
    this.phoneNumber = phoneNumber;
    this.zipCode = zipCode;
    this.address = address;
    this.detailAddress = detailAddress;
    this.refundPolicys = refundPolicys;
    this.corporationId = corporationId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
