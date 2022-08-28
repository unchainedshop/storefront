/* eslint-disable no-underscore-dangle */
import { InMemoryCache, defaultDataIdFromObject } from '@apollo/client';
import possibleTypes from '../possibleTypes.json';
import typePolicies from './typepolicies';

const apolloCache = (locale) => {
  const inMemoryCache = new InMemoryCache({
    typePolicies,
    possibleTypes,
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
