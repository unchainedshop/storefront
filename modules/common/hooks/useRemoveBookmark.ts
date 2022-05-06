import { useMutation, gql } from '@apollo/client';

const RemoveBookmarkMutation = gql`
  mutation RemoveBookmark($bookmarkId: ID!) {
    removeBookmark(bookmarkId: $bookmarkId) {
      _id
    }
  }
`;

const useRemoveBookmark = () => {
  const [removeBookmarkMutation] = useMutation(RemoveBookmarkMutation, {
    refetchQueries: ['user'],
  });

  const removeBookmark = async ({ bookmarkId }) => {
    await removeBookmarkMutation({ variables: { bookmarkId } });
  };

  return {
    removeBookmark,
  };
};

export default useRemoveBookmark;
