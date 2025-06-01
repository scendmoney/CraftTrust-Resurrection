import { TransactionTypeEnum } from 'graphql/_server';

const transactionTypesMap: { [key in TransactionTypeEnum]?: string } = {
  [TransactionTypeEnum.Buy]: 'Purchase',
  [TransactionTypeEnum.Deposit]: 'Deposit',
  [TransactionTypeEnum.Withdrawal]: 'Withdrawal'
};

const transactionTypesReverseMap: { [key: string]: TransactionTypeEnum | undefined } = {
  Buy: TransactionTypeEnum.Buy,
  Deposit: TransactionTypeEnum.Deposit,
  Withdrawal: TransactionTypeEnum.Withdrawal
};

export const mappingTransactionTypes = (oldMessage: TransactionTypeEnum): string =>
  transactionTypesMap[oldMessage] ?? '--';

export const mappingTransactionTypesReversed = (
  oldMessage: string
): TransactionTypeEnum | undefined => transactionTypesReverseMap[oldMessage];

export const transactionsTypes = Object.entries(transactionTypesMap).map(([value, label]) => ({
  value,
  label
}));
