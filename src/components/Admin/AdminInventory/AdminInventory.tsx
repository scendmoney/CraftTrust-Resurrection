import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { IProductsModel, IQueryProductsAdminArgs } from 'graphql/_server';
import { PRODUCTS_ADMIN_INVENTORY } from 'graphql/queries/productsAdmin';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import HeaderTabs from 'sharedProject/components/UniversalTable/HeaderTabs/HeaderTabs';
import AvatarNameFormatter from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter/AvatarNameFormatter';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import { NumberFormatter } from 'sharedProject/components/UniversalTable/providers/NumberFormatter/NumberFormatter';
import { NumberRangeEditor } from 'sharedProject/components/UniversalTable/providers/NumberRangeEditor/NumberRangeEditor';
import { PriceFormatter } from 'sharedProject/components/UniversalTable/providers/PriceFormatter/PriceFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import { UnitFormatter } from 'sharedProject/components/UniversalTable/providers/UnitFormatter/UnitFormatter';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import mappingInventoryStatus from 'sharedProject/utils/mappingInventoryStatus';
import { labTestStatuses, mappingLabTestStatus } from 'sharedProject/utils/mappingLabTestStatus';

import Loader from 'components/Loader/Loader';

import AdminInventoryProductWrapper from './AdminInventoryProduct/AdminInventoryProductWrapper';
import mappingInventoryStatusRevers from './mappingInventoryStatusRevers';
import { inventoryStatuses } from './selectEnumOptions';

const AdminInventory: FC = () => {
  const { id, clearQuery, goToModal } = useProjectRouter();
  const { actions, status } = useUniversalTable({});

  const { data, loading: loadingData } = useQuery<
    { productsAdmin: IProductsModel },
    IQueryProductsAdminArgs
  >(PRODUCTS_ADMIN_INVENTORY, {
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
  });

  useEffect(() => {
    if (data?.productsAdmin.items) {
      actions.setRows(data?.productsAdmin.items);
      actions.setTotal(data.productsAdmin.meta.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.productsAdmin.items, data?.productsAdmin.meta.total]);
  const refetchWithCache = useRefetchWithCache(['productsAdmin']);
  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'item.name', name: 'item.name', title: 'Name' },
      { id: 'status', name: 'status', title: 'Status' },
      { id: 'facility.displayName', name: 'facility.displayName', title: 'Facility' },
      { id: 'packagedDate', name: 'packagedDate', title: 'Harvest' },
      { id: 'labTestingState', name: 'labTestingState', title: 'Lab Test Status' },
      { id: 'price', name: 'price', title: 'Price' },
      { id: 'quantity', name: 'quantity', title: 'In Metrc' },
      { id: 'quantityStock', name: 'quantityStock', title: 'In Stock' },
      { id: 'quantityStockMin', name: 'quantityStockMin', title: 'Min Qty' },
      { id: 'orderResolve.id', name: 'orderResolve.id', title: 'Order' },
      { id: 'id', name: 'id', title: 'Package ID' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [{ columnName: 'item.name' }];

  const [tab, setTab] = useState<string>('All Products');

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          formatterComponent={AvatarNameFormatter}
          editorComponent={TextEditor}
          for={['item.name']}
        />
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props?.row?.facility?.asset?.url}
              name={props?.row?.facility?.displayName || props?.row?.facility?.name}
              avatarSize={24}
            />
          )}
          editorComponent={TextEditor}
          for={['facility.displayName']}
        />
        <DataTypeProvider
          editorComponent={NumberEditor}
          formatterComponent={NumberFormatter}
          for={['id', 'sold']}
        />
        <DataTypeProvider
          editorComponent={HiddenEditor}
          formatterComponent={(params) => (
            <TextFormatterValue value={params?.row?.orderResolve?.id} addHashtag />
          )}
          for={['orderResolve.id']}
        />
        <DataTypeProvider
          editorComponent={({ value, onValueChange }) => (
            <NumberRangeEditor value={value} onValueChange={onValueChange} />
          )}
          formatterComponent={PriceFormatter}
          for={['price']}
        />

        <DataTypeProvider
          editorComponent={HiddenEditor}
          formatterComponent={UnitFormatter}
          for={['quantity', 'quantityStock', 'quantityStockMin']}
        />

        <DataTypeProvider
          editorComponent={
            tab === 'All Products'
              ? (params) => (
                  <SelectEditor
                    value={params.value}
                    onValueChange={params.onValueChange}
                    statuses={inventoryStatuses}
                  />
                )
              : HiddenEditor
          }
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingInventoryStatus(params?.row?.status)} />
          )}
          for={['status']}
        />
        <DataTypeProvider
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={labTestStatuses}
            />
          )}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingLabTestStatus(params?.row?.labTestingState)} />
          )}
          for={['labTestingState']}
        />
        <DataTypeProvider
          formatterComponent={DateFormatter}
          editorComponent={DateEditor}
          for={['packagedDate']}
        />
      </Plugin>
    );
  }, [tab]);

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.productsAdmin?.items || []}
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
        fixedColumns={['item.name']}
        menuElement={
          <>
            <HeaderTabs
              tabs={['All Products', 'New', 'Unlisted', 'Listed', 'Archived']}
              tab={tab}
              setTab={handleSetTab}
            />
            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'admin-inventory'}
      >
        {pluginsUm}
      </UniversalTable>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery} isFullwidth>
        <AdminInventoryProductWrapper />
      </SidebarBottom>
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);

    if (newTab === 'All Products') {
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
            value: mappingInventoryStatusRevers(newTab)
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

export default AdminInventory;
