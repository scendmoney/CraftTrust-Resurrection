import { FC, useCallback, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import { IFacilitiesDto, IQueryBuyersArgs, SortDirectionEnum } from 'graphql/_server';
import { BUYERS_FOR_CHAT_CULTIVATOR } from 'graphql/queries/buyers';
import { colors } from 'mui/theme/colors';
import { TLabelValue } from 'sharedArchitech/types';

import CultivatorMessagesTab from './CultivatorMessagesTab/CultivatorMessagesTab';
import styles from './styles';

export interface ILabelValueWithAlert extends TLabelValue {
  isChatMessage?: boolean;
  isOnline?: boolean;
}

const CultivatorMessagesTabs: FC<{
  tab: ILabelValueWithAlert;
  setTab: (newTab: ILabelValueWithAlert) => void;
  isMobile: boolean;
}> = ({ tab, setTab, isMobile }) => {
  const [take, setTake] = useState(30);
  const [total, setTotal] = useState(0);

  const { data, loading, fetchMore } = useQuery<{ buyers: IFacilitiesDto }, IQueryBuyersArgs>(
    BUYERS_FOR_CHAT_CULTIVATOR,
    {
      variables: {
        payload: {
          paginate: {
            skip: 0,
            take: take
          },
          sorts: [
            {
              columnName: 'facilityCultivatorRelations.isMessageBuyer',
              direction: SortDirectionEnum.Desc
            },
            {
              columnName: 'facilityCultivatorRelations.dateMessageBuyer',
              direction: SortDirectionEnum.Asc
            }
          ]
        }
      },
      onCompleted: (data) => {
        const total = data?.buyers.meta?.total || 0;

        setTotal(total);
      }
    }
  );

  const items = data?.buyers.items || [];

  const dataUm = useMemo(() => {
    const items = data?.buyers.items || [];
    return items.map((item) => ({
      label: item.displayName,
      value: item.id,
      img: item.asset?.url,
      isOnline: item?.isOnline || false,
      isChatMessage: item?.facilityCultivatorRelations?.find(
        (facilityRelation) => facilityRelation?.facilityBuyer?.id === item?.id
      )?.isMessageBuyer
    }));
  }, [data]);

  const handleLoadMore = useCallback(() => {
    const newTake = take + 10;

    fetchMore({
      variables: {
        payload: {
          paginate: {
            skip: 0,
            take: newTake
          }
        }
      }
    });

    setTake(newTake);
  }, [take, fetchMore]);

  return (
    <Grow in={!loading}>
      {dataUm.length ? (
        <Box sx={styles.tabs}>
          {isMobile && (
            <Typography variant="subtitle1" color={colors.gray5} my={2} px={1}>
              Choose a facility to begin chatting.
            </Typography>
          )}
          <Box sx={styles.list}>
            {dataUm.map((item) => (
              <CultivatorMessagesTab
                key={item.value}
                item={item}
                isSelected={tab.value === item.value}
                setTab={setTab}
              />
            ))}
          </Box>
          {total > items.length && (
            <Button fullWidth onClick={handleLoadMore} disabled={loading}>
              Load More
            </Button>
          )}
        </Box>
      ) : (
        <Box sx={styles.emptyTabs}>
          <Typography variant="subtitle1">No users you can chat with.</Typography>
        </Box>
      )}
    </Grow>
  );
};

export default CultivatorMessagesTabs;
