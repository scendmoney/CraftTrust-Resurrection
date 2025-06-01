import { FC, useMemo } from 'react';
import Button from '@mui/material/Button';
import splitCamelCase from 'utils/splitCamelCase';

import styles from './styles';

const HeaderTab: FC<{
  item: string;
  isSelected: boolean;
  setTab: (newTab: string) => void;
}> = ({ item, isSelected, setTab }) => {
  const stylesUm = useMemo(() => {
    return styles(isSelected);
  }, [isSelected]);

  return (
    <Button sx={stylesUm.tab} onClick={handleOnClick}>
      {splitCamelCase(item)}
    </Button>
  );

  function handleOnClick() {
    setTab(item);
  }
};

export default HeaderTab;
