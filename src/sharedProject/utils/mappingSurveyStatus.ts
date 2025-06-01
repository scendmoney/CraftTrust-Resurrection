import { SurveyStatusEnum } from 'graphql/_server';

export const surveyStatusesRedeemed = [
  { value: SurveyStatusEnum.SurveySent, label: 'Not redeemed' },
  { value: SurveyStatusEnum.Done, label: 'Redeemed' }
];

export const mappingSurveyReverseRedeemed = (oldMessage?: SurveyStatusEnum | undefined): string => {
  switch (oldMessage) {
    case SurveyStatusEnum.SurveySent:
      return 'Not redeemed';
    case SurveyStatusEnum.Done:
      return 'Redeemed';
    default:
      return '--';
  }
};
