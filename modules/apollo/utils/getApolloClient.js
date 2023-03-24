import cookie from 'cookie';
import {
  ApolloClient,
  ApolloLink,
  defaultDataIdFromObject,
  InMemoryCache,
} from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { onError } from '@apollo/client/link/error';

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

  const apolloClient = new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: typeof window === 'undefined',
    link: ApolloLink.from([middlewareLink, errorLink, httpLink]),
    assumeImmutableResults: true,
    cache: new InMemoryCache({
      possibleTypes: {
        Product: [
          'TokenizedProduct',
          'SimpleProduct',
          'ConfigurableProduct',
          'BundleProduct',
        ],
      },
    }),
  });

  return apolloClient;
};

export default getApolloClient;
