import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQuerySurveysBuyerArgs,
  ISurveysModel,
  SurveyStatusEnum
} from 'graphql/_server';
import { SURVEYS_BUYER } from 'graphql/queries/surveysBuyer';
import { colors } from 'mui/theme/colors';
import CompaniesIcon from 'resources/iconsMui/CompaniesIcon';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import SidebarBottom from 'sharedProject/components/SidebarBottom/SidebarBottom';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import IconAvatarNameFormatter from 'sharedProject/components/UniversalTable/providers/IconAvatarNameFormatter/IconAvatarNameFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import {
  mappingSurveyReverseRedeemed,
  surveyStatusesRedeemed
} from 'sharedProject/utils/mappingSurveyStatus';

import Loader from 'components/Loader/Loader';

import ClientPromoSurveyDetails from './ClientPromoSurveyDetails/ClientPromoSurveyDetails';
import styles from './styles';

const ClientPromoSurvey: FC = () => {
  const { id } = useProjectRouter();
  const { actions, status } = useUniversalTable({});
  const [surveyDetailsId, setSurveyDetailsId] = useState<number | null>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { data, loading: loadingData } = useQuery<
    { surveysBuyer: ISurveysModel },
    IQuerySurveysBuyerArgs
  >(SURVEYS_BUYER, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'subcompany.id',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Number,
            value: [`${Number(id)}`]
          },
          {
            columnName: 'status',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: [SurveyStatusEnum.SurveySent, SurveyStatusEnum.Done]
          },
          ...reactGridMapFilters(status.filters)
        ],
        sorts: reactGridMapSortings(status.sorting),
        paginate: {
          skip: status.pageSize * status.currentPage,
          take: status.pageSize
        }
      }
    },
    skip: Boolean(!id)
  });

  useEffect(() => {
    if (data?.surveysBuyer.items) {
      actions.setRows(data?.surveysBuyer.items);
      actions.setTotal(data.surveysBuyer.meta.total);
    }
  }, [actions, data?.surveysBuyer.items, data?.surveysBuyer.meta.total]);
  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);
  const columnsUm: Column[] = useMemo(() => {
    return [
      {
        id: 'id',
        name: 'id',
        title: 'Survey id #'
      },
      {
        id: 'subcompany.company.productSurvey.item.name',
        name: 'subcompany.company.productSurvey.item.name',
        title: 'Product'
      },
      {
        id: 'status',
        name: 'status',
        title: 'Status'
      },
      {
        id: 'surveySentDate',
        name: 'surveySentDate',
        title: 'Survey Date'
      },
      {
        id: 'completedDate',
        name: 'completedDate',
        title: 'Redeem Date'
      }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          formatterComponent={(props) => (
            <IconAvatarNameFormatter
              icon={<CompaniesIcon htmlColor={colors.secondary} />}
              name={props?.row?.id}
            />
          )}
          editorComponent={TextEditor}
          for={['id']}
        />
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props?.row?.subcompany?.company?.productSurvey?.thumbnail?.url}
              name={props?.row?.subcompany?.company?.productSurvey?.item?.name}
              avatarSize={24}
            />
          )}
          editorComponent={TextEditor}
          for={['subcompany.company.productSurvey.item.name']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingSurveyReverseRedeemed(params?.row?.status)} />
          )}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={surveyStatusesRedeemed}
            />
          )}
          for={['status']}
        />
        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.value} />;
          }}
          editorComponent={DateEditor}
          for={['surveySentDate', 'completedDate']}
        />
      </Plugin>
    );
  }, []);

  return (
    <Box sx={styles.tableWrapper}>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.surveysBuyer?.items || []}
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
        tableId={'adminPromoSurvey'}
        onRowClick={(id) => setSurveyDetailsId(Number(id))}
        isHideToolbar
        isHideLeftPadding
        height="calc(100vh - 130px)"
      >
        {pluginsUm}
      </UniversalTable>

      <SidebarBottom
        isOpen={Boolean(surveyDetailsId)}
        close={() => setSurveyDetailsId(null)}
        isFullwidth={isMobile}
      >
        <ClientPromoSurveyDetails
          id={Number(surveyDetailsId)}
          closeDetails={() => setSurveyDetailsId(null)}
        />
      </SidebarBottom>
    </Box>
  );
};

export default ClientPromoSurvey;
