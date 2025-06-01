import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import TransactionBlockchainModel from './transaction_blockchain.model';
import { CONFIG } from '@config/index';

@Resolver(() => TransactionBlockchainModel)
export default class TransactionBlockchainResolveField {
  @ResolveField('url')
  async url(
    @Parent() transactiuon: TransactionBlockchainModel,
  ): Promise<string> {
    if (!transactiuon.transactionBlockchainId) {
      return '';
    }

    const url = CONFIG.hedera.isTestnet
      ? 'https://hashscan.io/testnet/transaction/'
      : 'https://hashscan.io/mainnet/transaction/';

    return url + transactiuon.transactionBlockchainId;
  }
}
