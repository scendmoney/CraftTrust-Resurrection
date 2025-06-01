import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box } from '@mui/material';
import { IFacilitiesDto, IFacilityModel, IFilterDto, IQueryCultivatorsArgs } from 'graphql/_server';
import CULTIVATORS from 'graphql/queries/cultivators';
import { DateSelectFilter } from 'sharedProject/components/filters/DateSelectFilter/DateSelectFilter';
import { EnumFilter } from 'sharedProject/components/filters/EnumFilter/EnumFilter';
import { NumberFilter } from 'sharedProject/components/filters/NumberFilter/NumberFilter';
import PopoverFilterWrapper from 'sharedProject/components/filters/PopoverFilterWrapper/PopoverFilterWrapper';
import { orderStatuses } from 'sharedProject/utils/mappingOrderStatus';

import { orderPaymentStatuses } from './selectEnumOptions';
import styles from './styles';

const ClientOrdersFilters: FC<{
  filters: IFilterDto[];
  removeFilter: (columnName: string) => void;
  addFilter: (columnName: string, value: string[]) => void;
}> = ({ filters, removeFilter, addFilter }) => {
  const [cultivators, setCultivators] = useState<IFacilityModel[]>([]);
  useQuery<{ cultivators: IFacilitiesDto }, IQueryCultivatorsArgs>(CULTIVATORS, {
    variables: {
      payload: {}
    },
    onCompleted: (data) => {
      const items = data?.cultivators.items || [];
      setCultivators(items);
    }
  });

  const cultivatorsUm = useMemo(() => {
    if (cultivators) {
      return cultivators.map((item) => {
        return {
          value: item.id,
          label: item.displayName || item.name || 'Unnamed',
          logo: item.asset?.url || ' '
        };
      });
    }
    return [];
  }, [cultivators]);
  return (
    <Box sx={styles.headerLineLeft}>
      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'id')?.value || []}
        onRemove={() => removeFilter('id')}
        title={'Order #'}
        columnName="id"
      >
        <NumberFilter
          titleText="Search"
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('id');
            }
            return addFilter('id', [value]);
          }}
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'status')?.value || []}
        onRemove={() => removeFilter('status')}
        title={'Order Status'}
        columnName="status"
      >
        <EnumFilter
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('status');
            }
            return addFilter('status', [value]);
          }}
          statuses={orderStatuses}
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'paymentStatus')?.value || []}
        onRemove={() => removeFilter('paymentStatus')}
        title={'Payment Status'}
        columnName="paymentStatus"
      >
        <EnumFilter
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('paymentStatus');
            }
            return addFilter('paymentStatus', [value]);
          }}
          statuses={orderPaymentStatuses}
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={
          filters.find((item) => item.columnName === 'facilityCultivator.displayName')?.value || []
        }
        onRemove={() => removeFilter('facilityCultivator.displayName')}
        title={'Cultivator'}
        columnName="facilityCultivator.displayName"
      >
        <EnumFilter
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('facilityCultivator.displayName');
            }
            return addFilter('facilityCultivator.displayName', [value]);
          }}
          statuses={cultivatorsUm}
          valueIsLabel
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'dates.createdDate')?.value || []}
        onRemove={() => removeFilter('dates.createdDate')}
        title={'Date'}
        columnName="dates.createdDate"
      >
        <DateSelectFilter
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('dates.createdDate');
            }
            return addFilter('dates.createdDate', value);
          }}
        />
      </PopoverFilterWrapper>
    </Box>
  );
};

export default ClientOrdersFilters;
