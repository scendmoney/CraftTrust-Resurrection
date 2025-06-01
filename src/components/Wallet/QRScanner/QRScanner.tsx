import { FC, useState } from 'react';
import { toast } from 'react-toastify';
import { useLazyQuery, useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import { Scanner } from '@yudiel/react-qr-scanner';
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
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';

import Loader from 'components/Loader/Loader';

import QRScannerSuccess from './QRScannerSuccess/QRScannerSuccess';

const QRScanner: FC<{ close: () => void }> = ({ close }) => {
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [state, setState] = useState<'init' | 'ok'>('init');
  const refetchWithCache = useRefetchWithCache(['surveysBuyer']);

  const [userInfo, setUserInfo] = useState<ISurveyModel | null>(null);
  const [surveyPackageConfirmed] = useMutation<
    { surveyPackageConfirmed: ISurveyModel },
    IMutationSurveyPackageConfirmedArgs
  >(SURVEY_PACKAGE_CONFIRMED);

  const [loadInfoAboutUser] = useLazyQuery<{ surveysBuyer: ISurveysModel }, IQuerySurveysBuyerArgs>(
    SURVEYS_BUYER
  );

  if (state === 'ok') {
    return (
      <>
        <QRScannerSuccess userInfo={userInfo} />
      </>
    );
  }

  return (
    <Box>
      <Loader isOpen={isLoading} />
      <Scanner
        paused={isLoading}
        styles={{
          container: {
            // maxHeight: '300px',
            // maxWidth: '300px',
            overflow: 'hidden',
            aspectRatio: '1 / 1',
            backgroundColor: '#555'
          }
        }}
        scanDelay={400}
        onScan={(result) => processLink(result.length ? result[0].rawValue : null)}
      />
    </Box>
  );

  function getUUIDFromURL(url: string): string | null {
    try {
      const urlObj = new URL(url);
      return urlObj.searchParams.get('uuid');
    } catch (e) {
      return null;
    }
  }

  async function processLink(result: string | null) {
    if (!result) {
      toast.error('Looks like this is the wrong code. Try again with another one');
      close();
      return;
    }
    const uuid = getUUIDFromURL(result);
    if (!uuid) {
      toast.error('Looks like this is the wrong code. Try again with another one');
      close();
      return;
    }
    await handleSubmit(uuid);
  }

  async function handleSubmit(uuid: string) {
    try {
      startLoading();
      await surveyPackageConfirmed({
        variables: {
          uuid: uuid
        }
      });
      const response = await loadInfoAboutUser({
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
        }
      });
      const surveyBuyer = response?.data?.surveysBuyer?.items[0];

      if (surveyBuyer) {
        setUserInfo(surveyBuyer);
        refetchWithCache();
        setState('ok');
      } else {
        close();
      }
    } catch (err) {
      close();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      toast.error(getErrorMessage(err), { toastId: 'qr-err', delay: 100 });
    } finally {
      stopLoading();
    }
  }
};

export default QRScanner;
