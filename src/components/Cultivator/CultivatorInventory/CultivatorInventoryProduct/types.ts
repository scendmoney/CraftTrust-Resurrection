import { ProductStatusEnum } from 'graphql/_server';
import { FileExtended } from 'sharedProject/components/AvatarDropZoneEditor/types';

export type TInputs = {
  status: ProductStatusEnum | undefined;
  price: string;
  minQty: string;
  description: string;
  quantityStock: number;
  geneticCross: string;
  thumbnail: FileExtended;
  terpenes: string[];
};
