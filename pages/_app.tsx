import React from 'react';
import { Toaster } from 'react-hot-toast';
import { ApolloProvider } from '@apollo/client';

import IntlWrapper from '../modules/i18n/components/IntlWrapper';
import { useApollo } from '../modules/apollo/apolloClient';
import Layout from '../modules/layout/components/Layout';
import getMessages from '../modules/i18n/utils/getMessages';
import { AppContextWrapper } from '../modules/common/components/AppContextWrapper';

import '../public/static/css/all.css';
import '../styles/globals.css';

const UnchainedApp = ({ Component, pageProps, router }) => {
  const apollo = useApollo(pageProps, { locale: router.locale });
  const messages = getMessages(router.locale);
  const defaultCurrency =
    typeof window === 'undefined'
      ? undefined
      : localStorage.getItem('selectedCurrency');

  return (
    <IntlWrapper locale={router.locale} messages={messages} key="intl-provider">
      <AppContextWrapper defaultCurrency={defaultCurrency}>
        <ApolloProvider client={apollo}>
          <Toaster />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </AppContextWrapper>
    </IntlWrapper>
  );
};

export default UnchainedApp;
