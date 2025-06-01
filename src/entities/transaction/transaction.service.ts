import { FacilityModel } from '@entities/facility/facility.model';
import { FacilityService } from '@entities/facility/facility.service';
import { Injectable } from '@nestjs/common';
import DiamondstandardService from 'libs/diamondstandard/src/diamondstandard.service';
import HederaService from 'libs/hedera/src/hedera.service';
import { DataSource, DeepPartial } from 'typeorm';
import TransactionModel from './transaction.model';
import {
  DiamondstandardStatusEnum,
  TransactionStatusEnum,
  TransactionTypeEnum,
} from './transaction.enum';
import moment from 'moment';
import { CONFIG } from '@config/index';
import OrderService from '@entities/order/order.service';
import { OrderModel } from '@entities/order/order.model';
import { PaymentStatusEnum, PaymentTypeEnum } from '@entities/order/order.enum';
import random from 'lodash/random';
import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import { SubscriptionsEnum } from '@enums/common';
import { RedisGraphqlService } from 'libs/redis/src';
import { CustomLoggerService } from '@common/logger/custom_logger.service';
import { ceil } from 'lodash';
import timers from 'node:timers/promises';

@Injectable()
export class TransactionService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly hederaService: HederaService,
    private readonly facilityService: FacilityService,
    private orderService: OrderService,
    private readonly redisGraphqlService: RedisGraphqlService,
    private readonly logger: CustomLoggerService,
  ) {}

  async withdrawCaratToFiat(facility: FacilityModel): Promise<boolean> {
    let amount = 0;
    let priceCarat = 0;
    let sellReference = '';
    const publicAddress = facility.publicAddress;
    const index = facility.index;

    try {
      //dev
      // publicAddress = '0.0.4487534';
      // index = 99999;
      console.log('withdrawCaratToFiat', facility.id);
      try {
        if (!publicAddress) {
          throw new Error(`Facility doesn't have a wallet`);
        }

        const { rate, balanceBuy, balanceBlocked, balanceWallet } =
          await this.facilityService.facilityBalanceCarat(
            publicAddress,
            facility.id,
          );
        amount = ceil(balanceBuy.balance - balanceBlocked.balance, 2);

        if (amount < 25) {
          return false;
        }

        if (amount > balanceWallet.balance) {
          throw new Error('Wallet balance is less than in the system');
        }

        priceCarat = rate;

        console.log('accountId:', publicAddress);
        console.log('priceCarat', priceCarat);

        const step1 = await DiamondstandardService.sellReference({
          accountId: publicAddress,
          quantity: amount * 100,
          price: priceCarat * 100,
        });
        sellReference = step1.sellReference;

        console.log('step1 params:', {
          accountId: publicAddress,
          quantity: amount * 100,
          price: priceCarat * 100,
        });
        console.log('step1 result:', step1);

        const transactionId = await this.hederaService.associateTransaction({
          accountId: publicAddress,
          path: index,
          token: CONFIG.hedera.token,
          contractOrAccountId: step1.spenderAccountId
            .replaceAll('"', '')
            .replaceAll(',', ''),
          quantity: amount * 100,
          memo: `"sellReference"="${sellReference}"`,
        });

        console.log(
          'signature params:',
          `${publicAddress},${priceCarat * 100},${
            amount * 100
          },${transactionId}`,
        );

        const signature = await this.hederaService.createSignatureParams(
          `${publicAddress},${priceCarat * 100},${
            amount * 100
          },${transactionId}`,
          index,
        );

        console.log('step2 params:', {
          accountId: publicAddress,
          quantity: amount * 100,
          price: priceCarat * 100,
          sellReference: sellReference,
          transactionId: transactionId,
          signature: signature,
        });

        let requestId = null;
        let errorsCount = 0;
        let error = null;

        // TODO: We are waiting for the transaction to be approved in the blockchain, otherwise the next request fails
        await timers.setTimeout(5000);

        // TODO: Raw code on the service. The request periodically fails
        while (errorsCount < 10) {
          try {
            const step2 = await DiamondstandardService.initiateSellRequest({
              accountId: publicAddress,
              quantity: amount * 100,
              price: priceCarat * 100,
              sellReference: sellReference,
              transactionId: transactionId,
              signature: signature,
            });
            console.log('step2 result: ', step2);

            if (!step2.success) {
              throw new Error('Withdrawal error, contact administrator');
            }
            requestId = step2.requestId;
            error = null;
            break;
          } catch (err) {
            error = err;
          }
          //Sometimes the API crashes with an error due to the fault of Diamondstandard. CARAT is debited and the money is sent, but due to a request error we do not know the requestId. To do this, we request the latest withdrawal requests and check whether the CARAT debit transaction was carried out
          const history = await DiamondstandardService.history({
            accountId: publicAddress,
            endDate: moment().add(1, 'h').toISOString(),
            startDate: moment().subtract(1, 'h').toISOString(),
          });

          const history_item = history.find(
            (item) => item.sellReference === sellReference,
          );

          requestId = history_item?.id || null;

          if (history_item?.transferTxnId) {
            error = null;
            break;
          }

          errorsCount++;
          await timers.setTimeout(5000);
        }

        if (error) {
          throw new Error(error);
        }

        if (!requestId) {
          throw new Error('Withdrawal error, contact administrator');
        }

        await this.dataSource
          .getRepository(TransactionModel)
          .create({
            type: TransactionTypeEnum.withdrawal,
            facilityFrom: { id: facility.id },
            amount: amount,
            amountUsd: ceil(amount * priceCarat, 2),
            tokenRate: priceCarat,
            token: 'CARAT',
            status: TransactionStatusEnum.processing,
            diamondstandardRequestId: requestId,
            diamondstandardSellReference: sellReference,
            diamondstandardStatus: DiamondstandardStatusEnum.QUOTE,
          })
          .save();

        await this.facilityService.facilityBalanceUpdate(facility.id);

        return true;
      } catch (error) {
        const otherErrorTransaction = await this.dataSource
          .getRepository(TransactionModel)
          .findOne({
            where: {
              type: TransactionTypeEnum.withdrawal,
              facilityFrom: { id: facility.id },
              token: 'CARAT',
              status: TransactionStatusEnum.error,
            },
          });

        const transactionQuery: DeepPartial<TransactionModel> = {
          type: TransactionTypeEnum.withdrawal,
          facilityFrom: { id: facility.id },
          amount: amount,
          tokenRate: priceCarat,
          amountUsd: ceil(amount * priceCarat, 2),
          token: 'CARAT',
          status: TransactionStatusEnum.error,
          error: error?.response?.data?.message || error.message,
          diamondstandardSellReference: sellReference,
        };

        if (otherErrorTransaction) {
          transactionQuery.id = otherErrorTransaction.id;
        }

        await this.dataSource
          .getRepository(TransactionModel)
          .create(transactionQuery)
          .save();
      }
      return false;
    } catch (error) {
      this.logger.error(
        `CRON: startWithdrawTransactions fasilityId ${facility.id} - ${error?.response?.data?.message}`,
      );
    }
  }

  async checkTransactionOrder(transaction: TransactionModel) {
    try {
      const facilityFrom = transaction.__facilityFrom__;
      const facilityTo = transaction.__facilityTo__;
      const order = transaction.__order__;

      const balanceToken = await this.hederaService.getAccountBalanceToken(
        facilityFrom.publicAddress,
        CONFIG.hedera.token,
      );

      const transactionAmount = ceil(
        Number(transaction.amount) + Number(transaction.fee.feeBuyer),
        2,
      );

      if (balanceToken >= transactionAmount) {
        try {
          await this.orderService.payOrder({
            orderId: order.id,
            facilityAddressFrom: facilityFrom.publicAddress,
            facilityPathFrom: facilityFrom.index,
            facilityAddressTo: facilityTo.publicAddress,
            facilityPathTo: facilityTo.index,
            total: ceil(
              Number(transaction.amount) -
                Number(transaction.fee.feeCultivator),
              2,
            ),
            fee:
              Number(transaction.fee.feeBuyer) +
              Number(transaction.fee.feeCultivator),
            transactionId: transaction.id,
          });

          const promises: any = [
            this.dataSource.getRepository(OrderModel).update(order.id, {
              paymentStatus: PaymentStatusEnum.Paid,
              verificationCode: random(1000, 9999),
            }),
            this.dataSource
              .getRepository(TransactionModel)
              .update(transaction.id, {
                status: TransactionStatusEnum.done,
                error: null,
              }),
            this.dataSource.getRepository(FacilityModel).update(facilityTo.id, {
              balance: () =>
                `balance + ${ceil(
                  Number(transaction.amount) -
                    Number(transaction.fee.feeCultivator),
                  2,
                )}`,
            }),
          ];

          await Promise.all(promises);
        } catch (error) {
          await this.dataSource
            .getRepository(TransactionModel)
            .update(transaction.id, {
              error: error?.message,
              status: TransactionStatusEnum.error,
            });
          throw error;
        }

        if (order.paymentType === PaymentTypeEnum.Net) {
          await this.dataSource.getRepository(FacilityToFacilityModel).update(
            {
              facilityBuyer: {
                id: facilityFrom.id,
              },
              facilityCultivator: {
                id: facilityTo.id,
              },
            },
            {
              dueBalance: () => `
                coalesce((select 
                    coalesce(sum(total), 0) as total
                  from public."order"
                  where deleted_date is null 
                    and facility_cultivator_id = '${facilityTo.id}'
                    and facility_buyer_id = '${facilityFrom.id}' 
                    and status != 'Cancel'::public.order_status_enum
                    and payment_type = 'Net'::public.order_payment_type_enum
                    and payment_status in('Overdue'::public.order_payment_status_enum,'Due'::public.order_payment_status_enum)),0)
                `,
            },
          );
        }

        this.redisGraphqlService.publish(SubscriptionsEnum.orderPaid, {
          [SubscriptionsEnum.orderPaid]: {
            id: order.id,
          },
        });
      } else if (moment().diff(transaction.dates.createdDate, 'minute') >= 60) {
        await this.dataSource
          .getRepository(TransactionModel)
          .update(transaction.id, {
            status: TransactionStatusEnum.cancel,
            error: 'Time expired',
          });
      }
    } catch (error) {
      this.logger.error(
        `CRON: checkTransactionOrders transactionId ${transaction.id} - ${error.message}`,
      );
      console.log(error);
    }
  }

  async checkWithdrawTransaction(transaction: TransactionModel) {
    try {
      const status = await DiamondstandardService.sellRequestStatus({
        accountId: transaction.__facilityFrom__.publicAddress,
        requestId: transaction.diamondstandardRequestId,
      });

      let statusTransaction = transaction.status;
      if (
        [
          DiamondstandardStatusEnum.CARAT_TRANSFER_FAILED,
          DiamondstandardStatusEnum.INVALID_REQUEST,
          DiamondstandardStatusEnum.REQUEST_CANCELLED,
          DiamondstandardStatusEnum.REQUEST_REJECTED,
        ].includes(status as DiamondstandardStatusEnum)
      ) {
        statusTransaction = TransactionStatusEnum.error;
      }

      if (
        [DiamondstandardStatusEnum.REQUEST_PROCESSED].includes(
          status as DiamondstandardStatusEnum,
        )
      ) {
        statusTransaction = TransactionStatusEnum.done;
      }

      await this.dataSource
        .getRepository(TransactionModel)
        .update(transaction.id, {
          id: transaction.id,
          status: statusTransaction,
          diamondstandardStatus: status as DiamondstandardStatusEnum,
        });

      if (
        [TransactionStatusEnum.done, TransactionStatusEnum.error].includes(
          statusTransaction,
        )
      ) {
        await this.facilityService.facilityBalanceUpdate(
          transaction.__facilityFrom__.id,
        );
      }
    } catch (error) {
      this.logger.error(
        `CRON: checkWithdrawTransactions TransactionId:${transaction.id} - ${error?.response?.data?.message}`,
      );
    }
  }
}
