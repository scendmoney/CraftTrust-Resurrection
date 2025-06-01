import { FC } from 'react';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IProductModel } from 'graphql/_server';

import Suggestion from './Suggestion/Suggestion';
import styles from './styles';

const Suggestions: FC<{
  saveData: IProductModel[];
  loadingQuery: boolean;
  isTouched: boolean;
  value: string;
  close: () => void;
}> = ({ saveData, loadingQuery, isTouched, value, close }) => {
  return (
    <>
      {saveData.length > 0 && value.length >= 2 ? (
        <Box sx={styles.suggestions}>
          {saveData.map((item: IProductModel) => (
            <Suggestion
              id={item.id}
              key={item.id}
              facility={item.facility.name}
              title={item.item.name}
              logoUrl={item.thumbnail?.url || undefined}
              close={close}
            />
          ))}
        </Box>
      ) : saveData.length === 0 && value.length >= 2 ? (
        <Box sx={styles.loading}>
          {loadingQuery || !isTouched ? (
            <CircularProgress />
          ) : (
            <Typography variant="body1" fontWeight={500}>
              NO RESULTS
            </Typography>
          )}
        </Box>
      ) : null}
      <Backdrop
        open={isTouched}
        onClick={close}
        sx={{
          zIndex: 30,
          background: 'transparent'
        }}
      />
    </>
  );
};
export default Suggestions;
