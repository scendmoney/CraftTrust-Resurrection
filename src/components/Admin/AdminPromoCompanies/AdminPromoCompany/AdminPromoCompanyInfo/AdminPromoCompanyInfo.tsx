import { FC, useEffect, useMemo, useState } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import ReportIcon from '@mui/icons-material/Report';
import { CardActionArea } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { CompanyStatusEnum, ICompanyModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import { useRouter } from 'next/router';
import ArchivedIcon from 'resources/iconsMui/ArchivedIcon';
import DraftIcon from 'resources/iconsMui/DraftIcon';
import CompletedIcon from 'resources/iconsMui/orderStatuses/CompletedIcon';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';
import roundDownWithDecimals from 'utils/roundDownWithDecimals';

import styles from './styles';

const AdminPromoCompanyInfo: FC<{
  data: ICompanyModel | undefined;
}> = ({ data }) => {
  const [status, setStatus] = useState<CompanyStatusEnum>(CompanyStatusEnum.Draft);

  useEffect(() => {
    setStatus(data?.status || CompanyStatusEnum.Draft);
  }, [data?.status]);

  const router = useRouter();

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
            <Typography variant="h4">{data?.companyName}</Typography>
            <Box sx={styles.facilityWrapper}>
              <AvatarUncontrolled
                src={data?.facilityCultivator?.asset?.url || undefined}
                type={24}
              />
              <Typography variant="body2" color={colors.black1}>
                {data?.facilityCultivator.displayName}
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={styles.itemsWrapper}>
            <Box sx={styles.assignee}>
              <Typography variant="body2" color={colors.gray2}>
                Verified Contacts
              </Typography>
              <Typography variant="subtitle1" fontWeight={500}>
                {data?.totalPeopleRegistered}
              </Typography>
            </Box>
            <Box sx={styles.assignee}>
              <Typography variant="body2" color={colors.gray2}>
                Completed Forms
              </Typography>
              <Typography variant="subtitle1" fontWeight={500}>
                {data?.totalPeopleCompleted}
              </Typography>
            </Box>
            <Box sx={styles.assignee}>
              <Typography variant="body2" color={colors.gray2}>
                Redemptions
              </Typography>
              <Typography variant="subtitle1" fontWeight={500}>
                {data?.totalPeopleRedemption}
              </Typography>
            </Box>
          </Box>

          <Box sx={styles.status}>
            {statusUm.logo}
            <Typography variant="body1">{statusUm.label}</Typography>
          </Box>
        </Box>
        <Box sx={styles.mainContent}>
          <Box sx={styles.strainWrapper}>
            <Typography variant="subtitle2" fontWeight={700} color={colors.gray5}>
              Campaign Strain
            </Typography>
            <CardActionArea
              sx={styles.assigneeWrapper}
              onClick={() => {
                router.push({
                  pathname: `/admin/products`,
                  query: {
                    id: data?.productSurvey.id
                  }
                });
              }}
            >
              <AvatarUncontrolled src={data?.productSurvey.thumbnail?.url} type={48} />
              <Box sx={{ display: 'flex', gap: 0.5, flexDirection: 'column' }}>
                <Typography variant="subtitle1" fontWeight={500}>
                  {data?.productSurvey.item.name}
                </Typography>
              </Box>
            </CardActionArea>
            <Divider />
            <Box sx={styles.itemsWrapper}>
              <Box sx={styles.assignee}>
                <Typography variant="body2" color={colors.gray2}>
                  Reward Units
                </Typography>
                <Typography variant="subtitle1" fontWeight={500}>
                  {data?.quantitySold}/{data?.quantity}
                </Typography>
              </Box>
              <Box sx={styles.assignee}>
                <Typography variant="body2" color={colors.gray2}>
                  Unit Weight
                </Typography>
                <Typography variant="subtitle1" fontWeight={500}>
                  {data?.unitWeight}g
                </Typography>
              </Box>
              <Box sx={styles.assignee}>
                <Typography variant="body2" color={colors.gray2}>
                  Total Weight
                </Typography>
                <Typography variant="subtitle1" fontWeight={500}>
                  {data?.totalGram}g / {roundDownWithDecimals(Number(data?.totalLb), 3)}lb
                </Typography>
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
                {formatDateTimeDateFns(data?.dateStart)}
              </Typography>
            </Box>
            <Box sx={styles.assignee}>
              <Typography variant="body2" color={colors.gray2}>
                Campaign End
              </Typography>
              <Typography variant="subtitle1" fontWeight={500}>
                {formatDateTimeDateFns(data?.dateEnd)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminPromoCompanyInfo;
