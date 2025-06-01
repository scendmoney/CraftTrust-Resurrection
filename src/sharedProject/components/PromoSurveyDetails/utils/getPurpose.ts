import { PrimaryPurposeEnum } from 'graphql/_server';

export const getPurpose = (data?: PrimaryPurposeEnum | undefined) => {
  switch (data) {
    case PrimaryPurposeEnum.MentalHealth:
      return {
        title: 'Mental Health',
        src: '/resources/img/surveyNew/mental.png'
      };
    case PrimaryPurposeEnum.PainRelief:
      return {
        title: 'Pain Relief',
        src: '/resources/img/surveyNew/pain.png'
      };
    case PrimaryPurposeEnum.Recreation:
      return {
        title: 'Recreation',
        src: '/resources/img/surveyNew/recreation.png'
      };

    default:
      return null;
  }
};
