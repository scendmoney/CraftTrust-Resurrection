import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQueryUsersArgs,
  IUsersModelDto,
  UserRoleEnum
} from 'graphql/_server';
import { USERS_ADMINS } from 'graphql/queries/users';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import HeaderTabs from 'sharedProject/components/UniversalTable/HeaderTabs/HeaderTabs';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useMeAdmin from 'sharedProject/hooks/useMeAdmin';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import mappingUserRole from 'sharedProject/utils/mappingUserRole';

import Loader from 'components/Loader/Loader';

import AdminInviteAdmin from './AdminInviteAdmin/AdminInviteAdmin';
import AdminUserProfileWrapper from './AdminUserProfile/AdminUserProfileWrapper';
import { usersRoles } from './selectEnumOptions';

const AdminAdmins: FC = () => {
  const { dataMe } = useMeAdmin();
  const { id, clearQuery, goToModal } = useProjectRouter();
  const { isOpen, openModal, closeModal } = useModalState();
  const { actions, status } = useUniversalTable({});
  const isMobile = useMediaQuery('(max-width:400px)');

  const { data, loading: loadingData } = useQuery<{ users: IUsersModelDto }, IQueryUsersArgs>(
    USERS_ADMINS,
    {
      variables: {
        payload: {
          filters: [
            {
              columnName: 'role',
              operation: FilterOperationEnum.NotEqual,
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
      actions.setRows(data?.users.items);
      actions.setTotal(data.users.meta.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.users.items, data?.users.meta.total]);

  const refetchWithCache = useRefetchWithCache(['users']);

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'fullName', name: 'fullName', title: 'Admin Name' },
      { id: 'role', name: 'role', title: 'Role' },
      { id: 'email', name: 'email', title: 'Email' },
      { id: 'phoneNumber', name: 'phoneNumber', title: 'Phone #' },
      { id: 'dates.createdDate', name: 'dates.createdDate', title: 'Joined' },
      { id: 'id', name: 'id', title: 'Id' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const [tab, setTab] = useState<string>('All Admins');

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
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={usersRoles}
            />
          )}
          for={['role']}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingUserRole(params?.row?.role)} />
          )}
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
            <HeaderTabs tabs={['All Admins']} tab={tab} setTab={handleSetTab} />
            {dataMe?.role === UserRoleEnum.OwnerPlatform ? (
              <Box mr={1}>
                <ButtonUi
                  var={EButtonType.Secondary}
                  onClick={() => openModal()}
                  style={isMobile ? { fontSize: '11px', padding: '6px 8px' } : undefined}
                >
                  Create Admin
                </ButtonUi>
              </Box>
            ) : null}

            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'admins'}
      >
        {pluginsUm}
      </UniversalTable>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery}>
        <AdminUserProfileWrapper id={id} close={clearQuery} contextRole={dataMe?.role} />
      </SidebarBottom>

      <AdminInviteAdmin isOpen={isOpen} closeModal={closeModal} />
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);
  }
};

export default AdminAdmins;
