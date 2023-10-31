import { useMutation, gql } from '@apollo/client';

const RemoveBookmarkMutation = gql`
  mutation RemoveBookmark($bookmarkId: ID!) {
    removeBookmark(bookmarkId: $bookmarkId) {
      _id
      user {
        _id
        bookmarks {
          _id
        }
      }
    }
  }
`;

const useRemoveBookmark = () => {
  const [removeBookmarkMutation] = useMutation(RemoveBookmarkMutation);

  const removeBookmark = async ({ bookmarkId }) => {
    await removeBookmarkMutation({ variables: { bookmarkId } });
  };

  return {
    removeBookmark,
  };
};

export default useRemoveBookmark;
