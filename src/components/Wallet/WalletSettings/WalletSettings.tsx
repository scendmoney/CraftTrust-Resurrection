import { FC, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import { IUserModel } from 'graphql/_server';
import { GET_CLIENT_PRIVATE_KEY } from 'graphql/queries/getClientPrivateKey';
import { colors } from 'mui/theme/colors';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import copyToClipboard from 'utils/copyToClipboard';

import styles from './styles';

const WalletSettings: FC<{ user: IUserModel }> = ({ user }) => {
  const [getClientPrivateKey] = useLazyQuery<{ getClientPrivateKey: string }>(
    GET_CLIENT_PRIVATE_KEY
  );

  const [privateKey, setPrivateKey] = useState<string>('');

  return (
    <Box sx={styles.container}>
      <Box sx={styles.block}>
        <Typography variant="h2">Settings</Typography>

        {/* <Box px={2} mt={2}>
        <Card elevation={0}>
          <Typography variant="body1" m={2} color={colors.gray2}>
            Balance
          </Typography>
          <Typography variant="h1" fontWeight={500} m={2}>
            3800 HBAR
          </Typography>
          <Box px={2} mb={2}>
            <ButtonUi fullWidth>Withdraw</ButtonUi>
          </Box>
        </Card>
      </Box> */}

        <Box>
          <Card elevation={0}>
            <Typography variant="body1" my={2} color={colors.gray2}>
              Hedera Wallet
            </Typography>
            <Typography variant="h3" fontWeight={500} my={2}>
              #{user.publicAddress} Connected
            </Typography>
            <Box mb={2}>
              <ButtonUi
                fullWidth
                var={EButtonType.PrimaryBordered}
                onClick={() =>
                  window.open(`https://hashscan.io/mainnet/account/${user.publicAddress}`)
                }
              >
                Explore in HashScan
              </ButtonUi>
            </Box>
            <Box mb={2} color={colors.gray2}>
              {privateKey ? (
                <InputText
                  value={privateKey}
                  readOnly
                  placeholder="Secret Key"
                  titleText="Secret Key"
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={() => copyToClipboard(privateKey)}>
                        <ContentCopyIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              ) : (
                <ButtonUi
                  fullWidth
                  var={EButtonType.TextWithIcon}
                  startIcon={<RemoveRedEyeOutlinedIcon />}
                  onClick={handleGetClientPrivateKey}
                >
                  Reveal Private Key
                </ButtonUi>
              )}
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );

  async function handleGetClientPrivateKey() {
    const response = await getClientPrivateKey();
    if (response.data?.getClientPrivateKey) {
      setPrivateKey(response.data.getClientPrivateKey);
    }
  }
};

export default WalletSettings;
