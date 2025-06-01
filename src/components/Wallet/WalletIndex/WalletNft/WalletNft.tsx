import { type Dispatch, type FC, type SetStateAction, useMemo } from 'react';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { type INftModel, NftStatusEnum, SurveyStatusEnum } from 'graphql/_server';

import styles from './styles';

const WalletNft: FC<{
  item: INftModel;
  onSelect: Dispatch<SetStateAction<INftModel | null>>;
}> = ({ item, onSelect }) => {
  const stateUm = useMemo(() => {
    if (
      item.status === NftStatusEnum.Done &&
      item?.survey?.status === SurveyStatusEnum.SurveySent
    ) {
      return {
        name: item.name,
        action: () => onSelect(item),
        image: item.logoURL || '/resources/img/nft.webp',
        cultivator: item.survey?.subcompany?.company?.facilityCultivator?.displayName || ''
      };
    }
    if (item.status === NftStatusEnum.Done && item?.survey?.status === SurveyStatusEnum.Done) {
      return {
        name: item.name,
        action: () => onSelect(item),
        image: item.logoURL || '/resources/img/nft.webp',
        cultivator: item.survey?.subcompany?.company?.facilityCultivator?.displayName || ''
      };
    }
    if (item.status === NftStatusEnum.Processing) {
      return {
        name: 'Processing',

        action: () => onSelect(item),
        image: '/resources/svg/locked.svg',
        cultivator: item.survey?.subcompany?.company?.facilityCultivator?.displayName || ''
      };
    }
    if (item?.survey?.status === SurveyStatusEnum.Rejected) {
      return {
        name: 'Error',
        image: '/resources/svg/locked.svg',
        cultivator: ''
      };
    }
    return {
      action: undefined,
      image: '/resources/svg/locked.svg'
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  if (stateUm.name === 'Error') {
    return <></>;
  }

  return (
    <CardActionArea sx={styles.block} onClick={stateUm.action}>
      <Box sx={styles.img} component="img" src={stateUm.image} />

      <Box sx={styles.text}>
        <Typography variant="h2" fontSize={14} mb={'5px'}>
          {stateUm.name}
        </Typography>
        <Typography variant="h2" fontSize={10}>
          {stateUm.cultivator}
        </Typography>
      </Box>
    </CardActionArea>
  );
};

export default WalletNft;
