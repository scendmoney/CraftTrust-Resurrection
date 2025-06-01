import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { FilterFieldTypeEnum, FilterOperationEnum, IFilterDto, IOrderModel } from 'graphql/_server';
import _ from 'lodash';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';

const useOrdersFilters = (setOrders: Dispatch<SetStateAction<IOrderModel[]>>, onlyDue: boolean) => {
  const [filters, setFilters] = useState<IFilterDto[]>(
    onlyDue
      ? [
          {
            columnName: 'paymentStatus',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: ['Due', 'Overdue']
          },
          {
            columnName: 'status',
            operation: FilterOperationEnum.NotEqual,
            type: FilterFieldTypeEnum.Text,
            value: ['Cancel']
          }
        ]
      : []
  );

  const handleAddFilterCb = useCallback(
    (columnName: string, value: string[]) => {
      setOrders([]);
      if (columnName === 'dates.createdDate') {
        setFilters((oldValue) => {
          const newValue = [
            {
              columnName: columnName,
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.DateRange,
              value: value
            },
            ...oldValue
          ];

          return _.uniqBy(newValue, 'columnName');
        });
        return;
      }
      setFilters((oldValue) => {
        const newFilter = reactGridMapFilters([
          {
            columnName: columnName,
            operation: FilterOperationEnum.Contains,
            type: FilterFieldTypeEnum.Text,
            value: value
          },
          ...oldValue
        ])[0];

        const newValue = [newFilter, ...oldValue];

        return _.uniqBy(newValue, 'columnName');
      });
    },
    [setOrders]
  );

  const handleRemoveFilterCb = useCallback(
    (columnName: string) => {
      setOrders([]);

      setFilters((oldValue) => {
        const newFilter = reactGridMapFilters(
          oldValue.filter((filter) => filter.columnName !== columnName)
        );
        return newFilter;
      });
    },
    [setOrders]
  );

  return {
    filters,
    addFilter: handleAddFilterCb,
    removeFilter: handleRemoveFilterCb
  };
};

export default useOrdersFilters;
