import { IntoxicationEnum } from 'graphql/_server';

export const getIntoxication = (data?: IntoxicationEnum | undefined) => {
  switch (data) {
    case IntoxicationEnum.Meh:
      return {
        title: 'Meh',
        src: '/resources/img/surveyNew/meh.png'
      };
    case IntoxicationEnum.Stoned:
      return {
        title: 'Stoned',
        src: '/resources/img/surveyNew/stoned.png'
      };
    case IntoxicationEnum.Wrecked:
      return {
        title: 'Wrecked',
        src: '/resources/img/surveyNew/wrecked.png'
      };

    default:
      return null;
  }
};
