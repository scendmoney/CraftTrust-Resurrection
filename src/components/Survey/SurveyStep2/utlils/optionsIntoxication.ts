import { IntoxicationEnum } from 'graphql/_server';
import { TLabelValue } from 'sharedArchitech/types';

const optionsIntoxication: TLabelValue[] = [
  {
    label: 'Meh',
    value: IntoxicationEnum.Meh,
    img: '/resources/img/surveyNew/meh.png'
  },
  {
    label: 'Stoned',
    value: IntoxicationEnum.Stoned,
    img: '/resources/img/surveyNew/stoned.png'
  },
  {
    label: 'Wrecked',
    value: IntoxicationEnum.Wrecked,
    img: '/resources/img/surveyNew/wrecked.png'
  }
];

export default optionsIntoxication;
