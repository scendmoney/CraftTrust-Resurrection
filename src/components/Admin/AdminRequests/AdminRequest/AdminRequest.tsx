import { FC, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Divider, Fade, Grid, Typography } from '@mui/material';
import {
  IGetIdDto,
  IMutationApproveRequestArgs,
  IMutationRejectRequestArgs,
  IRejectRequestInput,
  IRequestModel,
  RequestFacilityRoleEnum,
  RequestStatusEnum,
  RequestTypeEnum
} from 'graphql/_server';
import APPROVE_REQUEST from 'graphql/mutations/approveRequest';
import REJECT_REQUEST from 'graphql/mutations/rejectRequest';
import REQUEST_BY_ID from 'graphql/queries/requestById';
import { colors } from 'mui/theme/colors';
import PlantsIcon from 'resources/iconsMui/PlantsIcon';
import ShopIcon from 'resources/iconsMui/ShopIcon';
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
import { TInputs } from './types';

const AdminRequest: FC = () => {
  const { id, clearQuery } = useProjectRouter();
  const [requestById, setRequestById] = useState<IRequestModel | undefined>(undefined);
  const { isLoading, startLoading, stopLoading } = useLoading();

  const { isOpen, openModal, closeModal } = useModalState();

  const {
    handleSubmit,
    control,
    formState: { dirtyFields }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      message: ''
    }
  });

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

  const [approveRequest] = useMutation<{ approveRequest: IGetIdDto }, IMutationApproveRequestArgs>(
    APPROVE_REQUEST
  );

  const [rejectRequest] = useMutation<
    { rejectRequest: IRejectRequestInput },
    IMutationRejectRequestArgs
  >(REJECT_REQUEST);

  const { getRequestsAlert } = useGetRequestsAlert([RequestTypeEnum.Request]);

  const facilityRoleUm = useMemo(() => {
    const role = requestById?.facilityRole;
    switch (role) {
      case RequestFacilityRoleEnum.Buyer:
        return (
          <Box sx={styles.facilityRole}>
            <ShopIcon fill={colors.green} />
            <Typography variant="h4" fontWeight={500}>
              Buyer
            </Typography>
          </Box>
        );
      case RequestFacilityRoleEnum.Cultivator:
        return (
          <Box sx={styles.facilityRole}>
            <PlantsIcon fill={colors.green} />
            <Typography variant="h4" fontWeight={500}>
              Cultivator
            </Typography>
          </Box>
        );
      default:
        return null;
    }
  }, [requestById?.facilityRole]);

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
              Request Details
            </Typography>
            <Divider />

            <Box sx={styles.storeFormWrapper}>
              <Typography variant="subtitle1" fontWeight={500}>
                Facility Information
              </Typography>
              <Grid container spacing={2} mb={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  {facilityRoleUm}
                </Grid>
              </Grid>
              <Grid container spacing={2} mb={1}>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <InputText
                    titleText="Company Name"
                    defaultValue={requestById?.companyName || '-'}
                    readOnly
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <InputText
                    titleText="OLCC"
                    value={requestById?.licenseNumber}
                    readOnly
                    placeholder="-"
                  />
                </Grid>
                <Grid item lg={6} md={12} sm={12} xs={12}>
                  <InputText
                    titleText="Contact Person"
                    defaultValue={requestById?.name}
                    readOnly
                    placeholder="-"
                  />
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
              title={'Confirmation Pending'}
              submitButtonText={'Send Invitation'}
              cancelButtonText={'Cancel'}
              onSubmit={onSubmit}
              onReject={openModal}
            />
          ) : null}
          <DialogUI
            isLoading={isLoading}
            title="Mark as Rejected"
            close={closeModal}
            open={isOpen}
            buttonSubmit={handleSubmit(onReject)}
            buttonSubmitText="Confirm"
          >
            <Box>
              <Controller
                control={control}
                name="message"
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <InputText
                      titleText="Reason (optional)"
                      placeholder="Enter reason"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      multiline
                      minRows={4}
                    />
                  );
                }}
              />
            </Box>
          </DialogUI>
        </Box>
      </Fade>
    </>
  );

  async function onSubmit() {
    try {
      startLoading();
      await approveRequest({
        variables: {
          payload: {
            id: Number(requestById?.id)
          }
        }
      });
      await getRequestsAlert();
      toast.success('Request approved');
      await clearQuery();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }

  async function onReject(inputs: TInputs) {
    try {
      startLoading();
      await rejectRequest({
        variables: {
          payload: {
            id: Number(requestById?.id),
            messageReject: dirtyFields?.message ? inputs.message : undefined
          }
        }
      });
      await getRequestsAlert();
      toast.success('Request rejected');
      closeModal();
      await clearQuery();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default AdminRequest;
