import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { v4 as uuidv4 } from 'uuid';
import { DataSource } from 'typeorm';
import TransactionModel from '@entities/transaction/transaction.model';
import {
  TransactionStatusEnum,
  TransactionTypeEnum,
} from '@entities/transaction/transaction.enum';
import { CONFIG } from '@config/index';
import { SortDirectionEnum } from '@enums/common';
import { CustomLoggerService } from '@common/logger/custom_logger.service';
import { FacilityModel } from '@entities/facility/facility.model';
import { TransactionService } from './transaction.service';

@Injectable()
export class TransactionCron {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly dataSource: DataSource,
    private transactionService: TransactionService,
  ) {}

  @Cron('0 */1 * * * *', {
    name: 'checkTransactionOrders',
    disabled: !CONFIG.platform.isCron,
  })
  async checkTransactionOrders() {
    const date = Date.now();
    const uuid = uuidv4();
    try {
      const transactions = await this.dataSource
        .getRepository(TransactionModel)
        .find({
          where: [
            {
              type: TransactionTypeEnum.buy,
              status: TransactionStatusEnum.processing,
            },
          ],
          relations: ['facilityFrom', 'facilityTo', 'order'],
          select: {
            id: true,
            amount: true,
            dates: {
              createdDate: true,
            },
            fee: {
              feeBuyer: true,
              feeCultivator: true,
            },
            order: { id: true, paymentType: true, paymentStatus: true },
            facilityFrom: {
              id: true,
              publicAddress: true,
              index: true,
            },
            facilityTo: {
              id: true,
              publicAddress: true,
              index: true,
            },
          },
          order: {
            id: SortDirectionEnum.asc,
          },
        });
      await Promise.all(
        transactions.map((transaction) =>
          this.transactionService.checkTransactionOrder(transaction),
        ),
      );
    } catch (error) {
      this.logger.error(`CRON: checkTransactionOrders - ${error.message}`);
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: checkTransactionOrders ${uuid} ${
            (Date.now() - date) / 1000
          } sec`,
        );
      }
    }
  }

  @Cron('0 */5 * * * *', {
    name: 'checkWithdrawTransactions',
    disabled: !CONFIG.platform.isCron,
  })
  async checkWithdrawTransactions() {
    const transactions = await this.dataSource
      .getRepository(TransactionModel)
      .find({
        where: [
          {
            type: TransactionTypeEnum.withdrawal,
            status: TransactionStatusEnum.processing,
          },
        ],
        relations: ['facilityFrom'],
        select: {
          id: true,
          amount: true,
          diamondstandardRequestId: true,
          diamondstandardStatus: true,
          facilityFrom: {
            id: true,
            publicAddress: true,
            index: true,
          },
        },
      });

    await Promise.allSettled(
      transactions.map((transaction) =>
        this.transactionService.checkWithdrawTransaction(transaction),
      ),
    );
  }

  @Cron('0 0 */2 * * *', {
    name: 'startWithdrawTransactions',
    disabled:
      !CONFIG.platform.isCron ||
      !['prod', 'stage'].includes(CONFIG.platform.ENV.toLowerCase()),
  })
  async startWithdrawTransactions() {
    const facilities = await this.dataSource
      .getRepository(FacilityModel)
      .createQueryBuilder('facility')
      .select('facility')
      .where('(balance - balance_processing_withdraw) > 0')
      .getMany();
    await Promise.allSettled(
      facilities.map((facility) =>
        this.transactionService.withdrawCaratToFiat(facility),
      ),
    );
  }
}
