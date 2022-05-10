import { useMutation, gql } from '@apollo/client';

const AddReviewVoteMutation = gql`
  mutation AddReviewVote(
    $productReviewId: ID!
    $voteType: ProductReviewVoteType!
  ) {
    addProductReviewVote(productReviewId: $productReviewId, type: $voteType) {
      _id
    }
  }
`;

const useProductReviewVote = () => {
  const [addReviewVoteMutation] = useMutation(AddReviewVoteMutation, {
    refetchQueries: ['ProductReview'],
  });

  const addReviewVote = async ({ productReviewId, voteType }) => {
    return addReviewVoteMutation({ variables: { productReviewId, voteType } });
  };

  return { addReviewVote };
};

export default useProductReviewVote;
