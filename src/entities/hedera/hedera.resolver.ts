import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import HederaService from 'libs/hedera/src/hedera.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuardAdmin, AuthGuardUser } from '@entities/auth/auth.guard';
import { CONFIG } from '@config/index';
import { HederaCron } from './hedera.cron';
@Resolver()
export class HederaResolver {
  constructor(
    private readonly hederaService: HederaService,
    private readonly hederaCron: HederaCron,
  ) {}

  @Query(() => Number, {
    description: '@protected - Get hbar rate',
  })
  @UseGuards(AuthGuardUser)
  async getHBarRate(): Promise<number> {
    return this.hederaService.getHBarUsd();
  }

  @Mutation(() => String, {
    description: '@protected - Create nft',
  })
  @UseGuards(AuthGuardAdmin)
  async createNFTAdmin(
    @Args('name', {
      type: () => String,
      nullable: false,
    })
    name: string,
    @Args('symbol', {
      type: () => String,
      nullable: false,
    })
    symbol: string,
  ): Promise<string> {
    return this.hederaService.createNFT(name, symbol);
  }

  @Mutation(() => Number, {
    description: '@protected - Mint nft',
    deprecationReason: 'Temporary method',
  })
  @UseGuards(AuthGuardAdmin)
  async deprecationMintNFTAdmin(
    @Args('ipfs', {
      type: () => String,
      nullable: false,
    })
    ipfs: string,
  ): Promise<number> {
    return this.hederaService.mintNFT(CONFIG.hedera.surveyNFTToken, ipfs);
  }

  @Mutation(() => Boolean, {
    description: '@protected - Transfer nft',
    deprecationReason: 'Temporary method',
  })
  @UseGuards(AuthGuardAdmin)
  async deprecationTransferNFTAdmin(
    @Args('serial', {
      type: () => Number,
      nullable: false,
    })
    serial: number,
    @Args('walletId', {
      type: () => String,
      nullable: false,
    })
    walletId: string,
  ): Promise<boolean> {
    await this.hederaService.transferNFT(
      CONFIG.hedera.surveyNFTToken,
      serial,
      walletId,
    );

    return true;
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuardAdmin)
  async deprecatedCreateHederaWallets(): Promise<boolean> {
    await this.hederaCron.createWalletHedera();
    return true;
  }
}
