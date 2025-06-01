import { FC } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import RefetchIcon from 'resources/iconsMui/RefetchIcon';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';

import HeaderTab from './HeaderTab/HeaderTab';
import styles from './styles';

const HeaderTabs: FC<{
  tabs: string[];
  tab: string;
  setTab: (newTab: string) => void;
  refetchQuery: string;
}> = ({ tabs, tab, setTab, refetchQuery }) => {
  const refetchWithCache = useRefetchWithCache([refetchQuery]);
  return (
    <Box sx={styles.tabs}>
      <Box sx={styles.tabsWrapper}>
        {tabs.map((item) => {
          return <HeaderTab key={item} item={item} isSelected={tab === item} setTab={setTab} />;
        })}
      </Box>

      <IconButton onClick={refetchWithCache} sx={styles.refetch}>
        <RefetchIcon />
      </IconButton>
    </Box>
  );
};

export default HeaderTabs;
