export function priceValidator(value: string) {
  const numericValue = Number(value.replace(/\$|,/g, ''));

  if (!(numericValue > 0)) {
    return 'The price must be greater than $0.00';
  }

  return true;
}
