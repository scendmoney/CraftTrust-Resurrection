import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import { IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  IQuerySubcompaniesBuyerArgs,
  ISubcompaniesModel,
  SortDirectionEnum
} from 'graphql/_server';
import SUBCOMPANIES_BUYER from 'graphql/queries/subcompaniesBuyer';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import ProductsCompanyFormatter from 'sharedProject/components/UniversalTable/providers/ProductsCompanyFormatter/ProductsCompanyFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import StatusCompanyIdFormatter from 'sharedProject/components/UniversalTable/providers/StatusCompanyIdFormatter/StatusCompanyIdFormatter';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import mappingCompanyStatus from 'sharedProject/utils/mappingCompanyStatus';

import Loader from 'components/Loader/Loader';

import ClientPromoCompany from './ClientPromoCompany/ClientPromoCompany';
import { companyStatus } from './selectEnumOptions';
import styles from './styles';

const ClientPromoCompanies: FC = () => {
  const { id, clearQuery, goToModal } = useProjectRouter();
  const { actions, status } = useUniversalTable({});

  const { data, loading: loadingData } = useQuery<
    { subcompaniesBuyer: ISubcompaniesModel },
    IQuerySubcompaniesBuyerArgs
  >(SUBCOMPANIES_BUYER, {
    variables: {
      payload: {
        filters: reactGridMapFilters(status.filters),
        sorts: [
          {
            columnName: 'isSurveyPending',
            direction: SortDirectionEnum.Desc
          },
          ...reactGridMapSortings(status.sorting)
        ],
        paginate: {
          skip: status.pageSize * status.currentPage,
          take: status.pageSize
        }
      }
    }
  });

  useEffect(() => {
    if (data?.subcompaniesBuyer.items) {
      actions.setRows(data?.subcompaniesBuyer.items);
      actions.setTotal(data.subcompaniesBuyer.meta.total);
    }
  }, [actions, data?.subcompaniesBuyer.items, data?.subcompaniesBuyer.meta.total]);

  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);
  const refetchWithCache = useRefetchWithCache(['subcompaniesBuyer']);

  const columnsUm: Column[] = useMemo(() => {
    return [
      {
        id: 'company.companyName',
        name: 'company.companyName',
        title: 'CAMPAIGN NAME'
      },
      { id: 'company.status', name: 'company.status', title: 'STATUS' },
      {
        id: 'company.facilityCultivator.displayName',
        name: 'company.facilityCultivator.displayName',
        title: 'CULTIVATOR'
      },

      {
        id: 'quantity',
        name: 'quantity',
        title: 'Reward Units'
      },
      { id: 'company.dateStart', name: 'company.dateStart', title: 'Start Date' },
      { id: 'company.dateEnd', name: 'company.dateEnd', title: 'End Date' },
      {
        id: 'id',
        name: 'id',
        title: 'ID #'
      }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          editorComponent={TextEditor}
          formatterComponent={(params) => (
            <StatusCompanyIdFormatter
              status={params.row?.company?.status}
              id={params.row?.company?.companyName}
              newRequest={params.row?.isSurveyPending}
            />
          )}
          for={['company.companyName']}
        />
        <DataTypeProvider
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={companyStatus}
            />
          )}
          for={['company.status']}
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingCompanyStatus(params?.row?.company?.status)} />
          )}
        />
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props?.row?.company?.facilityCultivator.asset?.url}
              name={props?.row?.company?.facilityCultivator.displayName}
              avatarSize={24}
            />
          )}
          editorComponent={TextEditor}
          for={['company.facilityCultivator.displayName']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <TextFormatterValue value={`${params?.row?.quantitySold} / ${params?.row?.quantity}`} />
          )}
          editorComponent={HiddenEditor}
          for={['quantity']}
        />

        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.row?.company?.dateEnd} />;
          }}
          editorComponent={DateEditor}
          for={['company.dateEnd']}
        />
        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.row?.company?.dateStart} />;
          }}
          editorComponent={DateEditor}
          for={['company.dateStart']}
        />
        <DataTypeProvider
          formatterComponent={TextFormatter}
          editorComponent={NumberEditor}
          for={['id']}
        />
      </Plugin>
    );
  }, []);

  return (
    <Box sx={styles.wrapper}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h1">Campaigns</Typography>
      </Box>
      {loadingData && <Loader animationDelay={0} />}
      <Box sx={styles.tableWrapper}>
        <Box sx={styles.cached}>
          <IconButton onClick={refetchWithCache}>
            <RefetchIcon />
          </IconButton>
        </Box>
        <UniversalTable
          rows={data?.subcompaniesBuyer?.items || []}
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
          tableId={'clientSubcampaigns'}
          onRowClick={(id) => goToModal({ id: id })}
          height="calc(100vh - 270px)"
          isHideLeftPadding
          isHideToolbar
          fixedColumns={['company.companyName']}
        >
          {pluginsUm}
        </UniversalTable>
      </Box>

      <SidebarBottom isOpen={Boolean(id)} close={clearQuery} isFullwidth>
        <ClientPromoCompany />
      </SidebarBottom>
    </Box>
  );
};

export default ClientPromoCompanies;
