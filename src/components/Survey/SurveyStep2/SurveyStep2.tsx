import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useMutation } from '@apollo/client';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Avatar, Button, Grow, IconButton, Slide } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  AppealingVisuallyEnum,
  ColorEnum,
  ExperienceEnum,
  IMutationSubmitSurveyArgs,
  IntoxicationEnum,
  ISurveyModel,
  NoseEnum,
  PrimaryPurposeEnum,
  SmokedEnum,
  SurveyGenderEnum,
  SurveyOftenConsumeCannabisEnum
} from 'graphql/_server';
import SUBMIT_SURVEY from 'graphql/mutations/submitSurvey';
import { colors } from 'mui/theme/colors';
import { useLoading } from 'sharedArchitech/hooks/useLoading';
import { TLabelValue } from 'sharedArchitech/types';
import getErrorMessage from 'sharedArchitech/utils/getErrorMessage';
import validations from 'sharedArchitech/validations';

import Loader from 'components/Loader/Loader';

import SurveyScrollValueController from './controllers/SurveyScrollValueController/SurveyScrollValueController';
import SurveyCard from './SurveyCard/SurveyCard';
import SurveySwitchVariantImage from './SurveySwitchVariantImage/SurveySwitchVariantImage';
import optionsAges from './utlils/optionsAges';
import optionsAppealing from './utlils/optionsAppealing';
import optionsAroma from './utlils/optionsAroma';
import optionsBudHairsColor from './utlils/optionsBudHairsColor';
import optionsConsume from './utlils/optionsConsume';
import optionsExperience from './utlils/optionsExperience';
import optionsGender from './utlils/optionsGender';
import optionsIntoxication from './utlils/optionsIntoxication';
import optionsNose from './utlils/optionsNose';
import optionsPurpose from './utlils/optionsPurpose';
import optionsSmoked from './utlils/optionsSmoked';
import styles from './styles';

interface SurveyFormData {
  gender: TLabelValue;
  smoked: TLabelValue;
  experience: TLabelValue;

  age: TLabelValue;
  appearance: TLabelValue;
  aromaSmells: number[];

  budHairsColor: TLabelValue;

  flavorTasteOther: string;

  intoxication: TLabelValue;
  consume: TLabelValue;
  purpose: TLabelValue;

  oftenConsumeCannabis: SurveyOftenConsumeCannabisEnum;

  nose: TLabelValue;
}

const SurveyStep2: FC<{
  setStep: Dispatch<SetStateAction<'step1' | 'step1-add' | 'step2' | 'step3'>>;
  surveyByUuid: ISurveyModel;
  id: number;
}> = ({ setStep, surveyByUuid, id }) => {
  const [currentCard, setCurrentCard] = useState<number>(0);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [submitSurvey] = useMutation<{ deleteInvite: ISurveyModel }, IMutationSubmitSurveyArgs>(
    SUBMIT_SURVEY
  );

  const { control, getValues, trigger, formState } = useForm<SurveyFormData>({
    mode: 'onChange'
  });

  const toggleSelectedItem = (selectedItems: number[], newItem: number): number[] => {
    if (selectedItems.includes(newItem)) {
      return selectedItems.filter((item) => item !== newItem);
    }

    if (selectedItems.length < 3) {
      return [...selectedItems, newItem];
    }

    toast.warning('You can choose a maximum of 3 smells');
    return selectedItems;
  };

  const cardsUm = useMemo(() => {
    return [
      {
        title: 'How appealing is \nthe flower/bud \nvisually?',
        caption: '',
        name: 'appearance',
        component: (
          <Box>
            <Controller
              name="appearance"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsAppealing}
                />
              )}
            />
          </Box>
        )
      },
      {
        title: 'Bud/Hairs Color',
        caption: 'Select from shades: green to purple.',
        name: 'budHairsColor',
        component: (
          <Box>
            <Controller
              name="budHairsColor"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsBudHairsColor}
                />
              )}
            />
          </Box>
        )
      },

      {
        title: 'Select up to 3 icons of what you smell',
        caption: '',
        name: 'aromaSmells',
        component: (
          <Controller
            name="aromaSmells"
            control={control}
            defaultValue={[]}
            rules={{
              validate: (value) => value.length > 0 || 'Please select at least one aroma'
            }}
            render={({ field }) => (
              <Box sx={styles.imgGrid2} px={2}>
                {optionsAroma.map((item) => {
                  return (
                    <SurveySwitchVariantImage
                      key={item.value}
                      label={item.label}
                      onClick={() => {
                        const updatedArray = toggleSelectedItem(field.value, item.value as number);
                        field.onChange(updatedArray);
                      }}
                      isSelected={field.value.includes(item.value as number)}
                      alt={item.label}
                      img={item.img || ''}
                    />
                  );
                })}
              </Box>
            )}
          />
        )
      },
      {
        title: 'How loud is the nose?',
        caption: '',
        name: 'nose',
        component: (
          <Box>
            <Controller
              name="nose"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsNose}
                />
              )}
            />
          </Box>
        )
      },
      {
        title: 'How is the flavor when smoked?',
        caption: '',
        name: 'smoked',
        component: (
          <Box>
            <Controller
              name="smoked"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsSmoked}
                />
              )}
            />
          </Box>
        )
      },
      {
        title: 'What kind of “high” did you experience?',
        caption: '',
        name: 'experience',
        component: (
          <Box>
            <Controller
              name="experience"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsExperience}
                />
              )}
            />
          </Box>
        )
      },
      {
        title: 'How strong is the intoxication?',
        caption: '',
        name: 'intoxication',
        component: (
          <Box>
            <Controller
              name="intoxication"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsIntoxication}
                />
              )}
            />
          </Box>
        )
      },
      {
        title: 'How often do you consume cannabis?',
        caption: '',
        name: 'consume',
        component: (
          <Box>
            <Controller
              name="consume"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsConsume}
                />
              )}
            />
          </Box>
        )
      },
      {
        title: 'What is the primary purpose for your consumption?',
        caption: '',
        name: 'purpose',
        component: (
          <Box>
            <Controller
              name="purpose"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsPurpose}
                />
              )}
            />
          </Box>
        )
      },
      {
        title: 'Your age',
        caption: '',
        name: 'age',
        component: (
          <Box>
            <Controller
              name="age"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsAges}
                />
              )}
            />
          </Box>
        )
      },
      {
        title: 'Your gender',
        caption: '',
        name: 'gender',
        component: (
          <Box>
            <Controller
              name="gender"
              rules={validations.required}
              control={control}
              render={({ field }) => (
                <SurveyScrollValueController
                  onChange={field.onChange}
                  value={field.value}
                  options={optionsGender}
                />
              )}
            />
          </Box>
        )
      }
    ];
  }, [control]);

  const disabledUm = useMemo(() => {
    const card = cardsUm.find((item, index) => index === currentCard)?.name as keyof SurveyFormData;
    const isInvalid = !!formState.errors[card];

    return isInvalid;
  }, [cardsUm, currentCard, formState]);

  return (
    <Box sx={styles.contentWrapper}>
      <Box sx={styles.content}>
        <Slide direction="down" in timeout={700}>
          <Box sx={styles.headBlock}>
            <Avatar
              draggable={false}
              src={
                surveyByUuid.subcompany.company.productSurvey.thumbnail?.url ||
                '/resources/svg/placeholder.svg'
              }
              variant={'circular'}
              sx={styles.avatarProduct}
              imgProps={{
                style: {
                  objectFit: 'cover'
                }
              }}
            />
            <Box sx={styles.questionTitle}>
              <Typography
                fontSize={14}
                variant="body1"
                fontWeight={500}
                sx={{ color: colors.green }}
              >
                Product
              </Typography>
              <Typography fontSize={24} variant="h4" fontWeight={500}>
                {surveyByUuid?.subcompany?.company?.productSurvey?.item?.name || 'Product'}
              </Typography>
            </Box>
          </Box>
        </Slide>

        <Grow in timeout={1400}>
          <Box sx={styles.surveyStack}>
            {cardsUm.map((item, index) => {
              return (
                <SurveyCard
                  currentPage={index + 1}
                  totalPages={cardsUm.length}
                  key={item.title}
                  position={
                    currentCard === index
                      ? 'top'
                      : currentCard > index
                      ? 'hidden'
                      : currentCard === index - 1
                      ? 'middle'
                      : 'back'
                  }
                  title={item.title}
                  caption={item.caption}
                >
                  <>{item.component}</>
                </SurveyCard>
              );
            })}
          </Box>
        </Grow>

        <Slide direction="up" in timeout={1100}>
          <Box sx={styles.stackButtonWrapper}>
            {currentCard === 0 ? null : (
              <Grow in timeout={1000}>
                <IconButton sx={styles.stackBackButton} onClick={backHandler}>
                  <ArrowBackIcon />
                </IconButton>
              </Grow>
            )}

            <Button
              fullWidth
              sx={styles.stackNextButton}
              onClick={nextHandler}
              disabled={disabledUm}
            >
              Next
            </Button>
          </Box>
        </Slide>
        {isLoading && <Loader />}
      </Box>
    </Box>
  );

  async function handleSubmit(data: SurveyFormData) {
    try {
      startLoading();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars

      const response = await submitSurvey({
        variables: {
          payload: {
            gender: data.gender.value as SurveyGenderEnum,
            smoked: data.smoked.value as SmokedEnum,
            id: id,

            ageRange: data.age.value as number,
            appealingVisually: data.appearance.value as AppealingVisuallyEnum,
            aromaSmells: data.aromaSmells,
            color: data.budHairsColor.value as ColorEnum,
            experience: data.experience.value as ExperienceEnum,

            intoxication: data.intoxication.value as IntoxicationEnum,
            nose: data.nose.value as NoseEnum,
            oftenConsumeCannabis: data.consume.value as SurveyOftenConsumeCannabisEnum,
            primaryPurpose: data.purpose.value as PrimaryPurposeEnum
          }
        }
      });

      if (!response) {
        return null;
      }
      setStep('step3');
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      stopLoading();
    }
  }

  async function nextHandler() {
    if (cardsUm.length - 1 === currentCard) {
      const data = getValues();
      await trigger();
      if (formState.isValid) {
        await handleSubmit(data);
      }
    } else {
      trigger();
      setCurrentCard((oldValue) => oldValue + 1);
    }
  }

  async function backHandler() {
    setCurrentCard((oldValue) => oldValue - 1);
  }
};

export default SurveyStep2;
