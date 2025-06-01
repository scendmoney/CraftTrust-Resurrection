import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import Box from '@mui/material/Box';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQuerySurveysAdminArgs,
  ISurveysModel
} from 'graphql/_server';
import { SURVEYS_ADMIN } from 'graphql/queries/surveysAdmin';
import { colors } from 'mui/theme/colors';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import {
  DateEditor,
  DateFormatter
} from 'sharedProject/components/UniversalTable/providers/DateFormatter/DateFormatter';
import IconAvatarNameFormatter from 'sharedProject/components/UniversalTable/providers/IconAvatarNameFormatter/IconAvatarNameFormatter';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import {
  surveyStatusesAdminContacts,
  surveyStatusesAdminContactsReverse
} from 'sharedProject/utils/mappingSurveyStatusContacts';

import Loader from 'components/Loader/Loader';

import styles from './styles';

const AdminPromoContacts: FC = () => {
  const { id } = useProjectRouter();
  const { actions, status } = useUniversalTable({});

  const { data, loading: loadingData } = useQuery<
    { surveysAdmin: ISurveysModel },
    IQuerySurveysAdminArgs
  >(SURVEYS_ADMIN, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'subcompany.company.id',
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
    if (data?.surveysAdmin.items) {
      actions.setRows(data?.surveysAdmin.items);
      actions.setTotal(data.surveysAdmin.meta.total);
    }
  }, [actions, data?.surveysAdmin.items, data?.surveysAdmin.meta.total]);
  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);
  const columnsUm: Column[] = useMemo(() => {
    return [
      {
        id: 'fullName',
        name: 'fullName',
        title: 'Participant'
      },
      {
        id: 'subcompany.company.productSurvey.item.name',
        name: 'subcompany.company.productSurvey.item.name',
        title: 'Product'
      },
      {
        id: 'phone',
        name: 'phone',
        title: 'Phone'
      },
      {
        id: 'product.item.name',
        name: 'product.item.name',
        title: 'Product'
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
      },
      {
        id: 'status',
        name: 'status',
        title: 'Status'
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
              icon={<PersonOutlineIcon htmlColor={colors.secondary} />}
              name={props?.row?.fullName}
            />
          )}
          editorComponent={TextEditor}
          for={['fullName']}
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
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props?.row?.product?.thumbnail?.url}
              name={props?.row?.product?.item?.name}
              avatarSize={24}
            />
          )}
          editorComponent={TextEditor}
          for={['product.item.name']}
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
          formatterComponent={(params) => (
            <TextFormatterValue value={surveyStatusesAdminContactsReverse(params?.row?.status)} />
          )}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={surveyStatusesAdminContacts}
            />
          )}
          for={['status']}
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
    <Box sx={styles.tableWrapper}>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.surveysAdmin?.items || []}
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
        tableId={'adminPromoContacts'}
        isHideToolbar
        isHideLeftPadding
        height="70vh"
        fixedColumns={['fullName']}
      >
        {pluginsUm}
      </UniversalTable>
    </Box>
  );
};

export default AdminPromoContacts;
