import { useMutation, gql } from '@apollo/client';

const AddBookmarkMutation = gql`
  mutation CreateBookmark($productId: ID!, $userId: ID!) {
    createBookmark(productId: $productId, userId: $userId) {
      _id
    }
  }
`;

const useAddBookmark = () => {
  const [createBookmarkMutation] = useMutation(AddBookmarkMutation, {
    refetchQueries: ['user'],
  });

  const addBookmark = async ({ productId, userId }) => {
    await createBookmarkMutation({ variables: { productId, userId } });
  };

  return {
    addBookmark,
  };
};

export default useAddBookmark;
