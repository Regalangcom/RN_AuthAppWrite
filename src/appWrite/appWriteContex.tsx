import React, {createContext, FC, PropsWithChildren, useState} from 'react';

import appWrite from './service';

type AppContextType = {
  appWrite: appWrite;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
};

export const AppWriteContext = createContext<AppContextType>({
  appWrite: new appWrite(),
  isLoggedIn: false,
  setIsLoggedIn: () => {},
});

// pada saat menggunakna FC/FUNGSIONAL COMPONENTS ARTINYA "Hei alat praga apa yang akan kamu gunakan " disini contoh saya menggunaka alat praga children
export const AppWriteProvider: FC<PropsWithChildren> = ({children}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const defaultValue = {
    appWrite: new appWrite(),
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <AppWriteContext.Provider value={defaultValue}>
      {children}
    </AppWriteContext.Provider>
  );
};

export default AppWriteContext;

// const styles = StyleSheet.create({});
