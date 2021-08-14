import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import getConfig from 'next/config';

import 'react-toastify/dist/ReactToastify.css';
import '../public/static/css/all.css';

import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import { CartContext } from '../modules/cart/CartContext';
import withApollo from '../modules/apollo/utils/withApollo';

const {
  publicRuntimeConfig: { localizations },
} = getConfig();

const UnchainedApp = ({ Component, pageProps, router }) => {
  const messages = localizations[router.locale];

  const toggleCart = (val) => {
    // eslint-disable-next-line no-use-before-define
    setCartContext({
      isCartOpen: val,
      toggleCart,
    });
  };

  const [cartContext, setCartContext] = useState({
    isCartOpen: false,
    toggleCart,
  });

  return (
    <IntlWrapper locale={router.locale} messages={messages} key="intl-provider">
      <CartContext.Provider value={cartContext}>
        <ToastContainer position="top-center" autoClose={3000} newestOnTop />
        <Component {...pageProps} />
      </CartContext.Provider>
    </IntlWrapper>
  );
};

export default withApollo(UnchainedApp);
