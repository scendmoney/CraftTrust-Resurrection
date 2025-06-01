import { SurveyStatusEnum } from 'graphql/_server';

export const mappingSurveyStatusContacts = [
  {
    value: 'verified',
    label: 'Verified',
    includes: [SurveyStatusEnum.BuyerConfirmed, SurveyStatusEnum.Done, SurveyStatusEnum.SurveySent]
  },
  {
    value: 'notVerified',
    label: 'Not Verified',
    includes: [SurveyStatusEnum.Rejected, SurveyStatusEnum.New]
  }
];

export const mappingSurveyContactsReverse = (name: string) => {
  switch (name) {
    case SurveyStatusEnum.BuyerConfirmed:
    case SurveyStatusEnum.Done:
    case SurveyStatusEnum.SurveySent:
      return 'Verified';
    case SurveyStatusEnum.New:
    case SurveyStatusEnum.Rejected:
      return 'Not Verified';
    default:
      return 'Not Verified';
  }
};

const surveyStatusesAdminContactsMap: { [key in SurveyStatusEnum]: string } = {
  [SurveyStatusEnum.New]: 'SMS verification',
  [SurveyStatusEnum.BuyerConfirmed]: 'Approved For Survey',
  [SurveyStatusEnum.SurveySent]: 'Servey Sent',
  [SurveyStatusEnum.Done]: 'Servey Redeemed',
  [SurveyStatusEnum.Rejected]: 'Rejected'
};

export const surveyStatusesAdminContactsReverse = (key?: SurveyStatusEnum): string =>
  key ? surveyStatusesAdminContactsMap[key] : '--';

export const surveyStatusesAdminContacts = Object.entries(surveyStatusesAdminContactsMap).map(
  ([value, label]) => ({
    value,
    label
  })
);
