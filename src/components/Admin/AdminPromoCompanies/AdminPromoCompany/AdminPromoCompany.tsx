import { FC, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@apollo/client';
import { Box, Fade } from '@mui/material';
import {
  CompanyStatusEnum,
  ICompanyModel,
  IMutationUpdateCompanyAdminArgs,
  IQueryCompanyByIdAdminArgs
} from 'graphql/_server';
import UPDATE_COMPANY_ADMIN from 'graphql/mutations/updateСompanyAdmin';
import COMPANY_BY_ID_ADMIN from 'graphql/queries/companyByIdAdmin';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/UniversalTableSmall/HeaderTabs/HeaderTabs';
import useProjectRouter from 'sharedProject/hooks/useProjectRouter';

import Loader from 'components/Loader/Loader';

import AdminPromoCompanyInfo from './AdminPromoCompanyInfo/AdminPromoCompanyInfo';
import AdminPromoContacts from './AdminPromoContacts/AdminPromoContacts';
import AdminPromoInsights from './AdminPromoInsights/AdminPromoInsights';
import AdminPromoSubcompanies from './AdminPromoSubcompanies/AdminPromoSubcompanies';
import AdminPromoSurvey from './AdminPromoSurvey/AdminPromoSurvey';
import CompanyHandlerPanel from './CompanyHandlerPanel/CompanyHandlerPanel';
import styles from './styles';

const AdminPromoCompany: FC = () => {
  const { id, clearQuery } = useProjectRouter();
  const [companyById, setCompanyById] = useState<ICompanyModel | undefined>(undefined);
  const [tab, setTab] = useState<string>('Dispensaries');

  const { loading } = useQuery<{ companyByIdAdmin: ICompanyModel }, IQueryCompanyByIdAdminArgs>(
    COMPANY_BY_ID_ADMIN,
    {
      variables: {
        payload: {
          id: Number(id)
        }
      },
      onCompleted: (data) => {
        setCompanyById(data.companyByIdAdmin);
      },
      skip: Boolean(!id)
    }
  );

  const [updateСompanyAdmin] = useMutation<
    { updatуСompanyAdmin: ICompanyModel },
    IMutationUpdateCompanyAdminArgs
  >(UPDATE_COMPANY_ADMIN);

  const isHidePanel = companyById?.status === CompanyStatusEnum.Archived;

  const refetchUm = useMemo(() => {
    switch (tab) {
      case 'Dispensaries':
        return 'subcompaniesAdmin';
      case 'Contacts':
        return 'surveysAdmin';
      case 'Survey':
        return 'surveysAdmin';
      case 'Insights':
        return 'companyInsightsAdmin';
      default:
        return 'meAdmin';
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
          <AdminPromoCompanyInfo data={companyById} />
          <Box sx={styles.storeFrontWrapper}>
            <HeaderTabs
              tabs={['Dispensaries', 'Contacts', 'Survey', 'Insights']}
              tab={tab}
              setTab={setTab}
              refetchQuery={refetchUm}
            />

            {tab === 'Dispensaries' && (
              <AdminPromoSubcompanies
                facilityId={companyById?.facilityCultivator.id}
                statusCompany={companyById?.status}
              />
            )}

            {tab === 'Contacts' && <AdminPromoContacts />}

            {tab === 'Survey' && <AdminPromoSurvey />}

            {tab === 'Insights' && <AdminPromoInsights />}

            <ModalCloseButtonUi zIndex={1000} onClose={clearQuery} />
          </Box>
          {!isHidePanel ? (
            <CompanyHandlerPanel
              status={companyById?.status as CompanyStatusEnum}
              onSubmit={onSubmit}
              onArchive={onArchive}
              data={companyById}
            />
          ) : null}
        </Box>
      </Fade>
    </>
  );

  async function onSubmit() {
    try {
      await updateСompanyAdmin({
        variables: {
          payload: {
            id: Number(id),
            status: CompanyStatusEnum.Pending
          }
        }
      });
      toast.success('Campaign submitted for approval');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }

  async function onArchive() {
    try {
      await updateСompanyAdmin({
        variables: {
          payload: {
            id: Number(id),
            status: CompanyStatusEnum.Archived
          }
        }
      });
      toast.success('Campaign archived');
    } catch (err) {
      toast.error(getErrorMessage(err));
    }
  }
};

export default AdminPromoCompany;
