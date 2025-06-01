import { Dispatch, FC, ReactElement, SetStateAction } from 'react';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { IFacilityModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ChatIcon from 'resources/iconsMui/ChatIcon';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import SocialMedia from 'sharedProject/components/SocialMedia/SocialMedia';

import styles from './styles';

const ProfileInfo: FC<{
  children: ReactElement;
  data: IFacilityModel | undefined;
  openChat: Dispatch<SetStateAction<boolean>>;
}> = ({ data, children, openChat }) => {
  const isMobile = useMediaQuery('(max-width:1050px)');

  return (
    <Box sx={styles.container}>
      <Box sx={styles.stickyBlock}>
        {children}

        <Box sx={styles.nameWrapper}>
          <Box sx={styles.license}>
            <Typography variant="h3" fontWeight={'400'}>
              {data?.name || data?.displayName}
              {/* &nbsp;
              {data?.license.isLicenseActive && (
                <Tooltip
                  title={
                    <Typography variant="caption" textAlign={'center'}>
                      {`License is active until ${formatDateTimeDateFns(
                        data?.license?.licenseEndDate
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
          {data?.id && isMobile ? (
            <ButtonUi
              var={EButtonType.Primary}
              onClick={() => openChat(true)}
              endIcon={<ChatIcon />}
            >
              Open Chat
            </ButtonUi>
          ) : null}
        </Box>

        <Divider sx={{ mb: 2 }} />
        <SocialMedia data={data?.socials} />

        <Box my={2} mx={1}>
          <Typography variant="body2" color={colors.gray2}>
            Joined
          </Typography>
          <Typography pt={0.5} variant="body2">
            {formatDateTimeDateFns(data?.dates.createdDate)}
          </Typography>
        </Box>
        {data?.facilityCultivatorRelations?.length ? (
          <>
            {data?.facilityCultivatorRelations[0]?.lastOrderDate ? (
              <Box my={2} mx={1}>
                <Typography variant="body2" color={colors.gray2}>
                  Last Order
                </Typography>
                <Typography pt={0.5} variant="body2">
                  {formatDateTimeDateFns(data?.facilityCultivatorRelations[0]?.lastOrderDate)}
                </Typography>
              </Box>
            ) : null}
            {data?.facilityCultivatorRelations[0]?.totalOrders ? (
              <Box my={2} mx={1}>
                <Typography variant="body2" color={colors.gray2}>
                  Total Orders
                </Typography>
                <Typography pt={0.5} variant="body2">
                  {data?.facilityCultivatorRelations[0]?.totalOrders}
                </Typography>
              </Box>
            ) : null}
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default ProfileInfo;
