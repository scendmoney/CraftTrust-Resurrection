import { CONFIG } from '@config/index';
import { Injectable } from '@nestjs/common';
import { decrypt, encrypt } from '@src/utils/utils';
import DiamondstandardService from 'libs/diamondstandard/src/diamondstandard.service';
import HederaService from 'libs/hedera/src/hedera.service';
import { FacilityBalanceDTO } from './facility.dto';
import { DataSource } from 'typeorm';
import { FacilityModel } from './facility.model';

@Injectable()
export class FacilityService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hederaService: HederaService,
  ) {}

  static decryptMetrcApiKey(metrcApiKey: string) {
    return decrypt(metrcApiKey, CONFIG.platform.key, 'metrcApiKey');
  }

  static encryptMetrcApiKey(metrcApiKey: string) {
    return encrypt(metrcApiKey, CONFIG.platform.key, 'metrcApiKey');
  }

  async facilityBalanceCarat(
    wallet: string,
    facilityId: string,
  ): Promise<FacilityBalanceDTO> {
    if (!wallet) return null;
    const [balance, rate, facility] = await Promise.all([
      this.hederaService.getAccountBalanceToken(wallet, CONFIG.hedera.token),
      DiamondstandardService.getCaratUsd(wallet),
      this.dataSource
        .getRepository(FacilityModel)
        .findOneBy({ id: facilityId }),
    ]);

    const balanceBlocked = facility?.balanceProcessingWithdraw || 0;
    const balanceBuy = facility?.balance || 0;

    return {
      token: 'CARAT',
      rate: rate,
      balanceWallet: {
        balance,
        balanceUsd: Number((balance * rate).toFixed(2)),
      },
      balanceBlocked: {
        balance: balanceBlocked,
        balanceUsd: Number((balanceBlocked * rate).toFixed(2)),
      },
      balanceBuy: {
        balance: balanceBuy,
        balanceUsd: Number((balanceBuy * rate).toFixed(2)),
      },
    };
  }

  async facilityBalanceUpdate(facilityId: string) {
    await this.dataSource.getRepository(FacilityModel).update(facilityId, {
      id: facilityId,
      balanceProcessingWithdraw: () =>
        `coalesce((
        SELECT sum(transaction.amount)
        FROM public."transaction" as transaction
        where 
        transaction.facility_from = '${facilityId}'
        and transaction."type" = 'withdrawal'
        and transaction.status = 'processing'
      ),0)
    `,
      balance: () => `coalesce((
        select coalesce(balance.amount,0) - coalesce(balance2.amount,0) - coalesce(balance.fee,0)
        from public.facility f 
        left join (
          SELECT facility_to, sum(transaction.amount) as amount, sum(transaction.fee_cultivator) as fee
          FROM public."transaction" as transaction
          where 
          transaction.facility_to = '${facilityId}'
          and transaction."type" = 'buy'
          and transaction.status = 'done'
          group by facility_to
        ) as balance on balance.facility_to = f.id
        left join (
          SELECT facility_from, sum(transaction.amount) as amount
          FROM public."transaction" as transaction
          where 
          transaction.facility_from = '${facilityId}'
          and transaction."type" = 'withdrawal'
          and transaction.status = 'done'
          group by facility_from
        ) as balance2 on balance2.facility_from = f.id
        where f.id = '${facilityId}'
      ),0)`,
    });
  }
}
