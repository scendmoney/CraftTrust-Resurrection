import { PrimaryPurposeEnum } from 'graphql/_server';
import { TLabelValue } from 'sharedArchitech/types';

const optionsPurpose: TLabelValue[] = [
  {
    label: 'Pain relief',
    value: PrimaryPurposeEnum.MentalHealth,
    img: '/resources/img/surveyNew/mental.png'
  },
  {
    label: 'Mental health',
    value: PrimaryPurposeEnum.PainRelief,
    img: '/resources/img/surveyNew/pain.png'
  },
  {
    label: 'Recreation',
    value: PrimaryPurposeEnum.Recreation,
    img: '/resources/img/surveyNew/recreation.png'
  }
];

export default optionsPurpose;
