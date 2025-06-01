import { FC } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Divider, Grid, IconButton, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { IProductModel } from 'graphql/_server';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';
import { getOrderStatusIcon, mappingOrderStatus } from 'sharedProject/utils/mappingOrderStatus';
import splitCamelCase from 'utils/splitCamelCase';

import ChildTable from './ProductMetrcDataChildTable/ProductMetrcDataChildTable';
import styles from './styles';

const ProductMetrcData: FC<{ product: IProductModel }> = ({ product }) => {
  const { goToModal } = useProjectRouter();

  function typeAndPercent(product: IProductModel) {
    let type;
    let percentSubstance;

    switch (true) {
      case product.totalTHC !== 0:
        type = 'THC';
        percentSubstance = `${product.totalTHC} %`;
        break;

      case product.totalCBD !== 0:
        type = 'CBD';
        percentSubstance = `${product.totalCBD} %`;
        break;

      default:
        type = undefined;
        percentSubstance = undefined;
        break;
    }

    return { type, percentSubstance };
  }

  const { type, percentSubstance } = typeAndPercent(product);

  return (
    <Box sx={styles.metrcWrapper}>
      <Typography variant="h3" fontWeight={500}>
        Metrc Data
      </Typography>
      <Divider />
      <Typography variant="subtitle1" fontWeight={500}>
        Specifications
      </Typography>
      <Grid container>
        <Grid item sm={12} xs={12}>
          <InputText titleText="Package #" value={product?.id} readOnly placeholder="-" />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <InputText titleText="Type" value={type} readOnly placeholder="-" />
        </Grid>
        <Grid item sm={6} xs={12}>
          <InputText
            titleText="Percent of substance"
            value={percentSubstance}
            readOnly
            placeholder="-"
          />
        </Grid>
      </Grid>

      {product.parent ? (
        <>
          <Divider />
          <Grid container>
            <Grid item sm={12} xs={12}>
              <InputText
                titleText="Parent Package #"
                value={product?.parent.id}
                readOnly
                placeholder="-"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton onClick={() => goToModal({ id: product?.parent?.id })}>
                      <ArrowForwardIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </>
      ) : null}

      {product.children?.length ? (
        <>
          <Divider />
          <Typography variant="subtitle1" fontWeight={500}>
            Associated Packages
          </Typography>
          <Box>
            <ChildTable product={product} />
          </Box>
        </>
      ) : null}

      {product.orderResolve ? (
        <>
          <Divider />
          <Grid container>
            <Grid item sm={12} xs={12}>
              <InputText
                titleText="Associated Order"
                value={`${product.orderResolve.id} (${splitCamelCase(
                  mappingOrderStatus(product.orderResolve?.status)
                )})`}
                readOnly
                placeholder="-"
                startAdornment={
                  <InputAdornment position="start">
                    {getOrderStatusIcon(product.orderResolve?.status)}
                  </InputAdornment>
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => goToModal({ id: product.orderResolve?.id }, 'orders')}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Grid>
          </Grid>
        </>
      ) : null}
    </Box>
  );
};

export default ProductMetrcData;
