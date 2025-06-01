import { Dispatch, SetStateAction } from 'react';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { ICartModel } from 'graphql/_server';

export type TShipping = {
  cart: ICartModel;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  userContactId: string;
  setValue: UseFormSetValue<TInputs>;
  setPhone: Dispatch<SetStateAction<string | undefined>>;
  errors?: FieldErrors<TInputs>;
};

export type TInputs = {
  userContactId: string;
  zip: null;
  city: string;
  comments: string;
  address: string;
};
