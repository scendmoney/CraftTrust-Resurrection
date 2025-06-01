import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Avatar, Badge, CardActionArea } from '@mui/material';
import { Box, Divider, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import {
  FacilityRoleEnum,
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IFacilityModel,
  IQuerySubcompaniesBuyerArgs,
  ISubcompaniesModel,
  IUserModel
} from 'graphql/_server';
import { ME_FACILITY_EDIT } from 'graphql/queries/me';
import { SUBCOMPANIES_BUYER_NEW_REQUEST } from 'graphql/queries/subcompaniesBuyer';
import { colors } from 'mui/theme/colors';
import { Route } from 'next';
import CartIcon from 'resources/iconsMui/CartIcon';
import CompaniesIcon from 'resources/iconsMui/CompaniesIcon';
import LogoutIcon from 'resources/iconsMui/LogoutIcon';
import OrderIcon from 'resources/iconsMui/OrderIcon';
import ProfileIcon from 'resources/iconsMui/ProfileIcon';
import SettingIcon from 'resources/iconsMui/SettingIcon';
import TransactionIcon from 'resources/iconsMui/TransactionIcon';
import Routes from 'routes';
import { TVoidFun } from 'sharedArchitech/types';
import ContextMenuListFasility from 'sharedProject/components/ContextMenu/ContextMenuListFasility/ContextMenuListFasility';
import PaymentOverdueStatus from 'sharedProject/components/PaymentOverdueStatus/PaymentOverdueStatus';
import useLogout from 'sharedProject/hooks/useLogout';
import useMe from 'sharedProject/hooks/useMe';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import MenuLogo from 'components/LayoutClient/MenuLogo/MenuLogo';
import LoaderInline from 'components/LoaderInline/LoaderInline';

import { listItems1 } from './listItems';
import styles from './styles';

const MenuDrawer: FC<{ close: TVoidFun }> = ({ close }) => {
  const { goTo, goToModal, query, router } = useProjectRouter();
  const { logout } = useLogout();
  const { dataMe } = useMe();
  const [cultivatorFacilities, setCultivatorFacilities] = useState<IFacilityModel[]>([]);
  const [buyerFacilities, setBuyerFacilities] = useState<IFacilityModel[]>([]);
  const { data: facilityData, loading: loadingFacility } = useQuery<{ me: IUserModel }>(
    ME_FACILITY_EDIT
  );
  const facility = facilityData?.me.userToFacilities;
  useMemo(() => {
    if (facility) {
      const newCultivatorFacilities: IFacilityModel[] = [];
      const newBuyerFacilities: IFacilityModel[] = [];

      facility.map((item) => {
        if (item.id !== dataMe?.context?.id) {
          if (item.role === FacilityRoleEnum.Cultivator) {
            newCultivatorFacilities.push(item);
          }
          if (item.role === FacilityRoleEnum.Buyer) {
            newBuyerFacilities.push(item);
          }
          if (item.role === FacilityRoleEnum.BuyerAndCultivator) {
            newCultivatorFacilities.push(item);
            newBuyerFacilities.push(item);
          }
        } else {
          if (item.role === FacilityRoleEnum.BuyerAndCultivator) {
            if (router.pathname.includes('/client')) {
              newCultivatorFacilities.push(item);
            } else {
              newBuyerFacilities.push(item);
            }
          }
        }
      });

      setCultivatorFacilities(newCultivatorFacilities);
      setBuyerFacilities(newBuyerFacilities);
    }
  }, [dataMe?.context?.id, facility, router.pathname]);

  const [newSubcamapignRequest, setNewSubcamapignRequest] = useState(false);

  useQuery<{ subcompaniesBuyer: ISubcompaniesModel }, IQuerySubcompaniesBuyerArgs>(
    SUBCOMPANIES_BUYER_NEW_REQUEST,
    {
      variables: {
        payload: {
          filters: [
            {
              columnName: 'isSurveyPending',
              operation: FilterOperationEnum.Equal,
              type: FilterFieldTypeEnum.Boolean,
              value: ['true']
            }
          ],
          paginate: {
            skip: 0,
            take: 1
          }
        }
      },
      onCompleted: (data) => {
        const items = data.subcompaniesBuyer.items || [];
        setNewSubcamapignRequest(items.length > 0);
      }
    }
  );

  const facilityListUm = useMemo(() => {
    return (
      <>
        {cultivatorFacilities.length > 0 && (
          <>
            <Box sx={styles.facilitiesContainer}>
              <Typography variant="caption" fontWeight={500} sx={{ color: colors.gray5 }}>
                Cultivator Facilities
              </Typography>
              {cultivatorFacilities.map((item, index) => (
                <ContextMenuListFasility
                  facility={item}
                  key={`${item.id}-cultivator-${index}`}
                  user={dataMe}
                  close={close}
                  menuRole={FacilityRoleEnum.Cultivator}
                />
              ))}
            </Box>
          </>
        )}
        {buyerFacilities.length > 0 && (
          <>
            <Box sx={styles.facilitiesContainer}>
              <Typography variant="caption" fontWeight={500} sx={{ color: colors.gray5 }}>
                Buyer Facilities
              </Typography>
              {buyerFacilities.map((item, index) => (
                <ContextMenuListFasility
                  facility={item}
                  key={`${item.id}-buyer-${index}`}
                  user={dataMe}
                  close={close}
                  menuRole={FacilityRoleEnum.Buyer}
                />
              ))}
            </Box>
          </>
        )}
      </>
    );
  }, [buyerFacilities, close, cultivatorFacilities, dataMe]);

  const counterFacility = useMemo(() => {
    return facility?.filter((item) => item.id !== dataMe?.context?.id);
  }, [dataMe?.context?.id, facility]);

  const facilityRoleUm = useMemo(() => {
    const role = dataMe?.context?.role;
    switch (role) {
      case FacilityRoleEnum.Buyer:
        return (
          <CardActionArea onClick={goToFacility} sx={styles.listItem}>
            <SettingIcon fill={colors.secondary} />
            <Typography variant="body1" fontWeight={500}>
              Manage Facility
            </Typography>
          </CardActionArea>
        );
      case FacilityRoleEnum.BuyerAndCultivator:
        return (
          <>
            <CardActionArea onClick={goToFacility} sx={styles.listItem}>
              <SettingIcon fill={colors.secondary} />
              <Typography variant="body1" fontWeight={500}>
                Manage Facility
              </Typography>
            </CardActionArea>
          </>
        );
      default:
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, dataMe?.context?.role]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <MenuLogo />
        <Box sx={styles.iconContainer}>
          <Box sx={styles.avatarPosition}>
            <Avatar src={dataMe?.asset?.url || undefined} />
          </Box>
          <Box sx={styles.menuPosition}>
            <IconButton sx={styles.menuIcon} onClick={close}>
              <CloseIcon htmlColor={colors.white} />
            </IconButton>
          </Box>
        </Box>
      </Box>

      <Box sx={styles.userContainer}>
        <Box sx={styles.nameWrapperFacility}>
          <Avatar src={dataMe?.context?.asset?.url || undefined} sx={styles.facilityAvatar} />
          <Typography variant="body1" fontWeight={500} sx={styles.name}>
            {dataMe?.context?.displayName}
          </Typography>
        </Box>

        <PaymentOverdueStatus close={close} isSmall />
        <CardActionArea sx={styles.listItem} onClick={() => handleRoute(Routes.CLIENT_CART)}>
          <CartIcon fill={colors.secondary} />
          <Typography variant="body1" fontWeight={500}>
            Cart
          </Typography>
        </CardActionArea>
        <CardActionArea sx={styles.listItem} onClick={() => handleRoute(Routes.CLIENT_ORDERS)}>
          <OrderIcon fill={colors.secondary} />
          <Typography variant="body1" fontWeight={500}>
            Orders
          </Typography>
        </CardActionArea>
        <CardActionArea
          sx={styles.listItem}
          onClick={() => {
            handleRoute(Routes.CLIENT_TRANSACTIONS);
          }}
        >
          <TransactionIcon htmlColor={colors.secondary} />
          <Typography variant="body1" fontWeight={500}>
            Transactions
          </Typography>
        </CardActionArea>
        <Box display="flex">
          <CardActionArea
            sx={styles.listItem}
            onClick={() => {
              handleRoute(Routes.CLIENT_PROMO_CAMPAIGNS);
            }}
          >
            <Badge invisible={!newSubcamapignRequest} color="secondary" variant="dot">
              <CompaniesIcon htmlColor={colors.secondary} />
            </Badge>
            <Typography variant="body1" fontWeight={500}>
              Campaigns
            </Typography>
          </CardActionArea>
          <IconButton size="small" onClick={() => handleRouteModal('qr-code')}>
            <QrCodeScannerIcon fontSize="small" />
          </IconButton>
        </Box>

        <Box sx={styles.divider}>
          <Divider />
        </Box>
        <CardActionArea onClick={() => handleRouteModal('user-profile')} sx={styles.listItem}>
          <ProfileIcon fill={colors.secondary} />
          <Typography variant="body1" fontWeight={500}>
            My Profile
          </Typography>
        </CardActionArea>
        {dataMe?.context?.owner?.id === dataMe?.id ? facilityRoleUm : null}
        <Box sx={styles.divider}>
          <Divider />
        </Box>
        <CardActionArea onClick={logout} sx={styles.listItem}>
          <LogoutIcon fill={colors.secondary} />
          <Typography variant="body1" fontWeight={500}>
            Logout
          </Typography>
        </CardActionArea>
      </Box>

      {/* <Box sx={styles.userContainer}>
        {listItems1.map((item) => (
          <CardActionArea
            onClick={() => handleRoute(item.value)}
            sx={styles.listItem}
            key={item.label}
            disabled={item.disabled}
          >
            <Typography variant="subtitle1" fontWeight={500}>
              {item.label}
            </Typography>
          </CardActionArea>
        ))}
      </Box> */}

      {counterFacility?.length !== 0 ? (
        <Box sx={styles.facilitiesContainer}>
          {loadingFacility ? <LoaderInline /> : facilityListUm}
        </Box>
      ) : dataMe?.context?.role === FacilityRoleEnum.BuyerAndCultivator ? (
        <Box sx={styles.facilitiesContainer}>
          {loadingFacility ? <LoaderInline /> : facilityListUm}
        </Box>
      ) : null}
    </Box>
  );

  function handleRouteModal(modalId: string) {
    close();
    goToModal(
      query?.id
        ? {
            modalId: modalId,
            id: query?.id
          }
        : {
            modalId: modalId
          }
    );
  }

  function goToFacility() {
    goTo(Routes.CLIENT_FACILITY);
    close();
  }

  function handleRoute(value: Route) {
    close();
    goTo(value);
  }
};

export default MenuDrawer;
