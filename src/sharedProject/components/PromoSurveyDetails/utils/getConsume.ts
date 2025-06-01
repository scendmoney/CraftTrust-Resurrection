import { SurveyOftenConsumeCannabisEnum } from 'graphql/_server';

export const getConsume = (data?: SurveyOftenConsumeCannabisEnum | undefined) => {
  switch (data) {
    case SurveyOftenConsumeCannabisEnum.Daily:
      return {
        title: 'Daily',
        src: '/resources/img/surveyNew/daily.png'
      };
    case SurveyOftenConsumeCannabisEnum.Rarely:
      return {
        title: 'Rarely',
        src: '/resources/img/surveyNew/rarely.png'
      };
    case SurveyOftenConsumeCannabisEnum.Occassionally:
      return {
        title: 'Occassionally',
        src: '/resources/img/surveyNew/occassionally.png'
      };

    default:
      return null;
  }
};
