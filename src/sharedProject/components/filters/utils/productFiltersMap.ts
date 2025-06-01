import { Filter } from '@devexpress/dx-react-grid';
import { FilterFieldTypeEnum, FilterOperationEnum, IFilterDto } from 'graphql/_server';

const productFiltersMap = (filters: Filter[]): IFilterDto[] => {
  return filters.map((item) => {
    return {
      columnName: item.columnName,
      operation: resolveFilterType(item.columnName).operation as FilterOperationEnum,
      type: resolveFilterType(item.columnName).type as FilterFieldTypeEnum,
      value: resolveValue(item.columnName, item.value)
    };
  });
};

const resolveFilterType = (
  columnName: string
): { operation: FilterOperationEnum; type: FilterFieldTypeEnum } => {
  switch (columnName) {
    case 'price':
    case 'quantityStock':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.NumberRange
      };
    case 'totalTHC':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.NumberRange
      };
    case 'totalCBD':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.NumberRange
      };
    case 'packagedDate':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.DateRange
      };
    case 'labTestingState':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.Text
      };
    case 'status':
      return {
        operation: FilterOperationEnum.Equal,
        type: FilterFieldTypeEnum.Text
      };
    case 'facility.id':
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
      return [value[0], value[1]];
    default:
      return value;
  }
};

export default productFiltersMap;
