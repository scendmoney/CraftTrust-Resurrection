import { Dispatch, FC, SetStateAction, useMemo } from 'react';
import { useMutation } from '@apollo/client';
import { Avatar, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import { IMutationProductClickedTrackArgs, IProductModel } from 'graphql/_server';
import PRODUCT_CLICKED_TRACK from 'graphql/mutations/productClickedTrack';
import { colors } from 'mui/theme/colors';
import Link from 'next/link';
import DollarAmountFormatter from 'sharedProject/components/DollarAmountFormatter/DollarAmountFormatter';

import { formatDate } from '../helpers/formatDate';

import { ClientProductCardResearchIcon } from './ClientProductCardResearchIcon/ClientProductCardResearchIcon';
import styles from './styles';
const ClientProductCard: FC<{
  product: IProductModel;
  setProductId?: Dispatch<SetStateAction<number | undefined>>;
}> = ({ product, setProductId }) => {
  const [productClickedTrack] = useMutation<
    { productClickedTrack: boolean },
    IMutationProductClickedTrackArgs
  >(PRODUCT_CLICKED_TRACK);

  const getResearchStatusIcon = useMemo(() => {
    return (
      product.labTestingState && (
        <ClientProductCardResearchIcon research={product.labTestingState} />
      )
    );
  }, [product.labTestingState]);

  function getType(product: IProductModel): string | null {
    let type = null;

    switch (true) {
      case product.totalTHC !== 0:
        type = 'THC';
        break;

      case product.totalCBD !== 0:
        type = 'CBD';
        break;
    }

    return type;
  }

  const productImgUm = useMemo(() => {
    return product?.thumbnail?.url || '/resources/placeholder.png';
  }, [product?.thumbnail]);

  const contentUm = useMemo(() => {
    return (
      <>
        <Box sx={styles.imgWrapper}>
          <Box
            component={'img'}
            src={productImgUm}
            sx={styles.thumbnail}
            alt={product?.label}
            draggable="false"
          />

          <Avatar
            alt="Cultivator Avatar"
            src={product.facility.asset?.url || undefined}
            sx={styles.avatar}
          />

          {getResearchStatusIcon}
          {getType(product) ? (
            <Box sx={styles.substanceWrapper}>
              <Typography variant="body1" fontWeight={500}>
                {getType(product)}
              </Typography>
            </Box>
          ) : null}
        </Box>

        <CardContent sx={styles.cardContent}>
          <Typography variant="h4" fontWeight={500}>
            {product.item.name}
          </Typography>
          <Box>
            {product.geneticCross && (
              <Typography variant="body1" sx={{ color: colors.gray2 }} fontWeight={500}>
                Genetic Cross: {product.geneticCross}
              </Typography>
            )}

            <Typography variant="body1" sx={{ color: colors.gray2 }} fontWeight={500}>
              Harvest: {formatDate(product.packagedDate)}
            </Typography>
          </Box>

          {!product.quantityStock ? (
            <Typography variant="subtitle1" fontWeight={500} fontSize={14} color={colors.red}>
              OUT OF STOCK
            </Typography>
          ) : (
            <Box sx={styles.priceWrapper}>
              <Typography variant="subtitle1" fontWeight={500} color="secondary">
                <DollarAmountFormatter value={product.price} />
              </Typography>
              <Typography variant="body1" sx={{ color: colors.gray2 }} fontWeight={500}>
                per 1/4 lb
              </Typography>
            </Box>
          )}
        </CardContent>
      </>
    );
  }, [getResearchStatusIcon, product, productImgUm]);

  return (
    <Card sx={styles.cardWrapper}>
      <CardActionArea sx={styles.cardAction} onClick={() => handleItemClick(product.id)}>
        {setProductId ? (
          contentUm
        ) : (
          <Link href={`/client/products/${product.id}`} onClick={handleLinkClick}>
            {contentUm}
          </Link>
        )}
      </CardActionArea>
    </Card>
  );

  function handleLinkClick() {
    if (product.id) {
      productClickedTrack({
        variables: {
          productId: product.id
        }
      });
    }
  }

  async function handleItemClick(id: number) {
    if (setProductId) {
      setProductId(id);
    }
  }
};

export default ClientProductCard;
