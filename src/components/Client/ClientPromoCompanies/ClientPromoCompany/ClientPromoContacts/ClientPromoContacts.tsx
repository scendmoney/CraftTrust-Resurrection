import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Box from '@mui/material/Box';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQuerySurveysBuyerArgs,
  ISubcompanyModel,
  ISurveysModel
} from 'graphql/_server';
import { SURVEYS_BUYER } from 'graphql/queries/surveysBuyer';
import { colors } from 'mui/theme/colors';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import IconAvatarNameFormatter from 'sharedProject/components/UniversalTable/providers/IconAvatarNameFormatter/IconAvatarNameFormatter';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useMe from 'sharedProject/hooks/useMe';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import { mappingSurveyStatusContacts } from 'sharedProject/utils/mappingSurveyStatusContacts';

import Loader from 'components/Loader/Loader';

import SelectEditorManyToOne from '../../../../../sharedProject/components/UniversalTable/providers/SelectEditorManyToOne/SelectEditorManyToOne';

import ClientPromoMenuFormatter from './ClientPromoMenuFormatter/ClientPromoMenuFormatter';
import styles from './styles';

const ClientPromoContacts: FC<{ subcompanyById?: ISubcompanyModel }> = ({ subcompanyById }) => {
  const { id } = useProjectRouter();

  const { actions, status } = useUniversalTable({});
  const { dataMe } = useMe();

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
        id: 'statusSurvey',
        name: 'statusSurvey',
        title: 'Status'
      },
      {
        id: 'fullName',
        name: 'fullName',
        title: 'Participant'
      },
      {
        id: 'phone',
        name: 'phone',
        title: 'Phone'
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
      },
      {
        id: 'dates.createdDate',
        name: 'dates.createdDate',
        title: 'Joined'
      }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [{ columnName: 'menu', width: 200 }];

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          formatterComponent={(value) => (
            <ClientPromoMenuFormatter
              value={value}
              dataMe={dataMe}
              subcompanyById={subcompanyById}
              id={id}
            />
          )}
          editorComponent={HiddenEditor}
          for={['actions']}
        />
        <DataTypeProvider
          formatterComponent={(props) => (
            <IconAvatarNameFormatter
              icon={<PersonOutlineIcon htmlColor={colors.secondary} />}
              name={props?.row?.fullName}
            />
          )}
          editorComponent={TextEditor}
          for={['fullName']}
        />

        <DataTypeProvider
          editorComponent={(params) => (
            <SelectEditorManyToOne
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={mappingSurveyStatusContacts}
            />
          )}
          for={['statusSurvey']}
          formatterComponent={(value) => (
            <ClientPromoMenuFormatter
              value={value}
              dataMe={dataMe}
              subcompanyById={subcompanyById}
              id={id}
            />
          )}
        />
        <DataTypeProvider
          formatterComponent={TextFormatter}
          editorComponent={TextEditor}
          for={['phone']}
        />
        <DataTypeProvider
          formatterComponent={(props) => {
            return <DateFormatter value={props.value} />;
          }}
          editorComponent={DateEditor}
          for={['surveySentDate', 'completedDate']}
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
  }, [dataMe, id, subcompanyById]);

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
        tableId={'clientPromoContacts'}
        isHideToolbar
        isHideLeftPadding
        height="calc(100vh - 130px)"
      >
        {pluginsUm}
      </UniversalTable>
    </Box>
  );
};

export default ClientPromoContacts;
