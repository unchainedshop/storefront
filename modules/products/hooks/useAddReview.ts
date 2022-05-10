import { useMutation, gql } from '@apollo/client';

const AddReviewMutation = gql`
  mutation AddReview($productId: ID!, $productReview: ProductReviewInput!) {
    createProductReview(productId: $productId, productReview: $productReview) {
      _id
    }
  }
`;

const useAddReview = () => {
  const [addReviewMutation] = useMutation(AddReviewMutation, {
    refetchQueries: ['ProductReview'],
  });

  const addReview = async ({ productId, productReview }) => {
    return addReviewMutation({ variables: { productId, productReview } });
  };

  return { addReview };
};

export default useAddReview;
