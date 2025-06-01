export const PriceFormatterValue: React.FC<{ value: number }> = ({ value }) => {
  if (isFinite(value)) {
    return <>${value.toFixed(2)}</>;
  }
  return <>--</>;
};
