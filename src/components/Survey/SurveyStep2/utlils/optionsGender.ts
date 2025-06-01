import { SurveyGenderEnum } from 'graphql/_server';
import { TLabelValue } from 'sharedArchitech/types';

const optionsGender: TLabelValue[] = [
  {
    label: 'Male',
    value: SurveyGenderEnum.Male,
    img: '/resources/img/surveyNew/male.png'
  },
  {
    label: 'Female',
    value: SurveyGenderEnum.Female,
    img: '/resources/img/surveyNew/female.png'
  },
  {
    label: 'Other',
    value: SurveyGenderEnum.Other,
    img: '/resources/img/surveyNew/otherGender.png'
  }
];

export default optionsGender;
