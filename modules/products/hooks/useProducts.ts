import { useQuery, gql } from '@apollo/client';
import ProductFragment from '../fragments/ProductFragment';
import SimpleProductPrice from '../fragments/SimpleProductPrice';
import { ProductAssortmentPathFragment } from '../../assortment/fragments/AssortmentPath';

export const PRODUCTS_QUERY = gql`
  query Products($tags: [LowerCaseString!]) {
    products(tags: $tags) {
      assortmentPaths {
        ...ProductAssortmentPathFragment
      }
      ...ProductFragment
      ...SimpleProductPrice
    }
  }
  ${ProductFragment}
  ${SimpleProductPrice}
  ${ProductAssortmentPathFragment}
`;

const useProducts = ({ tags = [] } = {}) => {
  const { data, loading, error } = useQuery(PRODUCTS_QUERY, {
    variables: {
      tags,
    },
  });

  return {
    loading,
    error,
    products: data?.products || [],
  };
};

export default useProducts;
