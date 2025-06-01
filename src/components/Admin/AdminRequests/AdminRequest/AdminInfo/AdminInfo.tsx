import { FC, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { LazyQueryExecFunction, useMutation } from '@apollo/client';
import { Avatar, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import {
  IMutationUpdateRequestArgs,
  IQueryRequestsArgs,
  IRequestModel,
  IRequestsDto,
  IUpdateRequestInput,
  RequestStatusEnum
} from 'graphql/_server';
import UPDATE_REQUEST from 'graphql/mutations/updateRequest';
import { colors } from 'mui/theme/colors';
import CompletedIcon from 'resources/iconsMui/orderStatuses/CompletedIcon';
import ConfirmedIcon from 'resources/iconsMui/orderStatuses/ConfirmedIcon';
import NewOrderIcon from 'resources/iconsMui/orderStatuses/NewOrderIcon';
import WaitingIcon from 'resources/iconsMui/orderStatuses/WaitingIcon';
import RequestsIcon from 'resources/iconsMui/RequestsIcon';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';

import InputSelect from 'components/Admin/shared/InputSelect/InputSelect';

import styles from './styles';

const AdminInfo: FC<{
  data: IRequestModel | undefined;
  getRequestsAlert: LazyQueryExecFunction<
    {
      requests: IRequestsDto;
    },
    IQueryRequestsArgs
  >;
}> = ({ data, getRequestsAlert }) => {
  const [status, setStatus] = useState<string>('');
  useEffect(() => {
    setStatus(data?.status || '');
  }, [data?.status]);

  const statusUm = useMemo(() => {
    const status = data?.status;
    switch (status) {
      case RequestStatusEnum.Approved:
        return 'Approved';
      case RequestStatusEnum.Rejected:
        return 'Rejected';
      default:
        return null;
    }
  }, [data?.status]);

  const [updateRequest] = useMutation<
    { updateRequest: IUpdateRequestInput },
    IMutationUpdateRequestArgs
  >(UPDATE_REQUEST);

  const enumStatusMap = [
    {
      value: RequestStatusEnum.New,
      label: 'New Request',
      logo: <NewOrderIcon htmlColor={colors.green} />,
      disabled: false
    },
    {
      value: RequestStatusEnum.Processing,
      label: 'Processing',
      logo: <WaitingIcon htmlColor={colors.orange} />,
      disabled: false
    },
    {
      value: RequestStatusEnum.Approved,
      label: 'Approved',
      logo: <CompletedIcon htmlColor={colors.green} />,
      disabled: true
    },
    {
      value: RequestStatusEnum.Rejected,
      label: 'Rejected',
      logo: <ConfirmedIcon htmlColor={colors.secondary} />,
      disabled: true
    }
  ];

  const isCompleted =
    data?.status === RequestStatusEnum.Approved || data?.status === RequestStatusEnum.Rejected;

  return (
    <Box sx={styles.container}>
      <Box sx={styles.stickyBlock}>
        <Box sx={styles.statusBlock}>
          <Box sx={styles.id}>
            <Typography variant="h4">{data?.id}</Typography>
            <RequestsIcon fill={colors.secondary} />
          </Box>
          <InputSelect
            value={status}
            onChange={(event) => handleSelectChange(event)}
            options={enumStatusMap}
            readOnly={isCompleted}
          />
        </Box>
        {data?.admin ? (
          <Box sx={styles.assignee}>
            <Typography variant="body2" color={colors.gray2}>
              Assignee
            </Typography>
            <Box sx={styles.assigneeWrapper}>
              <Avatar
                src={data?.admin?.asset?.url || undefined}
                alt={data?.admin?.fullName}
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="subtitle1">{data?.admin?.fullName}</Typography>
            </Box>
          </Box>
        ) : null}

        <Divider />
        <Box sx={styles.assignee}>
          <Typography variant="body2" color={colors.gray2}>
            Submitted
          </Typography>
          <Typography variant="body1">{formatDateTimeDateFns(data?.dates.createdDate)}</Typography>
        </Box>
        {isCompleted ? (
          <>
            <Divider />
            <Box sx={styles.assignee}>
              <Typography variant="body2" color={colors.gray2}>
                {statusUm}
              </Typography>
              <Typography variant="body1">
                {formatDateTimeDateFns(data?.dates.updatedDate)}
              </Typography>
            </Box>
          </>
        ) : null}
        {data?.messageReject && <Box sx={styles.assigneeWrapper}>{data.messageReject}</Box>}
      </Box>
    </Box>
  );

  async function handleSelectChange(event: SelectChangeEvent<unknown>) {
    const newValue = event.target.value as RequestStatusEnum;
    setStatus(newValue);
    await onSubmit(newValue);
  }

  async function onSubmit(status: RequestStatusEnum) {
    try {
      await updateRequest({
        variables: {
          payload: {
            status: status,
            id: Number(data?.id)
          }
        }
      });

      await getRequestsAlert();
      toast.success('Request status updated');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
};

export default AdminInfo;
