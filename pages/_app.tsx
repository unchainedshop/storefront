import React from 'react';
import { Toaster } from 'react-hot-toast';

import '../public/static/css/all.css';
import '../styles/globals.css';

import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import IntlWrapper from '../modules/i18n/components/IntlWrapper';

import { useApollo } from '../modules/apollo/apolloClient';
import Layout from '../modules/layout/components/Layout';
import getMessages from '../modules/i18n/utils/getMessages';
import { AppContextWrapper } from '../modules/common/components/AppContextWrapper';

const UnchainedApp = ({ Component, pageProps, router }) => {
  const messages = getMessages(router.locale);
  const { locale } = useRouter();
  const apollo = useApollo(pageProps, { locale });

  return (
    <IntlWrapper locale={router.locale} messages={messages} key="intl-provider">
      <AppContextWrapper>
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
