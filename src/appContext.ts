/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from 'react';

type TAppContext = {
  token: string;
  setToken: (token: string) => void;
};

export const initContext: TAppContext = {
  token: '',
  setToken: () => null
};

const AppContext = createContext<TAppContext>(initContext);

export default AppContext;
