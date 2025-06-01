import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { IMutationGetPaymentOrderLinkArgs } from 'graphql/_server';
import GET_PAYMENT_ORDER_LINK from 'graphql/queries/getPaymentOrderLink';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import {
  TModalStateClose,
  TModalStateIsOpen
} from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import wait from 'sharedArchitech/utils/wait';

import Loader from 'components/Loader/Loader';

import styles from './styles';

const ClientOrderByIdPayWindow: FC<{
  orderId: number;
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
}> = ({ isOpen, closeModal, orderId }) => {
  const [link, setLink] = useState<string | undefined>(undefined);
  const [state, setState] = useState<'init' | 'error' | 'ready'>('init');
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [getPaymentOrderLink, { loading }] = useMutation<
    { getPaymentOrderLink: string },
    IMutationGetPaymentOrderLinkArgs
  >(GET_PAYMENT_ORDER_LINK);

  const mutationExecuted = useRef<boolean>(false);

  useEffect(() => {
    if (!mutationExecuted.current) {
      handleSubmit(orderId);
      mutationExecuted.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const linkUm = useMemo(() => {
    if (!link) {
      return null;
    }
    return `${link}&bgColor=000000&mainColor=1E1E1E`;
  }, [link]);

  if (state === 'init') {
    return <Loader animationDelay={0} />;
  }

  if (state === 'error') {
    return null;
  }

  return (
    <Modal sx={styles.dialog} open={isOpen} onClose={closeModal}>
      <>
        {isLoading && <Loader />}

        <Box sx={styles.block}>
          <IconButton sx={styles.close} type="button" onClick={closeModal} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
          {loading ? <Loader animationDelay={0} /> : null}
          {linkUm ? (
            <Box
              border={0}
              width="100%"
              height="calc(98vh)"
              minHeight={200}
              component="iframe"
              src={linkUm}
              allow="camera; microphone; fullscreen; geolocation; payment"
            />
          ) : (
            <Typography variant="body2">Wrong link</Typography>
          )}
        </Box>
      </>
    </Modal>
  );

  async function handleSubmit(id: number) {
    try {
      startLoading();
      const response = await getPaymentOrderLink({
        variables: {
          payload: {
            id: id
          }
        }
      });
      const link = response?.data?.getPaymentOrderLink;
      if (!link) {
        throw new Error('Wrong link');
      }

      setLink(link);
      setState('ready');
    } catch (err) {
      setState('error');
      toast.error(getErrorMessage(err));
      await wait(4000);
      closeModal();
    } finally {
      stopLoading();
    }
  }
};

export default ClientOrderByIdPayWindow;
