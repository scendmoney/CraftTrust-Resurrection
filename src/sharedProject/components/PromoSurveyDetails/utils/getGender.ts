import { SurveyGenderEnum } from 'graphql/_server';

export const getGender = (data?: SurveyGenderEnum | undefined) => {
  switch (data) {
    case SurveyGenderEnum.Female:
      return {
        title: 'Female',
        src: '/resources/img/surveyNew/female.png'
      };
    case SurveyGenderEnum.Male:
      return {
        title: 'Male',
        src: '/resources/img/surveyNew/male.png'
      };
    case SurveyGenderEnum.Other:
      return {
        title: 'Other',
        src: '/resources/img/surveyNew/otherGender.png'
      };

    default:
      return null;
  }
};
