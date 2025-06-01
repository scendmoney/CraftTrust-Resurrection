import { FC } from 'react';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import { IUserModel } from 'graphql/_server';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';

const ClientFacilityEmployee: FC<{
  user: IUserModel;
}> = ({ user }) => {
  const { goToModal } = useProjectRouter();

  return (
    <CardActionArea onClick={() => handleRoute()} sx={styles.cardActionWrapper}>
      <Box sx={styles.empoyeeWrapper}>
        <Box sx={styles.empoyeeTitleWrapper}>
          <Avatar alt={user.fullName} src={user.asset?.url || undefined} sx={styles.avatar} />
          <Box>
            <Typography variant="subtitle1" fontWeight={500}>
              {user.fullName}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight={500}>
            Employee
          </Typography>
        </Box>
      </Box>
    </CardActionArea>
  );

  function handleRoute() {
    goToModal({
      id: user.id
    });
  }
};

export default ClientFacilityEmployee;
