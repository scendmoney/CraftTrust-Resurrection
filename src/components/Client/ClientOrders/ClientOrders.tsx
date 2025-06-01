import { FC, useEffect, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useQuery } from '@apollo/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { CardActionArea, Divider, Grow, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IOrderModel,
  IOrdersDto,
  IQueryOrdersArgs,
  OrderStatusEnum,
  PaymentStatusEnum
} from 'graphql/_server';
import { ORDERS } from 'graphql/queries/orders';
import { colors } from 'mui/theme/colors';
import Routes from 'routes';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import ClientFaq from '../shared/ClientFaq/ClientFaq';

import ClientOrder from './ClientOrder/ClientOrder';
import ClientOrdersFilters from './ClientOrdersFilters/ClientOrdersFilters';
import ClientOrdersSorting from './ClientOrdersSorting/ClientOrdersSorting';
import styles from './styles';
import useOrdersFilters from './useOrdersFilters';
import useOrdersSorts from './useOrdersSorts';

const ClientOrders: FC<{ onlyDue: boolean }> = ({ onlyDue }) => {
  const [orders, setOrders] = useState<IOrderModel[]>([]);
  const { filters, addFilter, removeFilter } = useOrdersFilters(setOrders, onlyDue);

  const [dueOrders, setDueOrders] = useState<IOrderModel[]>([]);
  const [overdueOrders, setOverdueOrders] = useState<IOrderModel[]>([]);

  const { goTo } = useProjectRouter();

  const [skip, setSkip] = useState<number>(0);
  const [take] = useState<number>(5);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [total, setTotal] = useState<number>(0);
  const [isHasMore, setIsHasMore] = useState<boolean>(false);
  const isNoOverdueOrders = Boolean(dueOrders.length && !overdueOrders.length);

  const stylesUm = useMemo(() => {
    return styles(isNoOverdueOrders);
  }, [isNoOverdueOrders]);

  const { sortsOptions, sorts, direction, changeDirection } = useOrdersSorts(setOrders);

  const { loading } = useQuery<{ orders: IOrdersDto }, IQueryOrdersArgs>(ORDERS, {
    variables: {
      payload: {
        isCultivator: false,
        filters: filters,
        sorts: sorts,
        paginate: {
          skip: skip,
          take: take
        }
      }
    },
    onCompleted: (data) => {
      const items = data.orders.items || [];
      setTotal(data.orders.meta.total);
      setOrders((oldValue) => [...oldValue, ...items]);
      setIsHasMore(data.orders.meta.total > data.orders.meta.skip + data.orders.meta.take);
    },
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    setSkip(0);
  }, [filters, sorts]);

  useQuery<{ orders: IOrdersDto }, IQueryOrdersArgs>(ORDERS, {
    variables: {
      payload: {
        isCultivator: false,
        filters: [
          {
            columnName: 'paymentStatus',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: [PaymentStatusEnum.Due]
          },
          {
            columnName: 'status',
            operation: FilterOperationEnum.NotEqual,
            type: FilterFieldTypeEnum.Text,
            value: [OrderStatusEnum.Cancel]
          }
        ]
      }
    },
    onCompleted: (data) => {
      setDueOrders(data.orders.items || []);
    }
  });

  useQuery<{ orders: IOrdersDto }, IQueryOrdersArgs>(ORDERS, {
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
        ]
      }
    },
    onCompleted: (data) => {
      setOverdueOrders(data.orders.items || []);
    }
  });

  return (
    <Box sx={stylesUm.wrapper}>
      {loading ? <Loader /> : null}
      {onlyDue && (
        <Box>
          <ButtonUi
            var={EButtonType.Bordered}
            onClick={() => goTo(Routes.CLIENT_ORDERS)}
            startIcon={<ArrowBackIcon />}
          >
            Back to Orders
          </ButtonUi>
        </Box>
      )}

      <Typography variant="h1">{onlyDue ? 'Payment Due' : 'My Orders'}</Typography>

      <Box sx={stylesUm.blockWrapper}>
        <Box sx={stylesUm.contentWrapper}>
          {!onlyDue && (Boolean(dueOrders.length) || Boolean(overdueOrders.length)) && (
            <Grow in timeout={1000}>
              <CardActionArea
                onClick={() => goTo(Routes.CLIENT_ORDERS_DUE)}
                sx={stylesUm.cardAction}
              >
                <Box sx={stylesUm.dueWrapper}>
                  <ErrorOutlineOutlinedIcon
                    htmlColor={isNoOverdueOrders ? colors.orange : colors.secondary}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {dueOrders.length ? (
                      <Typography variant="h4" fontWeight={500}>
                        Payment due, {dueOrders.length + overdueOrders.length} orders
                      </Typography>
                    ) : null}
                    {overdueOrders.length ? (
                      <Typography
                        variant={dueOrders.length ? 'subtitle1' : 'h4'}
                        fontWeight={500}
                        sx={{ color: colors.secondary }}
                      >
                        Payment overdue for {overdueOrders.length} orders
                      </Typography>
                    ) : null}
                  </Box>
                </Box>
              </CardActionArea>
            </Grow>
          )}
          {!onlyDue && (
            <>
              <Divider />
              <Box sx={stylesUm.headerLine}>
                <ClientOrdersFilters
                  filters={filters}
                  removeFilter={removeFilter}
                  addFilter={addFilter}
                />
                <ClientOrdersSorting
                  sortsOptions={sortsOptions}
                  direction={direction}
                  changeDirection={changeDirection}
                />
              </Box>
            </>
          )}
          {orders.length === 0 && !loading ? (
            <Typography variant="h3" fontWeight={500}>
              No results found
            </Typography>
          ) : null}
          <InfiniteScroll
            dataLength={orders.length}
            next={loadMore}
            hasMore={isHasMore}
            loader={null}
            pullDownToRefreshThreshold={100}
          >
            <Box sx={stylesUm.orders}>
              {orders.map((order) => (
                <ClientOrder order={order} key={order.id} />
              ))}
            </Box>
          </InfiniteScroll>
        </Box>

        <ClientFaq />
      </Box>
    </Box>
  );

  function loadMore() {
    if (loading) return;
    setSkip(skip + take);
  }
};

export default ClientOrders;
