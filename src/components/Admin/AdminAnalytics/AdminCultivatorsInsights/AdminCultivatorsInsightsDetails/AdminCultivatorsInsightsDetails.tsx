import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import { Box, Divider, Typography } from '@mui/material';
import {
  IQueryReportSalesPerformanceByBuyerAdminArgs,
  IReportSalesPerformances
} from 'graphql/_server';
import REPORT_SALES_PERFORMANCE_BY_CULTIVATOR_ADMIN from 'graphql/queries/reportSalesPerformanceByCultivatorAdmin';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import { NumberFormatter } from 'sharedProject/components/UniversalTable/providers/NumberFormatter/NumberFormatter';
import { NumberRangeEditor } from 'sharedProject/components/UniversalTable/providers/NumberRangeEditor/NumberRangeEditor';
import { PriceFormatter } from 'sharedProject/components/UniversalTable/providers/PriceFormatter/PriceFormatter';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { UnitFormatter } from 'sharedProject/components/UniversalTable/providers/UnitFormatter/UnitFormatter';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';

import Loader from 'components/Loader/Loader';

import styles from './styles';

const AdminCultivatorsInsightsDetails: FC<{
  id?: string;
  dateFrom: string | null;
  dateTo: string | null;
}> = ({ id, dateFrom, dateTo }) => {
  const { actions, status } = useUniversalTable({
    initialSorting: [{ columnName: 'facility.id', direction: 'desc' }]
  });

  const { data, loading: loadingData } = useQuery<
    { reportSalesPerformanceByCultivatorAdmin: IReportSalesPerformances },
    IQueryReportSalesPerformanceByBuyerAdminArgs
  >(REPORT_SALES_PERFORMANCE_BY_CULTIVATOR_ADMIN, {
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
      actions.setTotal(data.reportSalesPerformanceByCultivatorAdmin?.meta.total);
    }
  });

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const dataUm = useMemo(() => {
    return (data?.reportSalesPerformanceByCultivatorAdmin?.items || []).map((item) => {
      return {
        id: item.facility.id,
        ...item
      };
    });
  }, [data?.reportSalesPerformanceByCultivatorAdmin?.items]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'facility.displayName', name: 'facility.displayName', title: 'Facility' },
      {
        id: 'totalPurchased',
        name: 'totalPurchased',
        title: 'Spent'
      },
      {
        id: 'quantityProductPurchased',
        name: 'quantityProductPurchased',
        title: 'QTY Purchased'
      },
      {
        id: 'purchases',
        name: 'purchases',
        title: 'Purchases'
      },
      {
        id: 'avgPriceBuyer',
        name: 'avgPriceBuyer',
        title: 'avg. Transaction'
      },
      {
        id: 'avgPricePoundBuyer',
        name: 'avgPricePoundBuyer',
        title: 'avg. Price/Pound'
      },
      { id: 'avgPoundsOrderBuyer', name: 'avgPoundsOrderBuyer', title: 'avg. Pounds/Order' }
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
          for={['avgPricePoundBuyer', 'totalPurchased', 'avgPriceBuyer']}
        />
        <DataTypeProvider
          editorComponent={NumberEditor}
          formatterComponent={UnitFormatter}
          for={['quantityProductPurchased', 'avgPoundsOrderBuyer']}
        />
        <DataTypeProvider
          editorComponent={NumberEditor}
          formatterComponent={NumberFormatter}
          for={['purchases']}
        />
      </Plugin>
    );
  }, []);

  return (
    <Box sx={styles.tableWrapper}>
      <Typography variant="h4" fontWeight={500}>
        Buyers
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
        tableId={'admin-cultivatorsInsightsDetails'}
        fixedColumns={['facility.displayName']}
      >
        {pluginsUm}
      </UniversalTable>
    </Box>
  );
};

export default AdminCultivatorsInsightsDetails;
