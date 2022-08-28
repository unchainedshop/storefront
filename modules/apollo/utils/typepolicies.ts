import { offsetLimitPagination } from '@apollo/client/utilities';

/* eslint-disable no-underscore-dangle */
export const keyMappings: any = {
  Price: {
    fields: {
      simulatedPrice: {
        keyArgs: ['currency'],
        merge(_, incoming) {
          return { ...incoming };
        },
      },
    },
  },
  Query: {
    fields: {
      assortments: {
        keyArgs: [
          'limit',
          'includeLeaves',
          'includeInactive',
          'offset',
          'tags',
          'queryString',
          'slugs',
          'currency',
        ],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      products: {
        keyArgs: [
          'limit',
          'includeDrafts',
          'offset',
          'tags',
          'queryString',
          'currency',
        ],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      countries: {
        keyArgs: ['limit', 'includeInactive', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      SupportedCurrencies: {
        keyArgs: ['limit', 'includeInactive', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      enrollments: {
        keyArgs: ['limit', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      quotations: {
        keyArgs: ['limit', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      workQueue: {
        keyArgs: ['limit', 'status', 'selectTypes', 'created', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      languages: {
        keyArgs: ['limit', 'includeInactive', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      events: {
        keyArgs: ['limit', 'offset', 'type', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      users: {
        keyArgs: ['limit', 'includeGuests', 'queryString', 'offset'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      filters: {
        keyArgs: ['limit', 'offset', 'queryString'],
        merge(existing = [], incoming) {
          return [...existing, ...incoming];
        },
      },
      Log: offsetLimitPagination(),
    },
    SimpleProduct: {
      keyArgs: ['currency'],
      merge(existing = {}, incoming) {
        return { ...existing, ...incoming };
      },
    },
    orders: {
      keyArgs: ['limit', 'includeCarts', 'offset', 'queryString', 'currency'],
      merge(existing = [], incoming) {
        return [...existing, ...incoming];
      },
    },
  },
  ProductSearchResult: {
    fields: {
      products: offsetLimitPagination(),
    },
  },
  SearchResult: {
    fields: {
      products: offsetLimitPagination(),
    },
  },
};

export const keyFields: any = {
  keyFields: (result: any) => {
    const { id = null, _id = null, __typename = null } = result;
    if (_id && __typename) {
      return `${__typename}:${_id}`;
    }
    if (id && __typename) {
      return `${__typename}:${id}`;
    }
    return null;
  },
};

const typePolicies = { ...keyMappings, ...keyFields };

export default typePolicies;
