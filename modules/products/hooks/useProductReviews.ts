import { useQuery, gql } from '@apollo/client';
import ProductReviewsFragment from '../fragments/ProductReviewsFragment';

export const ProductReviewsQuery = gql`
  query ProductReview($productId: ID) {
    product(productId: $productId) {
      _id
      reviews {
        ...ProductReviewsFragment
      }
    }
  }
  ${ProductReviewsFragment}
`;

const useProductReviews = ({ productId }) => {
  const { data, loading, error } = useQuery(ProductReviewsQuery, {
    variables: { productId },
  });

  const product = data?.product;
  const productReviews = product?.reviews || [];

  return {
    productReviews,
    loading,
    error,
  };
};

export default useProductReviews;
