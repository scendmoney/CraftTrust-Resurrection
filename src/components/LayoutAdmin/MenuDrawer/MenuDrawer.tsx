import { FC, useMemo, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Box, Divider } from '@mui/material';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IQueryRequestsArgs,
  IRequestModel,
  IRequestsDto,
  RequestTypeEnum,
  SortDirectionEnum
} from 'graphql/_server';
import { NEW_REQUESTS } from 'graphql/queries/requests';
import { NEW_REQUEST } from 'graphql/subscriptions/newRequest';
import MenuDrawerItem from 'sharedProject/components/MenuDrawerItem/MenuDrawerItem';
import MenuLogo from 'sharedProject/components/MenuLogo/MenuLogo';

import MenuUser from './MenuUser/MenuUser';
import { listItems1, listItems2, listItems3 } from './listItems';
import styles from './styles';

const MenuDrawer: FC = () => {
  const [newRequest, setNewRequest] = useState(false);
  const [newMessage, setNewMessage] = useState(false);

  const { refetch: refetchRequests } = useQuery<{ requests: IRequestsDto }, IQueryRequestsArgs>(
    NEW_REQUESTS,
    {
      variables: {
        payload: {
          filters: [
            {
              columnName: 'status',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Text,
              value: ['new']
            },
            {
              columnName: 'type',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Text,
              value: [RequestTypeEnum.Request]
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
        const items = data.requests.items || [];
        setNewRequest(items.length > 0);
      }
    }
  );

  const { refetch: refetchMessages } = useQuery<{ requests: IRequestsDto }, IQueryRequestsArgs>(
    NEW_REQUESTS,
    {
      variables: {
        payload: {
          filters: [
            {
              columnName: 'status',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Text,
              value: ['new']
            },
            {
              columnName: 'type',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Text,
              value: [RequestTypeEnum.ContactUs]
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
        const items = data.requests.items || [];
        setNewMessage(items.length > 0);
      }
    }
  );

  useSubscription<{ newRequest: IRequestModel }>(NEW_REQUEST, {
    onSubscriptionData: ({ subscriptionData }) => {
      const newData = subscriptionData?.data?.newRequest.type;
      if (newData) {
        if (newData === RequestTypeEnum.ContactUs) {
          refetchMessages();
        }
        if (newData === RequestTypeEnum.Request) {
          refetchRequests();
        }
      }
    }
  });

  const listItems1Um = useMemo(() => {
    return listItems1(newRequest, newMessage);
  }, [newRequest, newMessage]);

  return (
    <Box sx={styles.container}>
      <MenuLogo />

      <Box flexGrow={1}>
        <Box sx={styles.itemsBlock} px={3}>
          {listItems1Um.map((item) => (
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
