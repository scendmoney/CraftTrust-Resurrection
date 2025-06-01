import { FC, ReactElement, useMemo } from 'react';
import { Badge, Button, Typography } from '@mui/material';
import Routes from 'routes';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';

type TListItem = {
  value: Routes;
  label: string;
  selectedWhen: Routes[];
  icon: ReactElement;
  disabled?: boolean;
  isAlert?: boolean;
};

const MenuDrawerItem: FC<{ item: TListItem }> = ({ item }) => {
  const { pathname, goTo } = useProjectRouter();
  const stylesUm = useMemo(() => {
    return styles(item.selectedWhen.includes(pathname as Routes));
  }, [item.selectedWhen, pathname]);
  return (
    <Button
      fullWidth
      startIcon={item.icon}
      onClick={() => goTo(item.value)}
      disabled={item.disabled}
      // selected={item.selectedWhen.includes(pathname as Routes)}
      sx={stylesUm.listItem}
    >
      <Badge sx={stylesUm.badge} invisible={!item.isAlert} color="secondary" variant="dot">
        <Typography variant="body1" fontWeight={500}>
          {item.label}
        </Typography>
      </Badge>
    </Button>
  );
};

export default MenuDrawerItem;
