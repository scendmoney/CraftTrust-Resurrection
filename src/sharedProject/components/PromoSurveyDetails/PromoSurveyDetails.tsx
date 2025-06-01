import { FC, useMemo, useState } from 'react';
import { Box, Fade, Tooltip, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { ISurveyModel } from 'graphql/_server';
import { colors } from 'mui/theme/colors';
import ModalCloseButtonUi from 'sharedProject/components/ModalCloseButtonUi/ModalCloseButtonUi';
import HeaderTabs from 'sharedProject/components/profile/HeaderTabs/HeaderTabs';

import AdminInfo from './AdminInfo/AdminInfo';
import { getAppealingVisually } from './utils/getAppealingVisually';
import { getAromaImg } from './utils/getAromaImg';
import { getBudColor } from './utils/getBudColor';
import { getConsume } from './utils/getConsume';
import { getExperience } from './utils/getExperience';
import { getIntoxication } from './utils/getIntoxication';
import { getNose } from './utils/getNose';
import { getPurpose } from './utils/getPurpose';
import { getSmoked } from './utils/getSmoked';
import Answer from './Answer';
import styles from './styles';

const PromoSurveyDetails: FC<{
  closeDetails: () => void;
  data: ISurveyModel | undefined;
}> = ({ data, closeDetails }) => {
  const budColorUm = useMemo(() => {
    const colorNumber = data?.color;
    if (colorNumber) return getBudColor(colorNumber);
  }, [data?.color]);

  const [tab, setTab] = useState<string>('Survey Details');

  if (
    !data?.appealingVisually ||
    !data?.experience ||
    !data?.gender ||
    !data?.intoxication ||
    !data?.smoked ||
    !data?.nose ||
    !data.primaryPurpose ||
    !data.oftenConsumeCannabis
  )
    return null;

  const questionsAndAnswers = [
    {
      question: 'How appealing is the flower/bud visually?',
      answer: <Answer data={getAppealingVisually(data?.appealingVisually)} />
    },
    {
      question: 'Bud / Hairs Color',
      answer: (
        <Box sx={styles.experience}>
          <Box
            sx={{
              width: '24px',
              height: '24px',
              backgroundColor: budColorUm?.color,
              borderRadius: '50%'
            }}
          />
          <Typography variant="body1" fontWeight={500}>
            {budColorUm?.title}
          </Typography>
        </Box>
      )
    },
    {
      question: 'Aroma / Smells',
      answer: (
        <Box sx={styles.experience}>
          {data?.aromaSmells?.map((item) => (
            <Tooltip key={item} title={getAromaImg(item)?.title} placement={'bottom'}>
              <Box
                key={item}
                component={'img'}
                src={getAromaImg(item)?.src}
                sx={{ width: '24px', height: '24px' }}
                alt={String(item)}
              />
            </Tooltip>
          ))}
        </Box>
      )
    },
    {
      question: 'How loud is the nose?',
      answer: <Answer data={getNose(data?.nose)} />
    },
    {
      question: 'How is the flavor when smoked?',
      answer: <Answer data={getSmoked(data?.smoked)} />
    },
    {
      question: 'What kind of “high” did you experience?',
      answer: <Answer data={getExperience(data?.experience)} />
    },
    {
      question: 'How strong is the intoxication?',
      answer: <Answer data={getIntoxication(data?.intoxication)} />
    },
    {
      question: 'How often do you consume cannabis?',
      answer: <Answer data={getConsume(data?.oftenConsumeCannabis)} />
    },
    {
      question: 'What is the primary purpose for your consumption?',
      answer: <Answer data={getPurpose(data?.primaryPurpose)} />
    }
  ];

  return (
    <>
      <Fade in timeout={1000} mountOnEnter unmountOnExit>
        <Box sx={styles.container}>
          <AdminInfo data={data} />
          <Box sx={styles.storeFrontWrapper}>
            <HeaderTabs tabs={['Survey Details']} tab={tab} setTab={setTab} />

            <Box sx={styles.storeFormWrapper}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ color: colors.gray2 }}>
                          Question
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2" sx={{ color: colors.gray2 }}>
                          Answer
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questionsAndAnswers.map((row, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Typography variant="body1" fontWeight={500}>
                            {row.question}
                          </Typography>
                        </TableCell>
                        <TableCell>{row.answer}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <ModalCloseButtonUi zIndex={1000} onClose={closeDetails} />
            </Box>
          </Box>
        </Box>
      </Fade>
    </>
  );
};

export default PromoSurveyDetails;
