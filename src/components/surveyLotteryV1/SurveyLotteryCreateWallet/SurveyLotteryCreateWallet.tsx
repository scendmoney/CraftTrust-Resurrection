import { FC, useState } from 'react';
import { Mnemonic } from '@hashgraph/sdk';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import useEffectOnlyOnce from 'sharedProject/hooks/useEffectOnlyOnce';

import SurveyLoutteryLayout from '../SurveyLoutteryLayout/SurveyLoutteryLayout';

import handleDownloadImage from './handleDownloadImage';
import styles from './styles';
async function generateMnemonic() {
  return await Mnemonic.generate12();
}

const SurveyLotteryCreateWallet: FC<{ uuid: string }> = () => {
  const [mnemonicWords, setMnemonicWords] = useState<string[]>([]);

  const handleGenerateMnemonic = async () => {
    const newMnemonic = await generateMnemonic();

    setMnemonicWords(newMnemonic.toString().split(' '));
  };

  useEffectOnlyOnce(handleGenerateMnemonic);

  return (
    <SurveyLoutteryLayout>
      <>
        <Typography variant="h3">Your mnemonic phrase</Typography>

        <Typography variant="body1">
          Please save it to a safe place, download it as a file or take a screenshot. You will need
          it to claim your winnings.
        </Typography>

        <Grid container spacing={1} mb={3}>
          {mnemonicWords.map((word, index) => (
            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} key={word}>
              <InputBase
                sx={styles.input}
                type="text"
                autoComplete="off"
                startAdornment={<InputAdornment position="start">{index + 1}.</InputAdornment>}
                key={index}
                value={word}
                readOnly
                fullWidth
                inputProps={{ 'aria-label': `word-${index + 1}` }}
              />
            </Grid>
          ))}
        </Grid>

        <ButtonUi
          var={EButtonType.PrimaryBordered}
          endIcon={<DownloadOutlinedIcon />}
          fullWidth
          onClick={() => handleDownloadImage(mnemonicWords)}
        >
          Download phrase as Image
        </ButtonUi>

        <ButtonUi fullWidth>I saved mnemonic phrase. Get NFT</ButtonUi>
      </>
    </SurveyLoutteryLayout>
  );
};

export default SurveyLotteryCreateWallet;
