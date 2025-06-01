import { FC, memo, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IProductModel,
  IProductsModel,
  IQueryProductsBuyerArgs
} from 'graphql/_server';
import PRODUCTS_BUYER from 'graphql/queries/productsBuyer';
import { useDebounce } from 'sharedArchitech/hooks/useDebounce';

import InputSearch from './InputSearch/InputSearch';
import Suggestions from './Suggestions/Suggestions';
import styles from './styles';

const Search: FC = () => {
  const [saveData, setSaveData] = useState<IProductModel[]>([]);

  const [isTouched, setIsTouched] = useState<boolean>(false);

  const { control, watch, resetField } = useForm<{ search: string }>({
    mode: 'onChange',
    defaultValues: {
      search: ''
    }
  });

  const debouncedSearch = useDebounce(watch('search'), 500);

  const { loading } = useQuery<{ productsBuyer: IProductsModel }, IQueryProductsBuyerArgs>(
    PRODUCTS_BUYER,
    {
      skip: debouncedSearch.length < 2,
      variables: {
        payload: {
          filters: [
            {
              columnName: 'item.name',
              operation: FilterOperationEnum.Contains,
              type: FilterFieldTypeEnum.Text,
              value: [`${debouncedSearch}`]
            },
            {
              columnName: 'quantityStock',
              operation: FilterOperationEnum.NotEqual,
              type: FilterFieldTypeEnum.Number,
              value: ['0']
            }
          ],
          paginate: {
            skip: 0,
            take: 5
          }
        }
      },
      fetchPolicy: 'network-only',
      onCompleted: (data) => {
        const items: IProductModel[] = data?.productsBuyer.items || [];

        setIsTouched(true);
        setSaveData(items);
      }
    }
  );

  useEffect(() => {
    if (debouncedSearch.length < 2) {
      setSaveData([]);
    }
  }, [debouncedSearch.length]);

  return (
    <>
      <Box sx={styles.inputContainer}>
        <Controller
          control={control}
          name="search"
          render={({ field: { value, onBlur, onChange } }) => (
            <InputSearch
              value={value}
              onChange={onChange}
              onBlur={onBlur}
              closeHandler={closeHandler}
            />
          )}
        />
        <Suggestions
          saveData={saveData}
          loadingQuery={loading}
          isTouched={isTouched}
          value={watch('search')}
          close={closeHandler}
        />
      </Box>
    </>
  );

  function closeHandler() {
    resetField('search');
    setSaveData([]);
    setIsTouched(false);
  }
};

export default memo(Search);
