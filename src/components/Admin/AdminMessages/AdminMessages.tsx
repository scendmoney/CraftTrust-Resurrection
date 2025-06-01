import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQueryRequestsArgs,
  IRequestsDto
} from 'graphql/_server';
import { REQUESTS } from 'graphql/queries/requests';
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
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import StatusRequestIdFormatter from 'sharedProject/components/UniversalTable/providers/StatusRequestIdFormatter/StatusRequestIdFormatter';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import mappingRequestMessageStatus from 'sharedProject/utils/mappingRequestMessageStatus';

import Loader from 'components/Loader/Loader';

import AdminMessage from './AdminMessage/AdminMessage';
import mappingRequestMessageStatusRevers from './mappingRequestMessageStatusRevers';
import { messageStatuses } from './selectEnumOptions';
const AdminMessages: FC = () => {
  const { id, clearQuery, goToModal } = useProjectRouter();
  const { actions, status } = useUniversalTable({});

  const { data, loading: loadingData } = useQuery<{ requests: IRequestsDto }, IQueryRequestsArgs>(
    REQUESTS,
    {
      variables: {
        payload: {
          filters: [
            {
              columnName: 'type',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Text,
              value: ['contactUs']
            },
            ...reactGridMapFilters(status.filters)
          ],
          sorts: reactGridMapSortings(status.sorting),
          paginate: {
            skip: status.pageSize * status.currentPage,
            take: status.pageSize
          }
        }
      }
      // fetchPolicy: 'network-only'
    }
  );

  const refetchWithCache = useRefetchWithCache(['requests']);

  useEffect(() => {
    if (data?.requests.items) {
      actions.setRows(data?.requests.items);
      actions.setTotal(data.requests.meta.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.requests.items, data?.requests.meta.total]);

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'id', name: 'id', title: 'Contact Form Id #' },
      { id: 'status', name: 'status', title: 'Status' },
      { id: 'companyName', name: 'companyName', title: 'Company Name' },
      { id: 'name', name: 'name', title: 'Contact Name' },
      { id: 'email', name: 'email', title: 'Email' },
      { id: 'phone', name: 'phone', title: 'Phone' },
      { id: 'admin.fullName', name: 'admin.fullName', title: 'Assignee' },
      { id: 'dates.createdDate', name: 'dates.createdDate', title: 'Submitted' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const [tab, setTab] = useState<string>('All Contact Forms');

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          editorComponent={NumberEditor}
          formatterComponent={(params) => (
            <StatusRequestIdFormatter status={params.row?.status} id={params.row?.id} isMessages />
          )}
          for={['id']}
        />
        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={TextFormatter}
          for={['phone', 'name', 'companyName', 'email']}
        />
        <DataTypeProvider
          editorComponent={
            tab === 'All Contact Forms'
              ? (params) => (
                  <SelectEditor
                    value={params.value}
                    onValueChange={params.onValueChange}
                    statuses={messageStatuses}
                  />
                )
              : HiddenEditor
          }
          for={['status']}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingRequestMessageStatus(params?.row?.status)} />
          )}
        />
        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={(params) => (
            <TextFormatterValue value={params?.row?.admin?.fullName} />
          )}
          for={['admin.fullName']}
        />
        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.row.dates.createdDate} />;
          }}
          editorComponent={DateEditor}
          for={['dates.createdDate']}
        />
      </Plugin>
    );
  }, [tab]);

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.requests?.items || []}
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
        expandedRowIds={expandedRowIds}
        setExpandedRowIds={setExpandedRowIds}
        onRowClick={(id) => goToModal({ id: id })}
        noDataMessage="No contact forms"
        menuElement={
          <>
            <HeaderTabs tabs={['All Contact Forms', 'Unread']} tab={tab} setTab={handleSetTab} />
            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'messages'}
      >
        {pluginsUm}
      </UniversalTable>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery}>
        <AdminMessage />
      </SidebarBottom>
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);

    if (newTab === 'All Contact Forms') {
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
            value: mappingRequestMessageStatusRevers(newTab)
          }
        ],
        ...oldValue.filter((item) => item.columnName !== 'status')
      ];
    });
  }
};

export default AdminMessages;
