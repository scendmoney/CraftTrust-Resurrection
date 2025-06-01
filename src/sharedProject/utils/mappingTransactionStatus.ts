import { TransactionStatusEnum } from 'graphql/_server';

const transactionStatusMap: { [key in TransactionStatusEnum]?: string } = {
  [TransactionStatusEnum.Cancel]: 'Canceled',
  [TransactionStatusEnum.Done]: 'Completed',
  [TransactionStatusEnum.Error]: 'Failed',
  [TransactionStatusEnum.New]: 'New',
  [TransactionStatusEnum.Processing]: 'Pending'
};

const transactionStatusReverseMap: { [key: string]: TransactionStatusEnum | undefined } = {
  Cancel: TransactionStatusEnum.Cancel,
  Done: TransactionStatusEnum.Done,
  Error: TransactionStatusEnum.Error,
  New: TransactionStatusEnum.New,
  Processing: TransactionStatusEnum.Processing
};

export const mappingTransactionStatus = (oldMessage: TransactionStatusEnum): string =>
  transactionStatusMap[oldMessage] ?? '--';

export const mappingTransactionStatusReversed = (
  oldMessage: string
): TransactionStatusEnum | undefined => transactionStatusReverseMap[oldMessage];

export const transactionsStatuses = Object.entries(transactionStatusMap).map(([value, label]) => ({
  value,
  label
}));
