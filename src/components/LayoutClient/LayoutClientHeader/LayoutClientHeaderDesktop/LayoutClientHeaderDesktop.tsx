import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, IconButton } from '@mui/material';
import { Menu } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { ICartModel, IUserModel } from 'graphql/_server';
import { CARTS_HEADER } from 'graphql/queries/carts';
import { ME_FACILITY_EDIT } from 'graphql/queries/me';
import { Route } from 'next';
import CartIcon from 'resources/iconsMui/CartIcon';
import ChatIcon from 'resources/iconsMui/ChatIcon';
import Routes from 'routes';
import { TModalStateAction } from 'sharedArchitech/hooks/useModalState/useModalState';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import ContextMenu from 'sharedProject/components/ContextMenu/ContextMenu';
import useMe from 'sharedProject/hooks/useMe';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import MenuLogo from 'components/LayoutClient/MenuLogo/MenuLogo';
import Search from 'components/LayoutClient/Search/Search';

import { listItems1 } from './listItems';
import styles from './styles';

const LayoutClientHeaderDesktop: FC<{
  openChat: TModalStateAction<number>;
  isChatMessage: boolean;
}> = ({ openChat, isChatMessage }) => {
  const { dataMe } = useMe();
  const { data, loading } = useQuery<{ me: IUserModel }>(ME_FACILITY_EDIT);
  const [cartsLength, setCartsLength] = useState<number>(0);
  useQuery<{ carts: ICartModel[] }>(CARTS_HEADER, {
    onCompleted: (data) => {
      const items = data.carts;
      if (items) {
        const totalCount = items.reduce(
          (accumulator, cart) => accumulator + cart.cartItems.length,
          0
        );
        setCartsLength(totalCount);
      }
    }
  });

  const facilityUm = useMemo(() => {
    return dataMe?.context;
  }, [dataMe]);

  const { goTo } = useProjectRouter();

  const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);

  const handleOpenUser = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorUser(event.currentTarget);
  };

  const handleCloseUser = () => {
    setAnchorUser(null);
  };

  const openUser = Boolean(anchorUser);
  return (
    <Box sx={styles.container}>
      <Box sx={styles.wrapperHeader}>
        <MenuLogo />
        <Search />
        {/* <Box sx={styles.listWrapper}>
          {listItems1.map((item) => (
            <ButtonUi
              var={EButtonType.Text}
              key={item.label}
              disabled={item.disabled}
              style={{ color: 'black' }}
              onClick={() => handleRoute(item.value)}
            >
              {item.label}
            </ButtonUi>
          ))}
        </Box> */}
      </Box>

      <Box sx={styles.listWrapper}>
        <IconButton onClick={() => goTo(Routes.CLIENT_CART)}>
          <Badge badgeContent={cartsLength} color="secondary">
            <CartIcon />
          </Badge>
        </IconButton>

        <IconButton onClick={() => openChat()}>
          <Badge invisible={!isChatMessage} color="secondary" variant="dot">
            <ChatIcon />
          </Badge>
        </IconButton>

        <Box sx={styles.avatarsWrapper}>
          <IconButton onClick={handleOpenUser} disableRipple>
            <Avatar src={facilityUm?.asset?.url || undefined} sx={styles.avatarFacility} />
          </IconButton>
          <IconButton onClick={handleOpenUser}>
            <Badge invisible={true} variant="dot" color="secondary" sx={styles.badge}>
              <Avatar src={dataMe?.asset?.url || undefined} sx={styles.avatar} />
            </Badge>
          </IconButton>
        </Box>

        <Menu
          id="user-button"
          anchorEl={anchorUser}
          onClose={handleCloseUser}
          open={openUser}
          MenuListProps={{
            'aria-labelledby': 'user-button'
          }}
          sx={{ mt: 1 }}
        >
          <ContextMenu
            close={handleCloseUser}
            user={dataMe}
            facility={data?.me?.userToFacilities}
            loading={loading}
            isBuyer
          />
        </Menu>
      </Box>
    </Box>
  );

  function handleRoute(value: Route) {
    goTo(value);
  }
};

export default LayoutClientHeaderDesktop;
