export class HederaOptions {
  mnemonic: string;
  mnemonicClient: string;
  isTestnet: boolean;
  hederaAccountId: string;
  hederaPath: number;
  token: string;
  contract: string;
  isED25519: boolean;
  swapContract: string;
  whbar: string;
  surveyNFTToken: string;
  scendMoneyNFTToken: string;
}

export class BuyOrderInput {
  ipfs: string;
  accountBuyer: AccountDTO;
  accountCultivator: AccountDTO;
  amount: number;
  fee: number;
}

export class BuyOrderDTO {
  transactionBlockchainId: string;
  feeHbar: number;
  fee: number;
  gasUsed: number;
  gasLimit: number;
  error?: string;
  isSuccess: boolean;
  errorCode?: number;
}

export class SwapTokenToHbarInput {
  wallet: string;
  tokenIn: string;
  tokenOut: string;
  index: number;
  amount: number;
  totalBlocked: number;
}

export class AssociateTransactionInput {
  accountId: string;
  path: number;
  token: string;
  contractOrAccountId: string;
  quantity: number;
  memo?: string;
}

export class SwapTokenToHbarDTO {
  amountOut: number;
  transactionBlockchainId: string;
  feeHbar: number;
  fee: number;
  gasUsed: number;
  gasLimit: number;
  error?: string;
  isSuccess: boolean;
  errorCode?: number;
}

export class TransferHbarDTO {
  walletFrom: string;
  walletFromPath: number;
  walletTo: string;
  count: number;
}

export class AccountDTO {
  wallet: string;
  path: number;
}

export class TokenTransferDTO {
  accountFrom: AccountDTO;
  accountTo: AccountDTO;
  token: string;
  count: number;
}

export class WalletAssociateTokenAndContractInput {
  account: AccountDTO;
  quantity: number;
}
