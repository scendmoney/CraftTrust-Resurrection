import { Card, Rating } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors } from 'mui/theme/colors';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';

import { EButtonType } from '../../../sharedProject/components/ButtonUi/types';

const WalletFeed = () => {
  return (
    <Box sx={{ pb: 7 }}>
      <Typography variant="h2" m={2} mt={4}>
        Feed
      </Typography>

      <Box px={2} mb={2}>
        <Box display="flex" gap={1} flexDirection="column">
          {[
            {
              id: 1,
              name: 'Eugene',
              type: 'review',
              text: '123',
              description: '123',
              rating: 4.6,
              review:
                'I swear this is a hard indica. Helps with my insomnia and cronic back pain. It is a slow Creeper takes a couple minutes to feel, but does pack a punch',
              imagePost: '/resources/wallet/photo-1597618844569-2b4bf3b1549e.avif',
              avatar: '/resources/wallet/photo-1557862921-37829c790f19.avif',
              productName: 'Gush Mints',
              productDescription: 'CBD: 20.8%',
              productImage: '/resources/wallet/menu_flower_1.avif'
            },
            {
              id: 2,
              name: 'Max P.',
              type: 'post',
              text: '123',
              description: '123',
              rating: 4.4,
              review: 'Will make you sleep perfect strain if your coming from work!',
              imagePost: '',
              avatar: '/resources/wallet/photo-1564564321837-a57b7070ac4f.avif',
              productName: 'Ice Cream Cake - MV',
              productDescription: 'THC 23.7%',
              productImage: '/resources/wallet/menu_flower_2.avif'
            },
            {
              id: 3,
              name: 'Gregory',
              type: 'post',
              text: '123',
              description: '123',
              rating: 4.7,
              review:
                'I’m a daily smoker, and I really enjoy this strain. Flavor profile is pleasantly dynamic. Earthy, Nutty, Jet Fuel/Ammonia blend of terps. The smoke is soooo creamy and smooth. YOU WONT COUGH, if it’s grown up to standards',
              imagePost: '/resources/wallet/photo-1579118459333-b6c080d24b5c.avif',
              avatar: '/resources/wallet/photo-1577880216142-8549e9488dad.avif',
              productName: 'Gush Mints',
              productDescription: 'CBD: 21.8%',
              productImage: '/resources/wallet/photo-1589140915708-20ff586fe767.avif'
            }
          ].map((item) => {
            return (
              <Card elevation={0} key={item.id}>
                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center" gap={1} m={2}>
                    <Avatar src={item.avatar} />
                    <Box display="flex" flexGrow={1}>
                      <Box mx={1}>
                        <Typography variant="h3">{item.name}</Typography>
                        <Typography variant="caption" color={colors.gray2}>
                          Left a review
                        </Typography>
                      </Box>
                    </Box>
                    <Rating name="simple-controlled" value={item.rating} />
                  </Box>
                </Box>
                <Box mx={2} mb={2}>
                  <Typography variant="body1">{item.review}</Typography>
                </Box>
                {item.imagePost ? (
                  <Box px={2}>
                    <Box
                      borderRadius="8px"
                      component="img"
                      src={item.imagePost}
                      sx={{
                        objectFit: 'cover',
                        width: '100%',
                        height: 'auto',
                        maxHeight: '50vh',
                        maxWidth: '500px'
                      }}
                    />
                  </Box>
                ) : null}

                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center" mt={1} gap={1} mx={2} mb={2}>
                    <Avatar
                      sx={{ width: '80px', height: '80px' }}
                      src={item.productImage}
                      variant="rounded"
                    />
                    <Box flexGrow={1}>
                      <Box mx={1}>
                        <Typography variant="h3">{item.productName}</Typography>
                        <Typography variant="caption" color={colors.gray2}>
                          10% THC
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
                <Box px={2} pb={2}>
                  <ButtonUi var={EButtonType.Bordered} fullWidth>
                    Read Full Review
                  </ButtonUi>
                </Box>
              </Card>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default WalletFeed;
