import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import { IMutationUpdateSubcompanyAdminArgs, ISubcompanyModel } from 'graphql/_server';
import UPDATE_SUBCOMPANY_ADMIN from 'graphql/mutations/updateSubcompanyAdmin';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import {
  TModalStateClose,
  TModalStateIsOpen
} from 'sharedArchitech/hooks/useModalState/useModalState';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';
import { EButtonType } from 'sharedProject/components/ButtonUi/types';
import InputText from 'sharedProject/components/inputs/InputText/InputText';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import styles from './styles';
import { TInputs } from './types';

const AdminPromoSubcompaniesUpdate: FC<{
  isOpen: TModalStateIsOpen;
  closeModal: TModalStateClose;
  data: ISubcompanyModel;
}> = ({ isOpen, closeModal, data }) => {
  const { id } = useProjectRouter();
  const client = useApolloClient();

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }
  } = useForm<TInputs>({
    mode: 'onChange',
    defaultValues: {
      reward: data.quantity
    }
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    if (data.quantity) {
      setValue('reward', data.quantity);
    }
  }, [data.quantity, setValue]);

  const [updateSubcompanyAdmin] = useMutation<
    { updateSubcompanyAdmin: ISubcompanyModel },
    IMutationUpdateSubcompanyAdminArgs
  >(UPDATE_SUBCOMPANY_ADMIN);

  const { isLoading, startLoading, stopLoading } = useLoading();

  return (
    <Dialog sx={styles.dialog} maxWidth="sm" fullWidth={true} open={isOpen} onClose={closeModal}>
      <>
        {isLoading && <Loader />}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box sx={styles.block}>
            <DialogTitle mt={1} sx={styles.title}>
              <Typography variant="h3">Edit Dispensary</Typography>
            </DialogTitle>
            <DialogContent>
              <InputLabel sx={styles.label}>Dispensary</InputLabel>
              <Box sx={styles.item}>
                <AvatarUncontrolled
                  src={data.facilityBuyer?.asset?.url}
                  type={48}
                  isGrayBackground
                />

                <Typography variant="body1">{data.facilityBuyer?.displayName}</Typography>
              </Box>
              <Box my={3}>
                <Divider />
              </Box>
              <Controller
                control={control}
                name="reward"
                rules={{
                  required: 'Required'
                }}
                render={({ field: { value, onChange, onBlur } }) => {
                  return (
                    <NumericFormat
                      value={value}
                      onBlur={onBlur}
                      error={Boolean(errors?.reward)}
                      customInput={InputText}
                      onValueChange={(data) => onChange(data.value)}
                      titleText="Reward Units"
                      placeholder="0 units"
                      thousandSeparator={true}
                      fixedDecimalScale={true}
                      suffix=" units"
                      helperText={errors?.reward?.message || ' '}
                    />
                  );
                }}
              />
            </DialogContent>

            <Box px={4}>
              <Divider />
            </Box>
            <DialogActions sx={styles.actions}>
              <ButtonUi var={EButtonType.Bordered} onClick={closeModal}>
                Cancel
              </ButtonUi>

              <ButtonUi type="submit" var={EButtonType.Secondary}>
                Save
              </ButtonUi>
            </DialogActions>
          </Box>
        </form>
      </>
    </Dialog>
  );

  async function onSubmit(inputs: TInputs) {
    try {
      startLoading();
      await updateSubcompanyAdmin({
        variables: {
          payload: {
            companyId: Number(id),
            id: data.id,
            quantity: Number(inputs.reward)
          }
        }
      });
      await client.refetchQueries({
        include: ['companyByIdAdmin']
      });
      toast.success('Dispensary Updated');
      reset();
      closeModal();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }
};

export default AdminPromoSubcompaniesUpdate;
