import { registerEnumType } from '@nestjs/graphql';
export enum TransactionStatusEnum {
  cancel = 'cancel',
  done = 'done',
  error = 'error',
  new = 'new',
  processing = 'processing',
}

export enum TransactionTypeEnum {
  buy = 'buy',
  deposit = 'deposit',
  swap = 'swap',
  withdrawal = 'withdrawal',
}

export enum DiamondstandardStatusEnum {
  QUOTE = 'QUOTE',
  REQUEST_INITIATED = 'REQUEST_INITIATED',
  INVALID_REQUEST = 'INVALID_REQUEST',
  CARAT_TRANSFER_INITIATED = 'CARAT_TRANSFER_INITIATED',
  CARAT_TRANSFER_COMPLETED = 'CARAT_TRANSFER_COMPLETED',
  CARAT_TRANSFER_FAILED = 'CARAT_TRANSFER_FAILED',
  REQUEST_PROCESSED = 'REQUEST_PROCESSED',
  REQUEST_REJECTED = 'REQUEST_REJECTED',
  REQUEST_CANCELLED = 'REQUEST_CANCELLED',
}

registerEnumType(TransactionStatusEnum, {
  name: 'TransactionStatusEnum',
});
registerEnumType(TransactionTypeEnum, {
  name: 'TransactionTypeEnum',
});
registerEnumType(DiamondstandardStatusEnum, {
  name: 'DiamondstandardStatusEnum',
});
