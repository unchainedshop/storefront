import { useQuery, gql } from '@apollo/client';
import { useIntl } from 'react-intl';

import ProductFragment from '../../products/fragments/ProductFragment';
import AssortmentFragment from '../fragments/assortment';
import AssortmentMediaFragment from '../fragments/AssortmentMedia';
import AssortmentPathFragment from '../fragments/AssortmentPath';

export const AssortmentsProductsQuery = gql`
  query AssortmentsProductsQuery(
    $slugs: String!
    $forceLocale: String
    $offset: Int
    $limit: Int
  ) {
    assortment(slug: $slugs) {
      ...AssortmentFragment
      assortmentPaths {
        ...AssortmentPathFragment
      }
      media {
        ...AssortmentMediaFragment
      }
      searchProducts {
        filteredProductsCount
        productsCount
        products(offset: $offset, limit: $limit) {
          ...ProductFragment
        }
      }
      productAssignments {
        product {
          ...ProductFragment
        }
      }
    }
  }
  ${AssortmentFragment}
  ${ProductFragment}
  ${AssortmentPathFragment}
  ${AssortmentMediaFragment}
`;

const useAssortmentProducts = (
  {
    includeLeaves,
    slugs,
  }: { includeLeaves: boolean; slugs: string[] | string } = {
    includeLeaves: true,
    slugs: [],
  },
) => {
  const intl = useIntl();
  const { data, loading, error, fetchMore } = useQuery(
    AssortmentsProductsQuery,
    {
      variables: {
        includeLeaves,
        slugs,
        forceLocale: intl.locale,
        offset: 0,
        limit: 10,
      },
    },
  );
  const paths = (data?.assortment?.assortmentPaths || []).flat().pop()?.links;
  const products = data?.assortment?.searchProducts.products || [];
  const loadMore = () => {
    fetchMore({
      variables: {
        offset: products.length,
        includeLeaves,
        slugs,
        forceLocale: intl.locale,
        limit: 10,
      },
    });
  };

  return {
    loading,
    loadMore,
    error,
    filteredProducts: data?.assortment?.searchProducts.filteredProductsCount,
    assortment: data?.assortment || {},
    products,
    paths,
  };
};

export default useAssortmentProducts;
