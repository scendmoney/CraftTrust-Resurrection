import { IOrderModel, IQueryOrderByIdAdminArgs, IQueryOrderByIdArgs } from 'graphql/_server';

export type QueryVariables = IQueryOrderByIdAdminArgs | IQueryOrderByIdArgs;

export type QueryResult = { orderById?: IOrderModel; orderByIdAdmin?: IOrderModel };
export type CombinedQueryResult = {
  orderById?: IOrderModel;
  orderByIdAdmin?: IOrderModel;
};
