import { Dispatch, SetStateAction, useCallback, useMemo, useState } from 'react';
import { IProductModel, ISortDto, SortDirectionEnum } from 'graphql/_server';

const useProductsSorts = (resetProducts: Dispatch<SetStateAction<IProductModel[]>>) => {
  const [sorts, setSorts] = useState<ISortDto[]>([
    {
      columnName: 'packagedDate',
      direction: SortDirectionEnum.Desc
    }
  ]);

  const handleSortCb = useCallback(
    (columnName: string, direction: SortDirectionEnum) => {
      resetProducts([]);
      setSorts([
        {
          columnName: columnName,
          direction: direction
        }
      ]);
    },
    [resetProducts]
  );

  const handleChangeDirectionCb = useCallback(
    (direction: SortDirectionEnum) => {
      resetProducts([]);
      setSorts((oldValue) => [
        {
          columnName: oldValue[0].columnName,
          direction: direction
        }
      ]);
    },
    [resetProducts]
  );

  const sortOptionsUm = useMemo(() => {
    return [
      {
        label: 'Harvest Date',
        value: 'Harvest Date',
        onClick: () => handleSortCb('packagedDate', SortDirectionEnum.Desc)
      },
      {
        label: 'Alphabetically',
        value: 'Alphabetically',
        onClick: () => handleSortCb('item.name', SortDirectionEnum.Desc)
      },
      {
        label: 'Date Added',
        value: 'Date Added',
        onClick: () => handleSortCb('id', SortDirectionEnum.Desc)
      },
      {
        label: 'Price',
        value: 'Price',
        onClick: () => handleSortCb('price', SortDirectionEnum.Desc)
      },
      {
        label: 'Quantity',
        value: 'Quantity',
        onClick: () => handleSortCb('quantityStock', SortDirectionEnum.Desc)
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

export default useProductsSorts;
