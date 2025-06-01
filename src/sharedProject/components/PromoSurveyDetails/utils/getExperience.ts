import { ExperienceEnum } from 'graphql/_server';

export const getExperience = (data?: ExperienceEnum | undefined) => {
  switch (data) {
    case ExperienceEnum.EuphoricCreative:
      return {
        title: 'Euphoric / Creative',
        titleShort: 'Creative',
        src: '/resources/img/surveyNew/creative.png'
      };
    case ExperienceEnum.FugginStupid:
      return {
        title: 'Fuggin / Stupid',
        titleShort: 'Stupid',
        src: '/resources/img/surveyNew/stupid.png'
      };
    case ExperienceEnum.HeadyMental:
      return {
        title: 'Heady / Mental',
        titleShort: 'Heady',
        src: '/resources/img/surveyNew/heady.png'
      };
    case ExperienceEnum.RelaxingPainrelieving:
      return {
        title: 'Relaxing / Pain-relieving',
        titleShort: 'Relaxing',
        src: '/resources/img/surveyNew/relaxing.png'
      };

    default:
      return null;
  }
};
