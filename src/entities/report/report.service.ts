import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { FacilityModel } from '@entities/facility/facility.model';
import FacilityToFacilityModel from '@entities/facility_to_facility/facility_to_facility.model';
import { IGetDateFilter, IGetRevenueQueryBuilder } from './report.type';
import { ReportSalesPerformanceInput } from './report.input';
import { SortDirectionEnum } from '@enums/common';
import { ReportSalesPerformances } from './report.dto';
import QueryService from '@common/query';
import { OrderModel } from '@entities/order/order.model';
import { OrderStatusEnum } from '@entities/order/order.enum';

@Injectable()
export default class ReportService {
  constructor(private dataSource: DataSource) {}

  async getSalesPerformanceAdmin(
    payload: ReportSalesPerformanceInput,
  ): Promise<ReportSalesPerformances> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'facility.id',
        direction: SortDirectionEnum.desc,
      },
    ];

    const allBuyerSubQuery = this.allBuyerSubQuery({
      startDate: payload.startDate,
      endDate: payload.endDate,
    });

    const allCultivatorSubQuery = this.allCultivatorSubQuery({
      startDate: payload.startDate,
      endDate: payload.endDate,
    });

    const generalQuery = await this.dataSource
      .getRepository(FacilityModel)
      .createQueryBuilder('facility')
      .leftJoin(
        `(${allCultivatorSubQuery})`,
        'all_cultivator',
        'all_cultivator.id = facility.id',
      )
      .leftJoin(
        `(${allBuyerSubQuery})`,
        'all_buyer',
        'all_buyer.id = facility.id',
      )
      .select('facility')
      .addSelect('all_buyer.totalpurchased', 'totalPurchased')
      .addSelect(
        'all_buyer.quantityproductpurchased',
        'quantityProductPurchased',
      )
      .addSelect('all_buyer.purchases', 'purchases')
      .addSelect('all_buyer.avgpricebuyer', 'avgPriceBuyer')
      .addSelect('all_buyer.avgpoundsorderbuyer', 'avgPoundsOrderBuyer')
      .addSelect('all_buyer.avgpricepoundbuyer', 'avgPricePoundBuyer')

      .addSelect('all_cultivator.totalrevenue', 'totalRevenue')
      .addSelect(
        'all_cultivator.quantityproductrevenue',
        'quantityProductRevenue',
      )
      .addSelect('all_cultivator.avgpricecultivator', 'avgPriceCultivator')
      .addSelect(
        'all_cultivator.avgpoundsordercultivator',
        'avgPoundsOrderCultivator',
      )
      .addSelect(
        'all_cultivator.avgpricepoundcultivator',
        'avgPricePoundCultivator',
      )
      .addSelect('all_cultivator.totallisted', 'totalListed')
      .addSelect('all_cultivator.totalmetrc', 'totalMetrc')
      .addSelect('all_cultivator.percentlisted', 'percentListed')
      .where(QueryService.getFiltersSql(payload.filters));

    const totalQuery = generalQuery.clone();

    sorts.forEach((sort) => {
      generalQuery.addOrderBy(
        sort.columnName,
        sort.direction === SortDirectionEnum.asc ? 'ASC' : 'DESC',
      );
    });
    generalQuery.limit(paginate.take);
    generalQuery.offset(paginate.skip);

    const { items, total } = await this._getSalesPerformanceResult(
      generalQuery,
      totalQuery,
    );

    return {
      items,
      meta: {
        ...paginate,
        total: total.count,
      },
    };
  }

  async getSalesPerformanceByCultivator(
    payload: ReportSalesPerformanceInput,
    facilityId: string,
  ): Promise<ReportSalesPerformances> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'totalPurchased',
        direction: SortDirectionEnum.desc,
      },
    ];

    const allBuyerSubQuery = this.allBuyerSubQuery({
      startDate: payload.startDate,
      endDate: payload.endDate,
      facilityId,
    });

    const generalQuery = await this.dataSource
      .getRepository(FacilityModel)
      .createQueryBuilder('facility')
      .leftJoin(
        `(select 
          0 as totalrevenue,
          0 as quantityproductrevenue,
          0 as avgpricecultivator,
          0 as avgpoundsordercultivator,
          0 as avgpricepoundcultivator,
          0 as totallisted,
          0 as totalmetrc,
          0 as percentlisted
        )`,
        'all_cultivator',
        'true',
      )
      .leftJoin(
        `(${allBuyerSubQuery})`,
        'all_buyer',
        'all_buyer.id = facility.id',
      )
      .leftJoin(
        FacilityToFacilityModel,
        'facilityToFacility',
        'facilityToFacility.facilityCultivator = :cultivatorId and facilityToFacility.facilityBuyer = facility.id',
        {
          cultivatorId: facilityId,
        },
      )
      .select('facility')
      .addSelect('all_buyer.totalpurchased', 'totalPurchased')
      .addSelect(
        'all_buyer.quantityproductpurchased',
        'quantityProductPurchased',
      )
      .addSelect('all_buyer.purchases', 'purchases')
      .addSelect('all_buyer.avgpricebuyer', 'avgPriceBuyer')
      .addSelect('all_buyer.avgpoundsorderbuyer', 'avgPoundsOrderBuyer')
      .addSelect('all_buyer.avgpricepoundbuyer', 'avgPricePoundBuyer')

      .addSelect('all_cultivator.totalrevenue', 'totalRevenue')
      .addSelect(
        'all_cultivator.quantityproductrevenue',
        'quantityProductRevenue',
      )
      .addSelect('all_cultivator.avgpricecultivator', 'avgPriceCultivator')
      .addSelect(
        'all_cultivator.avgpoundsordercultivator',
        'avgPoundsOrderCultivator',
      )
      .addSelect(
        'all_cultivator.avgpricepoundcultivator',
        'avgPricePoundCultivator',
      )
      .addSelect('all_cultivator.totallisted', 'totalListed')
      .addSelect('all_cultivator.totalmetrc', 'totalMetrc')
      .addSelect('all_cultivator.percentlisted', 'percentListed')
      .where(
        '(all_buyer.totalpurchased > 0 OR facilityToFacility.id IS NOT NULL)',
      );

    if (payload.filters?.length) {
      generalQuery.andWhere(QueryService.getFiltersSql(payload.filters));
    }

    const totalQuery = generalQuery.clone();

    sorts.forEach((sort) => {
      generalQuery.addOrderBy(
        sort.columnName,
        sort.direction === SortDirectionEnum.asc ? 'ASC' : 'DESC',
      );
    });
    generalQuery.limit(paginate.take);
    generalQuery.offset(paginate.skip);

    const { items, total } = await this._getSalesPerformanceResult(
      generalQuery,
      totalQuery,
    );

    return {
      items,
      meta: {
        ...paginate,
        total: total.count,
      },
    };
  }

  async getSalesPerformanceByBuyer(
    payload: ReportSalesPerformanceInput,
    facilityId: string,
  ): Promise<ReportSalesPerformances> {
    const paginate = payload.paginate || { skip: 0, take: 25 };
    const sorts = payload?.sorts || [
      {
        columnName: 'totalRevenue',
        direction: SortDirectionEnum.desc,
      },
    ];

    const allCultivatorSubQuery = this.allCultivatorSubQuery({
      startDate: payload.startDate,
      endDate: payload.endDate,
      facilityId,
    });

    const generalQuery = await this.dataSource
      .getRepository(FacilityModel)
      .createQueryBuilder('facility')
      .leftJoin(
        `(${allCultivatorSubQuery})`,
        'all_cultivator',
        'all_cultivator.id = facility.id',
      )
      .leftJoin(
        `(select 
          0 as totalpurchased,
          0 as quantityproductpurchased,
          0 as avgpricebuyer,
          0 as avgpoundsorderbuyer,
          0 as avgpricepoundbuyer,
          0 as purchases
        )`,
        'all_buyer',
        'true',
      )
      .leftJoin(
        FacilityToFacilityModel,
        'facilityToFacility',
        'facilityToFacility.facilityBuyer = :buyerId and facilityToFacility.facilityCultivator = facility.id',
        {
          buyerId: facilityId,
        },
      )
      .select('facility')
      .addSelect('all_buyer.totalpurchased', 'totalPurchased')
      .addSelect(
        'all_buyer.quantityproductpurchased',
        'quantityProductPurchased',
      )
      .addSelect('all_buyer.purchases', 'purchases')
      .addSelect('all_buyer.avgpricebuyer', 'avgPriceBuyer')
      .addSelect('all_buyer.avgpoundsorderbuyer', 'avgPoundsOrderBuyer')
      .addSelect('all_buyer.avgpricepoundbuyer', 'avgPricePoundBuyer')

      .addSelect('all_cultivator.totalrevenue', 'totalRevenue')
      .addSelect(
        'all_cultivator.quantityproductrevenue',
        'quantityProductRevenue',
      )
      .addSelect('all_cultivator.avgpricecultivator', 'avgPriceCultivator')
      .addSelect(
        'all_cultivator.avgpoundsordercultivator',
        'avgPoundsOrderCultivator',
      )
      .addSelect(
        'all_cultivator.avgpricepoundcultivator',
        'avgPricePoundCultivator',
      )
      .addSelect('all_cultivator.totallisted', 'totalListed')
      .addSelect('all_cultivator.totalmetrc', 'totalMetrc')
      .addSelect('all_cultivator.percentlisted', 'percentListed')
      .where(
        '(all_cultivator.totalrevenue > 0 OR facilityToFacility.id IS NOT NULL)',
      );

    if (payload.filters?.length) {
      generalQuery.andWhere(QueryService.getFiltersSql(payload.filters));
    }

    const totalQuery = generalQuery.clone();

    sorts.forEach((sort) => {
      generalQuery.addOrderBy(
        sort.columnName,
        sort.direction === SortDirectionEnum.asc ? 'ASC' : 'DESC',
      );
    });
    generalQuery.limit(paginate.take);
    generalQuery.offset(paginate.skip);

    const { items, total } = await this._getSalesPerformanceResult(
      generalQuery,
      totalQuery,
    );

    return {
      items,
      meta: {
        ...paginate,
        total: total.count,
      },
    };
  }

  allCultivatorSubQuery({
    startDate,
    endDate,
    facilityId,
  }: IGetRevenueQueryBuilder): string {
    const datesFilter = this._getFilterDates({
      field: 'order.dates.updatedDate',
      startDate,
      endDate,
    });

    const facilityFilter = facilityId
      ? `AND order.facilityBuyer = '${facilityId}'`
      : '';

    return this.dataSource
      .getRepository(FacilityModel)
      .createQueryBuilder('facility')
      .leftJoin(
        OrderModel,
        'order',
        `order.facilityCultivator = facility.id 
        and order.status = '${OrderStatusEnum.Completed}' 
        ${facilityFilter} 
        ${datesFilter}`,
      )
      .leftJoin('order.products', 'products')
      .select('facility.id', 'id')
      .addSelect('ROUND(Coalesce(SUM(order.total), 0),2)', 'totalrevenue')
      .addSelect(
        'ROUND(Coalesce(SUM(products.quantity), 0),2)',
        'quantityproductrevenue',
      )
      .addSelect('ROUND(Coalesce(avg(order.total), 0),2)', 'avgpricecultivator')
      .addSelect(
        'ROUND(Coalesce(avg(products.quantity), 0),2)',
        'avgpoundsordercultivator',
      )
      .addSelect(
        'ROUND(Coalesce(SUM(order.total), 0)/Coalesce(SUM(products.quantity), 1),2)',
        'avgpricepoundcultivator',
      )
      .addSelect(
        `Coalesce((select
            ROUND(Coalesce(SUM(quantity_stock), 0),2)
          from public.product_tree as product
          where facility_id = facility.id and status = 'listed' and deleted_date is null
          group by facility_id),0)`,
        'totallisted',
      )
      .addSelect(
        `Coalesce((select
              ROUND(Coalesce(SUM(quantity), 0),2)
            from public.product_tree
            where facility_id = facility.id and deleted_date is null
            group by facility_id),0)`,
        'totalmetrc',
      )
      .addSelect(
        `ROUND((
            100 * Coalesce((select
              ROUND(Coalesce(SUM(quantity_stock), 0),2)
            from public.product_tree
            where facility_id = facility.id and status = 'listed' and deleted_date is null
            group by facility_id),0) / Coalesce((select
              ROUND(Coalesce(SUM(quantity), 0),2)
            from public.product_tree
            where facility_id = facility.id and deleted_date is null
            group by facility_id),1)
          ),2)`,
        'percentlisted',
      )
      .groupBy('facility.id')
      .getQuery();
  }

  allBuyerSubQuery({
    startDate,
    endDate,
    facilityId,
  }: IGetRevenueQueryBuilder): string {
    const datesFilter = this._getFilterDates({
      field: 'order.dates.updatedDate',
      startDate,
      endDate,
    });

    const facilityFilter = facilityId
      ? `AND order.facilityCultivator = '${facilityId}'`
      : '';

    return this.dataSource
      .getRepository(FacilityModel)
      .createQueryBuilder('facility')
      .leftJoin(
        OrderModel,
        'order',
        `order.facilityBuyer = facility.id 
        and order.status = '${OrderStatusEnum.Completed}' 
        ${facilityFilter} 
        ${datesFilter}`,
      )
      .leftJoin('order.products', 'products')
      .select('facility.id', 'id')
      .addSelect('ROUND(Coalesce(SUM(order.total), 0),2)', 'totalpurchased')
      .addSelect(
        'ROUND(Coalesce(SUM(products.quantity), 0),2)',
        'quantityproductpurchased',
      )
      .addSelect('ROUND(Coalesce(avg(order.total), 0),2)', 'avgpricebuyer')
      .addSelect(
        'ROUND(Coalesce(avg(products.quantity), 0),2)',
        'avgpoundsorderbuyer',
      )
      .addSelect(
        'ROUND(Coalesce(SUM(order.total), 0)/Coalesce(SUM(products.quantity), 1),2)',
        'avgpricepoundbuyer',
      )
      .groupBy('facility.id')
      .addSelect(
        `Coalesce((select
          Coalesce(COUNT(*), 0) as purchases
          from public.order
          where facility_buyer_id = facility.id and deleted_date is null and order.status = '${OrderStatusEnum.Completed}' ${datesFilter} 
          group by facility_buyer_id),0)`,
        'purchases',
      )
      .getQuery();
  }

  private _getFilterDates({
    field,
    startDate,
    endDate,
  }: IGetDateFilter): string {
    if (startDate && endDate) {
      return `and ${field} BETWEEN '${startDate.toDateString()}' AND '${endDate.toDateString()}'`;
    } else if (startDate) {
      return `and ${field} >= '${startDate.toDateString()}'`;
    } else if (endDate) {
      return `and ${field} <= '${endDate.toDateString()}'`;
    }
    return '';
  }

  private async _getSalesPerformanceResult(generalQuery, totalQuery) {
    const [items, total] = await Promise.all([
      generalQuery.getRawAndEntities().then(({ entities, raw }) => {
        return entities.map((entity) => {
          const rawItem = raw.find(
            ({ facility_id }) => facility_id === entity.id,
          );
          return {
            facility: entity,
            totalRevenue: rawItem.totalRevenue || 0,
            totalPurchased: rawItem.totalPurchased || 0,
            quantityProductPurchased: rawItem.quantityProductPurchased || 0,
            quantityProductRevenue: rawItem.quantityProductRevenue || 0,
            avgPriceCultivator: rawItem.avgPriceCultivator || 0,
            avgPriceBuyer: rawItem.avgPriceBuyer || 0,
            avgPoundsOrderCultivator: rawItem.avgPoundsOrderCultivator || 0,
            avgPoundsOrderBuyer: rawItem.avgPoundsOrderBuyer || 0,
            avgPricePoundCultivator: rawItem.avgPricePoundCultivator || 0,
            avgPricePoundBuyer: rawItem.avgPricePoundBuyer || 0,
            totalListed: rawItem.totalListed || 0,
            totalMetrc: rawItem.totalMetrc || 0,
            percentListed: rawItem.percentListed || 0,
            purchases: rawItem.purchases || 0,
          };
        });
      }),
      this.dataSource
        .createQueryBuilder()
        .select('COUNT(*) as "count"')
        .from('(' + totalQuery.getQuery() + ')', 'subquery')
        .setParameters(totalQuery.getParameters())
        .getRawOne(),
    ]);

    return { items, total };
  }
}
