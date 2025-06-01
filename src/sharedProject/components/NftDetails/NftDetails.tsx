import { FC, useState } from 'react';
import { useQuery } from '@apollo/client';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Backdrop, CardActionArea, Collapse, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { IOrderModel } from 'graphql/_server';
import { ORDER_BY_ID_NFT } from 'graphql/queries/orderById';
import { ORDER_BY_ID_ADMIN_NFT } from 'graphql/queries/orderByIdAdmin';
import { colors } from 'mui/theme/colors';
import Link from 'next/link';
import CodeHideIcon from 'resources/iconsMui/CodeHideIcon';
import CodeIcon from 'resources/iconsMui/CodeIcon';
import LinkIcon from 'resources/iconsMui/LinkIcon';
import {
  TModalStateClose,
  TModalStateIsOpen
} from 'sharedArchitech/hooks/useModalState/useModalState';

import Loader from 'components/Loader/Loader';

import ModalCloseButtonUi from '../ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from '../profile/HeaderTabs/HeaderTabs';

import JsonHighlighter from './JsonHighlighter/JsonHighlighter';
import styles from './styles';
import { CombinedQueryResult, QueryResult, QueryVariables } from './types';

const NftDetails: FC<{
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
  orderId: number;
  isAdmin?: boolean;
}> = ({ isOpen, closeModal, orderId, isAdmin = false }) => {
  const [orderById, setOrderById] = useState<IOrderModel | undefined>(undefined);
  const [showJson, setShowJson] = useState(false);
  const [tab, setTab] = useState<string>('JSON');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const onCompletedUniversal = (data: CombinedQueryResult) => {
    if (data.orderById) {
      setOrderById(data.orderById);
    } else if (data.orderByIdAdmin) {
      setOrderById(data.orderByIdAdmin);
    }
  };

  const queryOptions = isAdmin
    ? {
        query: ORDER_BY_ID_ADMIN_NFT,
        variables: { payload: { id: Number(orderId) } },
        onCompleted: onCompletedUniversal
      }
    : {
        query: ORDER_BY_ID_NFT,
        variables: { payload: { id: Number(orderId) } },
        onCompleted: onCompletedUniversal
      };

  const { loading } = useQuery<QueryResult, QueryVariables>(queryOptions.query, {
    variables: queryOptions.variables,
    onCompleted: queryOptions.onCompleted,
    skip: !orderId
  });

  if (loading) return <Loader />;

  return (
    <>
      <Box sx={styles.dialog}>
        <Box sx={styles.wrapper}>
          <Box sx={styles.block}>
            <ModalCloseButtonUi zIndex={1000} onClose={closeModal} />

            <Box
              component={'img'}
              src={orderById?.nft?.image}
              sx={styles.thumbnail}
              alt={`order-${orderById?.id}`}
            />
            <Box sx={styles.textWrapper}>
              <Box sx={styles.content}>
                <Typography variant="h4">{`CruftTrust Order #${orderById?.id}`}</Typography>
                <Divider />
                <Box sx={styles.linkWrapper}>
                  <LinkIcon fill={colors.secondary} />
                  <Typography variant="body1" fontWeight={500} sx={styles.link}>
                    <Link
                      href={`https://ipfs.io/ipfs/${orderById?.ipfs}`}
                      target="_blank"
                      style={{ color: colors.secondary }}
                      rel="noopener noreferrer"
                    >
                      {`ipfs://${orderById?.ipfs}`}
                    </Link>
                  </Typography>
                </Box>
              </Box>

              <CardActionArea onClick={() => setShowJson(!showJson)}>
                <Box sx={styles.button}>
                  {showJson ? (
                    <Box sx={styles.buttonContent}>
                      <Box sx={styles.jsonTitle}>
                        <CodeHideIcon fill={colors.secondary} />
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          sx={{ color: colors.secondary }}
                        >
                          Hide JSON
                        </Typography>
                      </Box>
                      {isMobile ? (
                        <KeyboardArrowUpIcon htmlColor={colors.gray5} />
                      ) : (
                        <KeyboardArrowLeftIcon htmlColor={colors.gray5} />
                      )}
                    </Box>
                  ) : (
                    <Box sx={styles.buttonContent}>
                      <Box sx={styles.jsonTitle}>
                        <CodeIcon fill={colors.secondary} />
                        <Typography
                          variant="body1"
                          fontWeight={500}
                          sx={{ color: colors.secondary }}
                        >
                          Show JSON
                        </Typography>
                      </Box>
                      {isMobile ? (
                        <KeyboardArrowDownIcon htmlColor={colors.gray5} />
                      ) : (
                        <KeyboardArrowRightIcon htmlColor={colors.gray5} />
                      )}
                    </Box>
                  )}
                </Box>
              </CardActionArea>
            </Box>
          </Box>
          <Collapse
            in={showJson}
            timeout={1000}
            unmountOnExit
            orientation={isMobile ? 'vertical' : 'horizontal'}
          >
            <Box sx={styles.jsonWrapper}>
              <HeaderTabs tabs={['JSON']} tab={tab} setTab={setTab} />
              <Box sx={styles.jsonContent}>
                <JsonHighlighter json={orderById?.nft} />
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Box>
      <Backdrop open={isOpen} onClick={closeModal} sx={styles.backdrop} />
    </>
  );
};

export default NftDetails;
