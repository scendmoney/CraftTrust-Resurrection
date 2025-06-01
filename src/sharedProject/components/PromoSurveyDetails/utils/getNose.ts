import { NoseEnum } from 'graphql/_server';

export const getNose = (data?: NoseEnum | undefined) => {
  switch (data) {
    case NoseEnum.Large:
      return {
        title: 'Boom',
        src: '/resources/img/surveyNew/large.png'
      };
    case NoseEnum.Medium:
      return {
        title: 'Moderate',
        src: '/resources/img/surveyNew/medium.png'
      };
    case NoseEnum.Small:
      return {
        title: 'Light',
        src: '/resources/img/surveyNew/small.png'
      };

    default:
      return null;
  }
};
