import { AppealingVisuallyEnum } from 'graphql/_server';

export const getAppealingVisually = (data?: AppealingVisuallyEnum | undefined) => {
  switch (data) {
    case AppealingVisuallyEnum.Fyre:
      return {
        title: 'Fyre',
        src: '/resources/img/surveyNew/fyre.png'
      };
    case AppealingVisuallyEnum.Low:
      return {
        title: 'Low',
        src: '/resources/img/surveyNew/low.png'
      };
    case AppealingVisuallyEnum.Midz:
      return {
        title: 'Midz',
        src: '/resources/img/surveyNew/midz.png'
      };

    default:
      return null;
  }
};
