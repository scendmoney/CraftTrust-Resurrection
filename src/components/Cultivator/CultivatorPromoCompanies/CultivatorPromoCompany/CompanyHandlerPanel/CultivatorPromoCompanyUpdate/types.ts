import { TSelectWithSearchOptions } from 'sharedProject/components/inputs/InputSelectWithSearch/types';

export type TInputs = {
  cultivator: TSelectWithSearchOptions | undefined;
  products: TSelectWithSearchOptions[] | undefined;
  productStrain: TSelectWithSearchOptions | undefined;
  dateEnd: string;
  dateStart: string;
  companyName: string;
  unitWeight: number;
};
