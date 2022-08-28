import cookie from 'cookie';
import { ApolloClient, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';

import apolloCache, { resetCache } from './apolloCache';
import { onTokenChange } from '../../auth/utils/store';

export function parseCookies(ctx = {}, options = {}) {
  return cookie.parse(
    ctx.req && ctx.req.headers && ctx.req.headers.cookie // eslint-disable-line
      ? ctx.req.headers.cookie
      : process.browser
      ? document.cookie
      : '',
    options,
  );
}

const getApolloClient = ({ headers: headersOverride = {}, locale }) => {
  const middlewareLink = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    const headers = {};
    if (headersOverride && headersOverride['accept-language']) {
      headers['accept-language'] = headersOverride['accept-language'];
    }
    const foundToken = parseCookies({}).token;
    if (foundToken) {
      headers.authorization = `Bearer ${foundToken}`;
    }

    operation.setContext({ headers });
    return forward(operation);
  });

  const uri = process.browser
    ? `${window.location.origin}/api/graphql`
    : process.env.GRAPHQL_ENDPOINT;

  const httpLink = createUploadLink({
    uri,
    credentials: 'same-origin',
    includeExtensions: true,
  });

  const errorLink = onError(({ response, graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      response?.errors?.push(...graphQLErrors);
      graphQLErrors.forEach(({ message, locations, path }) => {
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${path}`,
        );
      });
    }

    if (networkError) {
      console.log(`[Network error]: ${networkError}`); // eslint-disable-line
    }
  });

  const cache = apolloCache(locale);

  const apolloClient = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([middlewareLink, errorLink, httpLink]),
    assumeImmutableResults: true,
    cache,
  });

  apolloClient.onResetStore(() => {
    resetCache(cache);
  });

  onTokenChange(({ token, tokenExpires }) => {
    if (!token || !tokenExpires) {
      document.cookie = cookie.serialize('token', '', {
        maxAge: -1, // Expire the cookie immediately
      });
      document.cookie = cookie.serialize('token', '', {
        maxAge: -1, // Expire the cookie immediately
        path: '/',
      });
      console.debug('token removed from cookies'); // eslint-disable-line
      apolloClient.resetStore();
      return;
    }

    const maxAge =
      ((new Date().getTime() - new Date(tokenExpires).getTime()) * -1) / 1000;

    const newCookie = cookie.serialize('token', token, {
      maxAge,
      path: '/',
      secure: window.location.protocol === 'https',
      sameSite: true,
    });
    document.cookie = newCookie;
    console.debug('token added to cookies, expiring: ', maxAge); // eslint-disable-line
    apolloClient.resetStore();
  });

  return apolloClient;
};

export default getApolloClient;
