import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { v4 as uuidv4 } from 'uuid';
import { DataSource, LessThan, LessThanOrEqual, Not } from 'typeorm';
import { OrderModel } from '@entities/order/order.model';
import {
  OrderStatusEnum,
  PaymentStatusEnum,
  PaymentTypeEnum,
} from '@entities/order/order.enum';
import OrderService from '@entities/order/order.service';
import moment from 'moment';
import { CONFIG } from '@config/index';
import { CustomLoggerService } from '@common/logger/custom_logger.service';
import CustomerioService from 'libs/customerio/src/customerio.service';
import { EmailTemplatesEnum } from '@enums/common';
import { addPrifixEmail } from '@src/utils/utils';
import { CustomerIoDataService } from '@entities/customerio/customerio.service';

@Injectable()
export class OrderCron {
  constructor(
    private readonly logger: CustomLoggerService,
    private readonly dataSource: DataSource,
    private orderService: OrderService,
    private readonly customerioService: CustomerioService,
  ) {}

  @Cron('0 */1 * * * *', {
    name: 'cancelOrders',
    disabled: !CONFIG.platform.isCron,
  })
  async cancelOrders() {
    const date = Date.now();
    const uuid = uuidv4();
    try {
      const orders = await this.dataSource.getRepository(OrderModel).find({
        where: [
          {
            dates: {
              createdDate: LessThanOrEqual(
                moment().utc().subtract(1, 'h').toDate(),
              ),
            },
            paymentType: PaymentTypeEnum.PayNow,
            paymentStatus: PaymentStatusEnum.NotPaid,
            status: Not(OrderStatusEnum.Cancel),
          },
        ],
        select: {
          id: true,
        },
      });

      await Promise.all(
        orders.map(async (order) =>
          this.orderService.updateOrderStatus(order.id, OrderStatusEnum.Cancel),
        ),
      );
    } catch (error) {
      this.logger.error(`CRON: cancelOrders - ${error.message}`);
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: cancelOrders ${uuid} ${(Date.now() - date) / 1000} sec`,
        );
      }
    }
  }

  @Cron(' 0 30 0 */1 * *', {
    name: 'netOrders',
    disabled: !CONFIG.platform.isCron,
  })
  async netOrders() {
    const date = Date.now();
    const uuid = uuidv4();
    try {
      const orders = await this.dataSource.getRepository(OrderModel).find({
        where: [
          {
            paymentDate: LessThan(moment().utc().add(7, 'day').toDate()),
            paymentType: PaymentTypeEnum.Net,
            paymentStatus: PaymentStatusEnum.Due,
            status: Not(OrderStatusEnum.Cancel),
          },
        ],
        select: {
          id: true,
          paymentDate: true,
          facilityBuyer: {
            id: true,
            displayName: true,
            owner: {
              id: true,
              email: true,
            },
          },
          facilityCultivator: {
            id: true,
            displayName: true,
            owner: {
              id: true,
              email: true,
            },
          },
        },
        relations: {
          facilityBuyer: {
            owner: true,
          },
          facilityCultivator: {
            owner: true,
          },
        },
      });

      await Promise.all(
        orders.map(async (order) => {
          const days = moment(order.paymentDate).diff(moment(), 'day') + 1;
          const paymentDate = moment(order.paymentDate).format('DD.MM.YYYY');

          if (moment().diff(order.paymentDate, 'second') >= 1) {
            await Promise.all([
              this.dataSource.getRepository(OrderModel).update(order.id, {
                paymentStatus: PaymentStatusEnum.Overdue,
              }),
              this.customerioService.sendEmail({
                to: order.__facilityBuyer__.__owner__?.email,
                subject: 'Net Terms Payment Overdue!',
                message_data: {
                  orderId: order.id,
                  facilityBuyerName: order.__facilityBuyer__.displayName,
                  facilityCultivatorName:
                    order.__facilityCultivator__.displayName,
                  days,
                  paymentDate,
                },
                transactional_message_id: addPrifixEmail(
                  EmailTemplatesEnum.netOrderOverdueBuyer,
                  CONFIG.platform.ENV.toLowerCase(),
                ),
                identifiers: {
                  id: CustomerIoDataService.getUserId(
                    order.__facilityBuyer__?.id,
                  ),
                },
              }),
              this.customerioService.sendEmail({
                to: order.__facilityCultivator__.__owner__?.email,
                subject: 'Overdue Payment Alert!',
                message_data: {
                  orderId: order.id,
                  facilityBuyerName: order.__facilityBuyer__.displayName,
                  facilityCultivatorName:
                    order.__facilityCultivator__.displayName,
                  days,
                  paymentDate,
                },
                transactional_message_id: addPrifixEmail(
                  EmailTemplatesEnum.netOrderOverdueCultivator,
                  CONFIG.platform.ENV.toLowerCase(),
                ),
                identifiers: {
                  id: CustomerIoDataService.getUserId(
                    order.__facilityCultivator__?.id,
                  ),
                },
              }),
            ]);
          } else if ([7, 5, 3, 2, 1].includes(days)) {
            await this.customerioService.sendEmail({
              to: order.__facilityBuyer__.__owner__?.email,
              subject: 'Net Terms Payment Reminder',
              message_data: {
                orderId: order.id,
                facilityBuyerName: order.__facilityBuyer__.displayName,
                facilityCultivatorName:
                  order.__facilityCultivator__.displayName,
                days,
                paymentDate,
              },
              transactional_message_id: addPrifixEmail(
                EmailTemplatesEnum.netOrderDueBuyer,
                CONFIG.platform.ENV.toLowerCase(),
              ),
              identifiers: {
                id: CustomerIoDataService.getUserId(
                  order.__facilityBuyer__?.id,
                ),
              },
            });
          }
        }),
      );
    } catch (error) {
      this.logger.error(`CRON: netOrders - ${error.message}`);
    } finally {
      if (Date.now() - date >= 5000) {
        this.logger.debug(
          `CRON end: netOrders ${uuid} ${(Date.now() - date) / 1000} sec`,
        );
      }
    }
  }

  // @Cron('0 */1 * * * *', {
  //   name: 'cultivatorFeePaidOrders',
  //   // disabled: !CONFIG.platform.isCron,
  // })
  // async cultivatorFeePaidOrders() {
  //   const date = Date.now();
  //   const uuid = uuidv4();
  //   try {
  //     const orders = await this.dataSource.getRepository(OrderModel).find({
  //       where: [
  //         {
  //           paymentStatus: PaymentStatusEnum.Paid,
  //           status: OrderStatusEnum.Completed,
  //           isCultivatorFeePaid: false,
  //         },
  //       ],
  //       select: {
  //         id: true,
  //         facilityCultivator: {
  //           id: true,
  //           publicAddress: true,
  //         },
  //       },
  //     });

  //     await Promise.allSettled(
  //       orders.map(async (order) =>
  //         this.orderService.cultivatorFeePaidOrder(order),
  //       ),
  //     );
  //   } catch (error) {
  //     this.logger.error(`CRON: cultivatorFeePaidOrders - ${error.message}`);
  //   } finally {
  //     if (Date.now() - date >= 5000) {
  //       this.logger.debug(
  //         `CRON end: cultivatorFeePaidOrders ${uuid} ${
  //           (Date.now() - date) / 1000
  //         } sec`,
  //       );
  //     }
  //   }
  // }
}
