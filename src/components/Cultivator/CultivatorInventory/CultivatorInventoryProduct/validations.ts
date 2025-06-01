import { priceValidator } from './helpers/priceValidator';

const validations = {
  minQty: {
    required: 'Required',
    validate: (value: string | number) => {
      const numericValue = typeof value === 'string' ? parseFloat(value) : value;
      return numericValue > 0 || 'Required';
    }
  },
  price: {
    required: 'Required',
    validate: (value: string) => priceValidator(value)
  }
};

export default validations;
