import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ICompaniesModel, IQueryCompaniesAdminArgs } from 'graphql/_server';
import COMPANIES_ADMIN from 'graphql/queries/companiesAdmin';
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
import { GramFormatter } from 'sharedProject/components/UniversalTable/providers/GramFormatter/GramFormatter';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import ProductsCompanyFormatter from 'sharedProject/components/UniversalTable/providers/ProductsCompanyFormatter/ProductsCompanyFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import StatusCompanyIdFormatter from 'sharedProject/components/UniversalTable/providers/StatusCompanyIdFormatter/StatusCompanyIdFormatter';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import { UnitFormatter } from 'sharedProject/components/UniversalTable/providers/UnitFormatter/UnitFormatter';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import mappingCompanyStatus from 'sharedProject/utils/mappingCompanyStatus';

import Loader from 'components/Loader/Loader';

import AdminPromoCompaniesCreate from './AdminPromoCompaniesCreate/AdminPromoCompaniesCreate';
import AdminPromoCompany from './AdminPromoCompany/AdminPromoCompany';
import { companyStatus } from './selectEnumOptions';

const AdminPromoCompanies: FC = () => {
  const { id, clearQuery, goToModal } = useProjectRouter();
  const { actions, status } = useUniversalTable({});
  const { isOpen, openModal, closeModal } = useModalState();
  const isMobile = useMediaQuery('(max-width:400px)');

  const { data, loading: loadingData } = useQuery<
    { companiesAdmin: ICompaniesModel },
    IQueryCompaniesAdminArgs
  >(COMPANIES_ADMIN, {
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
    if (data?.companiesAdmin.items) {
      actions.setTotal(data.companiesAdmin.meta.total);
    }
  }, [actions, data?.companiesAdmin.items, data?.companiesAdmin.meta.total]);

  const refetchWithCache = useRefetchWithCache(['companiesAdmin']);

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'companyName', name: 'companyName', title: 'Campaign Name' },
      { id: 'status', name: 'status', title: 'Status' },
      {
        id: 'facilityCultivator.displayName',
        name: 'facilityCultivator.displayName',
        title: 'Cultivator'
      },

      { id: 'quantity', name: 'quantity', title: 'Total Units' },
      { id: 'quantitySold', name: 'quantitySold', title: 'Units Gifted' },
      { id: 'unitWeight', name: 'unitWeight', title: 'Unit Weight (g)' },
      { id: 'totalGram', name: 'totalGram', title: 'Total Gram' },
      { id: 'totalLb', name: 'totalLb', title: 'Total Lb' },
      { id: 'totalPeopleRegistered', name: 'totalPeopleRegistered', title: 'Verified Contacts' },
      { id: 'totalPeopleCompleted', name: 'totalPeopleCompleted', title: 'Completed Forms' },
      { id: 'totalPeopleRedemption', name: 'totalPeopleRedemption', title: 'Redemptions' },
      { id: 'dateStart', name: 'dateStart', title: 'Start Date' },
      { id: 'dateEnd', name: 'dateEnd', title: 'End Date' },
      { id: 'id', name: 'id', title: 'ID #' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const [tab, setTab] = useState<string>('All Campaigns');

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={(params) => (
            <StatusCompanyIdFormatter status={params.row?.status} id={params.row?.companyName} />
          )}
          for={['companyName']}
        />
        <DataTypeProvider
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={companyStatus}
            />
          )}
          for={['status']}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingCompanyStatus(params?.row?.status)} />
          )}
        />
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props?.row?.facilityCultivator.asset?.url}
              name={props?.row?.facilityCultivator.displayName}
              avatarSize={24}
            />
          )}
          editorComponent={TextEditor}
          for={['facilityCultivator.displayName']}
        />

        <DataTypeProvider
          formatterComponent={TextFormatter}
          editorComponent={NumberEditor}
          for={['id']}
        />
        <DataTypeProvider
          editorComponent={HiddenEditor}
          formatterComponent={UnitFormatter}
          for={['totalLb']}
        />
        <DataTypeProvider
          editorComponent={HiddenEditor}
          formatterComponent={GramFormatter}
          for={['totalGram', 'unitWeight']}
        />
        <DataTypeProvider
          editorComponent={HiddenEditor}
          for={[
            'quantity',
            'quantitySold',
            'totalPeopleRegistered',
            'totalPeopleCompleted',
            'totalPeopleRedemption'
          ]}
        />
        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.value} />;
          }}
          editorComponent={DateEditor}
          for={['dateEnd', 'dateStart']}
        />
      </Plugin>
    );
  }, []);

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.companiesAdmin?.items || []}
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
        fixedColumns={['companyName']}
        menuElement={
          <>
            <HeaderTabs tabs={['All Campaigns']} tab={tab} setTab={handleSetTab} />

            <Box mx={1}>
              <ButtonUi
                var={EButtonType.Secondary}
                onClick={() => openModal()}
                style={isMobile ? { fontSize: '11px', padding: '6px 8px' } : undefined}
              >
                New Campaign
              </ButtonUi>
            </Box>

            <IconButton onClick={() => refetchWithCache()}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'companiesAdmin'}
      >
        {pluginsUm}
      </UniversalTable>

      <AdminPromoCompaniesCreate isOpen={isOpen} closeModal={closeModal} />

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery} isFullwidth>
        <AdminPromoCompany />
      </SidebarBottom>
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);
  }
};

export default AdminPromoCompanies;
