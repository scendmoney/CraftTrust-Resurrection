import { FC, useMemo, useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';
import { Box, Divider } from '@mui/material';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  ICompaniesModel,
  ICompanyModel,
  IFacilityToFacilityModel,
  IOrderModel,
  IOrdersDto,
  IQueryCompaniesCultivatorArgs,
  IQueryOrdersArgs,
  SortDirectionEnum
} from 'graphql/_server';
import { COMPANIES_CULTIVATOR_SUBSCRIPTION } from 'graphql/queries/companiesCultivator';
import { NEW_ORDERS } from 'graphql/queries/orders';
import { CHAT_MESSAGE_FOR_CULTIVATOR } from 'graphql/subscriptions/chatMessage';
import { COMPANY_CULTIVATOR_WAITING_CONFIRMATION } from 'graphql/subscriptions/companyCultivatorWaitingConfirmation';
import { NEW_ORDER } from 'graphql/subscriptions/newOrder';
import MenuDrawerItem from 'sharedProject/components/MenuDrawerItem/MenuDrawerItem';
import MenuLogo from 'sharedProject/components/MenuLogo/MenuLogo';
import useMe from 'sharedProject/hooks/useMe';

import MenuUser from './MenuUser/MenuUser';
import { listItems1, listItems2, listItems3 } from './listItems';
import styles from './styles';

const MenuDrawer: FC = () => {
  const [newOrder, setNewOrder] = useState(false);
  const { dataMe, refetch } = useMe();
  const isChatMessage = dataMe?.context?.isChatMessage;

  const client = useApolloClient();
  useSubscription<{ chatMessage: IFacilityToFacilityModel }>(CHAT_MESSAGE_FOR_CULTIVATOR, {
    onSubscriptionData: () => {
      refetch();
      client.refetchQueries({
        include: ['buyers']
      });
    }
  });

  const [newCampaign, setNewCampaign] = useState(false);

  const { refetch: refetchCampaigns } = useQuery<
    { companiesCultivator: ICompaniesModel },
    IQueryCompaniesCultivatorArgs
  >(COMPANIES_CULTIVATOR_SUBSCRIPTION, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'status',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: ['Pending']
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
      const items = data.companiesCultivator.items || [];
      setNewCampaign(items.length > 0);
    }
  });

  const { refetch: refetchOrders } = useQuery<{ orders: IOrdersDto }, IQueryOrdersArgs>(
    NEW_ORDERS,
    {
      variables: {
        payload: {
          isCultivator: true,
          filters: [
            {
              columnName: 'status',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Text,
              value: ['New']
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
        setNewOrder(items.length > 0);
      }
    }
  );

  useSubscription<{ newOrder: IOrderModel }>(NEW_ORDER, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newData = subscriptionData?.data?.newOrder;
      if (newData) {
        refetchOrders();
      }
    }
  });

  useSubscription<{ companyCultivatorWaitingConfirmation: ICompanyModel }>(
    COMPANY_CULTIVATOR_WAITING_CONFIRMATION,
    {
      onSubscriptionData: ({ subscriptionData }) => {
        const newData = subscriptionData?.data?.companyCultivatorWaitingConfirmation;
        if (newData) {
          refetchCampaigns();
        }
      }
    }
  );

  const listItem1Um = useMemo(() => {
    return listItems1(isChatMessage || false, newCampaign, newOrder);
  }, [isChatMessage, newCampaign, newOrder]);

  return (
    <Box sx={styles.container}>
      <MenuLogo />

      <Box flexGrow={1}>
        <Box sx={styles.itemsBlock} px={3}>
          {listItem1Um.map((item) => (
            <MenuDrawerItem key={item.value} item={item} />
          ))}
        </Box>

        <Box py={2} px={3}>
          <Divider />
        </Box>

        <Box sx={styles.itemsBlock} px={3}>
          {listItems2.map((item) => (
            <MenuDrawerItem key={item.value} item={item} />
          ))}
        </Box>
        <Box py={2} px={3}>
          <Divider />
        </Box>

        <Box sx={styles.itemsBlock} px={3}>
          {listItems3.map((item) => (
            <MenuDrawerItem key={item.value} item={item} />
          ))}
        </Box>
      </Box>
      <MenuUser />
    </Box>
  );
};

export default MenuDrawer;
