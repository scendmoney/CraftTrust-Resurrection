import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { IOrdersDto, IQueryOrdersArgs } from 'graphql/_server';
import { ORDERS } from 'graphql/queries/orders';
import { useRouter } from 'next/router';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import nextRouterQueryCheckText from 'sharedArchitech/utils/nextRouterQueryCheckText';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import HeaderTabs from 'sharedProject/components/UniversalTable/HeaderTabs/HeaderTabs';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import { NumberRangeEditor } from 'sharedProject/components/UniversalTable/providers/NumberRangeEditor/NumberRangeEditor';
import OrderIdFormatter from 'sharedProject/components/UniversalTable/providers/OrderIdFormatter/OrderIdFormatter';
import { PriceFormatter } from 'sharedProject/components/UniversalTable/providers/PriceFormatter/PriceFormatter';
import { PriceFormatterValue } from 'sharedProject/components/UniversalTable/providers/PriceFormatterValue/PriceFormatterValue';
import ProductsFormatter from 'sharedProject/components/UniversalTable/providers/ProductsFormatter/ProductsFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import { mappingOrderStatus, orderStatuses } from 'sharedProject/utils/mappingOrderStatus';
import mappingPaymentStatus from 'sharedProject/utils/mappingPaymentStatus';
import mappingPaymentType from 'sharedProject/utils/mappingPaymentType';

import Loader from 'components/Loader/Loader';

import CultivatorOrder from './CultivatorOrder/CultivatorOrder';
import { orderPaymentStatuses, orderPaymentTypes } from './selectEnumOptions';

const CultivatorOrders: FC = () => {
  const { id, clearQuery } = useProjectRouter();
  const router = useRouter();
  const facilityBuyerId = nextRouterQueryCheckText(router?.query?.buyerId);

  const { actions, status } = useUniversalTable({
    initialFilters: facilityBuyerId
      ? [
          {
            columnName: 'facilityBuyer.id',
            value: facilityBuyerId
          }
        ]
      : undefined
  });

  const { data, loading: loadingData } = useQuery<{ orders: IOrdersDto }, IQueryOrdersArgs>(
    ORDERS,
    {
      variables: {
        payload: {
          isCultivator: true,
          filters: reactGridMapFilters(status.filters),
          sorts: reactGridMapSortings(status.sorting),
          paginate: {
            skip: status.pageSize * status.currentPage,
            take: status.pageSize
          }
        }
      }
      // fetchPolicy: 'no-cache'
    }
  );

  useEffect(() => {
    if (data?.orders.items) {
      actions.setRows(data?.orders.items);
      actions.setTotal(data.orders.meta.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.orders.items, data?.orders.meta.total]);
  const refetchWithCache = useRefetchWithCache(['orders']);
  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'id', name: 'id', title: 'Order #' },
      { id: 'facilityBuyer.displayName', name: 'facilityBuyer.displayName', title: 'Client' },
      { id: 'facilityBuyer.id', name: 'facilityBuyer.id', title: 'Client #' },
      { id: 'products', name: 'products', title: 'Product' },

      { id: 'totalCultivator', name: 'totalCultivator', title: 'Price' },
      { id: 'fee.feeCultivator', name: 'fee.feeCultivator', title: 'Fee' },
      { id: 'paymentType', name: 'paymentType', title: 'Payment Terms' },
      { id: 'paymentStatus', name: 'paymentStatus', title: 'Payment Status' },
      { id: 'paymentDate', name: 'paymentDate', title: 'Payment Date' },
      { id: 'status', name: 'status', title: 'Status' },
      { id: 'dates.createdDate', name: 'dates.createdDate', title: 'Created' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const [tab, setTab] = useState<string>('All Orders');

  const { goToModal } = useProjectRouter();

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props?.row?.facilityBuyer?.asset?.url}
              name={props?.row?.facilityBuyer?.displayName}
              avatarSize={24}
            />
          )}
          editorComponent={TextEditor}
          for={['facilityBuyer.displayName']}
        />
        <DataTypeProvider
          formatterComponent={(props) => (
            <TextFormatterValue value={props?.row?.facilityBuyer?.id} />
          )}
          editorComponent={TextEditor}
          for={['facilityBuyer.id']}
        />
        <DataTypeProvider
          formatterComponent={(props) => <ProductsFormatter products={props.row?.products || []} />}
          editorComponent={HiddenEditor}
          for={['products']}
        />
        <DataTypeProvider
          editorComponent={NumberEditor}
          formatterComponent={(params) => (
            <OrderIdFormatter status={params.row?.status} id={params.row?.id} />
          )}
          for={['id']}
        />

        <DataTypeProvider
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={orderStatuses}
            />
          )}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingOrderStatus(params?.row?.status)} />
          )}
          for={['status']}
        />

        <DataTypeProvider
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={orderPaymentTypes}
            />
          )}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingPaymentType(params?.row?.paymentType)} />
          )}
          for={['paymentType']}
        />

        <DataTypeProvider
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={orderPaymentStatuses}
            />
          )}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingPaymentStatus(params?.row?.paymentStatus)} />
          )}
          for={['paymentStatus']}
        />

        <DataTypeProvider
          editorComponent={({ value, onValueChange }) => (
            <NumberRangeEditor value={value} onValueChange={onValueChange} />
          )}
          formatterComponent={PriceFormatter}
          for={['totalCultivator']}
        />
        <DataTypeProvider
          editorComponent={({ value, onValueChange }) => (
            <NumberRangeEditor value={value} onValueChange={onValueChange} />
          )}
          formatterComponent={(props) => (
            <PriceFormatterValue
              value={props.row.fee.feeCultivator ? props.row.fee.feeCultivator : '--'}
            />
          )}
          for={['fee.feeCultivator']}
        />
        <DataTypeProvider
          formatterComponent={(props) => <DateFormatter value={props?.row?.dates?.createdDate} />}
          editorComponent={(props) => (
            <DateEditor value={props.value} onValueChange={props.onValueChange} />
          )}
          for={['dates.createdDate']}
        />
        <DataTypeProvider
          formatterComponent={(props) => <DateFormatter value={props?.row?.paymentDate} />}
          editorComponent={(props) => (
            <DateEditor value={props.value} onValueChange={props.onValueChange} />
          )}
          for={['paymentDate']}
        />
      </Plugin>
    );
  }, []);

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.orders?.items || []}
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
        initialHiddenColumnNames={['facilityBuyer.id', 'paymentType', 'paymentDate']}
        menuElement={
          <>
            <HeaderTabs tabs={['All Orders']} tab={tab} setTab={handleSetTab} />
            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'orders'}
      >
        {pluginsUm}
      </UniversalTable>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery} isFullwidth>
        {id ? <CultivatorOrder id={id} close={clearQuery} /> : <></>}
      </SidebarBottom>
    </Box>
  );

  function handleGoToId(id: string | number) {
    goToModal({
      id: id
    });
  }

  function handleSetTab(newTab: string) {
    setTab(newTab);
  }
};

export default CultivatorOrders;
