import { Avatar, Card, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';

import styles from './styles';

const WalletReferral = () => {
  return (
    <Box sx={{ pb: 7 }}>
      <Typography variant="h2" m={4}>
        Referral
      </Typography>

      <Box mx={2} mb={2}>
        <Box sx={styles.img} component="img" src="/resources/referral.png" />
      </Box>

      <Box px={2} mt={2}>
        <Card elevation={0}>
          <Typography variant="body1" m={2} color={colors.gray2}>
            Earned
          </Typography>
          <Typography variant="h3" fontWeight={500} m={2}>
            600 HBAR
          </Typography>
          <Box px={2} mb={2}>
            <ButtonUi fullWidth>Invite Friend</ButtonUi>
          </Box>
        </Card>
      </Box>

      <Box px={2} mt={4} mb={2}>
        <Typography variant="h4" mx={2}>
          Invited Friends
        </Typography>

        <Box mt={2} display="flex" gap={1} flexDirection="column">
          {[
            {
              id: 1,
              status: 'Pending',
              name: 'Eugene D.',
              date: '2024-03-29T10:51:15.641Z',
              logoUrl: '',
              earned: 0
            },
            {
              id: 2,
              status: 'Active',
              name: 'Paul S.',
              date: '2024-03-24T10:51:15.641Z',
              logoUrl: 'https://mui.com/static/images/avatar/5.jpg',
              earned: 500
            },
            {
              id: 3,
              status: 'Active',
              name: 'John W.',
              date: '2024-03-20T10:51:15.641Z',
              logoUrl: 'https://mui.com/static/images/avatar/2.jpg',
              earned: 100
            }
          ].map((item) => {
            return (
              <Card elevation={0} key={item.id}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <CardContent>
                    {item.earned ? (
                      <Typography component="div" variant="caption" mb={1} color={colors.green}>
                        {item.earned} HBAR EARNED
                      </Typography>
                    ) : (
                      <Typography component="div" variant="caption" mb={1} color={colors.gray2}>
                        {item.status}
                      </Typography>
                    )}

                    <Typography component="div" variant="h4">
                      {item.name}
                    </Typography>

                    <Typography component="div" variant="caption" mt={1} color={colors.gray2}>
                      {formatDateTimeDateFns(item.date, true)}
                    </Typography>
                  </CardContent>

                  <Box mr={1}>
                    <Avatar src={item.logoUrl} />
                  </Box>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default WalletReferral;
