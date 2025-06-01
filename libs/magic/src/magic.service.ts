import { Injectable, OnModuleInit } from '@nestjs/common';
import { Magic, WalletType } from '@magic-sdk/admin';
import { MagicDTO, MagicMetadataResponseDTO } from './magic.dto';

@Injectable()
export class MagicService implements OnModuleInit {
  static _options = null;
  static _magic = null;
  static _magic2 = null;
  static _walletType = null;
  static _isTest = false;

  constructor(options: MagicDTO) {
    MagicService._options = options;
  }

  onModuleInit() {
    this._initMagic(1);
  }

  private _initMagic(index: number) {
    Magic.init(MagicService._options.secretKey)
      .then((magic) => {
        MagicService._magic = magic;
        MagicService._isTest = MagicService._options.isTest;
        MagicService._walletType =
          MagicService._options.walletType || WalletType.ETH;
        console.debug(`Magic init success`);
      })
      .catch((error) => {
        console.error(`Init Magic error. ${error.message}`);
        console.error(`Retrying ${index} in 2 seconds...`);
        setTimeout(async () => {
          this._initMagic(index + 1);
        }, 2000);
      });

    if (MagicService._options.secretKey2) {
      Magic.init(MagicService._options.secretKey2)
        .then((magic) => {
          MagicService._magic2 = magic;
          MagicService._isTest = MagicService._options.isTest;
          MagicService._walletType =
            MagicService._options.walletType || WalletType.ETH;
          console.debug(`Magic 2 init success`);
        })
        .catch((error) => {
          console.error(`Init Magic 2 error. ${error.message}`);
          console.error(`Retrying ${index} in 2 seconds...`);
          setTimeout(async () => {
            this._initMagic(index + 1);
          }, 2000);
        });
    }
  }

  async getMetadataByTokenAndWallet(didToken: string) {
    return MagicService._magic.users.getMetadataByTokenAndWallet(
      didToken,
      MagicService._walletType,
    );
  }

  async getMetadataByToken(didToken: string) {
    return MagicService._magic.users.getMetadataByToken(didToken);
  }

  async getMetadataByToken2(didToken: string) {
    return MagicService._magic2.users.getMetadataByToken(didToken);
  }

  async validateToken(didToken: string) {
    return MagicService._magic.token.validate(didToken);
  }

  async validateToken2(didToken: string) {
    return MagicService._magic2.token.validate(didToken);
  }

  async getIssuer(didToken: string) {
    return MagicService._magic.token.getIssuer(didToken);
  }

  async getMetadataByIssuerAndWallet(
    issuer: string,
  ): Promise<MagicMetadataResponseDTO> {
    const metadata =
      await MagicService._magic.users.getMetadataByIssuerAndWallet(
        issuer,
        MagicService._walletType,
      );
    metadata.publicAddress = metadata.wallets.find((wallet) =>
      MagicService._isTest === true
        ? wallet.network !== 'TESTNET'
        : wallet.network === 'MAINNET',
    )?.public_address;
    return metadata;
  }

  async logoutByToken(issuer: string): Promise<boolean> {
    await MagicService._magic.users.logoutByToken(issuer);
    return true;
  }
}
