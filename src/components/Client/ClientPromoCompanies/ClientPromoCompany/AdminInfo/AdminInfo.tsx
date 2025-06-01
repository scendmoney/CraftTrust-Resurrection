import { FC, useEffect, useMemo, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import QrCodeScannerIcon from '@mui/icons-material/QrCodeScanner';
import ReportIcon from '@mui/icons-material/Report';
import ReportGmailerrorredOutlinedIcon from '@mui/icons-material/ReportGmailerrorredOutlined';
import { Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CompanyStatusEnum, ISubcompanyModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ArchivedIcon from 'resources/iconsMui/ArchivedIcon';
import DraftIcon from 'resources/iconsMui/DraftIcon';
import CompletedIcon from 'resources/iconsMui/orderStatuses/CompletedIcon';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import ButtonUi from 'sharedProject/components/ButtonUi/ButtonUi';

import ClientPromoInfo from './ClientPromoInfo/ClientPromoInfo';
import styles from './styles';

const AdminInfo: FC<{
  data: ISubcompanyModel | undefined;
  toggleQrWindow: () => void;
}> = ({ data, toggleQrWindow }) => {
  const [status, setStatus] = useState<CompanyStatusEnum>(CompanyStatusEnum.Draft);

  useEffect(() => {
    setStatus(data?.company?.status || CompanyStatusEnum.Draft);
  }, [data?.company?.status]);

  function getStatusInfo(status: CompanyStatusEnum) {
    switch (status) {
      case CompanyStatusEnum.Draft:
        return {
          label: 'Draft',
          logo: <DraftIcon htmlColor={colors.green} />
        };
      case CompanyStatusEnum.Archived:
        return {
          label: 'Archived',
          logo: <ArchivedIcon htmlColor={colors.gray5} />
        };
      case CompanyStatusEnum.Completed:
        return {
          label: 'Completed',
          logo: <CompletedIcon htmlColor={colors.gray5} />
        };
      case CompanyStatusEnum.Active:
        return {
          label: 'Active',
          logo: <PlayCircleIcon htmlColor={colors.green} />
        };
      case CompanyStatusEnum.Pending:
        return {
          label: 'Approval Pending',
          logo: <AccessTimeIcon htmlColor={colors.orange} />
        };
      case CompanyStatusEnum.Rejected:
        return {
          label: 'Rejected',
          logo: <ReportIcon htmlColor={colors.secondary} />
        };
      default:
        return {
          label: 'Draft',
          logo: <DraftIcon htmlColor={colors.green} />
        };
    }
  }

  const statusUm = useMemo(() => {
    return getStatusInfo(status);
  }, [status]);

  return (
    <Box sx={styles.container}>
      <Box sx={styles.stickyBlock}>
        <Box sx={styles.statusBlock}>
          <Typography variant="subtitle2" fontWeight={700} color={colors.gray5}>
            Campaign
          </Typography>
          <Box sx={styles.assignee}>
            <Typography variant="h4">{data?.company?.companyName}</Typography>
            <Box sx={styles.assigneeWrapper}>
              <AvatarUncontrolled
                src={data?.company?.facilityCultivator?.asset?.url || undefined}
                type={24}
              />
              <Typography variant="body2" color={colors.black1}>
                {data?.company?.facilityCultivator.displayName}
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.status}>
            {statusUm.logo}
            <Typography variant="body1">{statusUm.label}</Typography>
          </Box>
          {data?.id && data.company.status === CompanyStatusEnum.Active && (
            <Box>
              <ClientPromoInfo subcompainId={data.id} subcompain={data} />
            </Box>
          )}
        </Box>
        <Box sx={styles.mainContent}>
          <ButtonUi onClick={toggleQrWindow} endIcon={<QrCodeScannerIcon />}>
            SCAN REWARD QR
          </ButtonUi>
          <Box sx={styles.strainWrapper}>
            <Typography variant="subtitle2" fontWeight={700} color={colors.gray5}>
              Campaign Strain
            </Typography>
            <Box sx={styles.assigneeWrapper}>
              <AvatarUncontrolled src={data?.company?.productSurvey.thumbnail?.url} type={48} />
              <Box sx={{ display: 'flex', gap: 0.5, flexDirection: 'column' }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {data?.company?.productSurvey.item.name}
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={styles.itemsWrapper}>
              <Box sx={styles.assignee}>
                <Typography variant="body2" color={colors.gray2}>
                  Reward Units
                </Typography>
                <Box sx={styles.alertWrapper}>
                  <Typography variant="subtitle1" fontWeight={500}>
                    {data?.quantitySold}/{data?.quantity}
                  </Typography>
                  {data?.quantity === data?.quantitySold && status === CompanyStatusEnum.Active ? (
                    <Tooltip
                      title={
                        <Typography variant="caption" textAlign={'right'}>
                          Sold out! Approval of new Ratings participants is currently on hold until
                          more reward units is available. Contact the cultivator for additional
                          reward units.
                        </Typography>
                      }
                      placement={'bottom'}
                    >
                      <ReportGmailerrorredOutlinedIcon htmlColor={colors.secondary} />
                    </Tooltip>
                  ) : null}
                </Box>
              </Box>
            </Box>
          </Box>

          <Box px={2}>
            <Divider />
          </Box>
          <Box sx={{ display: 'flex', gap: 3, px: 2 }}>
            <Box sx={styles.assignee}>
              <Typography variant="body2" color={colors.gray2}>
                Campaign Start
              </Typography>
              <Typography variant="subtitle1" fontWeight={500}>
                {formatDateTimeDateFns(data?.company?.dateStart)}
              </Typography>
            </Box>
            <Box sx={styles.assignee}>
              <Typography variant="body2" color={colors.gray2}>
                Campaign End
              </Typography>
              <Typography variant="subtitle1" fontWeight={500}>
                {formatDateTimeDateFns(data?.company?.dateEnd)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminInfo;
