import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DataSource, DeepPartial } from 'typeorm';
import { UserModel } from '../user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuardClient } from '@entities/auth/auth.guard';
import { CurrentCtx } from '@entities/auth/auth.decorator';
import ErrorMsgEnum from '@enums/error';
import { SignUpClientInput, UpdateClientInput } from './client.input';
import { v4 as uuidv4 } from 'uuid';
import { UserRoleEnum } from '../user.enum';
import { InjectQueue } from '@nestjs/bull';
import { JobEnum, QueueEnum } from '@enums/common';
import { Queue } from 'bull';
import NFTModel from '@entities/nft/nft.model';
import { NFTTypeEnum } from '@entities/nft/nft.enum';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { AssetService } from '@entities/asset/asset.service';
import { AssetFileTypeEnum } from '@entities/asset/asset.enum';
import { AuthService } from '@entities/auth/auth.service';
import HederaService from 'libs/hedera/src/hedera.service';
import { CONFIG } from '@config/index';
import { encrypt } from '@src/utils/utils';
import CodeModel from '@entities/code/code.model';
import { UserTokenDTO } from '../user.dto';

@Resolver(() => UserModel)
export class ClientResolver {
  constructor(
    private readonly dataSource: DataSource,
    private readonly assetService: AssetService,
    private readonly authService: AuthService,
    private readonly hederaService: HederaService,
    @InjectQueue(QueueEnum.queueHedera) private readonly queueHedera: Queue,
  ) {}

  @Query(() => UserModel, {
    description: '@protected - Get client profile',
  })
  @UseGuards(AuthGuardClient)
  async meClient(@CurrentCtx() { user, relations }): Promise<UserModel> {
    const userDB = await this.dataSource.getRepository(UserModel).findOne({
      where: {
        id: user.id,
      },
      relations,
    });

    if (!userDB) throw new Error(ErrorMsgEnum.UserNotExist);

    return userDB;
  }

  @Query(() => String, {
    description: '@protected - Get client PrivateKey',
  })
  @UseGuards(AuthGuardClient)
  async getClientPrivateKey(@CurrentCtx() { user }): Promise<string> {
    if (!user.publicAddress || !user.index) {
      return null;
    }
    const privateKey = CONFIG.hedera.isED25519
      ? await this.hederaService.getPrivateKeyEd25519(
          user.index,
          CONFIG.hedera.mnemonicClient,
        )
      : await this.hederaService.getPrivateKeyECDSA(
          user.index,
          CONFIG.hedera.mnemonicClient,
        );

    return privateKey.toStringDer();
  }

  @Mutation(() => UserTokenDTO, {
    description: '@public - Sign up client',
  })
  async signUpClient(
    @Args('payload', {
      type: () => SignUpClientInput,
      nullable: false,
    })
    payload: SignUpClientInput,
  ): Promise<UserTokenDTO> {
    const [user, codeData] = await Promise.all([
      this.dataSource.getRepository(UserModel).findOne({
        where: {
          phoneNumber: payload.phoneNumber,
        },
      }),
      this.dataSource.getRepository(CodeModel).findOne({
        where: {
          phone: payload.phoneNumber,
          code: payload.code,
        },
      }),
    ]);
    let userDb = user;

    if (!codeData) {
      throw new Error(ErrorMsgEnum.CodeWrong);
    }
    if (!userDb) {
      userDb = await this.dataSource
        .getRepository(UserModel)
        .create({
          fullName: '',
          ...payload,
          id: uuidv4(),
          role: UserRoleEnum.client,
          license: {
            licenseType: '-',
            licenseNumber: '-',
          },
        })
        .save();

      this.queueHedera.add(
        JobEnum.createHederaWalletJob,
        {
          id: userDb.id,
          model: 'UserModel',
        },
        { attempts: 2, removeOnComplete: true, removeOnFail: true },
      );
    } else if (Object.keys(payload).includes('fullName')) {
      userDb = await this.dataSource
        .getRepository(UserModel)
        .create({
          ...userDb,
          fullName: payload.fullName,
        })
        .save();
    }
    const [token] = await Promise.all([
      this.authService.login(userDb),
      this.dataSource.getRepository(CodeModel).delete(codeData.id),
    ]);

    return {
      token,
      user: userDb,
    };
  }

  @Mutation(() => UserModel, {
    description: '@protected - Input data for update client profile',
  })
  @UseGuards(AuthGuardClient)
  async updateClient(
    @Args('payload', {
      type: () => UpdateClientInput,
      nullable: false,
    })
    payload: UpdateClientInput,
    @Args('logo', { type: () => GraphQLUpload, nullable: true })
    logo: FileUpload,
    @CurrentCtx() { user, relations },
  ): Promise<UserModel> {
    const data: DeepPartial<UserModel> = {
      id: user.id,
      ...payload,
      asset: await this.assetService.getAsset(logo, AssetFileTypeEnum.logo),
    };

    await this.dataSource.getRepository(UserModel).create(data).save();

    return this.dataSource.getRepository(UserModel).findOne({
      where: {
        id: user.id,
      },
      relations,
    });
  }

  @Mutation(() => Boolean, {
    description: '@protected - Logout client',
  })
  @UseGuards(AuthGuardClient)
  async logoutClient(
    @Context() context,
    @CurrentCtx() { user },
  ): Promise<boolean> {
    await this.authService.logoutByToken(context.token, user.id);
    return true;
  }

  @Mutation(() => Boolean, {
    description: '@protected - Mint nft client money',
  })
  @UseGuards(AuthGuardClient)
  async mintNFTClientMoney(@CurrentCtx() { user }): Promise<boolean> {
    if (user.role !== UserRoleEnum.client) {
      throw new Error(ErrorMsgEnum.NoAccess);
    }

    if (!user.publicAddress) {
      const accountId = await (CONFIG.hedera.isED25519
        ? this.hederaService.createAccountEd25519(
            0.00001,
            user.index,
            CONFIG.hedera.mnemonicClient,
          )
        : this.hederaService.createAccountECDSA(
            0.00001,
            user.index,
            CONFIG.hedera.mnemonicClient,
          ));

      await this.dataSource.getRepository(UserModel).update(user.id, {
        id: user.id,
        publicAddress: encrypt(
          accountId.toString(),
          CONFIG.platform.key,
          'publicAddress',
        ),
        publicAddressDecode: accountId.toString(),
      });
    }

    const result = await this.dataSource
      .getRepository(NFTModel)
      .create({
        type: NFTTypeEnum.other,
        name: `Scend Money NFT`,
        description: `Scend is a powerful gateway to economic strength and community empowerment via decentralized finance (DeFi), payment, and messaging solutions at scale.`,
        logoURL: `https://ipfs.io/ipfs/QmUksZEUrAgxjwMyyQvvcXydzw3E13ZruAXKrsMV2yxGT9`,
        tokenId: CONFIG.hedera.scendMoneyNFTToken,
        properties: {
          external_url: 'https://scend.money',
        },
        user: {
          id: user.id,
        },
      })
      .save();

    this.queueHedera.add(
      JobEnum.mintNFTJob,
      {
        nftId: result.id,
      },
      {
        attempts: 2,
        removeOnComplete: true,
        removeOnFail: true,
      },
    );

    return true;
  }
}
