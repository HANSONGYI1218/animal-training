interface TrainingCenterEntityProps {
  id?: string;
  name: string;
  introduction: string;
  profile: string;
  additionalImgs: string[];
  address: string;
  refundPolicys: string[];
  corporationId: string;
  updatedAt?: Date;
}

export class TrainingCenterEntity {
  private id?: string;
  private name: string;
  private introduction: string;
  private profile: string;
  private additionalImgs: string[];
  private address: string;
  private refundPolicys: string[];
  private corporationId: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor({
    id,
    name,
    introduction,
    profile,
    additionalImgs,
    address,
    refundPolicys,
    corporationId,
    updatedAt,
  }: TrainingCenterEntityProps) {
    this.id = id;
    this.name = name;
    this.introduction = introduction;
    this.profile = profile;
    this.additionalImgs = additionalImgs;
    this.address = address;
    this.refundPolicys = refundPolicys;
    this.corporationId = corporationId;
    this.createdAt = new Date();
    this.updatedAt = updatedAt ?? new Date();
  }
}
