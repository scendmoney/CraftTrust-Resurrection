import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IFilterDto,
  IProductModel
} from 'graphql/_server';
import _ from 'lodash';

const useProductsFilters = (
  setProducts: Dispatch<SetStateAction<IProductModel[]>>,
  facilityId?: string
) => {
  const [filters, setFilters] = useState<IFilterDto[]>(
    facilityId
      ? [
          {
            columnName: 'status',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: ['listed']
          }
        ]
      : []
  );

  const handleAddFilterCb = useCallback(
    (columnName: string, value: string[]) => {
      setProducts([]);
      setFilters((oldValue) => {
        const newValue = [
          {
            columnName: columnName,
            operation: FilterOperationEnum.Contains,
            type: FilterFieldTypeEnum.Text,
            value: value
          },
          ...oldValue
        ];

        return _.uniqBy(newValue, 'columnName');
      });
    },
    [setProducts]
  );

  const handleRemoveFilterCb = useCallback(
    (columnName: string) => {
      setProducts([]);

      setFilters((oldValue) => {
        return oldValue.filter((filter) => filter.columnName !== columnName);
      });
    },
    [setProducts]
  );

  return {
    filters,
    addFilter: handleAddFilterCb,
    removeFilter: handleRemoveFilterCb
  };
};

export default useProductsFilters;
