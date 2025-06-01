import { FC } from 'react';
import { Divider, Fade, Grow, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import { IFacilityModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ChatIcon from 'resources/iconsMui/ChatIcon';
import EmailIcon from 'resources/iconsMui/EmailIcon';
import LocationIcon from 'resources/iconsMui/LocationIcon';
import PhoneIcon from 'resources/iconsMui/PhoneIcon';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import { chatRv } from 'components/LayoutClient/LayoutClientHeader/LayoutClientHeader';

import ButtonUi from '../ButtonUi/ButtonUi';
import { EButtonType } from '../ButtonUi/types';
import SocialMedia from '../SocialMedia/SocialMedia';

import styles from './styles';

const FacilityHeaderInfo: FC<{
  facilityById: IFacilityModel;
  hideChatButton?: boolean;
  isShowDivider?: boolean;
}> = ({ facilityById, hideChatButton = false, isShowDivider = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <>
      <Box sx={styles.container} mb={4}>
        <Box sx={styles.leftBlock}>
          <Grow in timeout={1400}>
            <Box sx={styles.nameWrapper}>
              <AvatarUncontrolled src={facilityById?.asset?.url} type={isMobile ? 128 : 192} />
              <Fade in={Boolean(facilityById)} timeout={1200}>
                <Box sx={styles.titles}>
                  <Box sx={styles.license}>
                    <Typography variant={isMobile ? 'h4' : 'h2'}>
                      {facilityById?.displayName || facilityById?.name}
                      {/* &nbsp;
                      {facilityById?.license.isLicenseActive && (
                        <Tooltip
                          title={
                            <Typography variant="caption" textAlign={'center'}>
                              {`License is active until ${formatDateTimeDateFns(
                                facilityById?.license?.licenseEndDate
                              )}`}
                            </Typography>
                          }
                          placement={'bottom'}
                        >
                          <Box component={'span'} sx={styles.licenseIcon}>
                            <CompletedIcon fill={colors.green} />
                          </Box>
                        </Tooltip>
                      )} */}
                    </Typography>
                  </Box>
                  <Box sx={styles.line}>
                    <Typography variant={isMobile ? 'body1' : 'h4'} color={colors.secondary}>
                      License #{facilityById?.license?.licenseNumber}
                    </Typography>
                  </Box>
                  <Box sx={styles.line}>
                    <Box
                      component={'img'}
                      src={'/resources/svg/verifiedByMetrc.png'}
                      sx={styles.metrcBadge}
                      alt="verifiedByMetrc"
                    />
                  </Box>
                </Box>
              </Fade>
            </Box>
          </Grow>
        </Box>

        <Fade in={Boolean(facilityById)} timeout={1200}>
          <Box sx={styles.rightBlock}>
            <Typography
              variant="subtitle1"
              fontWeight={500}
              sx={{ overflowWrap: 'break-word', whiteSpace: 'pre-wrap' }}
            >
              {facilityById?.description}
            </Typography>
            <Box sx={styles.socilaAddressContainer}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5
                }}
              >
                {!hideChatButton && (
                  <Box>
                    <ButtonUi
                      var={EButtonType.TextWithIcon}
                      onClick={() =>
                        chatRv({
                          isChatOpen: true,
                          chatSid: facilityById.id
                        })
                      }
                      startIcon={<ChatIcon fill={colors.secondary} />}
                    >
                      Send Message
                    </ButtonUi>
                  </Box>
                )}
                {facilityById?.phoneNumber && (
                  <ButtonUi
                    var={EButtonType.TextWithIcon}
                    startIcon={<PhoneIcon fill={colors.secondary} />}
                  >
                    <a href={`tel:${facilityById.email}`} style={{ textDecoration: 'none' }}>
                      {facilityById?.phoneNumber}
                    </a>
                  </ButtonUi>
                )}
                {facilityById?.email && (
                  <ButtonUi
                    var={EButtonType.TextWithIcon}
                    startIcon={<EmailIcon fill={colors.secondary} />}
                  >
                    <a href={`mailto:${facilityById.email}`} style={{ textDecoration: 'none' }}>
                      {facilityById?.email}
                    </a>
                  </ButtonUi>
                )}
              </Box>
              {facilityById.address?.fullAddress && (
                <ButtonUi
                  var={EButtonType.TextWithIcon}
                  startIcon={<LocationIcon fill={colors.secondary} />}
                  style={{ minWidth: 'initial' }}
                >
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      facilityById.address.fullAddress
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', textAlign: 'start' }}
                  >
                    {facilityById?.address?.fullAddress}
                  </a>
                </ButtonUi>
              )}

              <SocialMedia data={facilityById.socials} />
            </Box>
          </Box>
        </Fade>
      </Box>
      {isShowDivider ? (
        <Box my={6}>
          <Divider light />
        </Box>
      ) : null}
    </>
  );
};

export default FacilityHeaderInfo;
