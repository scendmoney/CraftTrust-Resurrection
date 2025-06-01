import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { IQueryTransactionsArgs, ITransactionsModel } from 'graphql/_server';
import TRANSACTIONS from 'graphql/queries/transactions';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import HeaderTabs from 'sharedProject/components/UniversalTable/HeaderTabs/HeaderTabs';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import FacilityFormatter from 'sharedProject/components/UniversalTable/providers/FacilityFormatter/FacilityFormatter';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import { NumberFormatter } from 'sharedProject/components/UniversalTable/providers/NumberFormatter/NumberFormatter';
import { NumberRangeEditor } from 'sharedProject/components/UniversalTable/providers/NumberRangeEditor/NumberRangeEditor';
import { PriceCaratsFormatter } from 'sharedProject/components/UniversalTable/providers/PriceCaratsFormatter/PriceCaratsFormatter';
import { PriceFormatter } from 'sharedProject/components/UniversalTable/providers/PriceFormatter/PriceFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import {
  mappingTransactionStatus,
  mappingTransactionStatusReversed,
  transactionsStatuses
} from 'sharedProject/utils/mappingTransactionStatus';
import {
  mappingTransactionTypes,
  transactionsTypes
} from 'sharedProject/utils/mappingTransactionTypes';

import Loader from 'components/Loader/Loader';

import ClientTransactionDetails from './ClientTransactionDetails/ClientTransactionDetails';
import styles from './styles';

const ClientTransactions: FC = () => {
  const { id, clearQuery, goToModal } = useProjectRouter();
  const { actions, status } = useUniversalTable({});

  const { data, loading: loadingData } = useQuery<
    { transactions: ITransactionsModel },
    IQueryTransactionsArgs
  >(TRANSACTIONS, {
    variables: {
      payload: {
        filters: reactGridMapFilters(status.filters),
        sorts: reactGridMapSortings(status.sorting),
        paginate: {
          skip: status.pageSize * status.currentPage,
          take: status.pageSize
        }
      }
    }
    // fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (data?.transactions.items) {
      actions.setRows(data?.transactions.items);
      actions.setTotal(data.transactions.meta.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.transactions.items, data?.transactions.meta.total]);

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'id', name: 'id', title: 'ID' },
      { id: 'status', name: 'status', title: 'Status' },
      { id: 'type', name: 'type', title: 'Type' },

      { id: 'amountUsd', name: 'amountUsd', title: 'Amount Usd' },
      { id: 'amount', name: 'amount', title: 'Amount' },

      { id: 'facilityFrom.displayName', name: 'facilityFrom.displayName', title: 'FROM' },
      { id: 'facilityTo.displayName', name: 'facilityTo.displayName', title: 'TO' },

      { id: 'order.id', name: 'order.id', title: 'Order' },
      { id: 'dates.createdDate', name: 'dates.createdDate', title: 'Created' },
      { id: 'dates.updatedDate', name: 'dates.updatedDate', title: 'Updated' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const [tab, setTab] = useState<string>('All');
  const refetchWithCache = useRefetchWithCache(['transactions']);

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          editorComponent={NumberEditor}
          formatterComponent={NumberFormatter}
          for={['id']}
        />

        <DataTypeProvider
          formatterComponent={(props) => (
            <TextFormatterValue value={props.row.order?.id} addHashtag />
          )}
          editorComponent={NumberEditor}
          for={['order.id']}
        />
        <DataTypeProvider
          formatterComponent={(props) => <FacilityFormatter facility={props.row?.facilityFrom} />}
          editorComponent={TextEditor}
          for={['facilityFrom.displayName']}
        />
        <DataTypeProvider
          formatterComponent={(props) => <FacilityFormatter facility={props.row?.facilityTo} />}
          editorComponent={TextEditor}
          for={['facilityTo.displayName']}
        />

        <DataTypeProvider
          editorComponent={({ value, onValueChange }) => (
            <NumberRangeEditor value={value} onValueChange={onValueChange} type="price" />
          )}
          formatterComponent={PriceFormatter}
          for={['amountUsd']}
        />

        <DataTypeProvider
          editorComponent={({ value, onValueChange }) => (
            <NumberRangeEditor
              value={value}
              onValueChange={onValueChange}
              suffix=" CARAT"
              type="carat"
            />
          )}
          formatterComponent={PriceCaratsFormatter}
          for={['amount']}
        />

        <DataTypeProvider
          editorComponent={
            tab === 'All'
              ? (params) => (
                  <SelectEditor
                    value={params.value}
                    onValueChange={params.onValueChange}
                    statuses={transactionsStatuses}
                  />
                )
              : HiddenEditor
          }
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingTransactionStatus(params?.row?.status)} />
          )}
          for={['status']}
        />
        <DataTypeProvider
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={transactionsTypes}
            />
          )}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingTransactionTypes(params?.row?.type)} />
          )}
          for={['type']}
        />

        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.row.dates.createdDate} showTime />;
          }}
          editorComponent={DateEditor}
          for={['dates.createdDate']}
        />
        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.row.dates.updatedDate} showTime />;
          }}
          editorComponent={DateEditor}
          for={['dates.updatedDate']}
        />
      </Plugin>
    );
  }, [tab]);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">Transactions</Typography>
      </Box>
      {loadingData && <Loader />}
      <Box sx={styles.tableWrapper}>
        <Box sx={styles.cached}>
          <IconButton onClick={refetchWithCache}>
            <RefetchIcon />
          </IconButton>
        </Box>
        <UniversalTable
          rows={data?.transactions?.items || []}
          totalCount={status.total}
          onRowClick={(id) => handleGoToId(id)}
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
          isLoading={loadingData}
          setSelection={actions.setSelection}
          selection={status.selection}
          expandedRowIds={expandedRowIds}
          setExpandedRowIds={setExpandedRowIds}
          height="100%"
          isHideLeftPadding
          isHideToolbar
          menuElement={
            <>
              <HeaderTabs
                tabs={['All', 'New', 'Processing', 'Done', 'Cancel', 'Error']}
                tab={tab}
                setTab={handleSetTab}
              />
              <IconButton onClick={refetchWithCache}>
                <RefetchIcon />
              </IconButton>
            </>
          }
          tableId={'client-transactions'}
        >
          {pluginsUm}
        </UniversalTable>
      </Box>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery}>
        <ClientTransactionDetails />
      </SidebarBottom>
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);

    if (newTab === 'All') {
      actions.setFilters((oldValue) => {
        return [...oldValue].filter((item) => item.columnName !== 'status');
      });
      return null;
    }

    actions.setFilters((oldValue) => {
      return [
        ...[
          {
            columnName: 'status',
            operation: 'equal',
            value: mappingTransactionStatusReversed(newTab)
          }
        ],
        ...oldValue.filter((item) => item.columnName !== 'status')
      ];
    });
  }

  function handleGoToId(id: string | number) {
    goToModal({
      id: id
    });
  }
};

export default ClientTransactions;
