import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Fade } from '@mui/material';
import { IReportSalesPerformanceDto } from 'graphql/_server';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQueryReportSalesPerformanceAdminArgs,
  IReportSalesPerformances
} from 'graphql/_server';
import REPORT_SALES_PERFORMANCE_ADMIN from 'graphql/queries/reportSalesPerformanceAdmin';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';

import DetailsInfo from './DetailsInfo/DetailsInfo';
import AdminBuyersInsightsDetails from './AdminCultivatorsInsightsDetails';
import styles from './styles';

const AdminCultivatorsInsightsDetailsWrapper: FC<{
  id?: string;
  close: () => Promise<void>;
  dateFrom: string | null;
  dateTo: string | null;
}> = ({ id, close, dateFrom, dateTo }) => {
  const [details, setDetails] = useState<IReportSalesPerformanceDto | undefined>(undefined);
  const { loading: loadingData } = useQuery<
    { reportSalesPerformanceAdmin: IReportSalesPerformances },
    IQueryReportSalesPerformanceAdminArgs
  >(REPORT_SALES_PERFORMANCE_ADMIN, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'facility.id',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: [String(id)]
          }
        ],
        paginate: {
          skip: 0,
          take: 1
        },
        startDate: dateFrom,
        endDate: dateTo
      }
    },
    onCompleted(data) {
      setDetails(data.reportSalesPerformanceAdmin.items[0]);
    }
  });

  return (
    <>
      <Fade in={!loadingData} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <DetailsInfo data={details} />
          <Box sx={styles.storeFrontWrapper}>
            <AdminBuyersInsightsDetails id={id} dateFrom={dateFrom} dateTo={dateTo} />

            <ModalCloseButtonUi zIndex={1000} onClose={close} />
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default AdminCultivatorsInsightsDetailsWrapper;
