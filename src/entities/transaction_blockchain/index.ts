import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import TransactionBlockchainModel from './transaction_blockchain.model';
import TransactionBlockchainResolveField from './transaction_blockchain.resolve_field';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionBlockchainModel])],
  providers: [TransactionBlockchainResolveField],
})
export default class TransactionBlockchainModule {}
