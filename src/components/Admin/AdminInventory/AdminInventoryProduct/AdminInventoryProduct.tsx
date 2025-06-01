import { FC, useMemo, useState } from 'react';
import { Button, Divider, Fade, Grid, Grow, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IProductModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import { terpenes } from 'sharedProject/terpenes';
import { ITerpene } from 'sharedProject/types';
import mappingInventoryStatus from 'sharedProject/utils/mappingInventoryStatus';

import ProductInfo from './ProductInfo/ProductInfo';
import ProductMetrcData from './ProductMetrcData/ProductMetrcData';
import styles from './styles';

const terpenesArray: ITerpene[] = terpenes;

const AdminInventoryProduct: FC<{ product: IProductModel }> = ({ product }) => {
  const [isShowAllTerpenes, setIsShowAllTerpenes] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { clearQuery } = useProjectRouter();

  const terpenesArraySortedAndFilteredUm = useMemo(() => {
    const value = product.terpenes || [];
    const sorted = terpenesArray.sort((a, b) => value.indexOf(a.key) - value.indexOf(b.key));
    const sortedAndFiltered = sorted.filter((item) => value.includes(item.key));
    return sortedAndFiltered;
  }, [product.terpenes]);

  return (
    <>
      <Fade in timeout={1000}>
        <Box sx={styles.wrapper}>
          <Box sx={styles.productWrapper}>
            <AvatarUncontrolled src={product.thumbnail?.url} type={192} variant="rounded" />
            <ProductInfo product={product} />
          </Box>
          <ProductMetrcData product={product} />

          <Box sx={styles.storeFrontWrapper}>
            <Typography variant="h3" fontWeight={500}>
              Storefront
            </Typography>
            <Box sx={styles.storeFormWrapper}>
              <Grid container>
                <Grid item sm={12} xs={12}>
                  <InputText
                    titleText="Status"
                    value={mappingInventoryStatus(product?.status)}
                    readOnly
                    placeholder="-"
                  />
                </Grid>
              </Grid>
              <Divider />
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <InputText
                    titleText="Price for 1/4 lb"
                    value={`$${product?.price}`}
                    readOnly
                    placeholder="-"
                  />
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                  <InputText
                    titleText="Min QTY for Order"
                    value={product?.quantityStockMin ? `${product?.quantityStockMin} lb` : '-'}
                    readOnly
                    placeholder="-"
                  />
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <InputText
                    fullWidth
                    titleText="Quantity in Metrc"
                    value={`${product.quantity} lb`}
                    placeholder="-"
                    readOnly
                  />
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <InputText
                    titleText="Quantity in Stock"
                    value={product?.quantityStock ? `${product?.quantityStock} lb` : '-'}
                    readOnly
                    placeholder="-"
                  />
                </Grid>
              </Grid>
              <Divider />
              <Typography variant="subtitle1" fontWeight={500}>
                Additional Info
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <InputText
                    titleText="Genetic Cross"
                    value={product?.geneticCross}
                    readOnly
                    placeholder="-"
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputText
                    titleText="Description"
                    value={product?.description}
                    readOnly
                    multiline
                    maxRows={3}
                    placeholder="-"
                  />
                </Grid>
              </Grid>

              {terpenesArraySortedAndFilteredUm?.length ? (
                <>
                  <Divider />
                  <Box sx={styles.column}>
                    <Typography variant="subtitle1" fontWeight={500}>
                      Top Terpenes
                    </Typography>
                    <Box sx={styles.terpenes}>
                      {terpenesArraySortedAndFilteredUm.map((item, index) => {
                        if (index > 2 && !isShowAllTerpenes) {
                          return null;
                        }
                        return (
                          <Grow key={item.key} in timeout={1000}>
                            <Tooltip
                              title={
                                <Typography variant="body1" textAlign={'center'}>
                                  {item.shortDescription}
                                </Typography>
                              }
                              placement={isMobile ? 'top' : 'left'}
                            >
                              <Box sx={styles.terpene}>
                                <AvatarUncontrolled
                                  type={24}
                                  src={item.img}
                                  variant="square"
                                  isHideBackground
                                />
                                <Typography key={item.key} variant="subtitle1" fontWeight={500}>
                                  {item.name}
                                </Typography>
                              </Box>
                            </Tooltip>
                          </Grow>
                        );
                      })}
                      {terpenesArraySortedAndFilteredUm.length > 3 && !isShowAllTerpenes ? (
                        <Box>
                          <Button onClick={() => setIsShowAllTerpenes(true)}>
                            <Typography color={colors.gray2} variant="caption">
                              SHOW MORE
                            </Typography>
                          </Button>
                        </Box>
                      ) : null}
                    </Box>
                  </Box>
                </>
              ) : null}

              <ModalCloseButtonUi zIndex={1000} onClose={clearQuery} />
            </Box>
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default AdminInventoryProduct;
