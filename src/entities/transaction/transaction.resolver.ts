import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import TransactionModel from './transaction.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuardUser } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { TransactionsModel } from './transaction.dto';
import QueryService from '@common/query';
import { SortDirectionEnum } from '@enums/common';
import ErrorMsgEnum from '@enums/error';
import merge from 'lodash/merge';
import { TransactionService } from './transaction.service';

@Resolver(() => TransactionModel)
export class TransactionResolver {
  constructor(
    private readonly dataSource: DataSource,

    private readonly transactionService: TransactionService,
  ) {}

  @Query(() => TransactionsModel, {
    description: '@protected - List of transactions',
  })
  @UseGuards(AuthGuardUser)
  async transactions(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations, user },
  ): Promise<TransactionsModel> {
    const paginate = payload.paginate || { skip: 0, take: 25 };

    const sorts = payload?.sorts || [
      {
        columnName: 'id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const filters = payload?.filters || [];
    const order = QueryService.getSorts(sorts);

    const [items, total] = await this.dataSource
      .getRepository(TransactionModel)
      .findAndCount({
        order,
        where: [
          {
            ...merge(QueryService.getFilters(filters), {
              facilityFrom: {
                id: user.__context__.id,
              },
            }),
          },
          {
            ...merge(QueryService.getFilters(filters), {
              facilityTo: {
                id: user.__context__.id,
              },
            }),
          },
        ],
        ...paginate,
        relations,
      });

    return {
      items,
      meta: {
        ...paginate,
        total,
      },
    };
  }

  @Query(() => TransactionModel, {
    description: '@protected - Get transaction by ID ',
  })
  @UseGuards(AuthGuardUser)
  async transactionById(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations, user },
  ): Promise<TransactionModel> {
    const facility = await this.dataSource
      .getRepository(TransactionModel)
      .findOne({
        where: [
          {
            id: payload.id,
            facilityFrom: {
              id: user.__context__.id,
            },
          },
          {
            id: payload.id,
            facilityTo: {
              id: user.__context__.id,
            },
          },
        ],
        relations,
      });
    if (!facility) throw Error(ErrorMsgEnum.EntityNotExist);
    return facility;
  }

  @Mutation(() => Boolean, {
    description: '@protected - withdrawCaratToFiat',
    deprecationReason: 'test query',
  })
  @UseGuards(AuthGuardUser)
  async deprecatedWithdrawCaratToFiat(
    @CurrentCtx() { user },
  ): Promise<boolean> {
    if (user.__context__.__owner__?.id !== user.id) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }
    return this.transactionService.withdrawCaratToFiat(user.__context__);
  }
}
