import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQueryUsersArgs,
  IUsersModelDto
} from 'graphql/_server';
import USERS from 'graphql/queries/users';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
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
import FacilitiesFormatter from 'sharedProject/components/UniversalTable/providers/FacilitiesFormatter/FacilitiesFormatter';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import AdminUserProfile from './AdminUserProfile/AdminUserProfile';

const AdminUsers: FC = () => {
  const { id, clearQuery, goToModal } = useProjectRouter();
  const { actions, status } = useUniversalTable({});
  const refetchWithCache = useRefetchWithCache(['users']);

  const { data, loading: loadingData } = useQuery<{ users: IUsersModelDto }, IQueryUsersArgs>(
    USERS,
    {
      variables: {
        payload: {
          filters: [
            {
              columnName: 'role',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Text,
              value: ['user']
            },
            ...reactGridMapFilters(status.filters, true)
          ],
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
    if (data?.users.items) {
      actions.setTotal(data.users.meta.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.users.meta.total]);

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'fullName', name: 'fullName', title: 'User Name' },
      { id: 'license.licenseNumber', name: 'license.licenseNumber', title: 'License #' },
      { id: 'license.licenseEndDate', name: 'license.licenseEndDate', title: 'Valid By' },
      { id: 'email', name: 'email', title: 'Email' },
      {
        id: 'userToFacilities.displayName',
        name: 'userToFacilities.displayName',
        title: 'Facilities'
      },
      { id: 'phoneNumber', name: 'phoneNumber', title: 'Phone #' },
      { id: 'dates.createdDate', name: 'dates.createdDate', title: 'Joined' },
      { id: 'id', name: 'id', title: 'Id' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const [tab, setTab] = useState<string>('All Users');

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3 url={props?.row?.asset?.url} name={props.value} />
          )}
          editorComponent={TextEditor}
          for={['fullName']}
        />
        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={TextFormatter}
          for={['id', 'phoneNumber', 'email']}
        />

        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={(params) => (
            <TextFormatterValue value={params?.row?.license?.licenseNumber} />
          )}
          for={['license.licenseNumber']}
        />

        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.row.license.licenseEndDate} />;
          }}
          editorComponent={DateEditor}
          for={['license.licenseEndDate']}
        />
        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.row.dates.createdDate} />;
          }}
          editorComponent={DateEditor}
          for={['dates.createdDate']}
        />
        <DataTypeProvider
          formatterComponent={(props) => (
            <FacilitiesFormatter facilities={props.row?.userToFacilities} userId={props.row?.id} />
          )}
          editorComponent={TextEditor}
          for={['userToFacilities.displayName']}
        />
      </Plugin>
    );
  }, []);

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.users?.items || []}
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
        fixedColumns={['fullName']}
        menuElement={
          <>
            <HeaderTabs tabs={['All Users']} tab={tab} setTab={handleSetTab} />
            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'users'}
      >
        {pluginsUm}
      </UniversalTable>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery}>
        <AdminUserProfile id={id} close={clearQuery} />
      </SidebarBottom>
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);
  }
};

export default AdminUsers;
