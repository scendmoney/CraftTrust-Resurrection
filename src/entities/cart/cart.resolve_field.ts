import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { CartModel } from './cart.model';
import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import { NetInfo } from './embedded/net_info';

@Resolver(() => CartModel)
export default class CartResolveField {
  constructor(private dataSource: DataSource) {}

  @ResolveField('netInfo')
  async netInfo(@Parent() cart: CartModel): Promise<NetInfo | undefined> {
    const relation = await this.dataSource
      .getRepository(FacilityToFacilityModel)
      .findOne({
        where: {
          facilityBuyer: {
            id: cart.__facilityBuyer__.id,
          },
          facilityCultivator: {
            id: cart.__facilityCultivator__.id,
          },
        },
        select: {
          id: true,
          isNetActivated: true,
          netDays: true,
          netBalance: true,
          dueBalance: true,
        },
      });
    if (!relation) return;

    return {
      isNetActivated: relation.isNetActivated,
      netDays: relation.netDays,
      netBalance: relation.netBalance,
      dueBalance: relation.dueBalance,
    };
  }
}
