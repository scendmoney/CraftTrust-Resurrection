import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { IFacilitiesDto, IQueryBuyersArgs } from 'graphql/_server';
import BUYERS from 'graphql/queries/buyers';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import Routes from 'routes';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import HeaderTabs from 'sharedProject/components/UniversalTable/HeaderTabs/HeaderTabs';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import { NumberRangeEditor } from 'sharedProject/components/UniversalTable/providers/NumberRangeEditor/NumberRangeEditor';
import { PriceFormatterValue } from 'sharedProject/components/UniversalTable/providers/PriceFormatterValue/PriceFormatterValue';
import SelectEditorBoolean from 'sharedProject/components/UniversalTable/providers/SelectEditorBoolean/SelectEditorBoolean';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import CultivatorBuyerProfile from './CultivatorBuyerProfile/CultivatorBuyerProfile';
import MenuFormatter from './providers/MenuFormatter/MenuFormatter';
import { netStatus } from './selectEnumOptions';

const CultivatorBuyers: FC = () => {
  const { id, clearQuery, goToModal, goTo } = useProjectRouter();
  const { actions, status } = useUniversalTable({});

  const { data, loading: loadingData } = useQuery<{ buyers: IFacilitiesDto }, IQueryBuyersArgs>(
    BUYERS,
    {
      variables: {
        payload: {
          filters: reactGridMapFilters(status.filters, true),
          sorts: reactGridMapSortings(status.sorting),
          paginate: {
            skip: status.pageSize * status.currentPage,
            take: status.pageSize
          }
        }
      }
    }
  );

  useEffect(() => {
    if (data?.buyers.items) {
      actions.setRows(data.buyers.items);
      actions.setTotal(data.buyers.meta.total);
    }
  }, [actions, data?.buyers.items, data?.buyers.meta.total]);
  const refetchWithCache = useRefetchWithCache(['buyers']);
  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'name', name: 'name', title: 'Name' },
      {
        id: 'facilityCultivatorRelations.orderTotalSpend',
        name: 'facilityCultivatorRelations.orderTotalSpend',
        title: 'Total Spend'
      },
      {
        id: 'facilityCultivatorRelations.isNetActivated',
        name: 'facilityCultivatorRelations.isNetActivated',
        title: 'Terms'
      },
      {
        id: 'facilityCultivatorRelations.netBalance',
        name: 'facilityCultivatorRelations.netBalance',
        title: 'Balance'
      },
      {
        id: 'facilityCultivatorRelations.dueBalance',
        name: 'facilityCultivatorRelations.dueBalance',
        title: 'Due'
      },
      {
        id: 'facilityCultivatorRelations.totalOrders',
        name: 'facilityCultivatorRelations.totalOrders',
        title: 'Total Orders'
      },
      {
        id: 'facilityCultivatorRelations.lastOrderDate',
        name: 'facilityCultivatorRelations.lastOrderDate',
        title: 'Last Order'
      },
      {
        id: 'facilityCultivatorRelations.dates.createdDate',
        name: 'facilityCultivatorRelations.dates.createdDate',
        title: 'Joined'
      },
      {
        id: 'facilityCultivatorRelations.avgPurchase',
        name: 'facilityCultivatorRelations.avgPurchase',
        title: 'AVG. Purch.'
      }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const [tab, setTab] = useState<string>('Buyers');

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.buyers?.items || []}
        totalCount={status.total}
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
        onRowClick={(id) => goToModal({ id: id })}
        fixedColumns={['name']}
        menuElement={
          <>
            <HeaderTabs tabs={['Buyers', 'Invitations']} tab={tab} setTab={handleSetTab} />

            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'cultivatorsBuyers'}
      >
        <Plugin>
          <DataTypeProvider
            formatterComponent={(props) => (
              <AvatarNameFormatter3
                url={props.row?.asset?.url}
                name={props.value}
                isOnline={props.row?.isOnline}
              >
                <MenuFormatter
                  rowId={props.row.id}
                  rowName={props.row.displayName || props.row.name}
                />
              </AvatarNameFormatter3>
            )}
            editorComponent={TextEditor}
            for={['name']}
          />
          <DataTypeProvider
            editorComponent={({ value, onValueChange }) => (
              <NumberRangeEditor value={value} onValueChange={onValueChange} />
            )}
            formatterComponent={(props) => (
              <PriceFormatterValue
                value={
                  props.row.facilityCultivatorRelations[0].isNetActivated
                    ? props.row.facilityCultivatorRelations[0].netBalance
                    : '--'
                }
              />
            )}
            for={['facilityCultivatorRelations.netBalance']}
          />
          <DataTypeProvider
            editorComponent={({ value, onValueChange }) => (
              <NumberRangeEditor value={value} onValueChange={onValueChange} />
            )}
            formatterComponent={(props) => (
              <PriceFormatterValue
                value={props.row.facilityCultivatorRelations[0].orderTotalSpend}
              />
            )}
            for={['facilityCultivatorRelations.orderTotalSpend']}
          />
          <DataTypeProvider
            editorComponent={({ value, onValueChange }) => (
              <NumberRangeEditor value={value} onValueChange={onValueChange} />
            )}
            formatterComponent={(props) => (
              <PriceFormatterValue
                value={
                  props.row.facilityCultivatorRelations[0].isNetActivated
                    ? props.row.facilityCultivatorRelations[0].dueBalance
                    : '--'
                }
              />
            )}
            for={['facilityCultivatorRelations.dueBalance']}
          />
          <DataTypeProvider
            editorComponent={({ value, onValueChange }) => (
              <NumberRangeEditor value={value} onValueChange={onValueChange} />
            )}
            formatterComponent={(props) => (
              <PriceFormatterValue value={props.row.facilityCultivatorRelations[0].avgPurchase} />
            )}
            for={['facilityCultivatorRelations.avgPurchase']}
          />
          <DataTypeProvider
            // editorComponent={HiddenEditor}
            editorComponent={(params) => (
              <SelectEditorBoolean
                value={params.value}
                onValueChange={params.onValueChange}
                statuses={netStatus}
              />
            )}
            formatterComponent={(props) => (
              <TextFormatterValue
                value={
                  props.row.facilityCultivatorRelations[0].isNetActivated
                    ? `Net ${props.row.facilityCultivatorRelations[0].netDays}`
                    : '--'
                }
              />
            )}
            for={['facilityCultivatorRelations.isNetActivated']}
          />
          <DataTypeProvider
            editorComponent={TextEditor}
            formatterComponent={(props) => (
              <TextFormatterValue value={props.row.facilityCultivatorRelations[0].totalOrders} />
            )}
            for={['facilityCultivatorRelations.totalOrders']}
          />
          <DataTypeProvider
            formatterComponent={(props) => {
              return (
                <DateFormatter value={props.row.facilityCultivatorRelations[0].dates.createdDate} />
              );
            }}
            editorComponent={DateEditor}
            for={['facilityCultivatorRelations.dates.createdDate']}
          />
          <DataTypeProvider
            formatterComponent={(props) => {
              return (
                <DateFormatter value={props.row.facilityCultivatorRelations[0].lastOrderDate} />
              );
            }}
            editorComponent={DateEditor}
            for={['facilityCultivatorRelations.lastOrderDate']}
          />
        </Plugin>
      </UniversalTable>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery} isFullwidth>
        <CultivatorBuyerProfile id={id} close={clearQuery} />
      </SidebarBottom>
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);
    if (newTab === 'Invitations') {
      goTo(Routes.CULTIVATOR_BUYERS_INVITES);
    }
  }
};

export default CultivatorBuyers;
