import { Dispatch, FC, SetStateAction } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { INftModel } from 'graphql/_server';
import { QRCodeCanvas } from 'qrcode.react';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';

import { IWalletQrCodeReward } from '../types';

const WalletCards: FC<{
  items: INftModel[];
  state: {
    isRewards: boolean;
    isRewardsReedemable: boolean;
    isNfts: boolean;
  };
  setShowQr: Dispatch<SetStateAction<IWalletQrCodeReward>>;
}> = ({ items, state, setShowQr }) => {
  if (state.isRewardsReedemable) {
    return (
      <Box>
        <QRCodeCanvas
          id="qrcodecanvas"
          value={`${process.env.NEXT_PUBLIC_ENV_SITE_URL}/ratings/redeem?uuid=${items[0].survey?.uuid}`}
          size={120}
          bgColor={'#ffffff'}
          fgColor={'#000000'}
          level={'L'}
          includeMargin={false}
        />
        <Typography fontSize={32} mt={2} variant="h2">
          Your reward: {items[0]?.survey?.subcompany?.company?.productSurvey?.item?.name} from&nbsp;
          {items[0]?.survey?.subcompany?.company?.facilityCultivator?.displayName || 'cultivator'}
        </Typography>
        <Typography mt={2} mb={2} fontSize={14} variant="body2">
          Show QR to your budtender and enjoy your well-deserved reward!
        </Typography>
        <ButtonUi
          var={EButtonType.Primary}
          onClick={() =>
            setShowQr({
              title:
                items[0]?.survey?.subcompany?.company?.facilityCultivator?.displayName ||
                'Dispensary',
              image: items[0]?.survey?.subcompany?.company?.facilityCultivator?.asset?.url || '',
              url: `${process.env.NEXT_PUBLIC_ENV_SITE_URL}/ratings/redeem?uuid=${items[0].survey?.uuid}`
            })
          }
        >
          Redeem
        </ButtonUi>
      </Box>
    );
  }
  if (state.isRewards) {
    return (
      <Box>
        <AvatarUncontrolled type={128} src={'/resources/wallet/card1.png'} />
        <Typography fontSize={32} mt={2} variant="h2">
          Together with local farms we&apos;re making cannabis experiences better for everyone.
        </Typography>
        <Typography mt={2} fontSize={14} variant="body2">
          Please rate our cannabis flower to get rewards from our craft cultivators
        </Typography>
      </Box>
    );
  }
  if (!state.isRewards) {
    return (
      <Box>
        <AvatarUncontrolled type={128} src={'/resources/wallet/shop.png'} />
        <Typography fontSize={32} mt={2} variant="h2">
          Visit dispensaries to earn rewards
        </Typography>
        <Typography mt={2} fontSize={14} variant="body2">
          Currently you don’t have any active assignments
        </Typography>
      </Box>
    );
  }
  return <></>;
};

export default WalletCards;
