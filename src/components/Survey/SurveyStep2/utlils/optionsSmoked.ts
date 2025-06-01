import { SmokedEnum } from 'graphql/_server';
import { TLabelValue } from 'sharedArchitech/types';

const optionsSmoked: TLabelValue[] = [
  {
    label: 'Mild',
    value: SmokedEnum.Mild,
    img: '/resources/img/surveyNew/mild.png'
  },
  {
    label: 'Medium',
    value: SmokedEnum.Medium,
    img: '/resources/img/surveyNew/mediumSmoked.png'
  },
  {
    label: 'Strong',
    value: SmokedEnum.Strong,
    img: '/resources/img/surveyNew/strong.png'
  }
];

export default optionsSmoked;
