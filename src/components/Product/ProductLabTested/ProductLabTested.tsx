import { FC, useMemo, useState } from 'react';
import { Grid, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grow from '@mui/material/Grow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IProductModel, LabTestingEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ResearchIcon from 'resources/iconsMui/ResearchIcon';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import LabTestDownLoad from 'sharedProject/components/LabTestDownload/LabTestDownLoad';
import { terpenes } from 'sharedProject/terpenes';
import { ITerpene } from 'sharedProject/types';

import { formatDate } from 'components/Client/ClientProducts/ClientProductsCards/helpers/formatDate';

import styles from './styles';

const terpenesArray: ITerpene[] = terpenes;

const ProductLabTested: FC<{ product: IProductModel }> = ({ product }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const terpenesArraySortedAndFilteredUm = useMemo(() => {
    const value = product.terpenes || [];
    const sorted = terpenesArray.sort((a, b) => value.indexOf(a.key) - value.indexOf(b.key));
    const sortedAndFiltered = sorted.filter((item) => value.includes(item.key));
    return sortedAndFiltered;
  }, [product.terpenes]);

  const hasTestDocs = Boolean(product.labTestDocuments?.length);
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
        type = null;
        percentSubstance = null;
        break;
    }

    return { type, percentSubstance };
  }

  const { type, percentSubstance } = typeAndPercent(product);
  const [isShowAllTerpenes, setIsShowAllTerpenes] = useState<boolean>(false);
  const stylesUm = useMemo(() => {
    return styles(hasTestDocs);
  }, [hasTestDocs]);

  return (
    <Box sx={stylesUm.container}>
      {product.labTestingState === LabTestingEnum.TestPassed && (
        <Box sx={stylesUm.labContainer}>
          <Box sx={stylesUm.labWrap}>
            <Box sx={stylesUm.logoContainer}>
              <ResearchIcon fill={colors.green} stroke={colors.black} />
              <Typography sx={stylesUm.labTitle}>LAB TESTED</Typography>
            </Box>
          </Box>
          {hasTestDocs && <LabTestDownLoad product={product} isLargeView />}
        </Box>
      )}
      <Box sx={stylesUm.componentWrapper}>
        <Grid container spacing={2}>
          {type ? (
            <Grid item xs={12} sm={4} sx={stylesUm.column}>
              <Typography variant="body1" fontWeight={500}>
                {type}
              </Typography>
              <Typography variant="h4" fontWeight={500}>
                {percentSubstance}
              </Typography>
            </Grid>
          ) : null}
          {terpenesArraySortedAndFilteredUm?.length ? (
            <Grid item xs={12} sm={4} sx={stylesUm.column}>
              <Typography variant="body1" fontWeight={500}>
                Top Terpenes
              </Typography>
              <Box sx={stylesUm.terpenes}>
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
                        <Box sx={stylesUm.terpene}>
                          <AvatarUncontrolled
                            type={24}
                            src={item.img}
                            variant="square"
                            isHideBackground
                          />
                          <Typography key={item.key} variant="h4" fontWeight={500}>
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
            </Grid>
          ) : null}
          <Grid item xs={12} sm={4} sx={stylesUm.column}>
            <Typography variant="body1" fontWeight={500}>
              Harvest Date
            </Typography>
            <Typography variant="h4" fontWeight={500}>
              {formatDate(product.packagedDate)}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ProductLabTested;
