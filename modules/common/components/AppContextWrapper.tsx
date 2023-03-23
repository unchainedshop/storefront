import React, { useState, useContext, useEffect, useMemo } from 'react';

import { useIntl } from 'react-intl';
import ConnectPopup from './ConnectPopup';

type AppContextType = {
  hasSigner?: boolean;
  accounts?: string[];
  connect: () => Promise<void>;
  selectedCurrency?: string;
  changeCurrency: (p: any) => Promise<void>; // eslint-disable-line
  isCartOpen: boolean;
  toggleCart?: (p: any) => void; // eslint-disable-line
  payWithMetaMask?: () => void;
};

export const AppContext = React.createContext<AppContextType>({
  accounts: [],
  connect: () => null,
  changeCurrency: async () => {},
  isCartOpen: false,
  toggleCart: () => null,
});

export const useAppContext = () => useContext(AppContext);

const { ethereum } = global as any;

export const AppContextWrapper = ({ children }) => {
  const [accounts, setAccounts] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCartOpen, toggleCart] = useState(false);
  const [selectedCurrency, setCurrency] = useState('ETH');
  const [status] = useState({
    metaMaskOpen: false,
    isWaitingForConfirmation: false,
    isError: false,
    message: '',
  });
  const { formatMessage } = useIntl();

  const changeCurrency = async (val) => {
    if (typeof window !== 'undefined') {
      setCurrency(val ?? 'ETH');
      localStorage.setItem('selectedCurrency', val);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined')
      changeCurrency(localStorage.getItem('selectedCurrency'));
  }, []);

  const doConnect = async () => {
    setModalOpen(false);
    await ethereum.request({ method: 'eth_requestAccounts' });
    const connectedAccounts = await ethereum.request({
      method: 'eth_accounts',
    });
    setAccounts(connectedAccounts);
  };

  const connect = async () => setModalOpen(true);

  const appContext = useMemo(
    () =>
      ({
        hasSigner: !!ethereum,
        accounts,
        connect,
        isCartOpen,
        toggleCart,
        selectedCurrency,
        changeCurrency,
      } as AppContextType),
    [ethereum, accounts, connect, isCartOpen, selectedCurrency],
  );

  return (
    <AppContext.Provider value={appContext}>
      {status.metaMaskOpen && (
        <div className="align-items-center fixed top-0 left-0 right-0 bottom-0 z-[100000] flex justify-center bg-color-light-dark opacity-95">
          {(status.isWaitingForConfirmation || status.isError) && (
            <div className="absolute mx-auto mt-40 w-1/4 max-w-lg bg-white p-5">
              <p>
                {status.isError ? (
                  status.message
                ) : (
                  <>
                    {formatMessage({
                      id: 'processing_payment',
                      defaultMessage:
                        'Processing payment, waiting for block confirmation. this might take few seconds to a minute',
                    })}

                    <img src="/static/img/spinner-icon.gif" />
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      )}
      <ConnectPopup isOpen={modalOpen} connect={doConnect} />
      {children}
    </AppContext.Provider>
  );
};
