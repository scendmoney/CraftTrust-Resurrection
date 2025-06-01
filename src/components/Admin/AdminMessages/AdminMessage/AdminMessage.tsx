import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Divider, Fade, Grid, Typography } from '@mui/material';
import {
  IMutationUpdateRequestArgs,
  IRequestModel,
  IUpdateRequestInput,
  RequestStatusEnum,
  RequestTypeEnum
} from 'graphql/_server';
import UPDATE_REQUEST from 'graphql/mutations/updateRequest';
import REQUEST_BY_ID from 'graphql/queries/requestById';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import useModalState from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import InputPhone from 'sharedProject/components/inputs/InputPhone/InputPhone';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import useGetRequestsAlert from 'sharedProject/hooks/useGetRequestsAlert';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import RequestsPanel from 'components/Admin/shared/RequestsPanel/RequestsPanel';
import Loader from 'components/Loader/Loader';

import AdminInfo from './AdminInfo/AdminInfo';
import styles from './styles';

const AdminMessage: FC = () => {
  const { id, clearQuery } = useProjectRouter();
  const [requestById, setRequestById] = useState<IRequestModel | undefined>(undefined);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const { isOpen, openModal, closeModal } = useModalState();

  const { loading } = useQuery<{ requestById: IRequestModel }>(REQUEST_BY_ID, {
    variables: {
      payload: {
        id: Number(id)
      }
    },
    onCompleted: (data) => {
      setRequestById(data.requestById);
    },
    skip: Boolean(!id)
  });

  const [updateRequest] = useMutation<
    { updateRequest: IUpdateRequestInput },
    IMutationUpdateRequestArgs
  >(UPDATE_REQUEST);

  const { getRequestsAlert } = useGetRequestsAlert([RequestTypeEnum.ContactUs]);

  const isNew =
    requestById?.status === RequestStatusEnum.New ||
    requestById?.status === RequestStatusEnum.Processing;

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {isLoading && <Loader />}
      <Fade in={!loading} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <AdminInfo data={requestById} getRequestsAlert={getRequestsAlert} />
          <Box sx={styles.storeFrontWrapper}>
            <Typography variant="h4" fontWeight={500}>
              Contact Form Details
            </Typography>
            <Divider />

            <Box sx={styles.storeFormWrapper}>
              <Grid container spacing={2} mb={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <InputText
                    titleText="Message"
                    value={requestById?.message}
                    readOnly
                    multiline
                    minRows={5}
                    maxRows={8}
                  />
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <InputText
                    titleText="Company Name"
                    defaultValue={requestById?.companyName || '-'}
                    readOnly
                  />
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <InputText titleText="Contact Person" defaultValue={requestById?.name} readOnly />
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <InputPhone
                    titleText="Phone #"
                    value={requestById?.phone}
                    readOnly
                    placeholder="-"
                  />
                </Grid>

                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <InputText
                    titleText="Email"
                    defaultValue={requestById?.email}
                    readOnly
                    placeholder="-"
                  />
                </Grid>
              </Grid>

              <ModalCloseButtonUi zIndex={1000} onClose={clearQuery} />
            </Box>
          </Box>
          {isNew ? (
            <RequestsPanel
              title={'Reply with phone or email'}
              submitButtonText={'Done'}
              onSubmit={handleOpenModal}
            />
          ) : null}
          <DialogUI
            isLoading={isLoading}
            title="Сonfirmation"
            close={closeModal}
            open={isOpen}
            buttonSubmit={onSubmit}
            buttonSubmitText="Confirm"
          >
            <>Do you really replied to the user and want to close the request?</>
          </DialogUI>
        </Box>
      </Fade>
    </>
  );

  async function handleOpenModal() {
    openModal();
  }

  async function onSubmit() {
    try {
      startLoading();
      await updateRequest({
        variables: {
          payload: {
            status: RequestStatusEnum.Closed,
            id: Number(requestById?.id)
          }
        }
      });
      await getRequestsAlert();
      toast.success('Request completed');
      closeModal();
      await clearQuery();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default AdminMessage;
