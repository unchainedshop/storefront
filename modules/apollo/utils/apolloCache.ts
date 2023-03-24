/* eslint-disable no-underscore-dangle */
import { InMemoryCache, defaultDataIdFromObject } from '@apollo/client';

const apolloCache = (locale) => {
  const inMemoryCache = new InMemoryCache({
    possibleTypes: {
      Product: [
        'TokenizedProduct',
        'SimpleProduct',
        'ConfigurableProduct',
        'BundleProduct',
      ],
    },
    dataIdFromObject(responseObject) {
      const id = defaultDataIdFromObject(responseObject);
      if (id) return `${locale}:${id}`;
      return id;
    },
  });
  return inMemoryCache;
};

export const resetCache = async (cache) => {
  cache.gc();
};
export default apolloCache;
