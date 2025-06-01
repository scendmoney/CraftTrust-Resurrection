import { FC, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useApolloClient, useMutation, useQuery } from '@apollo/client';
import { Box, Fade } from '@mui/material';
import {
  CompanyStatusEnum,
  ICompanyModel,
  IMutationUpdateCompanyCultivatorArgs,
  IQueryCompanyByIdCultivatorArgs
} from 'graphql/_server';
import UPDATE_COMPANY_CULTIVATOR from 'graphql/mutations/updateСompanyCultivator';
import COMPANY_BY_ID_CULTIVATOR from 'graphql/queries/companyByIdCultivator';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/UniversalTableSmall/HeaderTabs/HeaderTabs';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import CompanyHandlerPanel from './CompanyHandlerPanel/CompanyHandlerPanel';
import CultivatorPromoCompanyInfo from './CultivatorPromoCompanyInfo/CultivatorPromoCompanyInfo';
import CultivatorPromoContacts from './CultivatorPromoContacts/CultivatorPromoContacts';
import CultivatorPromoInsights from './CultivatorPromoInsights/CultivatorPromoInsights';
import CultivatorPromoSubcompanies from './CultivatorPromoSubcompanies/CultivatorPromoSubcompanies';
import CultivatorPromoSurvey from './CultivatorPromoSurvey/CultivatorPromoSurvey';
import styles from './styles';

const CultivatorPromoCompany: FC = () => {
  const { id, clearQuery } = useProjectRouter();
  const [companyById, setCompanyById] = useState<ICompanyModel | undefined>(undefined);
  const [tab, setTab] = useState<string>('Dispensaries');
  const client = useApolloClient();

  const { loading } = useQuery<
    { companyByIdCultivator: ICompanyModel },
    IQueryCompanyByIdCultivatorArgs
  >(COMPANY_BY_ID_CULTIVATOR, {
    variables: {
      payload: {
        id: Number(id)
      }
    },
    onCompleted: (data) => {
      setCompanyById(data.companyByIdCultivator);
    },
    skip: Boolean(!id)
  });

  const [updateCompanyCultivator] = useMutation<
    { updateCompanyCultivator: ICompanyModel },
    IMutationUpdateCompanyCultivatorArgs
  >(UPDATE_COMPANY_CULTIVATOR);

  const isPending = useMemo(() => {
    return (
      companyById?.status === CompanyStatusEnum.Pending ||
      companyById?.status === CompanyStatusEnum.Active
    );
  }, [companyById?.status]);

  const refetchUm = useMemo(() => {
    switch (tab) {
      case 'Dispensaries':
        return 'subcompaniesCultivator';
      case 'Contacts':
        return 'surveysCultivator';
      case 'Survey':
        return 'surveysCultivator';
      case 'Insights':
        return 'companyInsightsCultivator';
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
          <CultivatorPromoCompanyInfo data={companyById} />
          <Box sx={styles.storeFrontWrapper}>
            <HeaderTabs
              tabs={['Dispensaries', 'Contacts', 'Survey', 'Insights']}
              tab={tab}
              setTab={setTab}
              refetchQuery={refetchUm}
            />

            {tab === 'Dispensaries' && (
              <CultivatorPromoSubcompanies statusCompany={companyById?.status} />
            )}

            {tab === 'Contacts' && <CultivatorPromoContacts />}

            {tab === 'Survey' && <CultivatorPromoSurvey />}

            {tab === 'Insights' && <CultivatorPromoInsights />}

            <ModalCloseButtonUi zIndex={1000} onClose={clearQuery} />
          </Box>
          {isPending ? (
            <CompanyHandlerPanel company={companyById} onSubmit={onSubmit} onReject={onReject} />
          ) : null}
        </Box>
      </Fade>
    </>
  );

  async function onSubmit() {
    try {
      await updateCompanyCultivator({
        variables: {
          payload: {
            id: Number(id),
            status: CompanyStatusEnum.Active
          }
        }
      });
      toast.success('Campaign Activated');
      await client.refetchQueries({
        include: ['companiesCultivator']
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function onReject() {
    try {
      await updateCompanyCultivator({
        variables: {
          payload: {
            id: Number(id),
            status: CompanyStatusEnum.Rejected
          }
        }
      });
      toast.success('Campaign Rejected');
      await client.refetchQueries({
        include: ['companiesCultivator']
      });
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
};

export default CultivatorPromoCompany;
