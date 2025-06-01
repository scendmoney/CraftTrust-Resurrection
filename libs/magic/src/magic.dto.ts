import { WalletType } from '@magic-sdk/admin';

export class MagicDTO {
  secretKey: string;
  secretKey2?: string;
  walletType?: WalletType;
  isTest: boolean;
}

export class MagicMetadataResponseDTO {
  issuer: string;
  publicAddress: string;
  email?: string;
  oauthProvider?: any;
  phoneNumber?: string;
  wallets: MagicWalletResponseDTO[];
  wallet?: MagicWalletResponseDTO;
}

export class MagicWalletResponseDTO {
  network: string;
  public_address: string;
  wallet_type: WalletType;
}
