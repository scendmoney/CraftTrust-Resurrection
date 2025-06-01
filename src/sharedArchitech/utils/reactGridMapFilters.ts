import { Filter } from '@devexpress/dx-react-grid';
import addDays from 'date-fns/addDays';
import { FilterFieldTypeEnum, FilterOperationEnum, IFilterDto } from 'graphql/_server';

const reactGridMapFilters = (filters: Filter[], idAsString = false): IFilterDto[] => {
  return filters.map((item) => {
    return {
      columnName: resolveColumnName(item.columnName),
      operation: resolveFilterType(item.columnName, idAsString).operation as FilterOperationEnum,
      type: resolveFilterType(item.columnName, idAsString).type as FilterFieldTypeEnum,
      value: resolveValue(item.columnName, item.value)
    };
  });
};

const resolveColumnName = (columnName: string) => {
  switch (columnName) {
    case 'statusSurvey':
      return 'status';
    default:
      return columnName;
  }
};

const resolveFilterType = (
  columnName: string,
  idAsString = false
): { operation: FilterOperationEnum; type: FilterFieldTypeEnum } => {
  switch (columnName) {
    case 'id':
      return {
        operation: idAsString ? FilterOperationEnum.Contains : FilterOperationEnum.Equal,
        type: idAsString ? FilterFieldTypeEnum.Text : FilterFieldTypeEnum.Number
      };
    case 'userId':
    case 'quantityStock':
    case 'quantityStockMin':
    case 'sold':
    case 'facilityCultivatorRelations.netDays':
    case 'facilityCultivatorRelations.totalOrders':
    case 'orders':
    case 'ageRange':
    case 'purchases':
    case 'quantityProductPurchased':
    case 'avgPoundsOrderBuyer':
    case 'avgPoundsOrderCultivator':
    case 'totalListed':
    case 'totalMetrc':
    case 'quantityProductRevenue':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.Number
      };
    case 'packagedDate':
    case 'dates.createdDate':
    case 'joinDate':
    case 'dates.updatedDate':
    case 'surveySentDate':
    case 'completedDate':
    case 'labTestingStateDate':
    case 'facilityCultivatorRelations.dates.createdDate':
    case 'facilityCultivatorRelations.lastOrderDate':
    case 'company.dateEnd':
    case 'company.dateStart':
    case 'paymentDate':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.DateRange
      };
    case 'total':
    case 'facilityCultivatorRelations.netBalance':
    case 'amount':
    case 'amountUsd':
    case 'facilityCultivatorRelations.orderTotalSpend':
    case 'facilityCultivatorRelations.dueBalance':
    case 'facilityCultivatorRelations.avgPurchase':
    case 'price':
    case 'totalPurchased':
    case 'totalRevenue':
    case 'avgPriceBuyer':
    case 'avgPricePoundBuyer':
    case 'avgPriceCultivator':
    case 'avgPricePoundCultivator':
    case 'fee.feeCultivator':
    case 'fee.feeBuyer':
    case 'totalCultivator':
    case 'totalBuyer':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.NumberRange
      };
    case 'order.id':
    case 'status':
    case 'type':
    case 'facilityRole':
    case 'paymentStatus':
    case 'paymentType':
    case 'gender':
    case 'appealingVisually':
    case 'color':
    case 'intoxication':
    case 'nose':
    case 'oftenConsumeCannabis':
    case 'primaryPurpose':
    case 'experience':
    case 'role':
    case 'facility.role':
    case 'company.status':
    case 'labTestingState':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.Text
      };
    case 'isBlocked':
    case 'facilityCultivatorRelations.isNetActivated':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.Boolean
      };
    case 'statusSurvey':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.Text
      };
    default:
      return {
        operation: FilterOperationEnum.Contains,
        type: FilterFieldTypeEnum.Text
      };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resolveValue = (columnName: string, value: any) => {
  switch (columnName) {
    case 'packagedDate':
    case 'paymentDate':
    case 'dates.createdDate':
    case 'dates.updatedDate':
    case 'labTestingStateDate':
    case 'facilityCultivatorRelations.dates.createdDate':
    case 'company.dateEnd':
    case 'surveySentDate':
    case 'completedDate':
    case 'joinDate':
    case 'company.dateStart':
    case 'facilityCultivatorRelations.lastOrderDate':
      return [value, addDays(new Date(value), 1)];
    case 'price':
    case 'total':
    case 'facilityCultivatorRelations.netBalance':
    case 'facilityCultivatorRelations.dueBalance':
    case 'facilityCultivatorRelations.orderTotalSpend':
    case 'facilityCultivatorRelations.avgPurchase':
    case 'amount':
    case 'amountUsd':
    case 'totalPurchased':
    case 'totalRevenue':
    case 'avgPricePoundBuyer':
    case 'avgPriceBuyer':
    case 'avgPriceCultivator':
    case 'avgPricePoundCultivator':
    case 'fee.feeCultivator':
    case 'fee.feeBuyer':
    case 'totalCultivator':
    case 'totalBuyer':
      return [value[0], value[1]];
    case 'statusSurvey':
      return value;
    default:
      return [`${value}`];
  }
};

export default reactGridMapFilters;
