import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { ICompaniesModel, IQueryCompaniesCultivatorArgs } from 'graphql/_server';
import COMPANIES_CULTIVATOR from 'graphql/queries/companiesCultivator';
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

import CultivatorPromoCompany from './CultivatorPromoCompany/CultivatorPromoCompany';
import { companyStatus } from './selectEnumOptions';

const CultivatorPromoCompanies: FC = () => {
  const { id, clearQuery, goToModal } = useProjectRouter();
  const { actions, status } = useUniversalTable({});

  const { data, loading: loadingData } = useQuery<
    { companiesCultivator: ICompaniesModel },
    IQueryCompaniesCultivatorArgs
  >(COMPANIES_CULTIVATOR, {
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
    if (data?.companiesCultivator.items) {
      actions.setRows(data?.companiesCultivator.items);
      actions.setTotal(data.companiesCultivator.meta.total);
    }
  }, [actions, data?.companiesCultivator.items, data?.companiesCultivator.meta.total]);

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);
  const refetchWithCache = useRefetchWithCache(['companiesCultivator']);
  const columnsUm: Column[] = useMemo(() => {
    return [
      { id: 'companyName', name: 'companyName', title: 'Campaign Name' },
      { id: 'status', name: 'status', title: 'Status' },

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
        rows={data?.companiesCultivator?.items || []}
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

            <IconButton onClick={refetchWithCache}>
              <RefetchIcon />
            </IconButton>
          </>
        }
        tableId={'companiesCultivator'}
      >
        {pluginsUm}
      </UniversalTable>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery} isFullwidth>
        <CultivatorPromoCompany />
      </SidebarBottom>
    </Box>
  );

  function handleSetTab(newTab: string) {
    setTab(newTab);
  }
};

export default CultivatorPromoCompanies;
