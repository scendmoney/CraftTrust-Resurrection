import { registerEnumType } from '@nestjs/graphql';
export enum TransactionBlockchainStatusEnum {
  done = 'done',
  error = 'error',
}

registerEnumType(TransactionBlockchainStatusEnum, {
  name: 'TransactionBlockchainStatusEnum',
});
