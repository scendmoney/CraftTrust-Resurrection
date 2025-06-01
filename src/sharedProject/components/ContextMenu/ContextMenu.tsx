import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import { Avatar, Badge, Box, CardActionArea, Divider, Typography } from '@mui/material';
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
import { SUBCOMPANIES_BUYER_NEW_REQUEST } from 'graphql/queries/subcompaniesBuyer';
import { colors } from 'mui/theme/colors';
import CompaniesIcon from 'resources/iconsMui/CompaniesIcon';
import LogoutIcon from 'resources/iconsMui/LogoutIcon';
import OrderIcon from 'resources/iconsMui/OrderIcon';
import ProfileIcon from 'resources/iconsMui/ProfileIcon';
import SettingIcon from 'resources/iconsMui/SettingIcon';
import TransactionIcon from 'resources/iconsMui/TransactionIcon';
import ViewOutlinedIcon from 'resources/iconsMui/ViewOutlinedIcon';
import Routes from 'routes';
import { TVoidFun } from 'sharedArchitech/types';
import truncateText from 'sharedArchitech/utils/truncateText';
import useLogout from 'sharedProject/hooks/useLogout';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import MenuBalances from '../MenuBalances/MenuBalances';
import PaymentOverdueStatus from '../PaymentOverdueStatus/PaymentOverdueStatus';

import ContextMenuListFasility from './ContextMenuListFasility/ContextMenuListFasility';
import styles from './styles';

const ContextMenu: FC<{
  close: TVoidFun;
  user: IUserModel | undefined;
  facility: IFacilityModel[] | undefined;
  loading: boolean;
  isBuyer?: boolean;
}> = ({ close, user, facility, isBuyer = false }) => {
  const { logout } = useLogout();
  const { goToModal, goTo, query, router } = useProjectRouter();
  const [cultivatorFacilities, setCultivatorFacilities] = useState<IFacilityModel[]>([]);
  const [buyerFacilities, setBuyerFacilities] = useState<IFacilityModel[]>([]);
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
      },
      skip: !isBuyer
    }
  );

  useMemo(() => {
    if (facility) {
      const newCultivatorFacilities: IFacilityModel[] = [];
      const newBuyerFacilities: IFacilityModel[] = [];

      facility.map((item) => {
        if (item.id !== user?.context?.id) {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.context?.id]);

  const counterFacility = useMemo(() => {
    return facility?.filter((item) => item.id !== user?.context?.id);
  }, [facility, user?.context?.id]);

  const facilityRoleUm = useMemo(() => {
    const role = user?.context?.role;
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
      case FacilityRoleEnum.Cultivator:
        return (
          <>
            <CardActionArea
              sx={styles.listItem}
              onClick={() => handleRoute('cultivаtor-storefront')}
            >
              <ViewOutlinedIcon fill={colors.secondary} />
              <Typography variant="body1" fontWeight={500}>
                Preview Storefront
              </Typography>
            </CardActionArea>
            <CardActionArea onClick={goToFacility} sx={styles.listItem}>
              <SettingIcon fill={colors.secondary} />
              <Typography variant="body1" fontWeight={500}>
                Manage Facility
              </Typography>
            </CardActionArea>
          </>
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
            {isBuyer ? null : (
              <>
                <CardActionArea
                  sx={styles.listItem}
                  onClick={() => handleRoute('cultivаtor-storefront')}
                >
                  <ViewOutlinedIcon fill={colors.secondary} />
                  <Typography variant="body1" fontWeight={500}>
                    Preview Storefront
                  </Typography>
                </CardActionArea>
              </>
            )}
          </>
        );
      default:
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, user?.context?.role]);

  const facilityEmployeeRoleUm = useMemo(() => {
    const role = user?.context?.role;
    switch (role) {
      case FacilityRoleEnum.BuyerAndCultivator:
        return (
          <>
            {isBuyer ? null : (
              <>
                <CardActionArea
                  sx={styles.listItem}
                  onClick={() => handleRoute('cultivаtor-storefront')}
                >
                  <ViewOutlinedIcon fill={colors.secondary} />
                  <Typography variant="body1" fontWeight={500}>
                    Preview Storefront
                  </Typography>
                </CardActionArea>
              </>
            )}
          </>
        );
      case FacilityRoleEnum.Cultivator:
        return (
          <CardActionArea sx={styles.listItem} onClick={() => handleRoute('cultivаtor-storefront')}>
            <ViewOutlinedIcon fill={colors.secondary} />
            <Typography variant="body1" fontWeight={500}>
              Preview Storefront
            </Typography>
          </CardActionArea>
        );
      default:
        return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, user?.context?.role]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.userContainer}>
        <Box sx={styles.nameWrapper}>
          <Avatar src={user?.context?.asset?.url || undefined} sx={styles.facilityAvatar} />
          <Typography variant="body1" fontWeight={500} sx={styles.name}>
            {truncateText(user?.context?.displayName, 25) || user?.email}
          </Typography>
        </Box>
        {isBuyer ? null : <MenuBalances close={close} />}

        {isBuyer && <PaymentOverdueStatus close={close} />}

        {isBuyer ? (
          <>
            <CardActionArea sx={styles.listItem} onClick={() => goToOrders()}>
              <OrderIcon fill={colors.secondary} />
              <Typography variant="body1" fontWeight={500}>
                Orders
              </Typography>
            </CardActionArea>
            <CardActionArea
              sx={styles.listItem}
              onClick={() => {
                close();
                goTo(Routes.CLIENT_TRANSACTIONS);
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
                  close();
                  goTo(Routes.CLIENT_PROMO_CAMPAIGNS);
                }}
              >
                <Badge invisible={!newSubcamapignRequest} color="secondary" variant="dot">
                  <CompaniesIcon htmlColor={colors.secondary} />
                </Badge>
                <Typography variant="body1" fontWeight={500}>
                  Campaigns
                </Typography>
              </CardActionArea>
              {isBuyer ? (
                <IconButton
                  size="small"
                  onClick={() => {
                    close();
                    goToModal({
                      modalId: 'qr-code'
                    });
                  }}
                >
                  <QrCodeScannerIcon fontSize="small" />
                </IconButton>
              ) : null}
            </Box>
          </>
        ) : null}
        <CardActionArea onClick={() => handleRoute('user-profile')} sx={styles.listItem}>
          <ProfileIcon fill={colors.secondary} />
          <Typography variant="body1" fontWeight={500}>
            My Profile
          </Typography>
        </CardActionArea>
        {user?.context?.owner?.id === user?.id ? facilityRoleUm : facilityEmployeeRoleUm}
        <CardActionArea onClick={logout} sx={styles.listItem}>
          <LogoutIcon fill={colors.secondary} />
          <Typography variant="body1" fontWeight={500}>
            Logout
          </Typography>
        </CardActionArea>
      </Box>
      <>
        {(counterFacility?.length !== 0 ||
          user?.context?.role === FacilityRoleEnum.BuyerAndCultivator) && (
          <>
            <Box sx={styles.divider}>
              <Divider />
            </Box>

            {cultivatorFacilities.length > 0 && (
              <>
                <Box sx={styles.facilitiesContainer}>
                  <Typography variant="caption" fontWeight={500} sx={{ color: colors.gray5 }}>
                    Cultivator Facilities
                  </Typography>
                  {cultivatorFacilities.map((item) => (
                    <ContextMenuListFasility
                      facility={item}
                      key={`${item.id}-cultivator`}
                      user={user}
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
                  {buyerFacilities.map((item) => (
                    <ContextMenuListFasility
                      facility={item}
                      key={`${item.id}-buyer`}
                      user={user}
                      close={close}
                      menuRole={FacilityRoleEnum.Buyer}
                    />
                  ))}
                </Box>
              </>
            )}
          </>
        )}
      </>
    </Box>
  );

  function handleRoute(modalId: string) {
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
    close();
    if (user?.context?.role === FacilityRoleEnum.Buyer) {
      goTo(Routes.CLIENT_FACILITY);
    }
    if (user?.context?.role === FacilityRoleEnum.Cultivator) {
      goToModal({
        modalId: 'facility-profile'
      });
    }
    if (user?.context?.role === FacilityRoleEnum.BuyerAndCultivator) {
      if (isBuyer) {
        goTo(Routes.CLIENT_FACILITY);
      } else {
        goToModal({
          modalId: 'facility-profile'
        });
      }
    }
  }

  function goToOrders() {
    close();
    goTo(Routes.CLIENT_ORDERS);
  }
};

export default ContextMenu;
