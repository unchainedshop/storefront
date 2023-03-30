import { useQuery, gql } from '@apollo/client';
import { ProductAssortmentPathFragment } from '../../assortment/fragments/AssortmentPath';
import ProductFragment from '../fragments/ProductFragment';
import SimpleProductPrice from '../fragments/SimpleProductPrice';

const ProductDetailQuery = gql`
  query ProductDetailQuery($slug: String) {
    product(slug: $slug) {
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

const useProductDetail = ({ slug }) => {
  const { data, loading, error } = useQuery(ProductDetailQuery, {
    variables: { slug },
  });

  const paths = (data?.product?.assortmentPaths || []).flat().pop()?.links;

  return {
    product: data?.product,
    paths,
    loading,
    error,
  };
};

export default useProductDetail;
