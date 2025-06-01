import { FC, memo, useMemo } from 'react';
import Box from '@mui/material/Box';
import Spline from '@splinetool/react-spline';

import styles from './styles';

const MainAnimation: FC = () => {
  const splineUm = useMemo(() => {
    return <Spline scene="https://prod.spline.design/sonrJXW4CZFjijjP/scene.splinecode" />;
  }, []);
  return (
    <Box sx={styles.anim1} mb={12}>
      {splineUm}
    </Box>
  );
};
export default memo(MainAnimation);
