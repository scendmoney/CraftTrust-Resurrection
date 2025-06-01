import { ExperienceEnum } from 'graphql/_server';
import { TLabelValue } from 'sharedArchitech/types';

const optionsExperience: TLabelValue[] = [
  {
    label: 'Euphoric/Creative',
    value: ExperienceEnum.EuphoricCreative,
    img: '/resources/img/surveyNew/creative.png'
  },
  {
    label: 'Heady/Mental',
    value: ExperienceEnum.HeadyMental,
    img: '/resources/img/surveyNew/heady.png'
  },
  {
    label: 'Relaxing/Pain-relieving',
    value: ExperienceEnum.RelaxingPainrelieving,
    img: '/resources/img/surveyNew/relaxing.png'
  },
  {
    label: 'Fuggin Stupid',
    value: ExperienceEnum.FugginStupid,
    img: '/resources/img/surveyNew/stupid.png'
  }
];

export default optionsExperience;
