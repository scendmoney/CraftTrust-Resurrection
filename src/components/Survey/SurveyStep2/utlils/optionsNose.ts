import { NoseEnum } from 'graphql/_server';
import { TLabelValue } from 'sharedArchitech/types';

const optionsNose: TLabelValue[] = [
  {
    label: 'Light',
    value: NoseEnum.Small,
    img: '/resources/img/surveyNew/small.png'
  },
  {
    label: 'Moderate',
    value: NoseEnum.Medium,
    img: '/resources/img/surveyNew/medium.png'
  },
  {
    label: 'Boom',
    value: NoseEnum.Large,
    img: '/resources/img/surveyNew/large.png'
  }
];

export default optionsNose;
