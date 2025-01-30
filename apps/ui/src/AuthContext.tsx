import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useState,
} from 'react';
import { api } from './api';

type Token = Awaited<ReturnType<typeof api.createToken>> | null;

type StatePair<T> = {
  value: T;
  setValue: Dispatch<SetStateAction<T>>;
};

export const AuthContext = createContext<StatePair<Token>>({
  value: null,
  setValue: () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [value, setValue] = useState<Token>(null);

  return (
    <AuthContext.Provider value={{ value, setValue }}>
      {children}
    </AuthContext.Provider>
  );
};
