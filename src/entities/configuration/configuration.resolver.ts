import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DataSource, DeepPartial, IsNull } from 'typeorm';
import ConfigurationModel from './configuration.model';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { ConfigurationUpdateInput } from './configuration.input';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ConfigurationTypesEnum } from './configuration.enum';
import { ConfigurationService } from './configuration.service';
import { UserRoleEnum } from '@entities/user/user.enum';
import ErrorMsgEnum from '@enums/error';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { CartModel } from '@entities/cart/cart.model';

@Resolver(() => ConfigurationModel)
export default class ConfigurationResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => GraphQLJSONObject, {
    description: '@protected - get configurations',
  })
  @UseGuards(AuthGuardAdmin)
  async configurations(): Promise<
    Record<ConfigurationTypesEnum, unknown> | object
  > {
    const configs = await this.dataSource
      .getRepository(ConfigurationModel)
      .find();

    const data = {};
    configs.forEach((config) => {
      data[config.type] = config.value;
    });
    return data;
  }

  @Mutation(() => GraphQLJSONObject, {
    description: '@protected - update configuration',
  })
  @UseGuards(AuthGuardAdmin)
  async updateConfiguration(
    @Args('payload', { type: () => ConfigurationUpdateInput })
    payload: ConfigurationUpdateInput,
    @CurrentCtx() { user },
  ): Promise<Record<ConfigurationTypesEnum, unknown> | object> {
    if (![UserRoleEnum.owner_platform].includes(user.role)) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }
    ConfigurationService.validateConfiguration(payload.type, payload.value);

    const config = await this.dataSource
      .getRepository(ConfigurationModel)
      .findOne({
        where: { type: payload.type },
        select: ['id'],
      });

    const query: DeepPartial<ConfigurationModel> = payload;

    if (config) {
      query.id = config.id;
    }

    await this.dataSource
      .getRepository(ConfigurationModel)
      .create(query)
      .save();

    if (payload.type === ConfigurationTypesEnum.commissionOrderBuyer) {
      await this.dataSource
        .getRepository(CartModel)
        .createQueryBuilder('cart')
        .update()
        .where({
          dates: {
            deletedDate: IsNull(),
          },
        })
        .set({
          fee: () =>
            `coalesce((SELECT sum(cart_item.total) * ${Number(
              payload.value,
            )} / 100
              FROM public.cart_item cart_item
              where cart_item.cart_id = cart.id and cart_item.deleted_date is null),0)
            `,
          costProducts: () =>
            `
            coalesce((SELECT sum(cart_item.total)
            FROM public.cart_item cart_item
            where cart_id = cart.id and cart_item.deleted_date is null),0)
          `,
          total: () =>
            `
          coalesce((SELECT sum(cart_item.total) + sum(cart_item.total) * ${Number(
            payload.value,
          )}/100
            FROM public.cart_item cart_item
            where cart_id = cart.id and cart_item.deleted_date is null),0)
          `,
        })
        .execute();
    }

    return this.configurations();
  }
}
