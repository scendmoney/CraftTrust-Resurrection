import { PaginateModel } from '@common/query/query.dto';
import { FacilityModel } from '@entities/facility/facility.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ isAbstract: true })
export class ReportSalesPerformanceDTO {
  @Field(() => FacilityModel, { nullable: false })
  facility: FacilityModel;

  @Field(() => Number, { nullable: false })
  totalPurchased: number;

  @Field(() => Number, { nullable: false })
  totalRevenue: number;

  @Field(() => Number, { nullable: false })
  quantityProductPurchased: number;

  @Field(() => Number, { nullable: false })
  purchases: number;

  @Field(() => Number, { nullable: false })
  quantityProductRevenue: number;

  @Field(() => Number, { nullable: false })
  avgPriceCultivator: number;

  @Field(() => Number, { nullable: false })
  avgPriceBuyer: number;

  @Field(() => Number, { nullable: false })
  avgPoundsOrderCultivator: number;

  @Field(() => Number, { nullable: false })
  avgPoundsOrderBuyer: number;

  @Field(() => Number, { nullable: false })
  avgPricePoundCultivator: number;

  @Field(() => Number, { nullable: false })
  avgPricePoundBuyer: number;

  @Field(() => Number, { nullable: true })
  totalListed?: number;

  @Field(() => Number, { nullable: true })
  totalMetrc?: number;

  @Field(() => Number, { nullable: true })
  percentListed?: number;
}

@ObjectType({ isAbstract: true })
export class ReportSalesPerformances {
  @Field(() => [ReportSalesPerformanceDTO], { nullable: false })
  items: ReportSalesPerformanceDTO[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
