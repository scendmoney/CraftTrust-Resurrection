import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import styles from './styles';

const HeaderTab: FC<{
  item: string;
  isSelected: boolean;
  setTab: Dispatch<SetStateAction<string>>;
}> = ({ item, isSelected, setTab }) => {
  const stylesUm = useMemo(() => {
    return styles(isSelected);
  }, [isSelected]);

  return (
    <Button sx={stylesUm.tab} onClick={handleOnClick}>
      <Typography variant="h4" fontWeight="400">
        {item}
      </Typography>
    </Button>
  );

  function handleOnClick() {
    setTab(item);
  }
};

export default HeaderTab;
