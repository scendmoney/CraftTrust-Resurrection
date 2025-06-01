import { FC } from 'react';
import { Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { colors } from 'mui/theme/colors';
import { TLabelValue } from 'sharedArchitech/types';

import LayoutClientHeaderChatWrapperHeaderTab from './LayoutClientHeaderChatWrapperHeaderTab/LayoutClientHeaderChatWrapperHeaderTab';
import styles from './styles';

export interface ILabelValueWithAlert extends TLabelValue {
  isChatMessage?: boolean;
  isOnline?: boolean;
}

const HeaderTabs: FC<{
  tabs: ILabelValueWithAlert[];
  tab: ILabelValueWithAlert;
  setTab: (newTab: ILabelValueWithAlert) => void;
  chatSid?: string | null;
}> = ({ tabs, tab, setTab, chatSid }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile && !chatSid) {
    return tabs.length ? (
      <Box sx={styles.fullHeight}>
        <Typography variant="subtitle1" color={colors.gray5} my={2} px={1}>
          Choose a facility to begin chatting.
        </Typography>

        {tabs.map((item) => {
          return (
            <LayoutClientHeaderChatWrapperHeaderTab
              key={item.value}
              item={item}
              isSelected={tab.value === item.value}
              setTab={setTab}
              fullWidth
            />
          );
        })}
      </Box>
    ) : (
      <Box sx={styles.emptyTabs}>
        <Typography variant="subtitle1">No users you can chat with.</Typography>
      </Box>
    );
  }

  return tabs.length ? (
    <Box sx={styles.tabs}>
      {tabs.map((item) => {
        return (
          <LayoutClientHeaderChatWrapperHeaderTab
            key={item.value}
            item={item}
            isSelected={tab.value === item.value}
            setTab={setTab}
          />
        );
      })}
    </Box>
  ) : (
    <Box sx={styles.emptyTabs}>
      <Typography variant="subtitle1">No users you can chat with.</Typography>
    </Box>
  );
};

export default HeaderTabs;
