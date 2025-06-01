export const TextFormatterValue: React.FC<{ value: string; addHashtag?: boolean }> = ({
  value,
  addHashtag = false
}) => {
  if (addHashtag && value) {
    return <>#{value}</>;
  }
  if (value) {
    return <>{value}</>;
  }
  return <>--</>;
};
