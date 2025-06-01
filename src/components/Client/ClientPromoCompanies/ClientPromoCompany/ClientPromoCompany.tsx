import { FC, useMemo, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Fade } from '@mui/material';
import { IQuerySubcompanyByIdBuyerArgs, ISubcompanyModel } from 'graphql/_server';
import SUBCOMPANY_BY_ID_BUYER from 'graphql/queries/subcompanyByIdBuyer';
import { useRefetchWithCache } from 'sharedArchitech/hooks/useRefetchWithCache';
import DialogUI from 'sharedProject/components/DialogUI/DialogUI';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/UniversalTableSmall/HeaderTabs/HeaderTabs';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';
import QRScanner from 'components/Wallet/QRScanner/QRScanner';

import AdminInfo from './AdminInfo/AdminInfo';
import ClientPromoContacts from './ClientPromoContacts/ClientPromoContacts';
import ClientPromoInsights from './ClientPromoInsights/ClientPromoInsights';
import ClientPromoSurvey from './ClientPromoSurvey/ClientPromoSurvey';
import styles from './styles';

const CultivatorPromoCompany: FC = () => {
  const { id, clearQuery } = useProjectRouter();
  const [subcompanyById, setSubcompanyById] = useState<ISubcompanyModel | undefined>(undefined);
  const [tab, setTab] = useState<string>('Contacts');
  const [isQrWindow, setIsQrWindow] = useState<boolean>(false);
  const { loading } = useQuery<
    { subcompanyByIdBuyer: ISubcompanyModel },
    IQuerySubcompanyByIdBuyerArgs
  >(SUBCOMPANY_BY_ID_BUYER, {
    variables: {
      payload: {
        id: Number(id)
      }
    },
    onCompleted: (data) => {
      setSubcompanyById(data.subcompanyByIdBuyer);
    },
    skip: Boolean(!id)
  });

  const refetchUm = useMemo(() => {
    switch (tab) {
      case 'Contacts':
        return 'surveysBuyer';
      case 'Survey':
        return 'surveysBuyer';
      case 'Insights':
        return 'companyInsightsBuyer';
      default:
        return 'me';
    }
  }, [tab]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {loading && <Loader />}
      <Fade in={!loading} timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <AdminInfo data={subcompanyById} toggleQrWindow={handleQrWindow} />
          <Box sx={styles.storeFrontWrapper}>
            <HeaderTabs
              tabs={['Contacts', 'Survey', 'Insights']}
              tab={tab}
              setTab={setTab}
              refetchQuery={refetchUm}
            />

            {tab === 'Contacts' && <ClientPromoContacts subcompanyById={subcompanyById} />}

            {tab === 'Survey' && <ClientPromoSurvey />}

            {tab === 'Insights' && <ClientPromoInsights companyId={subcompanyById?.company.id} />}

            <ModalCloseButtonUi zIndex={1000} onClose={clearQuery} />
          </Box>
        </Box>
      </Fade>
      <DialogUI close={handleQrWindow} open={isQrWindow} hideButtons hidePaddings>
        <QRScanner close={handleQrWindow} />
      </DialogUI>
    </>
  );

  function handleQrWindow() {
    setIsQrWindow((oldValue) => !oldValue);
  }
};

export default CultivatorPromoCompany;
