import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import Box from '@mui/material/Box';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  ICompanyInsightsModel,
  IQueryCompanyInsightsCultivatorArgs
} from 'graphql/_server';
import COMPANY_INSIGHTS_CULTIVATOR from 'graphql/queries/companyInsightsCultivator';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import { getAppealingVisually } from 'sharedProject/components/PromoSurveyDetails/utils/getAppealingVisually';
import { getConsume } from 'sharedProject/components/PromoSurveyDetails/utils/getConsume';
import { getExperience } from 'sharedProject/components/PromoSurveyDetails/utils/getExperience';
import { getGender } from 'sharedProject/components/PromoSurveyDetails/utils/getGender';
import { getIntoxication } from 'sharedProject/components/PromoSurveyDetails/utils/getIntoxication';
import { getNose } from 'sharedProject/components/PromoSurveyDetails/utils/getNose';
import { getPurpose } from 'sharedProject/components/PromoSurveyDetails/utils/getPurpose';
import { getSmoked } from 'sharedProject/components/PromoSurveyDetails/utils/getSmoked';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import ColorFormatter from 'sharedProject/components/UniversalTable/providers/ColorFormatter/ColorFormatter';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import SelectEditor from 'sharedProject/components/UniversalTable/providers/SelectEditor/SelectEditor';
import SurveyIconFormatter from 'sharedProject/components/UniversalTable/providers/SurveyIconFormatter/SurveyIconFormatter';
import SurveySmellIconFormatter from 'sharedProject/components/UniversalTable/providers/SurveySmellIconFormatter/SurveySmellIconFormatter';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import UniversalTable from 'sharedProject/components/UniversalTable/UniversalTable';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import mappingAge from 'components/Admin/AdminPromoCompanies/AdminPromoCompany/AdminPromoInsights/mappingAge';
import {
  appealingSurvey,
  colorSurvey,
  experienceSurvey,
  flavorSurvey,
  genderSurvey,
  noseSurvey,
  oftenConsumeSurvey,
  purposeSurvey,
  stoneySurvey
} from 'components/Admin/AdminPromoCompanies/AdminPromoCompany/AdminPromoInsights/selectEnumOptions';
import Loader from 'components/Loader/Loader';

import styles from './styles';

const CultivatorPromoInsights: FC = () => {
  const { id } = useProjectRouter();
  const { actions, status } = useUniversalTable({});

  const { data, loading: loadingData } = useQuery<
    { companyInsightsCultivator: ICompanyInsightsModel },
    IQueryCompanyInsightsCultivatorArgs
  >(COMPANY_INSIGHTS_CULTIVATOR, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'companyId',
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
    if (data?.companyInsightsCultivator.items) {
      actions.setRows(data?.companyInsightsCultivator.items);
      actions.setTotal(data.companyInsightsCultivator.meta.total);
    }
  }, [actions, data?.companyInsightsCultivator.items, data?.companyInsightsCultivator.meta.total]);
  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      {
        id: 'product.item.name',
        name: 'product.item.name',
        title: 'Product name'
      },
      {
        id: 'surveys',
        name: 'surveys',
        title: 'Surveys'
      },
      {
        id: 'ageRange',
        name: 'ageRange',
        title: 'Avg. Age'
      },
      {
        id: 'gender',
        name: 'gender',
        title: 'Gender'
      },
      {
        id: 'oftenConsumeCannabis',
        name: 'oftenConsumeCannabis',
        title: 'Consumption'
      },
      {
        id: 'primaryPurpose',
        name: 'primaryPurpose',
        title: 'purpose'
      },
      {
        id: 'appealingVisually',
        name: 'appealingVisually',
        title: 'Appearance'
      },
      {
        id: 'color',
        name: 'color',
        title: 'Color'
      },
      {
        id: 'nose',
        name: 'nose',
        title: 'Nose'
      },
      {
        id: 'smoked',
        name: 'smoked',
        title: 'Flavor'
      },
      {
        id: 'aromaSmells',
        name: 'aromaSmells',
        title: 'Aroma/Smells'
      },
      {
        id: 'experience',
        name: 'experience',
        title: 'experience'
      },
      {
        id: 'intoxication',
        name: 'intoxication',
        title: 'intoxication'
      }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props?.row?.product?.thumbnail?.url}
              name={props?.row?.product?.item?.name}
              avatarSize={48}
            />
          )}
          editorComponent={HiddenEditor}
          for={['product.item.name']}
        />
        <DataTypeProvider
          formatterComponent={TextFormatter}
          editorComponent={HiddenEditor}
          for={['surveys']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <SurveyIconFormatter data={getGender(params.row.gender)} />
          )}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={genderSurvey}
            />
          )}
          for={['gender']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <TextFormatterValue value={mappingAge(params?.row?.ageRange)} />
          )}
          editorComponent={HiddenEditor}
          for={['ageRange']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <SurveyIconFormatter data={getConsume(params.row.oftenConsumeCannabis)} />
          )}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={oftenConsumeSurvey}
            />
          )}
          for={['oftenConsumeCannabis']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <SurveyIconFormatter data={getPurpose(params.row.primaryPurpose)} />
          )}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={purposeSurvey}
            />
          )}
          for={['primaryPurpose']}
        />
        <DataTypeProvider
          formatterComponent={ColorFormatter}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={colorSurvey}
            />
          )}
          for={['color']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <SurveyIconFormatter data={getAppealingVisually(params.row.appealingVisually)} />
          )}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={appealingSurvey}
            />
          )}
          for={['appealingVisually']}
        />

        <DataTypeProvider
          formatterComponent={(params) => <SurveyIconFormatter data={getNose(params.row.nose)} />}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={noseSurvey}
            />
          )}
          for={['nose']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <SurveyIconFormatter data={getSmoked(params.row.smoked)} />
          )}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={flavorSurvey}
            />
          )}
          for={['smoked']}
        />
        <DataTypeProvider
          formatterComponent={(props) => (
            <SurveySmellIconFormatter data={props.row?.aromaSmells || []} />
          )}
          editorComponent={HiddenEditor}
          for={['aromaSmells']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <SurveyIconFormatter data={getExperience(params.row.experience)} />
          )}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={experienceSurvey}
            />
          )}
          for={['experience']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <SurveyIconFormatter data={getIntoxication(params.row.intoxication)} />
          )}
          editorComponent={(params) => (
            <SelectEditor
              value={params.value}
              onValueChange={params.onValueChange}
              statuses={stoneySurvey}
            />
          )}
          for={['intoxication']}
        />
      </Plugin>
    );
  }, []);

  return (
    <Box sx={styles.tableWrapper}>
      {loadingData && <Loader animationDelay={0} />}

      <UniversalTable
        rows={data?.companyInsightsCultivator?.items || []}
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
        tableId={'cultivatorPromoInsights'}
        isHideToolbar
        isHideLeftPadding
        height="70vh"
        fixedColumns={['product.item.name']}
      >
        {pluginsUm}
      </UniversalTable>
    </Box>
  );
};

export default CultivatorPromoInsights;
