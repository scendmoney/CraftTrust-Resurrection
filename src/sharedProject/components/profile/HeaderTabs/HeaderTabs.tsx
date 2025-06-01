import { Dispatch, FC, SetStateAction } from 'react';
import Box from '@mui/material/Box';

import HeaderTab from './HeaderTab/HeaderTab';
import styles from './styles';

const HeaderTabs: FC<{
  tabs: string[];
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
}> = ({ tabs, tab, setTab }) => {
  return (
    <Box sx={styles.tabs}>
      {tabs.map((item) => {
        return <HeaderTab key={item} item={item} isSelected={tab === item} setTab={setTab} />;
      })}
      <Box sx={styles.border} />
    </Box>
  );
};

export default HeaderTabs;
