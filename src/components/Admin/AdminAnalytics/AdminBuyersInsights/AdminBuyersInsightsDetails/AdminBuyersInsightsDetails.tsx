import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import { Box, Divider, Typography } from '@mui/material';
import {
  IQueryReportSalesPerformanceByBuyerAdminArgs,
  IReportSalesPerformances
} from 'graphql/_server';
import REPORT_SALES_PERFORMANCE_BY_BUYER_ADMIN from 'graphql/queries/reportSalesPerformanceByBuyerAdmin';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import { NumberRangeEditor } from 'sharedProject/components/UniversalTable/providers/NumberRangeEditor/NumberRangeEditor';
import { PercentFormatter } from 'sharedProject/components/UniversalTable/providers/PercentFormatter/PercentFormatter';
import { PriceFormatter } from 'sharedProject/components/UniversalTable/providers/PriceFormatter/PriceFormatter';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { UnitFormatter } from 'sharedProject/components/UniversalTable/providers/UnitFormatter/UnitFormatter';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';

import Loader from 'components/Loader/Loader';

import styles from './styles';

const AdminBuyersInsightsDetails: FC<{
  id?: string;
  dateFrom: string | null;
  dateTo: string | null;
}> = ({ id, dateFrom, dateTo }) => {
  const { actions, status } = useUniversalTable({
    initialSorting: [{ columnName: 'facility.id', direction: 'desc' }]
  });

  const { data, loading: loadingData } = useQuery<
    { reportSalesPerformanceByBuyerAdmin: IReportSalesPerformances },
    IQueryReportSalesPerformanceByBuyerAdminArgs
  >(REPORT_SALES_PERFORMANCE_BY_BUYER_ADMIN, {
    variables: {
      payload: {
        filters: reactGridMapFilters(status.filters),
        sorts: reactGridMapSortings(status.sorting),
        paginate: {
          skip: status.pageSize * status.currentPage,
          take: status.pageSize
        },
        startDate: dateFrom,
        endDate: dateTo
      },
      facilityId: String(id)
    },
    onCompleted(data) {
      actions.setTotal(data.reportSalesPerformanceByBuyerAdmin?.meta.total);
    }
  });

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const dataUm = useMemo(() => {
    return (data?.reportSalesPerformanceByBuyerAdmin?.items || []).map((item) => {
      return {
        id: item.facility.id,
        ...item
      };
    });
  }, [data?.reportSalesPerformanceByBuyerAdmin?.items]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'facility.displayName', name: 'facility.displayName', title: ' Cultivator Facility' },
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
        title: 'avg. Transaction'
      },
      {
        id: 'avgPricePoundCultivator ',
        name: 'avgPricePoundCultivator',
        title: 'avg. Price/Pound'
      },
      {
        id: 'avgPoundsOrderCultivator',
        name: 'avgPoundsOrderCultivator',
        title: 'avg. Pounds/Order'
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

  return (
    <Box sx={styles.tableWrapper}>
      <Typography variant="h4" fontWeight={500}>
        Cultivators
      </Typography>
      <Divider />
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
        isHideToolbar
        isHideLeftPadding
        height="70vh"
        tableId={'admin-buyersInsightsDetails'}
        fixedColumns={['facility.displayName']}
      >
        {pluginsUm}
      </UniversalTable>
    </Box>
  );
};

export default AdminBuyersInsightsDetails;
