import { FC, useMemo, useState } from 'react';
import { Fade, Grow, Slide } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import { QRCodeCanvas } from 'qrcode.react';
import LogoIcon from 'resources/iconsMui/LogoIcon';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';

import SurveyLogo from '../SurveyLogo/SurveyLogo';

import styles from './styles';

const SurveyQrCode: FC<{ uuid: string }> = ({ uuid }) => {
  const [unlock, setUnlock] = useState(false);

  const linkUm = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_ENV_SITE_URL}/ratings/redeem?uuid=${uuid}`;
  }, [uuid]);

  // eslint-disable-next-line no-console
  console.log(linkUm);

  const router = useRouter();

  const downloadQR = () => {
    const canvas = document.getElementById('qrcodecanvas');

    if (canvas) {
      const pngUrl = (canvas as HTMLCanvasElement)
        .toDataURL('image/png')
        .replace('image/png', 'image/octet-stream');

      const downloadLink = document.createElement('a');
      downloadLink.href = pngUrl;
      downloadLink.download = 'qrcode.png';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Fade in timeout={1200}>
      <Box sx={styles.wrapper}>
        <SurveyLogo />

        <Box sx={styles.container}>
          <Box sx={styles.contentWrapper}>
            <Typography sx={styles.subtitle} variant="inherit" fontSize={48}>
              UNLOCKED
            </Typography>
            {unlock ? (
              <Grow in timeout={2500}>
                <Box sx={styles.question}>
                  <Box sx={styles.imgWrapper}>
                    <QRCodeCanvas
                      id="qrcodecanvas"
                      value={linkUm}
                      size={320}
                      bgColor={'#ffffff'}
                      fgColor={'#000000'}
                      level={'L'}
                      includeMargin={true}
                    />
                  </Box>
                  <Box sx={styles.questionTitle}>
                    <Typography variant="h4" fontSize={24}>
                      Redeem this voucher at venue
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.gray2 }} fontSize={12}>
                      Download this QR or make a screenshot of this page
                    </Typography>
                    <Box mt={1}>
                      <ButtonUi var={EButtonType.Gray} fullWidth onClick={() => downloadQR()}>
                        Download QR
                      </ButtonUi>
                    </Box>
                    <Box mt={1}>
                      <ButtonUi
                        var={EButtonType.Primary}
                        fullWidth
                        onClick={() => router.push('/wallet/')}
                      >
                        Go to wallet
                      </ButtonUi>
                    </Box>
                  </Box>
                </Box>
              </Grow>
            ) : (
              <Slide direction="up" in mountOnEnter unmountOnExit timeout={1500}>
                <Box sx={styles.unlocked} onClick={() => setUnlock(true)}>
                  <Box sx={styles.logoWrapper}>
                    <LogoIcon fill={colors.black} sx={{ width: '147px', height: '135px' }} />
                  </Box>
                  <Box>
                    <Typography variant="h3" fontWeight={500} fontSize="32px">
                      Tap to get
                    </Typography>
                    <Typography variant="h3" fontWeight={500} fontSize="32px">
                      Top-Shelf Voucher
                    </Typography>
                  </Box>
                </Box>
              </Slide>
            )}
          </Box>
        </Box>
      </Box>
    </Fade>
  );
};

export default SurveyQrCode;
