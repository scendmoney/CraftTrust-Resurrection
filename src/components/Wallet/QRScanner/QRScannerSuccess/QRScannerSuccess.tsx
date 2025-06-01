import { FC } from 'react';
import { Box, Typography } from '@mui/material';
import { ISurveyModel } from 'graphql/_server';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

const QRScannerSucces: FC<{ userInfo?: ISurveyModel | null }> = ({ userInfo }) => {
  if (!userInfo) {
    return (
      <Box p={4} display="flex" flexDirection={'column'} gap={2}>
        <Box src="/resources/svg/successWhite.svg" component={'img'} maxWidth="120px" />
        <Typography variant="h1" fontSize={32}>
          Reward can be released to Buyer
        </Typography>
        <Typography variant="body1" fontSize={16}>
          Redemption Completed
        </Typography>
      </Box>
    );
  }
  return (
    <Box p={4} display="flex" flexDirection={'column'} gap={2}>
      <Box src="/resources/svg/successWhite.svg" component={'img'} maxWidth="120px" />
      <Typography variant="h1" fontSize={32}>
        Reward can be released to Buyer
      </Typography>
      <Typography variant="body1" fontSize={16}>
        Redemption Completed
      </Typography>
      <Box display="flex" flexDirection={'column'} alignItems="flex-start">
        {userInfo?.subcompany?.company?.productSurvey ? (
          <>
            <Typography variant="h4">Reward</Typography>
            <Box display="flex" alignItems="center" pt={1} pb={2} gap={1}>
              <AvatarUncontrolled
                src={userInfo?.subcompany?.company?.productSurvey.thumbnail?.url}
              />
              <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                <Typography variant="h6" fontSize={16} textAlign={'left'}>
                  {userInfo?.subcompany?.company?.productSurvey?.item?.name}
                </Typography>
                <Typography variant="caption">
                  ID: {userInfo?.subcompany?.company?.productSurvey?.item?.id}
                </Typography>
              </Box>
            </Box>
          </>
        ) : null}

        {userInfo?.user ? (
          <>
            <Typography variant="h4">Buyer</Typography>
            <Box display="flex" alignItems="center" pt={1} pb={2} gap={1}>
              <AvatarUncontrolled src={userInfo?.user?.asset?.url} />
              <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                <Typography variant="h6" fontSize={16} textAlign={'left'}>
                  {userInfo?.fullName}
                </Typography>
                <Typography variant="caption">Phone: {userInfo?.phone}</Typography>
              </Box>
            </Box>
          </>
        ) : null}

        {userInfo?.subcompany?.facilityBuyer ? (
          <>
            <Typography variant="h4">Dispensary</Typography>
            <Box display="flex" alignItems="center" pt={1} pb={2} gap={1}>
              <AvatarUncontrolled src={userInfo?.subcompany?.facilityBuyer?.asset?.url} />
              <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                <Typography variant="h6" fontSize={16} textAlign={'left'}>
                  {userInfo?.subcompany?.facilityBuyer?.displayName}
                </Typography>
                <Typography variant="caption">
                  ID: {userInfo?.subcompany?.facilityBuyer?.id}
                </Typography>
              </Box>
            </Box>
          </>
        ) : null}
      </Box>
    </Box>
  );
};

export default QRScannerSucces;
