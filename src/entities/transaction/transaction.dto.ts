import { PaginateModel } from '@common/query/query.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import TransactionModel from './transaction.model';

@ObjectType({ isAbstract: true, description: 'transactions' })
export class TransactionsModel {
  @Field(() => [TransactionModel], { nullable: false })
  items: TransactionModel[];

  @Field(() => PaginateModel, { nullable: false })
  meta: PaginateModel;
}
