import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  FilterFieldTypeEnum,
  FilterOperationEnum,
  IMutationSurveyPackageConfirmedArgs,
  IQuerySurveysBuyerArgs,
  ISurveyModel,
  ISurveysModel
} from 'graphql/_server';
import SURVEY_PACKAGE_CONFIRMED from 'graphql/mutations/surveyPackageConfirmed';
import { SURVEYS_BUYER } from 'graphql/queries/surveysBuyer';
import { useRouter } from 'next/router';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import LandingLogo from 'components/Landing/LayoutLandingHeader/shared/LandingLogo/LandingLogo';
import Loader from 'components/Loader/Loader';

import styles from './styles';

const SurveyRedeem: FC<{ uuid: string }> = ({ uuid }) => {
  const [state, setState] = useState<'init' | 'error' | 'ok'>('init');
  const mutationExecuted = useRef<boolean>(false);
  const router = useRouter();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const [surveyPackageConfirmed, { loading }] = useMutation<
    { surveyPackageConfirmed: ISurveyModel },
    IMutationSurveyPackageConfirmedArgs
  >(SURVEY_PACKAGE_CONFIRMED);

  useEffect(() => {
    if (uuid && state === 'init' && !isLoading && !mutationExecuted.current) {
      handleSubmit(uuid);
      mutationExecuted.current = true;
    }
  }, [uuid, state, isLoading, handleSubmit]);

  const { data, loading: loadingData } = useQuery<
    { surveysBuyer: ISurveysModel },
    IQuerySurveysBuyerArgs
  >(SURVEYS_BUYER, {
    variables: {
      payload: {
        filters: [
          {
            columnName: 'uuid',
            operation: FilterOperationEnum.Equal,
            type: FilterFieldTypeEnum.Text,
            value: [uuid]
          }
        ],
        paginate: {
          skip: 0,
          take: 1
        }
      }
    },
    skip: Boolean(!uuid)
  });

  const infoUm = useMemo(() => {
    return data?.surveysBuyer?.items[0];
  }, [data]);

  if (loading || isLoading || loadingData) {
    return (
      <>
        <Loader animationDelay={0} />
      </>
    );
  }

  if (state === 'init') {
    return <Box sx={styles.container} />;
  }
  if (state === 'error') {
    return (
      <Box sx={styles.container}>
        <Box sx={styles.header}>
          <LandingLogo />
        </Box>
        <Box sx={styles.finish}>
          <Box src="/resources/svg/wrong.svg" component={'img'} maxWidth="120px" />
          <Typography variant="h1" fontSize={32}>
            Something went wrong
          </Typography>
          <Typography variant="body1" fontSize={16}>
            This QR code may have already been accepted
          </Typography>
          <Box display="flex" flexDirection={'column'} alignItems="flex-start">
            {infoUm?.subcompany?.company?.productSurvey ? (
              <>
                <Typography variant="h4">Reward:</Typography>
                <Box display="flex" alignItems="center" mb={2} gap={1}>
                  <AvatarUncontrolled
                    src={infoUm?.subcompany?.company?.productSurvey.thumbnail?.url}
                  />
                  <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                    <Typography variant="h6" fontSize={16} textAlign={'left'}>
                      {infoUm?.subcompany?.company?.productSurvey?.item?.name}
                    </Typography>
                    <Typography variant="caption">
                      ID: {infoUm?.subcompany?.company?.productSurvey?.item?.id}
                    </Typography>
                  </Box>
                </Box>
              </>
            ) : null}

            {infoUm?.user ? (
              <>
                <Typography variant="h4">Buyer:</Typography>
                <Box display="flex" alignItems="center" mb={2}>
                  <AvatarUncontrolled src={infoUm?.user?.asset?.url} />
                  <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                    <Typography variant="h6" fontSize={16} textAlign={'left'}>
                      {infoUm?.fullName}
                    </Typography>
                    <Typography variant="caption">Phone: {infoUm?.phone}</Typography>
                  </Box>
                </Box>
              </>
            ) : null}

            {infoUm?.subcompany?.facilityBuyer ? (
              <>
                <Typography variant="h4">Dispensary:</Typography>
                <Box display="flex" alignItems="center">
                  <AvatarUncontrolled src={infoUm?.subcompany?.facilityBuyer?.asset?.url} />
                  <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                    <Typography variant="h6" fontSize={16} textAlign={'left'}>
                      {infoUm?.subcompany?.facilityBuyer?.displayName}
                    </Typography>
                    <Typography variant="caption">
                      ID: {infoUm?.subcompany?.facilityBuyer?.id}
                    </Typography>
                  </Box>
                </Box>
              </>
            ) : null}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <LandingLogo />
      </Box>
      <Box sx={styles.finish}>
        <Box src="/resources/svg/successWhite.svg" component={'img'} maxWidth="120px" />
        <Typography variant="h1" fontSize={32}>
          Reward can be released to Buyer
        </Typography>
        <Typography variant="body1" fontSize={16}>
          Redemption Completed
        </Typography>
        <Box display="flex" flexDirection={'column'} alignItems="flex-start">
          {infoUm?.subcompany?.company?.productSurvey ? (
            <>
              <Typography variant="h4">Reward:</Typography>
              <Box display="flex" alignItems="center" mb={2} gap={1}>
                <AvatarUncontrolled
                  src={infoUm?.subcompany?.company?.productSurvey.thumbnail?.url}
                />
                <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                  <Typography variant="h6" fontSize={16} textAlign={'left'}>
                    {infoUm?.subcompany?.company?.productSurvey?.item?.name}
                  </Typography>
                  <Typography variant="caption">
                    ID: {infoUm?.subcompany?.company?.productSurvey?.item?.id}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : null}

          {infoUm?.user ? (
            <>
              <Typography variant="h4">Buyer:</Typography>
              <Box display="flex" alignItems="center" mb={2} gap={1}>
                <AvatarUncontrolled src={infoUm?.user?.asset?.url} />
                <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                  <Typography variant="h6" fontSize={16} textAlign={'left'}>
                    {infoUm?.fullName}
                  </Typography>
                  <Typography variant="caption">Phone: {infoUm?.phone}</Typography>
                </Box>
              </Box>
            </>
          ) : null}

          {infoUm?.subcompany?.facilityBuyer ? (
            <>
              <Typography variant="h4">Dispensary:</Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <AvatarUncontrolled src={infoUm?.subcompany?.facilityBuyer?.asset?.url} />
                <Box display="flex" flexDirection={'column'} alignItems={'flex-start'}>
                  <Typography variant="h6" fontSize={16} textAlign={'left'}>
                    {infoUm?.subcompany?.facilityBuyer?.displayName}
                  </Typography>
                  <Typography variant="caption">
                    ID: {infoUm?.subcompany?.facilityBuyer?.id}
                  </Typography>
                </Box>
              </Box>
            </>
          ) : null}
        </Box>
      </Box>
    </Box>
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function handleSubmit(uuid: string) {
    try {
      startLoading(); // TODO
      await surveyPackageConfirmed({
        variables: {
          uuid: uuid
        }
      });
      setState('ok');
    } catch (err) {
      setState('error');

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((err as any)?.message === 'InvalidIssuer') {
        router.push('/auth');
        toast.error(
          'Authorization error. Please log in to the correct dispensery and scan QR code again.'
        );
      } else {
        toast.error(getErrorMessage(err));
      }
    } finally {
      stopLoading();
    }
  }
};

export default SurveyRedeem;
