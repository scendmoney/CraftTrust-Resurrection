import { Field, Float, ObjectType, PickType } from '@nestjs/graphql';
import { FacilityModel } from './facility.model';
import { PaginateModel } from '@common/query/query.dto';

@ObjectType({ description: 'Short DTO Facility' })
export class FacilityShortModel extends PickType(
  FacilityModel,
  ['id', 'alias', 'name', 'displayName'],
  ObjectType,
) {}

@ObjectType({ isAbstract: true, description: 'Facilities' })
export class FacilitiesDTO {
  @Field(() => [FacilityModel], { nullable: false })
  items: FacilityModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}

@ObjectType({ isAbstract: true })
export class BalanceDTO {
  @Field(() => Float, { nullable: false })
  balance: number;

  @Field(() => Float, { nullable: false })
  balanceUsd: number;
}

@ObjectType({ isAbstract: true, description: 'Facility Balance' })
export class FacilityBalanceDTO {
  @Field(() => String, { nullable: false })
  token: string;

  @Field(() => Float, { nullable: true })
  rate: number;

  @Field(() => BalanceDTO, { nullable: false })
  balanceWallet: BalanceDTO;

  @Field(() => BalanceDTO, { nullable: false })
  balanceBuy: BalanceDTO;

  @Field(() => BalanceDTO, { nullable: false })
  balanceBlocked: BalanceDTO;
}
