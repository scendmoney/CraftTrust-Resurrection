import StorefrontIcon from '@mui/icons-material/Storefront';
import { Card, CardContent } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';

// import WalletMap from './WalletMap/WalletMap';

const WalletMaps = () => {
  return (
    <Box sx={{ pb: 7 }}>
      <Typography variant="h2" m={2} mt={5}>
        Maps
      </Typography>

      <Box mt={4} mb={2}>
        <Typography variant="h4" mx={2}>
          Dispensaries Near You
        </Typography>

        {/* <Box overflow="hidden" mt={2} mx={2} borderRadius="12px">
          <WalletMap />
        </Box> */}

        <Box mt={2} mx={2} display="flex" gap={1} flexDirection="column">
          {[
            {
              id: 1,

              name: '3096 Ivy St, San Diego, CA 92104, USA',

              logoUrl: '',
              earned: 2
            },
            {
              id: 2,

              name: '2222 32nd St, San Diego, CA 92104, USA',

              logoUrl: 'https://mui.com/static/images/avatar/5.jpg',
              earned: 5
            }
          ].map((item) => {
            return (
              <Card elevation={0} key={item.id}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <CardContent>
                    <Typography component="div" variant="caption" mb={1} color={colors.green}>
                      Dispensary
                    </Typography>

                    <Typography component="div" variant="h4">
                      {item.name}
                    </Typography>
                  </CardContent>

                  <Box mr={1}>
                    <StorefrontIcon fontSize="large" color={'disabled'} />
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

export default WalletMaps;
