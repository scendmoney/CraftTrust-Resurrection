import { FC } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { ISurveyModel, SurveyGenderEnum } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import CompaniesIcon from 'resources/iconsMui/CompaniesIcon';
import ProfileIcon from 'resources/iconsMui/ProfileIcon';
import formatDateTimeDateFns from 'sharedArchitech/utils/formatDateTimeDateFns';
import AvatarUncontrolled from 'sharedProject/components/AvatarUncontrolled/AvatarUncontrolled';

import mappingAge from 'components/Admin/AdminPromoCompanies/AdminPromoCompany/AdminPromoInsights/mappingAge';

import styles from './styles';

const AdminInfo: FC<{
  data: ISurveyModel | undefined;
}> = ({ data }) => {
  if (!data) return null;
  return (
    <Box sx={styles.container}>
      <Box sx={styles.stickyBlock}>
        <Box sx={styles.statusBlock}>
          <Box sx={styles.id}>
            <Typography variant="h4">{data?.id}</Typography>
            <CompaniesIcon fill={colors.secondary} />
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <ProfileIcon fill={colors.green} />
            <Typography variant="subtitle1" fontWeight={500}>{`${data?.fullName}, ${mappingAge(
              Number(data?.ageRange)
            )}y.o, ${
              data?.gender === SurveyGenderEnum.Other ? 'Other Gender' : data?.gender
            }`}</Typography>
          </Box>
        </Box>

        <Box sx={styles.assignee}>
          <Typography variant="body2" color={colors.gray2}>
            Dispensary
          </Typography>
          <Box sx={styles.assigneeWrapper}>
            <AvatarUncontrolled
              src={data?.subcompany.facilityBuyer?.asset?.url || undefined}
              type={48}
            />
            <Typography variant="subtitle1" fontWeight={500}>
              {data?.subcompany.facilityBuyer?.displayName}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ px: 2 }}>
          <Divider />
        </Box>
        {data?.subcompany?.company.productSurvey ? (
          <Box sx={styles.assignee}>
            <Typography variant="body2" color={colors.gray2}>
              Product
            </Typography>
            <Box sx={styles.assigneeWrapper}>
              <AvatarUncontrolled
                src={data?.subcompany?.company.productSurvey?.thumbnail?.url || undefined}
                type={48}
              />
              <Typography variant="subtitle1" fontWeight={500}>
                {data?.subcompany?.company.productSurvey?.item.name}
              </Typography>
            </Box>
          </Box>
        ) : null}

        <Box sx={{ px: 2 }}>
          <Divider />
        </Box>

        <Box sx={styles.assignee}>
          <Typography variant="body2" color={colors.gray2}>
            Survey Date
          </Typography>
          <Typography variant="body1">{formatDateTimeDateFns(data?.surveySentDate)}</Typography>
        </Box>
        <Box sx={styles.assignee}>
          <Typography variant="body2" color={colors.gray2}>
            Redeem Date
          </Typography>
          <Typography variant="body1">{formatDateTimeDateFns(data?.completedDate)}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminInfo;
