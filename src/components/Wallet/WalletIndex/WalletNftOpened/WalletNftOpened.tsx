import { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { INftModel, NftStatusEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';

import WalletSidebar from 'components/Wallet/shared/WalletSidebar/WalletSidebar';

import styles from './styles';

const WalletNftOpened: FC<{ item: INftModel | null; close: () => void }> = ({ item, close }) => {
  return (
    <WalletSidebar open={Boolean(item)} close={close}>
      {item ? (
        <Box p={4}>
          <Box display="flex" flexDirection={'column'}>
            <Typography component="div" variant="h3" mb={1}>
              NFT
            </Typography>
            <Box mb={2}>
              <Box
                sx={styles.img}
                component="img"
                src={item.logoURL || '/resources/img/nft.webp'}
              />
            </Box>

            <Typography component="div" variant="caption" mb={1} color={colors.gray2}>
              TOKEN ID: {item.tokenId}
            </Typography>

            {item.status === NftStatusEnum.Done ? (
              <>
                <Typography component="div" variant="h4">
                  NFT #{item.serial}
                </Typography>

                <Typography component="div" variant="caption" mt={1} mb={2} color={colors.gray2}>
                  {formatDateTimeDateFns(item.dates.createdDate, true)}
                </Typography>

                <ButtonUi
                  var={EButtonType.Bordered}
                  onClick={() => {
                    window.open(`https://hashscan.io/mainnet/token/${item.tokenId}/${item.serial}`);
                  }}
                >
                  HashScan
                </ButtonUi>
              </>
            ) : null}
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </WalletSidebar>
  );
};

export default WalletNftOpened;
