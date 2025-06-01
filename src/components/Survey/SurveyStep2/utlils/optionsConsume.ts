import { SurveyOftenConsumeCannabisEnum } from 'graphql/_server';
import { TLabelValue } from 'sharedArchitech/types';

const optionsConsume: TLabelValue[] = [
  {
    label: 'Rarely',
    value: SurveyOftenConsumeCannabisEnum.Rarely,
    img: '/resources/img/surveyNew/rarely.png'
  },
  {
    label: 'Occassionally',
    value: SurveyOftenConsumeCannabisEnum.Occassionally,
    img: '/resources/img/surveyNew/occassionally.png'
  },
  {
    label: 'Daily',
    value: SurveyOftenConsumeCannabisEnum.Daily,
    img: '/resources/img/surveyNew/daily.png'
  }
];

export default optionsConsume;
