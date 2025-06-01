import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import { Tooltip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { IFacilitiesDto, IQueryFacilitiesArgs } from 'graphql/_server';
import { FACILITIES_FOR_ADMIN } from 'graphql/queries/facilities';
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
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import { mappingFacilitiesRole } from 'sharedProject/utils/mappingFacilityRole';

import Loader from 'components/Loader/Loader';

import AdminFacilityProfile from './AdminFacilityProfile/AdminFacilityProfile';
import mappingFacilityRoleRevers from './mappingRequestTypeRevers';
import { facilityRoles } from './selectEnumOptions';

const AdminFacilities: FC = () => {
  const { id, clearQuery, goToModal } = useProjectRouter();
  const { actions, status } = useUniversalTable({});

  const { data, loading: loadingData } = useQuery<
    { facilities: IFacilitiesDto },
    IQueryFacilitiesArgs
  >(FACILITIES_FOR_ADMIN, {
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
  });

  useEffect(() => {
    if (data?.facilities.items) {
      actions.setRows(data?.facilities.items);
      actions.setTotal(data.facilities.meta.total);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.facilities.items, data?.facilities.meta.total]);

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'displayName', name: 'displayName', title: 'Facility Name' },
      { id: 'role', name: 'role', title: 'Role' },
      { id: 'license.licenseNumber', name: 'license.licenseNumber', title: 'License #' },
      { id: 'license.licenseType', name: 'license.licenseType', title: 'Type' },
      { id: 'license.licenseEndDate', name: 'license.licenseEndDate', title: 'Valid By' },
      { id: 'owner.fullName', name: 'owner.fullName', title: 'Owner' },
      { id: 'quantityActiveEmployee', name: 'quantityActiveEmployee', title: 'Employees' },
      { id: 'dates.createdDate', name: 'dates.createdDate', title: 'Joined' },
      { id: 'id', name: 'id', title: 'Id' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const refetchWithCache = useRefetchWithCache(['facilities']);

  const [tab, setTab] = useState<string>('All Facilities');

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props?.row?.asset?.url || undefined}
              name={props.value}
              isOnline={props?.row?.isOnline}
            />
          )}
          editorComponent={TextEditor}
          for={['displayName']}
        />
        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={TextFormatter}
          for={['id']}
        />
        <DataTypeProvider
          editorComponent={
            tab === 'All Facilities'
              ? (params) => (
                  <SelectEditor
                    value={params.value}
                    onValueChange={params.onValueChange}
                    statuses={facilityRoles}
                  />
                )
              : HiddenEditor
          }
          for={['role']}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingFacilitiesRole(params?.row?.role)} />
          )}
        />
        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={(params) => (
            <TextFormatterValue value={params?.row?.license?.licenseNumber} />
          )}
          for={['license.licenseNumber']}
        />
        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={(params) => (
            <TextFormatterValue value={params?.row?.license?.licenseType} />
          )}
          for={['license.licenseType']}
        />
        <DataTypeProvider
          editorComponent={HiddenEditor}
          formatterComponent={(params) => (
            <Tooltip
              title={
                <Typography variant="caption" textAlign={'center'}>
                  Registered / All Employees
                </Typography>
              }
              placement={'bottom'}
            >
              <Box>{`${params?.row?.quantityActiveEmployee}/${params?.row?.quantityEmployee}`}</Box>
            </Tooltip>
          )}
          for={['quantityActiveEmployee']}
        />

        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.row.license.licenseEndDate} />;
          }}
          editorComponent={DateEditor}
          for={['license.licenseEndDate']}
        />
        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={(params) => <>{params?.row?.owner?.fullName || '--'}</>}
          for={['owner.fullName']}
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
        rows={data?.facilities?.items || []}
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
        fixedColumns={['displayName']}
        menuElement={
          <>
            <HeaderTabs
              tabs={['All Facilities', 'Buyers', 'Cultivators', 'Buyer and Cultivator']}
              tab={tab}
              setTab={handleSetTab}
            />
            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'facilities'}
      >
        {pluginsUm}
      </UniversalTable>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery}>
        <AdminFacilityProfile id={id} close={clearQuery} />
      </SidebarBottom>
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);

    if (newTab === 'All Facilities') {
      actions.setFilters((oldValue) => {
        return [...oldValue].filter((item) => item.columnName !== 'role');
      });
      return null;
    }

    actions.setFilters((oldValue) => {
      return [
        ...[{ columnName: 'role', operation: 'equal', value: mappingFacilityRoleRevers(newTab) }],
        ...oldValue.filter((item) => item.columnName !== 'role')
      ];
    });
  }
};

export default AdminFacilities;
