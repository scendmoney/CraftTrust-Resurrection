import { SmokedEnum } from 'graphql/_server';

export const getSmoked = (data?: SmokedEnum | undefined) => {
  switch (data) {
    case SmokedEnum.Mild:
      return {
        title: 'Mild',
        src: '/resources/img/surveyNew/mild.png'
      };
    case SmokedEnum.Medium:
      return {
        title: 'Medium',
        src: '/resources/img/surveyNew/mediumSmoked.png'
      };
    case SmokedEnum.Strong:
      return {
        title: 'Strong',
        src: '/resources/img/surveyNew/strong.png'
      };

    default:
      return null;
  }
};
