import { Args, Query, Resolver } from '@nestjs/graphql';
import { DataSource } from 'typeorm';
import { AuthGuardAdmin } from '@entities/auth/auth.guard';
import { UseGuards } from '@nestjs/common';
import { FilterGetDTO, GetIdDTO } from '@common/query/query.dto';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import QueryService from '@common/query';
import TransactionModel from './transaction.model';
import { TransactionsModel } from './transaction.dto';

@Resolver(() => TransactionModel)
export class TransactionAdminResolver {
  constructor(private readonly dataSource: DataSource) {}

  @Query(() => TransactionsModel, {
    description: '@protected - List of transactions (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async transactionsAdmin(
    @Args('payload', { type: () => FilterGetDTO }) payload: FilterGetDTO,
    @CurrentCtx() { relations },
  ): Promise<TransactionsModel> {
    return QueryService.list<TransactionsModel>(
      this.dataSource.getRepository(TransactionModel),
      {
        payload,
        relations,
      },
    );
  }

  @Query(() => TransactionModel, {
    description: '@protected - Get transaction by ID (by user admin)',
  })
  @UseGuards(AuthGuardAdmin)
  async transactionByIdAdmin(
    @Args('payload', { type: () => GetIdDTO }) payload: GetIdDTO,
    @CurrentCtx() { relations },
  ): Promise<TransactionModel> {
    return QueryService.item<TransactionModel>(
      this.dataSource.getRepository(TransactionModel),
      {
        payload: {
          filters: [
            {
              columnName: 'id',
              operation: 'equal',
              type: 'number',
              value: [payload.id.toString()],
            },
          ],
        },
        relations,
      },
    );
  }
}
