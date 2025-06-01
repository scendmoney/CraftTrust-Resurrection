import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { IFacilitiesDto, IFacilityModel, IFilterDto, IQueryCultivatorsArgs } from 'graphql/_server';
import CULTIVATORS from 'graphql/queries/cultivators';
import { CheckboxFilter } from 'sharedProject/components/filters/CheckboxFilter/CheckboxFilter';
import { DateFilter } from 'sharedProject/components/filters/DateFilter/DateFilter';
import PopoverFilterWrapper from 'sharedProject/components/filters/PopoverFilterWrapper/PopoverFilterWrapper';
import marksCbd from 'sharedProject/components/filters/SliderPriceFilter/modules/marksCbd';
import marksPrice from 'sharedProject/components/filters/SliderPriceFilter/modules/marksPrice';
import marksQuantity from 'sharedProject/components/filters/SliderPriceFilter/modules/marksQuantity';
import marksThc from 'sharedProject/components/filters/SliderPriceFilter/modules/marksThc';
import { SliderPriceFilter } from 'sharedProject/components/filters/SliderPriceFilter/SliderPriceFilter';
import { TextFilter } from 'sharedProject/components/filters/TextFilter/TextFilter';

import CultivatorMobilePopover from './CultivatorMobilePopover/CultivatorMobilePopover';
import styles from './styles';

const ClientProductsFilters: FC<{
  filters: IFilterDto[];
  removeFilter: (columnName: string) => void;
  addFilter: (columnName: string, value: string[]) => void;
  showCultivatorFilters?: boolean;
}> = ({ filters, removeFilter, addFilter, showCultivatorFilters }) => {
  const [cultivators, setCultivators] = useState<IFacilityModel[]>([]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  useQuery<{ cultivators: IFacilitiesDto }, IQueryCultivatorsArgs>(CULTIVATORS, {
    variables: {
      payload: {}
    },
    onCompleted: (data) => {
      const items = data?.cultivators.items || [];
      setCultivators(items);
    },
    skip: !showCultivatorFilters
  });

  return (
    <Box sx={styles.headerLineLeft}>
      {showCultivatorFilters && isMobile && <CultivatorMobilePopover cultivators={cultivators} />}
      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'item.name')?.value || []}
        onRemove={() => removeFilter('item.name')}
        title={'Name'}
        columnName="name"
      >
        <TextFilter
          titleText="Search"
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('item.name');
            }
            return addFilter('item.name', [value]);
          }}
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'geneticCross')?.value || []}
        onRemove={() => removeFilter('geneticCross')}
        title={'Genetic Cross'}
        columnName="geneticCross"
      >
        <TextFilter
          titleText="Search"
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('geneticCross');
            }
            return addFilter('geneticCross', [value]);
          }}
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'labTestingState')?.value || []}
        onRemove={() => removeFilter('labTestingState')}
        title={'Lab Test'}
        columnName="labTestingState"
      >
        <CheckboxFilter
          titleText="Check"
          onValueChange={(value) => {
            if (value.length === 0) {
              return removeFilter('labTestingState');
            }
            return addFilter('labTestingState', value);
          }}
          options={[
            { value: 'TestPassed', label: 'Test Passed' },
            { value: 'RetestPassed', label: 'Retest Passed' }
          ]}
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'price')?.value || []}
        onRemove={() => removeFilter('price')}
        title={'Price'}
        columnName="price"
      >
        <SliderPriceFilter
          titleText="Price"
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('price');
            }
            return addFilter('price', value);
          }}
          max={1000}
          min={10}
          step={10}
          marks={marksPrice}
          prefix="$"
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'totalTHC')?.value || []}
        onRemove={() => removeFilter('totalTHC')}
        title={'THC'}
        columnName="totalTHC"
      >
        <SliderPriceFilter
          titleText="THC Percentage"
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('totalTHC');
            }
            return addFilter('totalTHC', value);
          }}
          initialValue={[0, 100]}
          max={100}
          min={0}
          step={1}
          marks={marksThc}
          prefix="THC "
          postfix=" %"
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'totalCBD')?.value || []}
        onRemove={() => removeFilter('totalCBD')}
        title={'CBD'}
        columnName="totalCBD"
      >
        <SliderPriceFilter
          titleText="CBD Percentage"
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('totalCBD');
            }
            return addFilter('totalCBD', value);
          }}
          initialValue={[0, 100]}
          max={100}
          min={0}
          step={1}
          marks={marksCbd}
          prefix="CBD "
          postfix=" %"
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'packagedDate')?.value || []}
        onRemove={() => removeFilter('packagedDate')}
        title={'Harvest Date'}
        columnName="packagedDate"
      >
        <DateFilter
          titleText="Harvest Date"
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('packagedDate');
            }
            return addFilter('packagedDate', value);
          }}
        />
      </PopoverFilterWrapper>

      <PopoverFilterWrapper
        value={filters.find((item) => item.columnName === 'quantityStock')?.value || []}
        onRemove={() => removeFilter('quantityStock')}
        title={'Quantity'}
        columnName="quantityStock"
      >
        <SliderPriceFilter
          titleText="Quantity"
          onValueChange={(value) => {
            if (!value) {
              return removeFilter('quantityStock');
            }
            return addFilter('quantityStock', value);
          }}
          max={100}
          min={0.25}
          step={0.25}
          marks={marksQuantity}
          initialValue={[0.25, 100]}
          postfix="lb"
        />
      </PopoverFilterWrapper>
    </Box>
  );
};

export default ClientProductsFilters;
