import { AppealingVisuallyEnum } from 'graphql/_server';
import { TLabelValue } from 'sharedArchitech/types';

const optionsAppealing: TLabelValue[] = [
  {
    label: 'Fyre',
    value: AppealingVisuallyEnum.Fyre,
    additionalText: '',
    img: '/resources/img/surveyNew/fyre.png'
  },

  {
    label: 'Midz',
    value: AppealingVisuallyEnum.Midz,
    additionalText: '',
    img: '/resources/img/surveyNew/midz.png'
  },
  {
    label: 'Low',
    value: AppealingVisuallyEnum.Low,
    additionalText: '',
    img: '/resources/img/surveyNew/low.png'
  }
];

export default optionsAppealing;
