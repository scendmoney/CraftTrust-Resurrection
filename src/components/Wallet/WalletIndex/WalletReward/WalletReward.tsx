import { type Dispatch, type FC, type SetStateAction, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient } from '@apollo/client';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type INftModel, NftStatusEnum, SurveyStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';

import { IWalletQrCodeReward } from '../types';

import styles from './styles';

const WalletReward: FC<{
  item: INftModel;

  setShowQr: Dispatch<SetStateAction<IWalletQrCodeReward>>;
}> = ({ item, setShowQr }) => {
  const router = useRouter();
  const client = useApolloClient();
  const stateUm = useMemo(() => {
    if (
      item.status === NftStatusEnum.Blocked &&
      item.survey?.status === SurveyStatusEnum.BuyerConfirmed &&
      item?.survey?.subcompany?.company?.productSurvey
    ) {
      return {
        isDisabled: false,
        buttonText: 'Earn',
        title: 'Get rewards by rating our cannabis flower',
        status: item?.survey?.subcompany?.company?.productSurvey?.item?.name,
        action: () => router.push(`/ratings/${item?.survey?.id}`),
        image: item.survey.subcompany.company.productSurvey.thumbnail?.url
      };
    }
    if (item.status === NftStatusEnum.Blocked && item.survey?.status === SurveyStatusEnum.New) {
      return {
        isDisabled: false,
        buttonText: 'Check',
        title: `Waiting for confirmation`,
        status: `Survey from ${item.survey?.subcompany?.company?.facilityCultivator?.displayName}`,

        action: () => handleCheck(),
        image: ''
      };
    }
    if (
      item.status === NftStatusEnum.Done &&
      item.survey?.status === SurveyStatusEnum.SurveySent &&
      item?.survey?.subcompany?.company?.productSurvey
    ) {
      return {
        isDisabled: false,
        buttonText: 'Redeem',
        title: `Visit Dispensary to redeem your reward`,
        status: `${item.survey?.subcompany?.company?.facilityCultivator?.displayName}`,
        action: () =>
          setShowQr({
            title:
              item?.survey?.subcompany?.company?.facilityCultivator?.displayName || 'Dispensary',
            image: item?.survey?.subcompany?.company?.facilityCultivator?.asset?.url || '',
            url: `${process.env.NEXT_PUBLIC_ENV_SITE_URL}/ratings/redeem?uuid=${item.survey?.uuid}`
          }),
        image: item?.survey?.subcompany?.company?.facilityCultivator?.asset?.url
      };
    }
    if (item.status === NftStatusEnum.Processing) {
      return {
        isDisabled: false,
        buttonText: 'Check',
        title: `Processing...`,
        status: `Survey from ${item.survey?.subcompany?.company?.facilityCultivator?.displayName}`,

        action: () => handleCheck(),
        image: item?.survey?.subcompany?.company?.facilityCultivator?.asset?.url
      };
    }

    return {
      isDisabled: true,
      buttonText: '',
      status: 'Error',
      action: undefined,
      image: item.logoURL || '/resources/img/nft.webp'
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  if (stateUm.status === 'Error') {
    return null;
  }

  return (
    <CardActionArea sx={styles.container} onClick={stateUm.action}>
      {stateUm.image ? (
        <Box>
          <AvatarUncontrolled src={stateUm.image} type={48} />
        </Box>
      ) : null}

      <Box flexGrow={1}>
        <Typography component="div" variant="h4" fontSize={14}>
          {stateUm.title}
        </Typography>
        <Typography component="div" variant="caption" fontSize={10} mt={0.5} color={colors.gray2}>
          {stateUm?.status}
        </Typography>
      </Box>
      <Box>
        {!stateUm.isDisabled ? <Box sx={styles.boxButton}>{stateUm?.buttonText}</Box> : null}
      </Box>
    </CardActionArea>
  );

  async function handleCheck() {
    await client.refetchQueries({
      include: ['clientNfts']
    });
  }
};

export default WalletReward;
