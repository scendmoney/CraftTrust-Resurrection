import { FC, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Plugin } from '@devexpress/dx-react-core';
import { Column, DataTypeProvider, Table } from '@devexpress/dx-react-grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  CompanyStatusEnum,
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQuerySubcompaniesCultivatorArgs,
  ISubcompaniesModel
} from 'graphql/_server';
import SUBCOMPANIES_CULTIVATOR from 'graphql/queries/subcompaniesCultivator';
import { colors } from 'mui/theme/colors';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import { NumberFormatter } from 'sharedProject/components/UniversalTable/providers/NumberFormatter/NumberFormatter';
import RewardsFormatter from 'sharedProject/components/UniversalTable/providers/RewardsFormatter/RewardsFormatter';
import StatusCompanyIdFormatter from 'sharedProject/components/UniversalTable/providers/StatusCompanyIdFormatter/StatusCompanyIdFormatter';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import UniversalTableSmall from 'sharedProject/components/UniversalTableSmall/UniversalTableSmall';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import CultivatorPromoSubcompaniesCreate from './CultivatorPromoSubcompaniesCreate/CultivatorPromoSubcompaniesCreate';
import MenuFormatter from './MenuFormatter/MenuFormatter';
import styles from './styles';

const CultivatorPromoSubcompanies: FC<{
  statusCompany: CompanyStatusEnum | undefined;
}> = ({ statusCompany }) => {
  const { id } = useProjectRouter();
  const { actions, status } = useUniversalTable({});
  const { isOpen, openModal, closeModal } = useModalState();
  const isShowAddedButton =
    statusCompany === CompanyStatusEnum.Pending ||
    statusCompany === CompanyStatusEnum.Active ||
    statusCompany === CompanyStatusEnum.Rejected;

  const { data, loading: loadingData } = useQuery<
    { subcompaniesCultivator: ISubcompaniesModel },
    IQuerySubcompaniesCultivatorArgs
  >(SUBCOMPANIES_CULTIVATOR, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'company.id',
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
    if (data?.subcompaniesCultivator.items) {
      actions.setRows(data?.subcompaniesCultivator.items);
      actions.setTotal(data.subcompaniesCultivator.meta.total);
    }
  }, [actions, data?.subcompaniesCultivator.items, data?.subcompaniesCultivator.meta.total]);
  const [expandedRowIds, setExpandedRowIds] = useState<Array<number | string>>([]);

  const columnsUm: Column[] = useMemo(() => {
    return [
      {
        id: 'facilityBuyer.displayName',
        name: 'facilityBuyer.displayName',
        title: 'Dispensary Name'
      },
      {
        id: 'facilityBuyer.license.licenseNumber',
        name: 'facilityBuyer.license.licenseNumber',
        title: 'License #'
      },
      {
        id: 'quantity',
        name: 'quantity',
        title: 'Total Units'
      },
      {
        id: 'quantitySold',
        name: 'quantitySold',
        title: 'Units Gifted'
      },
      { id: 'id', name: 'id', title: 'ID #' }
    ];
  }, []);

  const columnExtensions: Table.ColumnExtension[] = [];

  const pluginsUm = useMemo(() => {
    return (
      <Plugin>
        <DataTypeProvider
          editorComponent={NumberEditor}
          formatterComponent={(params) => (
            <StatusCompanyIdFormatter status={params.row?.status} id={params.row?.id} />
          )}
          for={['id']}
        />
        <DataTypeProvider
          formatterComponent={(props) => (
            <AvatarNameFormatter3
              url={props?.row?.facilityBuyer.asset?.url}
              name={props?.row?.facilityBuyer.displayName}
            >
              <MenuFormatter
                rowId={props.row.id}
                rowStatus={props.row.company.status}
                row={props.row}
              />
            </AvatarNameFormatter3>
          )}
          editorComponent={TextEditor}
          for={['facilityBuyer.displayName']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <TextFormatterValue value={params?.row?.facilityBuyer?.license?.licenseNumber} />
          )}
          editorComponent={TextEditor}
          for={['facilityBuyer.license.licenseNumber']}
        />
        <DataTypeProvider
          formatterComponent={TextFormatter}
          editorComponent={TextEditor}
          for={['id']}
        />
        <DataTypeProvider
          formatterComponent={(params) => (
            <RewardsFormatter
              quantity={params?.row?.quantity}
              quantitySold={params?.row?.quantitySold}
              status={params?.row?.company.status}
            />
          )}
          editorComponent={HiddenEditor}
          for={['quantity']}
        />
        <DataTypeProvider
          formatterComponent={NumberFormatter}
          editorComponent={HiddenEditor}
          for={['quantitySold']}
        />
      </Plugin>
    );
  }, []);

  return (
    <Box>
      {loadingData && <Loader animationDelay={0} />}
      {status.total ? (
        <Box sx={styles.wrapper}>
          <Box sx={styles.toolbar}>
            <Typography variant="subtitle1" fontWeight={500}>
              {`${status.total} ${status.total > 1 ? 'Dispensaries' : 'Dispensary'}`}
            </Typography>
            <Box sx={styles.buttons}>
              {isShowAddedButton ? (
                <Box>
                  <ButtonUi
                    var={EButtonType.Text}
                    style={{ color: colors.secondary }}
                    onClick={() => openModal()}
                    startIcon={<AddCircleOutlineIcon />}
                  >
                    Add Dispensary
                  </ButtonUi>
                </Box>
              ) : null}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={styles.wrapper}>
          <Box sx={styles.toolbar}>
            <Typography variant="subtitle1" fontWeight={500}>
              No Dispensaries added
            </Typography>
          </Box>
          {isShowAddedButton ? (
            <Box>
              <ButtonUi
                var={EButtonType.Text}
                style={{ color: colors.secondary }}
                onClick={() => openModal()}
                startIcon={<AddCircleOutlineIcon />}
              >
                Add Dispensary
              </ButtonUi>
            </Box>
          ) : null}
        </Box>
      )}
      {status.total ? (
        <Box mb={3}>
          <Divider />
        </Box>
      ) : null}

      {status.total ? (
        <UniversalTableSmall
          rows={data?.subcompaniesCultivator?.items || []}
          totalCount={status.total}
          columns={columnsUm}
          columnExtensions={columnExtensions}
          sorting={status.sorting}
          setSorting={actions.setSorting}
          setPageSize={actions.setPageSize}
          setCurrentPage={actions.setCurrentPage}
          pageSizes={status.pageSizes}
          pageSize={status.pageSize}
          currentPage={status.currentPage}
          isLoading={loadingData}
          expandedRowIds={expandedRowIds}
          setExpandedRowIds={setExpandedRowIds}
          height="65vh"
          firstColumnWidth="clamp(230px, 16vw, 550px)"
          lastColumnWidth="80px"
        >
          {pluginsUm}
        </UniversalTableSmall>
      ) : null}

      <CultivatorPromoSubcompaniesCreate
        isOpen={isOpen}
        closeModal={closeModal}
        facilities={data?.subcompaniesCultivator.items}
      />
    </Box>
  );
};

export default CultivatorPromoSubcompanies;
