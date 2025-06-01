import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { IOrderModel, ISortDto, SortDirectionEnum } from 'graphql/_server';

const useOrdersSorts = (resetOrders: Dispatch<SetStateAction<IOrderModel[]>>) => {
  const [sorts, setSorts] = useState<ISortDto[]>([
    {
      columnName: 'dates.createdDate',
      direction: SortDirectionEnum.Desc
    }
  ]);

  const handleSortCb = useCallback(
    (columnName: string, direction: SortDirectionEnum) => {
      resetOrders([]);
      setSorts([
        {
          columnName: columnName,
          direction: direction
        }
      ]);
    },
    [resetOrders]
  );

  const handleChangeDirectionCb = useCallback(
    (direction: SortDirectionEnum) => {
      resetOrders([]);
      setSorts((oldValue) => [
        {
          columnName: oldValue[0].columnName,
          direction: direction
        }
      ]);
    },
    [resetOrders]
  );

  const sortOptionsUm = useMemo(() => {
    return [
      {
        label: 'Order Date',
        value: 'Order Date',
        onClick: () => handleSortCb('dates.createdDate', SortDirectionEnum.Desc)
      },
      {
        label: 'Payment Date',
        value: 'Payment Date',
        onClick: () => handleSortCb('paymentDate', SortDirectionEnum.Desc)
      },
      {
        label: 'Price',
        value: 'Price',
        onClick: () => handleSortCb('totalBuyer', SortDirectionEnum.Desc)
      }
    ];
  }, [handleSortCb]);

  return {
    sortsOptions: sortOptionsUm,
    sorts,
    direction: sorts[0].direction,
    changeDirection: handleChangeDirectionCb
  };
};

export default useOrdersSorts;
