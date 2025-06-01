import { Process, Processor } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Job } from 'bull';
import { DataSource } from 'typeorm';
import { JobEnum, QueueEnum } from '@enums/common';
import HederaService from 'libs/hedera/src/hedera.service';
import { CONFIG } from '@config/index';
import { CustomLoggerService } from '@common/logger/custom_logger.service';
import NFTModel from '@entities/nft/nft.model';
import { NFTStatusEnum } from '@entities/nft/nft.enum';
import { TransactionBlockchainStatusEnum } from '@entities/transaction_blockchain/transaction_blockchain.enum';
import { v4 as uuidv4 } from 'uuid';
import PinataService from 'libs/pinata/src/pinata.service';

@Injectable()
@Processor(QueueEnum.queueHedera)
export class HederaQueue {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hederaService: HederaService,
    private readonly logger: CustomLoggerService,
    private pinataService: PinataService,
  ) {}

  @Process(JobEnum.createHederaWalletJob)
  async createHederaWalletJob({
    data: { id, model, isAssociate },
  }: Job<{ id: string; model: string; isAssociate: boolean }>) {
    try {
      if (!id || !model) return;

      const entity = await this.dataSource.getRepository(model).findOne({
        where: {
          id,
        },
        select: ['id', 'index', 'publicAddress'],
      });

      if (!entity || entity.publicAddress) return;
      // if (['dev', 'local'].includes(CONFIG.platform.ENV)) {
      //   throw new Error(
      //     'Creation of wallets is disabled in the dev environment',
      //   );
      // }

      if (id === '020-10078868202') {
        await this.dataSource
          .getRepository(model)
          .create({
            id: entity.id,
            index: 1,
            publicAddress: '0.0.4763123',
          })
          .save();
        return;
      }

      const accountId = await (CONFIG.hedera.isED25519
        ? this.hederaService.createAccountEd25519(
            1,
            entity.index,
            CONFIG.hedera.mnemonic,
          )
        : this.hederaService.createAccountECDSA(
            1,
            entity.index,
            CONFIG.hedera.mnemonic,
          ));
      await this.dataSource
        .getRepository(model)
        .create({
          id: entity.id,
          publicAddress: accountId.toString(),
        })
        .save();

      if (isAssociate) {
        await this.hederaService.tokenAssociateTransaction(
          accountId.toString(),
          CONFIG.hedera.mnemonic,
          entity.index,
          CONFIG.hedera.token,
        );

        await this.hederaService.contractOrderAssociateTransaction(
          accountId.toString(),
          entity.index,
        );
      }
    } catch (error) {
      if (
        error.message !=
        'Creation of wallets is disabled in the dev environment'
      ) {
        this.logger.error('createHederaWalletJob: ', error.message);
      }
    }
  }

  @Process(JobEnum.mintNFTJob)
  async mintNFTJob({ data: { nftId } }: Job<{ nftId: number }>) {
    try {
      const nft = await this.dataSource.getRepository(NFTModel).findOne({
        where: {
          id: nftId,
          status: NFTStatusEnum.processing,
        },
        relations: ['user'],
      });

      if (!nft) return;

      if (!nft?.__user__?.publicAddress) {
        throw new Error(`NFT ${nftId}: User wallet not exist`);
      }

      const info = {
        name: nft.name,
        description: nft.description,
        ipfs: nft.ipfs,
        serial: nft.serial,
        token: nft.tokenId,
        logoIpfs: {
          image: nft.logoURL.replace('https://ipfs.io/ipfs/', 'ipfs://'),
          type: 'image/png',
        },
      };
      if (!info.ipfs) {
        const dataCid = {
          name: info.name,
          creator: nft.__user__?.id,
          creatorDID: uuidv4(),
          description: info.description,
          ...info.logoIpfs,
          files: [],
          format: 'HIP412@2.0.0',
          properties: nft.properties,
        };
        const ipfsDataCid = await this.pinataService.uploadJSONToPinata(
          dataCid,
          `${uuidv4()}.json`,
        );
        await this.dataSource.getRepository(NFTModel).update(nft.id, {
          ipfs: ipfsDataCid,
        });
        info.ipfs = ipfsDataCid;
      }

      if (!info.serial) {
        info.serial = await this.hederaService.mintNFT(
          info.token,
          `ipfs://${info.ipfs}`,
        );

        await this.dataSource.getRepository(NFTModel).update(nft.id, {
          serial: info.serial,
        });
      }

      const result = await this.hederaService.transferNFT(
        info.token,
        info.serial,
        nft.__user__.publicAddress,
      );

      await this.dataSource
        .getRepository(NFTModel)
        .create({
          id: nft.id,
          serial: info.serial,
          status: NFTStatusEnum.done,
          blockchainTransaction: {
            status: TransactionBlockchainStatusEnum.done,
            ...result,
          },
        })
        .save();
    } catch (error) {
      this.logger.error(error.message, error.stack);
      await this.dataSource.getRepository(NFTModel).update(nftId, {
        countError: () => 'countError + 1',
        status: () => `CASE
          WHEN countError >= 5 THEN 'error'::public.nft_status_enum
          ELSE 'processing'::public.nft_status_enum
        END`,
      });
    }
  }
}
