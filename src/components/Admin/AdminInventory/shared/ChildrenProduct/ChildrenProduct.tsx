import { FC, useMemo } from 'react';
import Box from '@mui/material/Box';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import { IProductModel } from 'graphql/_server';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import styles from './styles';

const ChildrenProduct: FC<{ product: IProductModel }> = ({ product }) => {
  const { goToModal } = useProjectRouter();
  const childProducts = useMemo(() => {
    return (product?.children || []).map((item) => (
      <CardActionArea
        key={item.id}
        sx={styles.cardActionWrapper}
        onClick={() => goToModal({ id: item.id })}
      >
        <Box sx={styles.package}>
          <AvatarUncontrolled variant="rounded" src={item.thumbnail?.url} type={48} />
          <Box flexGrow={1}>
            <Typography variant="body2">{item.item.name}</Typography>
          </Box>

          <Typography variant="body2" fontWeight={500}>
            <DollarAmountFormatter value={item.price} />
          </Typography>
        </Box>
      </CardActionArea>
    ));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);
  return (
    <Box sx={styles.metrcWrapper}>
      {/* <Box sx={styles.line} /> */}
      <Box sx={styles.packages}>{childProducts}</Box>
    </Box>
  );
};

export default ChildrenProduct;
