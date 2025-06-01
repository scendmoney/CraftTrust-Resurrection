import { useState } from 'react';

export enum TThemeModes {
  Light = 'light',
  Dark = 'dark'
}

function useThemeColor() {
  const [themeColor, setThemeColor] = useState<TThemeModes>(TThemeModes.Light);

  return { themeColor, setThemeColor };
}

export default useThemeColor;
