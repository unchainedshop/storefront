import React, {
  useState,
  useContext,
  useEffect,

} from 'react';

import ConnectPopup from './ConnectPopup';


import { useIntl } from 'react-intl';
import { useRouter } from 'next/router';

const METAMASK_ERROR = {
  4001: 'Payment Canceled',
  32602: 'Invalid data provided',
  32603: 'Internal server error'
}


export const AppContext = React.createContext<{
  hasSigner?: boolean;
  accounts?: string[];

  connect: () => Promise<void>;
  selectedCurrency?: string;
  changeCurrency: (val) => void;
  isCartOpen: boolean;
  toggleCart?: (val) => void;
  payWithMetaMask?: (order: {orderId: string; orderAddress: string}, orderAmount: string) => void;
}>({
  accounts: [],
  connect: () => null,
  changeCurrency: () => {},
  isCartOpen: false,
  toggleCart: () => null,
});

export const useAppContext = () => useContext(AppContext);

const ethereum = (global as any).ethereum;

export const AppContextWrapper = ({ children }) => {
  
  const [accounts, setAccounts] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isCartOpen, toggleCart] = useState(false);
  const [selectedCurrency, setCurrency] = useState('ETH');
  const [status, setStatus] = useState({metaMaskOpen: false , isWaitingForConfirmation: false, isError: false, message: ''})
  const {formatMessage} = useIntl()
  const router = useRouter()
  

  const changeCurrency = async (val) => {
    if(typeof window !== 'undefined') {
    setCurrency(val ?? 'ETH')
      localStorage.setItem('selectedCurrency', val)
    }
    
  }

  useEffect(() => {
    
    if(typeof(window) != 'undefined')
    changeCurrency(localStorage.getItem('selectedCurrency'))
    
  }, []);

  

  const doConnect = async () => {
    setModalOpen(false);
    await ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await ethereum.request({
      method: 'eth_accounts',
    });
    setAccounts(accounts);
  };

  const connect = async () => setModalOpen(true);

  return (
    <AppContext.Provider
      value={{
        hasSigner: !!ethereum,
        accounts,
        connect,
        isCartOpen,
        toggleCart,
        selectedCurrency,
        changeCurrency,
      }}
    >
      
      {status.metaMaskOpen &&
      <div className="align-items-center fixed top-0 left-0 right-0 bottom-0 z-[100000] flex justify-center bg-color-light-dark opacity-95">
        {(status.isWaitingForConfirmation || status.isError) &&
        <div className="absolute mx-auto mt-40 w-1/4 max-w-lg bg-white p-5">
          
        <p>
        {status.isError ? status.message : <>{formatMessage({
              id: 'processing_payment',
              defaultMessage:
                'Processing payment, waiting for block confirmation. this might take few seconds to a minute',
                
            })}
            
            <img  src='/static/img/spinner-icon.gif'/>
            </> 
            }
            
          </p>


        </div>
}
        </div>
}
      <ConnectPopup isOpen={modalOpen} connect={doConnect} />
      {children}
    </AppContext.Provider>
  );
};
