import React, { useState, useContext, useMemo } from 'react';

type AppContextType = {
  isCartOpen: boolean;
  toggleCart?: (p: any) => void; // eslint-disable-line
};

export const AppContext = React.createContext<AppContextType>({
  isCartOpen: false,
  toggleCart: () => null,
});

export const useAppContext = () => useContext(AppContext);

export const AppContextWrapper = ({ children }) => {
  const [isCartOpen, toggleCart] = useState(false);

  const appContext = useMemo(
    () =>
      ({
        isCartOpen,
        toggleCart,
      }) as AppContextType,
    [isCartOpen],
  );

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};
