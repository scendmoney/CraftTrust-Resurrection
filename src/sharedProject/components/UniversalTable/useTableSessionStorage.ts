import { useEffect, useState } from 'react';

function useTableSessionStorage<T>(
  key: string,
  initialValue: T,
  tableId: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const prefixedKey = `${tableId}_${key}`;

  const [value, setValue] = useState(() => {
    const jsonValue = sessionStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    return typeof initialValue === 'function' ? initialValue() : initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
}

export default useTableSessionStorage;
