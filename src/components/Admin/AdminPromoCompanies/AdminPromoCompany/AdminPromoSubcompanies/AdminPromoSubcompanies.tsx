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
  IQuerySubcompaniesAdminArgs,
  ISubcompaniesModel
} from 'graphql/_server';
import SUBCOMPANIES_ADMIN from 'graphql/queries/subcompaniesAdmin';
import { colors } from 'mui/theme/colors';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import reactGridMapFilters from 'sharedArchitech/utils/reactGridMapFilters';
import reactGridMapSortings from 'sharedArchitech/utils/reactGridMapSortings';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import AvatarNameFormatter3 from 'sharedProject/components/UniversalTable/providers/AvatarNameFormatter3/AvatarNameFormatter3';
import HiddenEditor from 'sharedProject/components/UniversalTable/providers/HiddenEditor/HiddenEditor';
import { NumberEditor } from 'sharedProject/components/UniversalTable/providers/NumberEditor/NumberEditor';
import RewardsFormatter from 'sharedProject/components/UniversalTable/providers/RewardsFormatter/RewardsFormatter';
import StatusCompanyIdFormatter from 'sharedProject/components/UniversalTable/providers/StatusCompanyIdFormatter/StatusCompanyIdFormatter';
import { TextEditor } from 'sharedProject/components/UniversalTable/providers/TextEditor/TextEditor';
import { TextFormatter } from 'sharedProject/components/UniversalTable/providers/TextFormatter/TextFormatter';
import { TextFormatterValue } from 'sharedProject/components/UniversalTable/providers/TextFormatterValue/TextFormatterValue';
import useUniversalTable from 'sharedProject/components/UniversalTable/useUniversalTable';
import UniversalTableSmall from 'sharedProject/components/UniversalTableSmall/UniversalTableSmall';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import AdminPromoSubcompaniesCreate from './AdminPromoSubcompaniesCreate/AdminPromoSubcompaniesCreate';
import MenuFormatter from './MenuFormatter/MenuFormatter';
import styles from './styles';

const AdminPromoSubcompanies: FC<{
  facilityId: string | undefined;
  statusCompany: CompanyStatusEnum | undefined;
}> = ({ facilityId, statusCompany }) => {
  const { id } = useProjectRouter();
  const { actions, status } = useUniversalTable({});
  const { isOpen, openModal, closeModal } = useModalState();

  const isShowAddedButton =
    statusCompany === CompanyStatusEnum.Draft || statusCompany === CompanyStatusEnum.Rejected;

  const { data, loading: loadingData } = useQuery<
    { subcompaniesAdmin: ISubcompaniesModel },
    IQuerySubcompaniesAdminArgs
  >(SUBCOMPANIES_ADMIN, {
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
    if (data?.subcompaniesAdmin.items) {
      actions.setRows(data?.subcompaniesAdmin.items);
      actions.setTotal(data.subcompaniesAdmin.meta.total);
    }
  }, [actions, data?.subcompaniesAdmin.items, data?.subcompaniesAdmin.meta.total]);

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
              <MenuFormatter row={props.row} />
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
          formatterComponent={TextFormatter}
          editorComponent={TextEditor}
          for={['id']}
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
          rows={data?.subcompaniesAdmin?.items || []}
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

      <AdminPromoSubcompaniesCreate
        isOpen={isOpen}
        closeModal={closeModal}
        facilityId={facilityId}
        facilities={data?.subcompaniesAdmin.items}
      />
    </Box>
  );
};

export default AdminPromoSubcompanies;
