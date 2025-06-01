import { FC } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import { Avatar, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import {
  FacilityRoleEnum,
  IFacilityModel,
  IMutationUpdateUserContextArgs,
  IUserModel
} from 'graphql/_server';
import UPDATE_USER_CONTEXT from 'graphql/mutations/updateUserContext';
import Routes from 'routes';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import { TVoidFun } from 'sharedArchitech/types';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import truncateText from 'sharedArchitech/utils/truncateText';
import wait from 'sharedArchitech/utils/wait';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import LoaderChangedContext from 'components/LoaderChangedContext/LoaderChangedContext';

import styles from './styles';

const ContextMenuListFasility: FC<{
  facility: IFacilityModel;
  user: IUserModel | undefined;
  close: TVoidFun;
  menuRole: FacilityRoleEnum;
}> = ({ facility, user, close, menuRole }) => {
  const client = useApolloClient();
  const { goTo } = useProjectRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [updateUserContext] = useMutation<
    { updateUserContext: string },
    IMutationUpdateUserContextArgs
  >(UPDATE_USER_CONTEXT);

  return (
    <>
      <CardActionArea sx={styles.facilityWrapper} onClick={handleUpdateContext}>
        <Box sx={styles.nameWrapper}>
          <Avatar src={facility.asset?.url || undefined} sx={styles.facilityAvatar} />
          <Typography variant="body1" fontWeight={500} sx={styles.name}>
            {truncateText(facility.displayName, 25)}
          </Typography>
        </Box>
      </CardActionArea>
      {isLoading && <LoaderChangedContext facility={facility} />}
    </>
  );

  async function handleUpdateContext() {
    if (user?.context?.id === facility.id) {
      if (menuRole === FacilityRoleEnum.Cultivator) {
        await goTo(Routes.CULTIVATOR_INVENTORY, true);
      } else {
        await goTo(Routes.CLIENT, true);
      }
    } else {
      try {
        startLoading();

        await updateUserContext({
          variables: {
            facilityId: facility.id
          }
        });

        if (localStorage) {
          for (const key in localStorage) {
            if (key.startsWith('mp_') || key.startsWith('__mpq')) {
              localStorage.removeItem(key);
            }
          }
        }

        await wait(750);

        if (menuRole === FacilityRoleEnum.Cultivator) {
          await goTo(Routes.CULTIVATOR_INVENTORY, true);
        } else {
          await goTo(Routes.CLIENT, true);
        }

        await client.resetStore();
        toast.success('Context successfully changed!');
      } catch (err) {
        toast.error(getErrorMessage(err));
      } finally {
        stopLoading();
        close();
      }
    }
  }
};

export default ContextMenuListFasility;
