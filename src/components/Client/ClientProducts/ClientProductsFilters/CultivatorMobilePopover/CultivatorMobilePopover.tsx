import { FC, memo, MouseEvent, useMemo, useState } from 'react';
import { MenuItem, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Popover from '@mui/material/Popover';
import { IFacilityModel } from 'graphql/_server';
import Routes from 'routes';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';
const CultivatorMobilePopover: FC<{
  cultivators: IFacilityModel[];
}> = ({ cultivators }) => {
  const { goTo } = useProjectRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const cultivatorsUm = useMemo(() => {
    if (cultivators) {
      return cultivators.map((item) => {
        return {
          value: item.id,
          label: item.displayName || item.name || 'Unnamed',
          logo: item.asset?.url || ' '
        };
      });
    }
    return [];
  }, [cultivators]);

  const open = Boolean(anchorEl);

  const handleClickListItem = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();

    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const stylesUm = useMemo(() => {
    return styles(Boolean(anchorEl));
  }, [anchorEl]);

  return (
    <>
      <Box sx={stylesUm.wrapper}>
        <Button sx={stylesUm.button} onClick={handleClickListItem}>
          Cultivators
        </Button>
      </Box>
      <Popover
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        disableRestoreFocus
        sx={stylesUm.popover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <Box sx={stylesUm.menu}>
          <Box sx={stylesUm.block}>
            {cultivatorsUm.map((cultivator) => (
              <MenuItem
                key={cultivator.label}
                value={cultivator.label}
                onClick={() => goTo(`${Routes.CLIENT_STOREFRONT}/${cultivator.value}`)}
                sx={{ gap: 1, px: 0.5 }}
              >
                {cultivator.logo && (
                  <AvatarUncontrolled src={cultivator.logo || undefined} type={32} />
                )}
                <Typography variant="body1" fontWeight={500} sx={{ textWrap: 'wrap' }}>
                  {cultivator.label}
                </Typography>
              </MenuItem>
            ))}
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default memo(CultivatorMobilePopover);
