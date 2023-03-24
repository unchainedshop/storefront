import React, { useState, useContext, useMemo } from 'react';

type AppContextType = {
  selectedCurrency?: string;
  changeCurrency: (p: any) => Promise<void>; // eslint-disable-line
  isCartOpen: boolean;
  toggleCart?: (p: any) => void; // eslint-disable-line
};

export const AppContext = React.createContext<AppContextType>({
  changeCurrency: async () => {},
  isCartOpen: false,
  toggleCart: () => null,
});

export const useAppContext = () => useContext(AppContext);

export const AppContextWrapper = ({ children, defaultCurrency }) => {
  const [isCartOpen, toggleCart] = useState(false);
  const [selectedCurrency, setCurrency] = useState(defaultCurrency ?? 'ETH');

  const changeCurrency = async (val) => {
    if (typeof window !== 'undefined') {
      setCurrency(val ?? 'ETH');
      localStorage.setItem('selectedCurrency', val);
    }
  };

  const appContext = useMemo(
    () =>
      ({
        isCartOpen,
        toggleCart,
        selectedCurrency,
        changeCurrency,
      } as AppContextType),
    [isCartOpen, selectedCurrency],
  );

  return (
    <AppContext.Provider value={appContext}>{children}</AppContext.Provider>
  );
};
