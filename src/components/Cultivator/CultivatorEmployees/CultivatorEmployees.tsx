import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { FilterFieldTypeEnum, FilterOperationEnum, IUsersModelDto } from 'graphql/_server';
import EMPLOYEES from 'graphql/queries/employees';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import Routes from 'routes';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import HeaderTabs from 'sharedProject/components/UniversalTable/HeaderTabs/HeaderTabs';
import AvatarNameFormatter2 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter2/AvatarNameFormatter2';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import mappingUserRole from 'sharedProject/utils/mappingUserRole';

import Loader from 'components/Loader/Loader';

import { IQueryEmployeesArgs } from '../../../graphql/_server';

import CultivatorEmployeeProfile from './CultivatorEmployeeProfile/CultivatorEmployeeProfile';

const CultivatorEmployees: FC = () => {
  const { actions, status } = useUniversalTable({});

  const { id, clearQuery, goToModal, goTo } = useProjectRouter();
  const { data, loading: loadingData } = useQuery<
    { employees: IUsersModelDto },
    IQueryEmployeesArgs
  >(EMPLOYEES, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'email',
            operation: FilterOperationEnum.NotEqual,
            type: FilterFieldTypeEnum.Null,
            value: ['']
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
  });

  useEffect(() => {
    if (data?.employees.items) {
      actions.setRows(data.employees.items);
      actions.setTotal(data.employees.meta.total);
    }
  }, [actions, data?.employees.items, data?.employees.meta.total]);
  const refetchWithCache = useRefetchWithCache(['employees']);
  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'fullName', name: 'fullName', title: 'Name' },

      { id: 'email', name: 'email', title: 'Email' },
      { id: 'phoneNumber', name: 'phoneNumber', title: 'Phone' },
      { id: 'joinDate', name: 'joinDate', title: 'Join Date' },
      { id: 'isBlocked', name: 'isBlocked', title: 'Status' },
      { id: 'role', name: 'role', title: 'Role' },

      { id: 'id', name: 'id', title: 'ID' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const [tab, setTab] = useState<string>('Employees');

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.employees?.items || []}
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
        initialHiddenColumnNames={['isBlocked', 'role']}
        onRowClick={(id) => goToModal({ id: id })}
        fixedColumns={['fullName']}
        menuElement={
          <>
            <HeaderTabs tabs={['Employees', 'Invitations']} tab={tab} setTab={handleSetTab} />

            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'cultivatorsEmployees'}
      >
        <Plugin>
          <DataTypeProvider
            formatterComponent={(props) => (
              <AvatarNameFormatter2 url={props.row?.asset?.url} name={props.value} />
            )}
            editorComponent={TextEditor}
            for={['fullName']}
          />
          <DataTypeProvider
            editorComponent={HiddenEditor}
            formatterComponent={(props) => (
              <TextFormatterValue value={props.value ? 'Blocked' : 'Active'} />
            )}
            for={['isBlocked']}
          />
          <DataTypeProvider
            editorComponent={HiddenEditor}
            formatterComponent={(props) => (
              <TextFormatterValue value={mappingUserRole(props.value)} />
            )}
            for={['role']}
          />
          <DataTypeProvider
            editorComponent={TextEditor}
            formatterComponent={TextFormatter}
            for={['id', 'phoneNumber', 'email']}
          />

          <DataTypeProvider
            formatterComponent={(props) => {
              return <DateFormatter value={props.row.joinDate} />;
            }}
            editorComponent={DateEditor}
            for={['joinDate']}
          />
        </Plugin>
      </UniversalTable>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery}>
        <CultivatorEmployeeProfile id={id} close={clearQuery} />
      </SidebarBottom>
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);
    if (newTab === 'Invitations') {
      goTo(Routes.CULTIVATOR_EMPLOYEES_INVITES);
    }
  }
};

export default CultivatorEmployees;
