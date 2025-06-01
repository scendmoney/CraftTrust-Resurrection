import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { CardActionArea, Fade, Typography } from '@mui/material';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IOrdersDto,
  IQueryOrdersArgs,
  OrderStatusEnum,
  PaymentStatusEnum,
  SortDirectionEnum
} from 'graphql/_server';
import { OVERDUE_ORDERS } from 'graphql/queries/orders';
import { colors } from 'mui/theme/colors';
import Routes from 'routes';
import { TVoidFun } from 'sharedArchitech/types';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';

const PaymentOverdueStatus: FC<{ close: TVoidFun; isSmall?: boolean }> = ({
  close,
  isSmall = false
}) => {
  const { goTo } = useProjectRouter();
  const [overdueOrder, setOverdueOrder] = useState(false);

  const stylesUm = useMemo(() => {
    return styles(isSmall);
  }, [isSmall]);

  const { loading: loadingOrders } = useQuery<{ orders: IOrdersDto }, IQueryOrdersArgs>(
    OVERDUE_ORDERS,
    {
      variables: {
        payload: {
          isCultivator: false,
          filters: [
            {
              columnName: 'paymentStatus',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Text,
              value: [PaymentStatusEnum.Overdue]
            },
            {
              columnName: 'status',
              operation: FilterOperationEnum.NotEqual,
              type: FilterFieldTypeEnum.Text,
              value: [OrderStatusEnum.Cancel]
            }
          ],
          sorts: [
            {
              columnName: 'id',
              direction: SortDirectionEnum.Desc
            }
          ],
          paginate: {
            skip: 0,
            take: 1
          }
        }
      },
      onCompleted: (data) => {
        const items = data.orders.items || [];
        setOverdueOrder(items.length > 0);
      }
    }
  );

  if (!overdueOrder) {
    return null;
  }

  return (
    <Fade in={!loadingOrders} timeout={1000}>
      <CardActionArea
        sx={stylesUm.paymentStatus}
        onClick={() => {
          close();
          goTo(Routes.CLIENT_ORDERS_DUE);
        }}
      >
        <ErrorOutlineOutlinedIcon htmlColor={colors.secondary} />
        <Typography variant="body1" fontWeight={500}>
          Payment Overdue
        </Typography>
      </CardActionArea>
    </Fade>
  );
};

export default PaymentOverdueStatus;
