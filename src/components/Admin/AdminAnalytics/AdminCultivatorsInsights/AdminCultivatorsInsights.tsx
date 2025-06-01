/* eslint-disable no-console */
import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { format, startOfMonth } from 'date-fns';
import {
  FacilityRoleEnum,
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQueryReportSalesPerformanceAdminArgs,
  IReportSalesPerformances
} from 'graphql/_server';
import REPORT_SALES_PERFORMANCE_ADMIN from 'graphql/queries/reportSalesPerformanceAdmin';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import Routes from 'routes';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import DateSelector from 'sharedProject/components/DateSelector/DateSelector';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import HeaderSelect from 'sharedProject/components/UniversalTable/HeaderSelect/HeaderSelect';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import { NumberRangeEditor } from 'sharedProject/components/UniversalTable/providers/NumberRangeEditor/NumberRangeEditor';
import { PercentFormatter } from 'sharedProject/components/UniversalTable/providers/PercentFormatter/PercentFormatter';
import { PriceFormatter } from 'sharedProject/components/UniversalTable/providers/PriceFormatter/PriceFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import { UnitFormatter } from 'sharedProject/components/UniversalTable/providers/UnitFormatter/UnitFormatter';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import useTableLocalStorage from 'sharedProject/hooks/useTableLocalStorage';
import { mappingFacilitiesRole } from 'sharedProject/utils/mappingFacilityRole';

import Loader from 'components/Loader/Loader';

import AdminCultivatorsInsightsDetailsWrapper from './AdminCultivatorsInsightsDetails/AdminCultivatorsInsightsDetailsWrapper';
import { usersRoles } from './selectEnumOptions';
import styles from './styles';

const AdminCultivatorsInsights: FC = () => {
  const { goTo, goToModal, id, clearQuery } = useProjectRouter();
  const [dateFrom, setDateFrom] = useTableLocalStorage<string | null>(
    format(startOfMonth(new Date()), 'yyyy-MM-dd'),
    'dateFrom'
  );
  const [dateTo, setDateTo] = useTableLocalStorage<string | null>(
    format(new Date(), 'yyyy-MM-dd'),
    'dateTo'
  );
  const [selectedType, setSelectedType] = useTableLocalStorage<string>('currentMonth', 'dateType');

  const { actions, status } = useUniversalTable({
    initialSorting: [{ columnName: 'facility.id', direction: 'desc' }]
  });

  const { data, loading: loadingData } = useQuery<
    { reportSalesPerformanceAdmin: IReportSalesPerformances },
    IQueryReportSalesPerformanceAdminArgs
  >(REPORT_SALES_PERFORMANCE_ADMIN, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'role',
            operation: FilterOperationEnum.NotEqual,
            type: FilterFieldTypeEnum.Text,
            value: [FacilityRoleEnum.Buyer]
          },
          ...reactGridMapFilters(status.filters)
        ],
        sorts: reactGridMapSortings(status.sorting),
        paginate: {
          skip: status.pageSize * status.currentPage,
          take: status.pageSize
        },
        startDate: dateFrom,
        endDate: dateTo
      }
    },
    onCompleted(data) {
      actions.setTotal(data.reportSalesPerformanceAdmin?.meta.total);
    }
  });

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);
  const refetchWithCache = useRefetchWithCache(['reportSalesPerformanceAdmin']);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'facility.displayName', name: 'facility.displayName', title: 'Facility' },
      { id: 'facility.role', name: 'facility.role', title: 'Role' },
      {
        id: 'totalRevenue',
        name: 'totalRevenue',
        title: 'Revenue'
      },
      {
        id: 'quantityProductRevenue',
        name: 'quantityProductRevenue',
        title: 'QTY Sold'
      },
      {
        id: 'avgPriceCultivator',
        name: 'avgPriceCultivator',
        title: 'Avg. Transaction'
      },
      {
        id: 'avgPricePoundCultivator',
        name: 'avgPricePoundCultivator',
        title: 'Avg. Price/Pound'
      },
      {
        id: 'avgPoundsOrderCultivator',
        name: 'avgPoundsOrderCultivator',
        title: 'Avg. Pounds/Order'
      },
      {
        id: 'totalListed',
        name: 'totalListed',
        title: 'Total Listed'
      },
      {
        id: 'totalMetrc',
        name: 'totalMetrc',
        title: 'Total METRC'
      },
      {
        id: 'percentListed',
        name: 'percentListed',
        title: 'Listed %'
      }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const dataUm = useMemo(() => {
    return (data?.reportSalesPerformanceAdmin?.items || []).map((item) => {
      return {
        id: item.facility.id,
        ...item
      };
    });
  }, [data?.reportSalesPerformanceAdmin?.items]);

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props.row?.facility?.asset?.url}
              name={props.row?.facility?.displayName}
            />
          )}
          editorComponent={TextEditor}
          for={['facility.displayName']}
        />
        <DataTypeProvider
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={usersRoles}
            />
          )}
          for={['facility.role']}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingFacilitiesRole(params?.row?.facility.role)} />
          )}
        />
        <DataTypeProvider
          editorComponent={({ value, onValueChange }) => (
            <NumberRangeEditor value={value} onValueChange={onValueChange} />
          )}
          formatterComponent={PriceFormatter}
          for={['avgPricePoundCultivator', 'totalRevenue', 'avgPriceCultivator']}
        />
        <DataTypeProvider
          editorComponent={NumberEditor}
          formatterComponent={UnitFormatter}
          for={['quantityProductRevenue', 'avgPoundsOrderCultivator', 'totalListed', 'totalMetrc']}
        />
        <DataTypeProvider
          editorComponent={NumberEditor}
          formatterComponent={PercentFormatter}
          for={['percentListed']}
        />
      </Plugin>
    );
  }, []);

  const optionsUm = useMemo(() => {
    return [
      {
        label: 'Cultivators Insights',
        value: 'Cultivators Insights',
        disabled: false,
        onClick: () => goTo(Routes.ADMIN_REPORTS_CULTIVATOR_INSIGHTS)
      },
      {
        label: 'Buyers Insights',
        value: 'Buyers Insights',
        disabled: false,
        onClick: () => goTo(Routes.ADMIN_REPORTS_BUYERS_INSIGHTS)
      },
      {
        label: 'Inventory Management',
        value: 'Inventory Management',
        disabled: true,
        onClick: () => console.log('3')
      },
      {
        label: 'Harvest Analytics',
        value: 'Harvest Analytics',
        disabled: true,
        onClick: () => console.log('3')
      }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={dataUm}
        totalCount={status.total}
        isLoading={loadingData}
        columns={columnsUm}
        columnExtensions={columnExtensions}
        sorting={status.sorting}
        setSorting={actions.setSorting}
        filters={status.filters}
        setFilters={actions.setFilters}
        setPageSize={actions.setPageSize}
        setCurrentPage={actions.setCurrentPage}
        pageSizes={status.pageSizes}
        pageSize={status.pageSize}
        currentPage={status.currentPage}
        setSelection={actions.setSelection}
        selection={status.selection}
        expandedRowIds={expandedRowIds}
        setExpandedRowIds={setExpandedRowIds}
        onRowClick={(id) => goToModal({ id: id })}
        fixedColumns={['facility.displayName']}
        menuElement={
          <>
            <Box sx={styles.options}>
              <HeaderSelect options={optionsUm} initialOption="Cultivators Insights" />
              <DateSelector
                dateFrom={dateFrom}
                setDateFrom={setDateFrom}
                dateTo={dateTo}
                setDateTo={setDateTo}
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                hideInSmallWidth
              />
            </Box>

            <Box flexGrow={1} />

            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'admin-cultivatorInsights'}
      >
        {pluginsUm}
      </UniversalTable>
      <SidebarBottom isOpen={Boolean(id)} close={clearQuery} isFullwidth>
        <AdminCultivatorsInsightsDetailsWrapper
          id={id}
          close={clearQuery}
          dateFrom={dateFrom}
          dateTo={dateTo}
        />
      </SidebarBottom>
    </Box>
  );
};

export default AdminCultivatorsInsights;
