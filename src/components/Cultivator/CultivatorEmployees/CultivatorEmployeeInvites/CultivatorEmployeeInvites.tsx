import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IInvitationsDto,
  IQueryInvitationsArgs
} from 'graphql/_server';
import INVITATIONS from 'graphql/queries/invitations';
import Link from 'next/link';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import Routes from 'routes';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InviteEmployee from 'sharedProject/components/InviteEmployee/InviteEmployee';
import HeaderTabs from 'sharedProject/components/UniversalTable/HeaderTabs/HeaderTabs';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import InvitationsMenuFormatter from 'sharedProject/components/UniversalTable/providers/InvitationsMenuFormatter/InvitationsMenuFormatter';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import { NumberFormatter } from 'sharedProject/components/UniversalTable/providers/NumberFormatter/NumberFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import TextFormatterMenu from 'sharedProject/components/UniversalTable/providers/TextFormatterMenu/TextFormatterMenu';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useMe from 'sharedProject/hooks/useMe';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import mappingInvitationStatus, {
  mappingInvitationStatusReverse
} from 'sharedProject/utils/mappingInvitationStatus';

import Loader from 'components/Loader/Loader';

const CultivatorEmployeeInvites: FC = () => {
  const { dataMe } = useMe();
  const { actions, status } = useUniversalTable({});
  const { goTo } = useProjectRouter();
  const { isOpen, openModal, closeModal } = useModalState();

  const { data, loading: loadingData } = useQuery<
    { invitations: IInvitationsDto },
    IQueryInvitationsArgs
  >(INVITATIONS, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'type',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: ['employee']
          },
          ...reactGridMapFilters(status.filters, true)
        ],
        sorts: reactGridMapSortings(status.sorting),
        paginate: {
          skip: status.pageSize * status.currentPage,
          take: status.pageSize
        }
      }
    },
    fetchPolicy: 'no-cache'
  });

  useEffect(() => {
    if (data?.invitations.items) {
      actions.setRows(data.invitations.items);
      actions.setTotal(data.invitations.meta.total);
    }
  }, [actions, data?.invitations.items, data?.invitations.meta.total]);
  const refetchWithCache = useRefetchWithCache(['invitations']);
  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'name', name: 'name', title: 'Name' },
      { id: 'phone', name: 'phone', title: 'Phone' },
      { id: 'status', name: 'status', title: 'Status' },
      { id: 'dates.createdDate', name: 'dates.createdDate', title: 'Date' },
      { id: 'id', name: 'id', title: 'ID' },
      { id: 'code', name: 'code', title: 'Code' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const [tab, setTab] = useState<string>('Invitations');

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.invitations?.items || []}
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
        menuElement={
          <>
            <HeaderTabs tabs={['Employees', 'Invitations']} tab={tab} setTab={handleSetTab} />
            {dataMe?.id === dataMe?.context?.owner?.id ? (
              <Box mr={1}>
                <ButtonUi var={EButtonType.Secondary} onClick={() => openModal()}>
                  Invite
                </ButtonUi>
              </Box>
            ) : null}

            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'invitations'}
      >
        <Plugin>
          <DataTypeProvider
            formatterComponent={(props) => (
              <TextFormatterMenu value={props.row?.name}>
                <InvitationsMenuFormatter rowId={props.row.id} rowStatus={props.row.status} />
              </TextFormatterMenu>
            )}
            editorComponent={TextEditor}
            for={['name']}
          />
          <DataTypeProvider editorComponent={TextEditor} for={['phone']} />

          <DataTypeProvider
            formatterComponent={(params) => {
              return (
                <Link href={`/auth/join/employee?code=${params.row?.code || ''}`} target="_blank">
                  {params.row?.code || '--'}
                </Link>
              );
            }}
            editorComponent={HiddenEditor}
            for={['code']}
          />

          <DataTypeProvider
            editorComponent={NumberEditor}
            formatterComponent={NumberFormatter}
            for={['id']}
          />

          <DataTypeProvider
            formatterComponent={(props) => <DateFormatter value={props?.row?.dates?.createdDate} />}
            editorComponent={(props) => (
              <DateEditor value={props.value} onValueChange={props.onValueChange} />
            )}
            for={['dates.createdDate']}
          />

          <DataTypeProvider
            formatterComponent={(params) => (
              <TextFormatterValue value={mappingInvitationStatus(params?.row?.status)} />
            )}
            editorComponent={(props) => (
              <SelectEditor
                value={props.value}
                onValueChange={props.onValueChange}
                statuses={mappingInvitationStatusReverse}
              />
            )}
            for={['status']}
          />
        </Plugin>
      </UniversalTable>

      <InviteEmployee isOpen={isOpen} closeModal={closeModal} from={'cultivator'} />
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);
    goTo(Routes.CULTIVATOR_EMPLOYEES);
  }
};

export default CultivatorEmployeeInvites;
