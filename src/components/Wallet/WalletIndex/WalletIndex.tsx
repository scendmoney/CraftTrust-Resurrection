import { useEffect, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import CachedIcon from '@mui/icons-material/Cached';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {
  type INftModel,
  type INfTsModelDto,
  type IQueryClientNftsArgs,
  FilterFieldTypeEnum,
  FilterOperationEnum,
  NftStatusEnum,
  SurveyStatusEnum
} from 'graphql/_server';
import CLIENT_NFTS from 'graphql/queries/clientNfts';
import { QRCodeCanvas } from 'qrcode.react';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import Loader from 'components/Loader/Loader';

import WalletSidebar from '../shared/WalletSidebar/WalletSidebar';

import WalletCards from './WalletCards/WalletCards';
import WalletNft from './WalletNft/WalletNft';
import WalletNftOpened from './WalletNftOpened/WalletNftOpened';
import WalletReward from './WalletReward/WalletReward';
import styles from './styles';
import { IWalletQrCodeReward } from './types';
const WalletIndex = () => {
  const [showQR, setShowQr] = useState<IWalletQrCodeReward>(null);
  // eslint-disable-next-line no-console
  console.log(showQR);
  const {
    data: dataBlocked,
    refetch,
    startPolling,
    loading: loadingData
  } = useQuery<{ clientNfts: INfTsModelDto }, IQueryClientNftsArgs>(CLIENT_NFTS, {
    variables: {
      payload: {
        paginate: {
          skip: 0,
          take: 200
        },
        filters: [
          {
            columnName: 'status',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: [NftStatusEnum.Blocked, NftStatusEnum.Done, NftStatusEnum.Processing]
          }
        ]
      }
    },
    fetchPolicy: 'network-only'
  });

  const [selectedItem, setSelectedItem] = useState<INftModel | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const items = dataBlocked?.clientNfts?.items || [];

  useEffect(() => {
    if (dataBlocked) {
      startPolling(20000);
    }
  }, [dataBlocked]);

  const stateUm = useMemo(() => {
    return {
      isRewards: !!items.find(
        (item) =>
          item.status === NftStatusEnum.Processing ||
          item.status === NftStatusEnum.Blocked ||
          (item.status === NftStatusEnum.Done &&
            item.survey?.status === SurveyStatusEnum.SurveySent)
      ),
      isRewardsReedemable: !!items.find(
        (item) =>
          item.status === NftStatusEnum.Done && item.survey?.status === SurveyStatusEnum.SurveySent
      ),
      isNfts: !!items.find((item) => item.status === NftStatusEnum.Done)
    };
  }, [items]);

  if (loadingData) {
    return <Loader />;
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.block}>
        <Box sx={styles.cards}>
          {stateUm.isRewards ? (
            <IconButton onClick={() => refetch()} sx={styles.update}>
              <CachedIcon />
            </IconButton>
          ) : null}

          <WalletCards items={items} state={stateUm} setShowQr={setShowQr} />
        </Box>

        {stateUm.isRewards ? (
          <>
            <Box pl={2} mb={2}>
              <Typography variant="h3" fontSize={16}>
                Earn Rewards
              </Typography>
            </Box>

            <Box sx={styles.rewards} display="flex" gap={1} flexDirection="column">
              {items.map((item) => {
                return <WalletReward key={item.id} item={item} setShowQr={setShowQr} />;
              })}
            </Box>
          </>
        ) : null}

        {stateUm.isNfts ? (
          <>
            <Box mt={4} pl={2}>
              <Typography variant="h3" fontSize={16}>
                NFT Collection
              </Typography>
            </Box>
            <Box sx={styles.nfts} mt={2} mb={6} display="flex" gap={1}>
              {items.map((item) => {
                return <WalletNft key={item.id} item={item} onSelect={setSelectedItem} />;
              })}
            </Box>
          </>
        ) : null}
      </Box>

      <WalletSidebar open={Boolean(showQR)} close={() => setShowQr(null)}>
        {showQR ? (
          <Box p={4}>
            <Box display="flex" justifyContent={'center'}>
              <QRCodeCanvas
                id="qrcodecanvas"
                value={showQR.url}
                size={280}
                bgColor={'#ffffff'}
                fgColor={'#000000'}
                level={'L'}
                includeMargin={false}
              />
            </Box>
            <Box my={4}>
              <Typography fontSize={32} mt={2} variant="h2">
                Your reward: {items[0]?.survey?.subcompany?.company?.productSurvey?.item?.name}{' '}
                from&nbsp;
                {items[0]?.survey?.subcompany?.company?.facilityCultivator?.displayName ||
                  'cultivator'}
              </Typography>
              <Typography mt={2} mb={2} fontSize={14} variant="body2">
                Show QR to your budtender and enjoy your well-deserved reward!
              </Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <AvatarUncontrolled src={showQR.image} type={48} />
              <Typography fontSize={16} variant="h2">
                {showQR.title}
              </Typography>
            </Box>
          </Box>
        ) : (
          <></>
        )}
      </WalletSidebar>

      <WalletNftOpened item={selectedItem} close={() => setSelectedItem(null)} />
    </Box>
  );
};

export default WalletIndex;
