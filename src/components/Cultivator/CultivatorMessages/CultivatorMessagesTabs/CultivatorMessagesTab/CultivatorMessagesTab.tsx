import { FC, useMemo } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import truncateText from 'sharedArchitech/utils/truncateText';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import { ILabelValueWithAlert } from '../CultivatorMessagesTabs';

import styles from './styles';
const CultivatorMessagesTab: FC<{
  item: ILabelValueWithAlert;
  isSelected: boolean;
  setTab: (newTab: ILabelValueWithAlert) => void;
}> = ({ item, isSelected, setTab }) => {
  const stylesUm = useMemo(() => {
    return styles(isSelected);
  }, [isSelected]);

  return (
    <Button
      onClick={handleOnClick}
      sx={stylesUm.button}
      fullWidth
      startIcon={
        <Badge
          invisible={!item.isOnline}
          sx={stylesUm.badge}
          variant="dot"
          color="success"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
        >
          <AvatarUncontrolled src={item.img} type={48} isGrayBackground />
        </Badge>
      }
      endIcon={item.isChatMessage ? <Box sx={stylesUm.newRoundNotification} /> : undefined}
    >
      <Typography variant="body1" fontWeight={500} display="flex" flexGrow={1}>
        {truncateText(item.label, 30)}
      </Typography>
    </Button>
  );

  function handleOnClick() {
    setTab(item);
  }
};

export default CultivatorMessagesTab;
